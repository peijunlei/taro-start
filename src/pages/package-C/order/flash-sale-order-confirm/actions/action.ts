import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import Taro from '@tarojs/taro';
import { extraPathsValue } from '@/redux/util';
import { _, UploadImage, giftCard, ValidConst } from 'wmkit';
import { addressInfo } from '@/utils/location/area/area';
import { Const, cache } from 'config';
import moment from 'dayjs';
import actions from './index';

const urlType = {
  0: 'order-delivery',
  1: 'order-coupon',
  2: 'order-invoice',
  3: 'order-sku-list',
  4: 'order-pay',
  6: 'choose-shop'
};
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    //开关设置查询
    async _switchInit() {
      const { main } = getData();
      const companyInfoIds = main?.stores.map((m) => m.supplier.supplierId);

      await action._invoiceSwitch(companyInfoIds);
    },

    //地址初始化
    async _addressInit() {
      const { main } = getData();
      const stores = main?.stores || [];
      const context = await api.customerDeliveryAddressBaseController.findAddressList();
      const selectAddr = Taro.getStorageSync('mini::confirmAddress');
      let address: any = {};
      let defaltAddress;
      if (context.length) {
        // const defaltAddress = context.filter((item) => item.isDefaltAddress === 1)[0];
        for (let i = 0; i < context.length; i++) {
          const item = context[i];
          const addressInfoStr = await addressInfo(item.provinceId, item.cityId, item.areaId, item.streetId);
          item.addressInfo = addressInfoStr + item.deliveryAddress;
          if (item.isDefaltAddress != 0) {
            defaltAddress = item;
          }
        }
        //没有默认地址取第一个
        address = defaltAddress || context[0];
      }
      if (selectAddr && selectAddr.deliveryAddressId) {
        // 是否有效
        const addr = context.find((item) => item.deliveryAddressId === selectAddr.deliveryAddressId);
        if (addr) {
          address = addr;
        }
      }
      // 校验是否需要完善地址
      if (address && address.deliveryAddressId) {
        const result = await api.platformAddressController.verifyAddress({
          provinceId: address.provinceId,
          cityId: address.cityId,
          areaId: address.areaId,
          streetId: address.streetId,
          longitude: address.longitude,
          latitude: address.latitude,
          dangaossAddrId: address.dangaossAddrId
        });
        if (result) {
          address.needComplete = true;
        }
      }
      if (stores.length > 0) {
        const newStores = stores.map(item => {
          const newTradeItems = item.tradeItems.map((e) => {
            return { ...e, restrictedFlag: false }
          })
          const newGifts = item.gifts.map((e) => {
            return { ...e, restrictedFlag: false }
          })
          return { ...item, tradeItems: newTradeItems, gifts: newGifts }
        })
        action.commonChange('main.stores', newStores)
      }
      //校验商品区域限制
      try {
        await action._verifyPurchase();
      } catch (e) {
        if (e.message) {
          await action._confirmMaskInit(e);
        }
      }
      return address;
    },

    //计算运费
    async _calcFreight(fee: number = 0) {
      const { stores = [], orderList = {}, localData = {}, grouponFreeDelivery, flashFreeDelivery } =
        getData().main || {};
      const { address = {}, isVirtualGoods } = orderList;
      const { checkGoodsInfos = [], checkCoupon = {} } = localData.confirmCoupon || {};

      if (!address.provinceId) {
        return;
      }

      const consignee = {
        provinceId: address.provinceId,
        cityId: address.cityId,
      };
      const tradeParams = stores.map((st, i) => {
        const amountList = st.discountsPrice;
        let amountTotal = 0;
        if (amountList && amountList.length) {
          amountTotal = amountList.reduce((a, b) => _.add(a, b.amount), 0);
        }
        if (checkCoupon && checkCoupon.couponCodeId) {
          st = st.map((sku) => {
            const checkGoodsInfo = checkGoodsInfos.find((item) => item.get('goodsInfoId') == sku.skuId);
            // 优惠总价追加优惠券金额
            amountTotal = _.add(amountTotal, _.sub(sku.splitPrice, checkGoodsInfo.splitPrice));
            // sku修改为优惠券后的均摊价
            sku.splitPrice = checkGoodsInfo.splitPrice;
            return sku;
          });
        }
        return {
          supplier: {
            storeId: st.supplier.storeId,
            freightTemplateType: st.supplier.freightTemplateType,
          },
          consignee,
          deliverWay: isVirtualGoods ? 0 : 1, //配送方式，默认快递 0: 其他1: 快递2: 同城3: 自提
          tradePrice: {
            totalPrice: _.sub(st.tradePrice.goodsPrice, amountTotal),
          }, //配送方式 0：其他   1：快递
          oldTradeItems: st.tradeItems,
          oldGifts: st.gifts ? st.gifts : [],
        };
      });

      let context = await api.tradeBaseController.getFreight(tradeParams);
      //如果拼团活动是包邮活动
      if (grouponFreeDelivery || flashFreeDelivery) {
        context.map((item) => (item.deliveryPrice = 0));
      }
      await action._changeDeliverFee(context, fee);
    },

    // 修改各店铺运费/应付金额,修改所有订单总运费/总应付金额
    async _changeDeliverFee(freightList, fee: number = 0) {
      const { stores = [], price = {}, orderList: { dangaoDeliveryAmount } } = getData().main || {};
      // 已经产生的运费
      const dangaoDeliveryPrice = stores.reduce((cuur, item) => {
        const { supplier: { storeId } } = item
        const fee = dangaoDeliveryAmount[storeId] || 0
        cuur += fee
        return cuur
      }, 0)
      const totalDeliveryPrice = freightList.reduce((a, b) => _.add(a, b.deliveryPrice), 0) + dangaoDeliveryPrice;
      stores.map((st, i) => {
        let discountsTotalPrice = 0;
        const discountsPriceList = st.discountsPrice;
        if (discountsPriceList && discountsPriceList.length) {
          discountsTotalPrice = discountsPriceList.reduce((a, b) => _.add(a, b.amount), 0);
        }
        const deliveryPrice = freightList[i].deliveryPrice;
        st.tradePrice.deliveryPrice = deliveryPrice;
        st.tradePrice.totalPrice = _.add(_.sub(st.tradePrice.goodsPrice, discountsTotalPrice), deliveryPrice);
        return st;
      });

      const totalPrice = _.sub(
        _.add(_.sub(price.goodsTotalPrice, price.discountsTotalPrice), totalDeliveryPrice),
        price.pointTotalPrice,
      );

      action.commonChange([
        { paths: 'main.stores', value: stores },
        { paths: 'main.price.totalPrice', value: totalPrice },
        { paths: 'main.price.totalDeliveryPrice', value: totalDeliveryPrice },
      ]);
    },

    //上传图片
    async _chooseImage(storeId) {
      //选择图片后 会触发didshow函数
      await action._savaLocal();
      const FILE_MAX_SIZE = 500 * 1024 * 10;
      const { context } = await UploadImage(FILE_MAX_SIZE);
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.orderList.enclosures',
          value: (enclosures) => {
            const bool = enclosures[storeId] && enclosures[storeId].length;
            bool ? enclosures[storeId].push(context[0]) : (enclosures[storeId] = [context[0]]);
            return enclosures;
          },
        },
      });
    },

    //删除图片
    async _deleteImage(storeId, key) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.orderList.enclosures',
          value: (enclosures) => {
            enclosures[storeId].splice(key, 1);
          },
        },
      });
    },
    _orderDangaoChange(storeId, key, val) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: `main.orderList.dangao${key}`,
          value: (obj) => {
            obj[storeId] = val;
          },
        },
      });
    },
    _orderDangaoGreetingChange(id, val) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: `main.orderList.dangaoGreeting`,
          value: (obj) => {
            obj[id] = val;
          },
        },
      })
    },
    //订单备注修改
    _orderBuyRemarkChange(storeId, val) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.orderList.buyRemark',
          value: (buyRemark) => {
            buyRemark[storeId] = val;
          },
        },
      });
    },

    //查询发票开关并初始化
    async _invoiceSwitch(companyInfoIds) {
      const context = companyInfoIds?.length
        ? await api.invoiceProjectBaseController.queryProjectSwitchByIds({ companyInfoIds })
        : [];
      const invoiceData = context.reduce((a, { companyInfoId, supportInvoice }) => {
        a[companyInfoId.toString()] = {
          supportInvoice,
          commonCheck: {
            invoiceProject: '',
            invoiceProjectName: '',
          },
        };
        return a;
      }, {});
      action.commonChange('main.orderList.invoiceData', invoiceData);
    },

    //积分初始化
    async _pointInit() {
      Promise.all([
        await api.customerBaseController.findCustomerCenterInfo(),
        await api.systemPointsConfigController.query(),
      ])
        .then(([one, two]) => {
          action.commonChange([
            { paths: 'main.points.totalPoint', value: one.pointsAvailable },
            { paths: 'main.points.pointConfig', value: two },
          ]);
        })
        .then(async () => {
          await action._maxPointCal();
        });
    },

    //计算积分可抵扣最大
    async _maxPointCal() {
      const {
        main: {
          price: { goodsTotalPrice, discountsTotalPrice, pointTotalPrice, totalDeliveryPrice },
          points: { totalPoint, pointConfig },
        },
      } = getData();
      let totalPrice = _.sub(goodsTotalPrice, discountsTotalPrice);
      if (totalPoint <= 0) return;
      // 最大积分
      let maxPoint = 0;

      // 当前用户的总积分
      let mePoint = totalPoint;
      //  积分转换单位，即多少积分抵扣1元
      let pointWorth = Const.pointRatio;
      let limitPercent = _.div(pointConfig.maxDeductionRate, 100);
      //  积分使用最高限额
      let limitPrice = _.mul(totalPrice, limitPercent);

      // 如果积分价值设置了，则计算当前积分可以抵扣多少金额
      if (pointWorth != null) {
        // 当前订单值多少积分，比如订单金额为10元，10积分=1元，则buyPoint = 100积分
        let buyPoint = Math.floor(_.mul(limitPrice, Const.pointRatio));
        // 比较二方积分，以最少的为准
        if (buyPoint > mePoint) {
          maxPoint = mePoint;
        } else {
          maxPoint = buyPoint;
        }
      }
      await action.commonChange('main.points.maxPoint', maxPoint);
    },

    async _savaLocal() {
      const {
        main: {
          orderList: { invoiceData, address, dangaoShop },
          localData: { deliverType, confirmCoupon },
          openGroupon,
        },
      } = getData();
      console.log('invoiceData', invoiceData);
      //发票缓存
      await Taro.setStorageSync('mini::invoice', invoiceData);
      //优惠券缓存处理
      await action._couponLocal();
      //支付方式缓存处理
      await Taro.setStorageSync('mini::deliveryType', deliverType);
      //地址缓存
      await Taro.setStorageSync('mini::confirmAddress', address);
      //地址缓存
      await Taro.setStorageSync('mini::openGroupon', openGroupon);
      //选择门店缓存
      await Taro.setStorageSync(cache.MINI_CHOOSE_SHOP, dangaoShop);
    },

    //跳转页面
    async _urlChange(type: 0 | 1 | 2 | 3 | 4 | 5 | 6, param) {
      const {
        main: {
          orderList: { address },
        },
      } = getData();
      //线上支付不需要存
      if (type === 4) {
        await Taro.redirectTo({ url: `/pages/package-C/order/order-tool/${urlType[type]}/index?param=${param}` });
        return;
      }

      if (type === 5) {
        //单个商家商品点击进入商品详情页
        await Taro.navigateTo({ url: `/pages/package-B/goods/goods-details/index?skuId=${param.skuId}` });
        return;
      }
      if (type === 6) {
        // 校验是否需要完善地址
        if (address && address.deliveryAddressId) {
          let flag = await this.isTrueAddress(address);
          if (flag) return
        }
      }
      await action._savaLocal();
      await Taro.navigateTo({ url: `/pages/package-C/order/order-tool/${urlType[type]}/index?param=${param}` });
    },

    //优惠券缓存处理
    async _couponLocal() {
      const {
        main: {
          coupons,
          useStatus: { selectCoupon },
          stores,
          localData: { confirmCoupon },
        },
      } = getData();
      const storeIds = stores.map((item) => item.supplier.storeId);
      //查询优惠券的字段
      await Taro.setStorageSync('mini::orderCoupon', { coupons, selectCoupon, storeIds });
      //选中的优惠券
      await Taro.setStorageSync('mini::checkCoupon', confirmCoupon.checkCoupon);
      //优惠券折扣
      await Taro.setStorageSync('mini::confirmCoupon', confirmCoupon);
    },

    async _clearLocal() {
      await Taro.removeStorageSync('mini::deliveryType');
      await Taro.removeStorageSync('mini::confirmCoupon');
      await Taro.removeStorageSync('mini::orderCoupon');
      await Taro.removeStorageSync('mini::checkCoupon');
      await Taro.removeStorageSync('mini::invoice');
      // await Taro.removeStorageSync('mini::confirmAddress');
      await Taro.removeStorageSync('mini::openGroupon');
    },

    async _getLoacl() {
      const choose_shop = await Taro.getStorageSync(cache.MINI_CHOOSE_SHOP) || null;
      const deliverType = (await Taro.getStorageSync('mini::deliveryType')) || 0;
      const confirmCoupon = (await Taro.getStorageSync('mini::confirmCoupon')) || {};
      const checkCoupon = (await Taro.getStorageSync('mini::checkCoupon')) || {};
      const invoiceData = await Taro.getStorageSync('mini::invoice');
      let address = await Taro.getStorageSync('mini::confirmAddress');
      if (address && address.deliveryAddressId) {
        address.addressInfo = await addressInfo(address.provinceId, address.cityId, address.areaId, address.streetId);
      }
      const paths = [
        { paths: 'main.localData.deliverType', value: deliverType },
        { paths: 'main.localData.confirmCoupon', value: confirmCoupon },
        { paths: 'main.localData.checkCoupon', value: checkCoupon },
        { paths: 'main.orderList.address', value: address },
      ]
      if (invoiceData) paths.push({ paths: 'main.orderList.invoiceData', value: invoiceData })
      if (choose_shop) paths.push({ paths: 'main.orderList.dangaoShop', value: choose_shop })
      await action.commonChange(paths);

      // await action._clearLocal();
    },

    async _confirmMaskInit(e) {
      const mask = await action._getMasK(e.code, e.message);
      await action.commonChange('main.mask', mask);
    },

    // 校验是否是四级地址
    async isTrueAddress(address) {
      if (address) {
        const result = await api.platformAddressController.verifyAddress({
          provinceId: address.provinceId,
          cityId: address.cityId,
          areaId: address.areaId,
          streetId: address.streetId,
          longitude: address.longitude,
          latitude: address.latitude,
          dangaossAddrId: address.dangaossAddrId
        });
        if (result) {
          action.commonChange('main.visible', true);
          return true;
        }
      }
    },

    //提交订单
    async _submit(forceCommit) {
      const {
        main: {
          points: { usePoint },
          localData: {
            deliverType,
            confirmCoupon: { checkCoupon },
          },
          orderList: { enclosures, address, invoiceData, buyRemark, isVirtualGoods, dangaoDate, dangaoDeliverWay, dangaoPhone, dangaoShop, dangaoTime, dangaoDeliveryAmount, dangaoDeliveryText, dangaoDistributionRuleId, dangaoGreeting },
          stores,
          cityId: _cityId,
        },
      } = getData();

      if (!address.deliveryAddressId) {
        await action._showToast('请选择收货地址');
        return;
      }
      // 校验是否需要完善地址
      if (address && address.deliveryAddressId) {
        let flag = await this.isTrueAddress(address);
        if (flag) {
          return false;
        }
      }
      const deliver = [];
      for (let i = 0; i < stores.length; i++) {
        const tradeItems = stores[i].tradeItems || [];
        const storeId = stores[i].supplier.storeId;
        const gifts = stores[i].gifts || [];
        const all = [...tradeItems, ...gifts];
        for (let j = 0; j < all.length; j++) {
          const tradeItem = all[j];
          if (tradeItem.goodsType === 3) {
            if (tradeItem.deliveryDate === undefined) {
              await action._showToast('请选择配送日期');
              await action.commonChange('main.isLoading', false);
              return false;
            }
            if (!tradeItem.deliveryStartTime || !tradeItem.deliveryEndTime) {
              await action._showToast('请选择配送时间');
              await action.commonChange('main.isLoading', false);
              return false;
            }
            deliver.push({
              goodsInfoId: tradeItem.skuId,
              isGift: tradeItem.isGift,
              deliveryDate: tradeItem.deliveryDate,
              deliveryStartTime: tradeItem.deliveryStartTime,
              deliveryEndTime: tradeItem.deliveryEndTime,
            });
          }
          if (tradeItem.goodsType === 8) {
            const phone = dangaoPhone[storeId]
            if (!phone) {
              await action._showToast('请填写订货人手机号');
              action.commonChange('main.isLoading', false);
              return false
            } else if (!ValidConst.phone.test(phone)) {
              await action._showToast('请检查订货人手机号');
              action.commonChange('main.isLoading', false);
              return false;
            }
            if (dangaoDeliverWay[storeId] === undefined) {
              await action._showToast('请选择配送方式');
              action.commonChange('main.isLoading', false);
              return false
            }
            //自提
            if (dangaoDeliverWay[storeId] === 4 && !dangaoShop[storeId]) {
              await action._showToast('请选择门店');
              action.commonChange('main.isLoading', false);
              return false
            }
            if ([3, 4].includes(dangaoDeliverWay[storeId])) {
              if (!dangaoDate[storeId]) {
                await action._showToast('请选择日期');
                action.commonChange('main.isLoading', false);
                return false
              }
              if (!dangaoTime[storeId]) {
                await action._showToast('请选择时间');
                action.commonChange('main.isLoading', false);
                return false
              }
            }
          }
        }
      }

      const { provinceId, cityId, areaId, streetId, deliveryAddress, dangaossAddrId } = address;
      const addrDetail = (await addressInfo(provinceId, cityId, areaId, streetId)) + deliveryAddress;

      let storeCommitInfoList = [];
      await Promise.all(
        stores.map(async (o, i) => {
          const storeId = o.supplier.storeId,
            supplierId = o.supplier.supplierId;
          const thisInvoice = invoiceData[supplierId];
          const invoiceAddress = invoiceData[supplierId].invoiceAddress;
          const commonCheck = invoiceData[supplierId].commonCheck;
          //是否单独的收货地址
          const sperator = Boolean(thisInvoice.invoiceAddress && thisInvoice.invoiceAddress.deliveryAddressId);

          /* 本地存储的格式为 1:不需要发票 2:普通发票 3:增值发票 0:不支持发票
           开票类型，必传 0：普通发票 1：增值税专用发票 -1：无 */

          //若果为-2 置为-1
          const invoiceType = thisInvoice.supportInvoice - 2 === -2 ? -1 : thisInvoice.supportInvoice - 2;

          //店铺备注
          const remark = buyRemark[storeId] ? buyRemark[storeId] : '';

          //图片附件
          const enclosuresOrder = enclosures[storeId];
          const greetMap = o.tradeItems.reduce((cuur, item) => {
            if (item.isGreeting === 1) {
              cuur[item.skuId] = dangaoGreeting[`${o.supplier.storeId}_${item.skuId}`] || null
            }
            return cuur
          }, {})
          // 蛋糕叔叔
          const isDangaoss = Boolean(o.distributionRuleId)
          // 配送方式 2快递 3配送 4自提
          const dangaossDeliverWay = dangaoDeliverWay[storeId]
          let dangaossMap = {}
          if (isDangaoss) {
            //手机号
            const ordererPhone = dangaoPhone[storeId];
            //配送时间
            const dangaossDeliveryDate = dangaossDeliverWay === 3 ? dangaoDate[storeId] : null;
            const dangaossDeliveryTime = dangaossDeliverWay === 3 ? dangaoTime[storeId] : null;
            //自提时间
            const dangaossTakeDate = dangaossDeliverWay === 4 ? dangaoDate[storeId] : null;
            const dangaossTakeTime = dangaossDeliverWay === 4 ? dangaoTime[storeId] : null;
            //祝福语
            const greetingContentMap = greetMap
            // 快递配送描述
            const deliveryText = dangaossDeliverWay === 2 ? dangaoDeliveryText[storeId] : null
            //配送费
            const deliveryAmount = dangaossDeliverWay === 4 ? null : dangaoDeliveryAmount[storeId]
            //配送规则id
            const distributionRuleId = dangaoDistributionRuleId[storeId] || '-1'
            //门店名称
            const dangaossTakeShopName = dangaossDeliverWay === 4 ? dangaoShop[storeId].shop_name : null
            //门店id
            const dangaossTakeShopId = dangaossDeliverWay === 4 ? dangaoShop[storeId].shop_id : null
            //门店地址
            const dangaossTakeShopAddr = dangaossDeliverWay === 4 ? dangaoShop[storeId].address : null
            dangaossMap = {
              ordererPhone,
              dangaossDeliveryDate,
              dangaossDeliveryTime,
              dangaossTakeDate,
              dangaossTakeTime,
              dangaossTakeShopName,
              dangaossTakeShopId,
              dangaossTakeShopAddr,
              deliveryText,
              deliveryAmount,
              distributionRuleId,
              greetingContentMap,
            }
          }
          const invoiceAddrDetail = invoiceAddress
            ? (await addressInfo(
              invoiceAddress.provinceId,
              invoiceAddress.cityId,
              invoiceAddress.areaId,
              invoiceAddress.streetId || '',
            )) + invoiceAddress.deliveryAddress
            : '';
          storeCommitInfoList.push({
            storeId: o.supplier.storeId, // 店铺Id
            payType: deliverType, //支付类型，必传
            invoiceType,
            generalInvoice:
              invoiceType == 0
                ? {
                  flag: commonCheck.invoiceType, //0:个人 1:单位
                  title: commonCheck.invoiceTitle, //发票抬头
                  identification: commonCheck.invoiceIdentification, //纳税人识别号
                }
                : {}, //普通发票与增票参数至少一项必传
            specialInvoice:
              invoiceType == 1
                ? {
                  id: thisInvoice.customerInvoiceResponse.customerInvoiceId,
                }
                : {}, //增值税专用发票与普票至少一项必传
            specialInvoiceAddress: Boolean(invoiceAddress && thisInvoice.invoiceAddress.deliveryAddressId), //是否单独的收货地址
            invoiceAddressId:
              invoiceType !== -1 && sperator ? invoiceAddress.deliveryAddressId : address.deliveryAddressId, //发票的收货地址ID,必传

            invoiceAddressDetail: invoiceType !== -1 && sperator ? invoiceAddrDetail : deliveryAddress, //收货地址详细信息（不包含省市区）

            invoiceAddressUpdateTime:
              invoiceType !== -1 && sperator
                ? invoiceAddress && invoiceAddress.updateTime
                  ? moment(invoiceAddress.updateTime).format(Const.SECONDS_FORMAT)
                  : null
                : address && address.updateTime
                  ? moment(address.updateTime).format(Const.SECONDS_FORMAT)
                  : null,

            invoiceProjectId: invoiceType !== -1 ? commonCheck.invoiceProject : null, //开票项目id，必传
            invoiceProjectName: invoiceType !== -1 ? commonCheck.invoiceProjectName : '', //开票项目名称，必传

            invoiceProjectUpdateTime:
              invoiceAddress && invoiceAddress.projectUpdateTime
                ? moment(invoiceAddress.projectUpdateTime).format(Const.SECONDS_FORMAT)
                : null, //开票项目修改时间

            buyerRemark: remark, //订单备注
            encloses: enclosuresOrder ? enclosuresOrder.join(',') : '',
            ...dangaossMap,
            deliverWay: isVirtualGoods ? 0 : isDangaoss ? dangaossDeliverWay : 1, //配送方式，默认快递
            couponCodeId:
              checkCoupon && o.supplier.storeId === checkCoupon.storeId && checkCoupon.couponCodeId
                ? checkCoupon.couponCodeId
                : null, // 选择的店铺优惠券id
          });
        }),
      );

      const params: any = {
        cityId: _cityId,
        dangaossAddrId,
        consigneeId: address.deliveryAddressId,
        consigneeAddress: addrDetail,
        consigneeUpdateTime: address.updateTime ? moment(address.updateTime).format(Const.SECONDS_FORMAT) : null,
        storeCommitInfoList,
        commonCodeId:
          checkCoupon && checkCoupon.storeId === -1 && checkCoupon.couponCodeId ? checkCoupon.couponCodeId : null,
        orderSource: Taro.getEnv() === 'WEAPP' ? 'LITTLEPROGRAM' : 'WECHAT', // 需要校验营销活动,
        forceCommit,
        isFlashSaleGoods: true,
        goodsInfoDeliveryTimeList: deliver,
        //TODO shareUserId
        // shareUserId: getShareUserId()
      };
      if (_.sub(usePoint, 0) > 0) {
        params['points'] = usePoint;
      }
      const checkedGiftCards = Taro.getStorageSync('confirm:split:info')?.checkedGiftCards;
      params.giftCardTradeCommitVOList = checkedGiftCards;

      let context;
      try {
        context = await api.tradeBaseController.commit(params);
        let stringContext = JSON.stringify(context);
        // 0元订单直接支付
        const totalPrice = context.map((i) => i.price).reduce((a, b) => a + b, 0);
        if (stores[0].tradeItems[0].isFlashSaleGoods && stores[0].tradeItems[0].flashSaleGoodsId) {
          await api.flashSaleController.delFlashSaleGoodsQualifications({
            flashSaleGoodsId: stores[0].tradeItems[0].flashSaleGoodsId,
          });
        }
        if (totalPrice == 0) {
          // 0元订单且订单审核状态为不需要审核时直接跳转支付成功页
          let directPayFlag = context && context[0].tradeState.auditState == 'CHECKED';
          if (directPayFlag) {
            try {
              await api.payBaseController.defaultPayBatch({ tradeIds: context.map((item) => item.tid) });
              await Taro.redirectTo({
                url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
              });
              return;
            } catch (e) {
              await action._showToast(e.message);
            }
          }
        }

        let directPayFlag = true;
        if (deliverType === 0 && context && context.length > 0) {
          for (let i = 0; i < context.length; i++) {
            if (context[i].tradeState.auditState !== 'CHECKED' || context[i].paymentOrder !== 'PAY_FIRST') {
              directPayFlag = false;
              break;
            }
          }
          if (directPayFlag) {
            await action._clearLocal();
            await action._urlChange(4, JSON.stringify(context));
            return;
          }
        }
        //前面条件都不符合 因为开启了订单审核
        context.isExamine = true;
        await Taro.redirectTo({
          url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}&isExamine=true`,
        });
      } catch (e) {
        await action._confirmMaskInit(e);
      }
    },

    //错误提示框
    async _getMasK(code, message) {
      let mask = {};
      switch (code) {
        case 'K-999999':
          mask = {
            isOpen: true,
            title: '优惠失效提醒',
            content: message,
            confirmText: '重新下单',
            cancelText: '继续下单',
            onClose: async () => {
              await action.commonChange('main.mask.isOpen', false);
            },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await action._submit(true);
            },
          };
          break;
        case 'K-080301':
          mask = {
            isOpen: true,
            title: '',
            content: '很抱歉，商品已失效，请重新选择',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.switchTab({ url: '/pages/shop-cart/index' });
            },
          };
          break;
        case 'K-080302':
          mask = {
            isOpen: true,
            title: '',
            content: '很抱歉，商品已失效，请重新选择',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.switchTab({ url: '/pages/shop-cart/index' });
            },
          };
          break;
        case 'K-010208':
          mask = {
            isOpen: true,
            title: '',
            content: '当前积分不足',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.startPullDownRefresh;
              await actions(dispatch).actions.init();
            },
          };
          break;
        case 'K-080157':
        case 'K-050160':
          mask = {
            isOpen: true,
            title: '',
            content: message,
            confirmText: '确定',
            cancelText: '',
            onCancel: async () => { },
            onConfirm: async () => {
              code === 'K-080157' ? await this.getRestrictedGoodsList() : await this.getDangaossRestrictedGoodsList();
              action.commonChange('main.mask.isOpen', false);
            },
          };
          break;
        case 'K-130015':
          mask = {
            isOpen: true,
            title: '提示',
            content: message,
            confirmText: '确定',
            cancelText: '',
            onCancel: async () => { },
            onConfirm: async () => {
              Taro.setStorageSync(cache.MINI_CHOOSE_ADDRESS, true);
              action.commonChange('main.mask.isOpen', false);
              Taro.navigateTo({ url: '/pages/package-A/customer/receive-address/index?mode=1&localKey=confirmAddress' })
            },
          };
          break;
        default:
          mask = {
            isOpen: true,
            title: '',
            content: message,
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.switchTab({ url: '/pages/shop-cart/index' });
            },
          };
      }
      return mask;
    },

    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },

    //校验vop商品区域销售限制
    async _verifyPurchase() {
      const {
        orderList: { address },
      } = getData().main || {};
      if (!address.provinceId) {
        return;
      }
      await api.tradeBaseController.verifyPurchase({ addressId: address.deliveryAddressId });
    },
    updateTradeItem(value: any, id: string, isDay: boolean, isGift: boolean) {
      const stores = getData().main.stores;
      const k = isGift ? 'gifts' : 'tradeItems';
      const result = stores.map((e) => {
        return {
          ...e,
          [k]: e[k].map((el) => {
            if (el.skuId === id) {
              const val = {};
              if (isDay) val['deliveryDate'] = value;
              else {
                const [s, e] = value.split('-');
                val['deliveryStartTime'] = +s.split(':')[0];
                val['deliveryEndTime'] = +e.split(':')[0];
              }
              return {
                ...el,
                ...val,
              };
            }
            return el;
          }),
        };
      });
      action.commonChange([{ paths: 'main.stores', value: result }]);
    },
    // 计算商品实付均摊信息
    calcSplitInfo() {
      const { stores, price } = getData().main;
      const checkedGiftCards = Taro.getStorageSync('confirm:split:info')?.checkedGiftCards || [];

      // 1.构建初始信息
      const goodsInfos = [];
      stores.forEach((store) => {
        const storeInfo = {
          storeId: store?.supplier?.storeId,
          isSelf: store?.supplier?.isSelf,
          storeName: store?.supplier?.storeName,
        };
        store.tradeItems.forEach((item) => {
          goodsInfos.push({
            storeInfo,
            skuId: item.skuId,
            skuName: item.skuName,
            specDetails: item.specDetails,
            price: item.price,
            num: item.num,
            pic: item.pic,
            splitPrice: item.splitPrice,
          });
        });
      });

      // 4.计算礼品卡信息
      goodsInfos.forEach((item) => (item.pointSplitPrice = item.splitPrice));
      giftCard.calcSplitInfo(checkedGiftCards, goodsInfos);
      const cardUsed = checkedGiftCards.reduce((a, b) => _.add(a, b.deduction), 0);
      action.commonChange('main.giftCardPrice', cardUsed);

      // 5.存储数据
      Taro.setStorageSync('confirm:split:info', { goodsInfos, checkedGiftCards });
      action.commonChange('main.price.totalPrice', _.sub(price.totalPrice, cardUsed));
    },
    //获取限售的商品
    async getRestrictedGoodsList() {
      const {
        orderList: { address },
        stores
      } = getData().main;
      const goodsIdList = stores.map((e) => e.tradeItems.concat(e.gifts).map((el) => el.spuId)).flat()

      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: address.deliveryAddressId
      })
      const list = res.goodsRestrictedTemplateVOList
      const newStores = stores.map(item => {
        const newTradeItems = item.tradeItems.map((e) => {
          const goods = list.find((el) => el.goodsId === e.spuId)
          if (goods) {
            return { ...e, restrictedFlag: goods.restrictedFlag }
          } else {
            return e
          }
        })
        const newGifts = item.gifts.map((e) => {
          const goods = list.find((el) => el.goodsId === e.spuId)
          if (goods) {
            return { ...e, restrictedFlag: goods.restrictedFlag }
          } else {
            return e
          }
        })
        return { ...item, gifts: newGifts, tradeItems: newTradeItems }
      })
      console.log('newStores', newStores)
      action.commonChange('main.stores', newStores)
      // action.commonChange('main.goodsRestrictedTemplateVOList', list)
    },
    //获取蛋糕叔叔限售的商品
    async getDangaossRestrictedGoodsList() {
      const {
        orderList: { address },
        stores,
        cityId
      } = getData().main;
      const dangaossAddrId = address.dangaossAddrId
      const res = await api.tradeBaseController.getDangaossRestrictedByAddrId({
        cityId,
        dangaossAddrId
      });
      const list = res;
      const newStores = stores.map((item) => {
        const newItem = list.find(v => v.distributionRuleId === item.distributionRuleId)
        return { ...item, isDistribution: newItem.isDistribution };
      });
      action.commonChange('main.stores', newStores);
      // action.commonChange('main.goodsRestrictedTemplateVOList', list)
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderOrderConfirmMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
