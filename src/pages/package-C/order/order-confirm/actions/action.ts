import { Command } from '../constant';
import { Dispatch } from 'typings';
import * as lo from 'lodash';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { extraPathsValue } from '@/redux/util';
import { _, UploadImage, ValidConst, WMkit, msg, VAS, pvUvStatics, giftCard } from 'wmkit';
import { addressInfo } from '@/utils/location/area/area';
import { cache, Const } from 'config';
import moment from 'dayjs';
import actions from './index';
import { ICommitTradeCommitRequestReq } from 'api/TradeBaseController';
import { orderGoods } from 'api/IntelligentRecommendationController';
import { cloneDeep } from 'lodash';

const urlType = {
  0: 'order-delivery',
  1: 'order-coupon',
  2: 'order-invoice',
  3: 'order-sku-list',
  4: 'order-pay',
  6: 'choose-shop'// 自取门店
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
      const { stores = [] } = getData().main || {};
      const companyInfoIds = stores.map((m) => m.supplier.storeId);
      await action._invoiceSwitch(companyInfoIds);
    },

    //地址初始化
    async _addressInit() {
      const { stores = [] } = getData().main || {};
      const context = await api.customerDeliveryAddressBaseController.findAddressList();
      let address: any = {};
      let defaltAddress;
      if (context.length) {
        for (let i = 0; i < context.length; i++) {
          const item = context[i];
          // 省、市、区（县）、街道（乡）+ 详细地址
          item['addressInfo'] = _.getAddressInfoStr(item as any)
          if (item.isDefaltAddress != 0) {
            defaltAddress = item;
          }
        }
        //没有默认地址取第一个
        address = defaltAddress || context[0];
      }
      const selectAddr = Taro.getStorageSync('mini::confirmAddress');
      // const isDelete =
      //   selectAddr && context.findIndex((item) => item.deliveryAddressId === selectAddr.deliveryAddressId);
      if (
        selectAddr &&
        selectAddr.deliveryAddressId
      ) {
        // 是否有效
        const addr = context.find((item) => item.deliveryAddressId === selectAddr.deliveryAddressId);
        if (addr) {
          address = addr;
        }
      }
      // 校验是否需要完善地址
      if (address && address.deliveryAddressId) {
        //地址缓存
        Taro.setStorageSync('mini::confirmAddress', address);
        Taro.setStorageSync('mini::shopCardAddress', address);
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
        const newStores = stores.map((item) => {
          const newTradeItems = item.tradeItems.map((e) => {
            return { ...e, restrictedFlag: false };
          });
          const newGifts = item.gifts.map((e) => {
            return { ...e, restrictedFlag: false };
          });
          return { ...item, tradeItems: newTradeItems, gifts: newGifts };
        });
        action.commonChange('main.stores', newStores);
      }
      action.commonChange('main.orderList.address', address);
      //校验商品区域限制
      try {
        await action._verifyPurchase(address);
      } catch (e) {
        if (e.message) {
          await action._confirmMaskInit(e);
        }
      }
      return address;
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
          Taro.showModal({
            title: '',
            content: '请完善收货地址',
            showCancel: false,
            confirmText: '立即完善',
          }).then(async (res) => {
            if (res.confirm) {
              Taro.navigateTo({
                url: `/pages/package-A/customer/receive-address-edit/index?addressId=${address.deliveryAddressId}&mode=1&localKey=${'confirmAddress'}`,
              });
            }
          });
          return true;
        }
      }
    },

    //库存初始化
    async _stockInit() {
      const { stores = [] } = getData().main || {};
      if (stores.length < 1) {
        return;
      }

      let skuId = stores[0].tradeItems[0].skuId;
      const res = await api.goodsInfoBaseController.listByIds({ goodsInfoIds: [skuId] });
      await action.commonChange('main.stock', res.goodsInfos[0].stock);
    },
    async calcDangaoShushuFreight(val: number) {
      const t1 = getData().main.price.totalDeliveryPrice
      action.commonChange('main.price.totalDeliveryPrice', _.add(val, t1))
    },
    //计算运费
    async _calcFreight(fee: number = 0) {
      const {
        stores = [],
        orderList: { address, isVirtualGoods },
        // points: {usePoint},
        localData: {
          confirmCoupon: { checkGoodsInfos, checkCoupon, checkCouponStore },
        },
        grouponFreeDelivery,
        userGiftCardId
      } = getData().main || {};
      if (!address.provinceId || stores.length === 0) {
        return;
      }
      const newStores = cloneDeep(stores);

      // // 计算积分抵扣金额
      // const pointsPrice = _.div(usePoint, Const.pointRatio);
      const consignee = {
        provinceId: address.provinceId,
        cityId: address.cityId,
        areaId: address?.areaId,
        streetId: address?.streetId,
      };
      const tradeParams = newStores.map((st, i) => {
        const amountList = st.discountsPrice;
        let amountTotal = 0;
        if (amountList && amountList.length) {
          amountTotal = amountList.reduce((a, b) => _.add(a, b.amount), 0);
        }
        if ((checkCoupon && checkCoupon.couponCodeId) || (checkCouponStore && checkCouponStore.couponCodeId)) {
          st.tradeItems =
            st &&
            st.tradeItems.map((sku) => {
              const checkGoodsInfo = checkGoodsInfos.find((item) => item.goodsInfoId == sku.skuId);
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
          deliverWay: isVirtualGoods ? 0 : 1,
          tradePrice: {
            totalPrice: _.sub(st.tradePrice.goodsPrice, amountTotal),
          }, //配送方式 0：其他   1：快递
          oldTradeItems: st.tradeItems,
          oldGifts: st.gifts ? st.gifts : [],
          userGiftCardId
        };
      });

      let context = await api.tradeBaseController.getFreight(tradeParams);
      //如果拼团活动是包邮活动
      if (grouponFreeDelivery) {
        context.map((item) => (item.deliveryPrice = 0));
      }
      await action._changeDeliverFee(context, fee);
    },

    // 修改各店铺运费/应付金额,修改所有订单总运费/总应付金额
    async _changeDeliverFee(freightList, fee: number = 0) {
      const { stores = [], price = {}, giftCardType, orderList: { dangaoDeliveryAmount } } = getData().main || {};
      // 已经产生的运费
      const dangaoDeliveryPrice = stores.reduce((cuur, item) => {
        const { supplier: { _storeId } } = item
        const fee = dangaoDeliveryAmount[_storeId] || 0
        cuur += fee
        return cuur
      }, 0)

      // 提货卡不计算运费
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

      const paths = [
        { paths: 'main.stores', value: stores },
        { paths: 'main.price.totalPrice', value: totalPrice },
        { paths: 'main.price.totalDeliveryPrice', value: totalDeliveryPrice },
      ];
      if (giftCardType !== 1) {
        paths.push({ paths: 'main.price.totalPrice', value: totalPrice });
      }
      action.commonChange(paths);
    },

    //上传图片
    async _chooseImage(storeId) {
      //选择图片后 会触发didshow函数
      //图片大小不能超过5M
      const FILE_MAX_SIZE = 500 * 1024 * 10;
      await action._savaLocal();
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
    _orderKaGuanZhiChongNumberChange(storeId, val) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.orderList.kaGuanZhiChong',
          value: (kaGuanZhiChong) => {
            kaGuanZhiChong[storeId] = val;
          },
        },
      });
    },
    //蛋糕叔叔表单修改
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
    //查询发票和线下支付开关并初始化
    async _invoiceSwitch(companyInfoIds) {
      const { stores = [] } = getData().main || {};

      const context = companyInfoIds.length
        ? await api.invoiceProjectBaseController.queryProjectSwitchByIds({ companyInfoIds })
        : [];
      const offlinePaySetting = await api.PaySettingConfigController.getOfflinePaySetting();
      const invoiceData = context.reduce((a, { companyInfoId, supportInvoice }, index) => {
        const skuId = stores[index].tradeItems[0].skuId;
        a[companyInfoId.toString() + '_' + skuId] = {
          supportInvoice,
          commonCheck: {
            invoiceProject: '',
            invoiceProjectName: '',
          },
        };
        return a;
      }, {});
      // 在线支付方式永远可以选择
      let payWay = [{ id: 0, name: '在线支付' }];
      offlinePaySetting.status === 1 && payWay.push({ id: 1, name: '线下支付' });
      console.log('invoiceData', invoiceData)
      action.commonChange('main.orderList.invoiceData', invoiceData);
      action.commonChange('main.offlineStatus', offlinePaySetting.status);
      action.commonChange('main.payWay', payWay);
      // 线下支付关闭时 设置显示为在线支付
      // offlinePaySetting.status === 0 && await Taro.setStorageSync('mini::deliveryType', 0);
    },

    //积分初始化
    async _pointInit() {
      Promise.all([
        await api.customerBaseController.getPointsAvailable(),
        await api.systemPointsConfigController.simplify(),
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
          points: { totalPoint, pointConfig, usePoint },
          localData: { confirmCoupon },
        },
      } = getData();
      let totalPrice = _.sub(_.sub(goodsTotalPrice, discountsTotalPrice), confirmCoupon.couponTotalPrice || 0);
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
        if (usePoint > maxPoint) {
          await action.commonChange([
            { paths: 'main.points.usePoint', value: 0 },
            { paths: 'main.points.showPointInput', value: false },
          ]);
        }
      }
      await action.commonChange('main.points.maxPoint', maxPoint);
    },
    async _savaLocal(hide?: boolean) {
      const {
        main: {
          orderList: { invoiceData, address, dangaoShop },
          localData: { deliverType, confirmCoupon },
          openGroupon,
        },
      } = getData();
      // 点击切换地址时invoiceData 有值，触发hide时没有值了？？？
      //发票缓存
      await Taro.setStorageSync('mini::invoice', invoiceData || {});
      //优惠券缓存处理
      await action._couponLocal();
      //支付方式缓存处理
      await Taro.setStorageSync('mini::deliveryType', deliverType);
      //地址缓存
      await Taro.setStorageSync('mini::confirmAddress', address);
      await Taro.setStorageSync('mini::shopCardAddress', address);
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
        await Taro.redirectTo({
          url: `/pages/package-C/order/order-tool/${urlType[type]}/index?param=${encodeURIComponent(param)}`,
        });
        return;
      }
      if (type === 5) {
        // 小c通过小B的店铺内分享链接进来购买的分销商品
        if (
          WMkit.inviteeId() &&
          !WMkit.isDistributorFlag() &&
          WMkit.channelType() == '2' &&
          param.distributionGoodsAudit == '2'
        ) {
          Taro.navigateTo({
            url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${param.spuId
              }&skuId=${param.skuId}`,
          });
        } else {
          const goodsType = param.goodsType
          if (goodsType === 6) {
            await Taro.navigateTo({ url: `/pages/package-F/cards/details/index?id=${param.skuId}&type=coupon` })
          } else if (goodsType === 7) {
            await Taro.navigateTo({ url: `/pages/package-F/cards/details/index?id=${param.skuId}&type=zhichong` })
          } else {
            //单个商家商品点击进入商品详情页
            await Taro.navigateTo({ url: `/pages/package-B/goods/goods-details/index?skuId=${param.skuId}` });
          }
        }
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
      await Taro.navigateTo({
        url: `/pages/package-C/order/order-tool/${urlType[type]}/index?param=${encodeURIComponent(param)}`,
      });
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
      const storeIds = stores && stores.map((item) => item.supplier.storeId);
      //查询优惠券的字段
      await Taro.setStorageSync('mini::orderCoupon', { coupons, selectCoupon, storeIds });
      await Taro.setStorageSync('mini::checkCoupon', confirmCoupon.checkCoupon);
      await Taro.setStorageSync('mini::checkCouponStore', confirmCoupon.checkCouponStore);
      //优惠券折扣
      await Taro.setStorageSync('mini::confirmCoupon', confirmCoupon);
    },

    async _clearLocal() {
      await Taro.removeStorageSync('mini::deliveryType');
      await Taro.removeStorageSync('mini::confirmCoupon');
      await Taro.removeStorageSync('mini::orderCoupon');
      await Taro.removeStorageSync('mini::checkCoupon');
      await Taro.removeStorageSync('mini::checkCouponStore');
      await Taro.removeStorageSync('mini::invoice');
      // await Taro.removeStorageSync('mini::confirmAddress');
      await Taro.removeStorageSync('mini::openGroupon');
      Taro.removeStorageSync(cache.MINI_CHOOSE_SHOP);
    },

    async _getLoacl() {
      const choose_shop = await Taro.getStorageSync(cache.MINI_CHOOSE_SHOP) || null;
      const deliverType = await Taro.getStorageSync('mini::deliveryType') || 0;
      const confirmCoupon = (await Taro.getStorageSync('mini::confirmCoupon')) || {};
      const checkCoupon = (await Taro.getStorageSync('mini::checkCoupon')) || {};
      const checkCouponStore = (await Taro.getStorageSync('mini::checkCouponStore')) || {};
      const invoiceData = await Taro.getStorageSync('mini::invoice');
      let address = await Taro.getStorageSync('mini::confirmAddress');
      if (address && address.deliveryAddressId) {
        address['addressInfo'] = _.getAddressInfoStr(address as any)
        // address.addressInfo = await addressInfo(address.provinceId, address.cityId, address.areaId, address.streetId);
        await action.commonChange([{ paths: 'main.orderList.address', value: address }]);
      }
      const paths = [
        { paths: 'main.localData.deliverType', value: deliverType },
        { paths: 'main.localData.confirmCoupon', value: confirmCoupon },
        {
          paths: 'main.price.totalCommission',
          value:
            confirmCoupon.commission === undefined ? getData().main?.price?.totalCommission : confirmCoupon.commission,
        },
        { paths: 'main.localData.checkCoupon', value: checkCoupon },
        { paths: 'main.localData.checkCouponStore', value: checkCouponStore },
      ]
      if (invoiceData) paths.push({ paths: 'main.orderList.invoiceData', value: invoiceData })
      if (choose_shop) paths.push({ paths: 'main.orderList.dangaoShop', value: choose_shop })
      await action.commonChange(paths);

      //如果选择了优惠券并且抵扣之后的金额大于订单支付最大金额(不包括运送费)
      let { price } = getData().main;
      if (
        confirmCoupon &&
        _.sub(confirmCoupon.couponTotalPrice, _.sub(price.totalPrice, price.totalDeliveryPrice)) > 0
      ) {
        await action.commonChange([
          { paths: 'main.points.showPointInput', value: false },
          { paths: 'main.points.usePoint', value: 0 },
        ]);
      }
      // await action._clearLocal();
    },

    //查询佣金
    async getCommission(value) {
      const {
        main: {
          localData: {
            confirmCoupon: { checkCoupon, checkCouponStore },
          },
          giftCardType,
        },
      } = getData() || {};

      if (giftCardType === 1) return;
      const { commission } = await api.couponCodeBaseController.checkoutCoupons({
        couponCodeIds: [
          checkCoupon && checkCoupon.couponCodeId ? checkCoupon.couponCodeId : null,
          checkCouponStore && checkCouponStore.couponCodeId ? checkCouponStore.couponCodeId : null,
        ],
        points: Number(value),
      });
      await action.commonChange([{ paths: 'main.price.totalCommission', value: commission }]);
    },

    async _confirmMaskInit(e) {
      const mask = await action._getMasK(e.code, e.message);
      await action.commonChange('main.mask', mask);
    },

    //提交订单
    async _submit(forceCommit) {
      //Taro.showLoading();
      await action.commonChange('main.isLoading', true);
      const {
        main: {
          points: { usePoint },
          localData: {
            deliverType,
            confirmCoupon: { checkCoupon, checkCouponStore },
          },
          orderList: { kaGuanZhiChong, enclosures, address, invoiceData, buyRemark, isVirtualGoods, dangaoDate, dangaoGreeting, dangaoPhone, dangaoShop, dangaoTime, dangaoDeliverWay, dangaoDeliveryAmount, dangaoDeliveryText, dangaoDistributionRuleId },
          stores,
          isBookingSaleGoods,
          tailNoticeMobile,
          isCommit,
          storeBagsFlag,
          userGiftCardId,
          kaGuanZhiChongNumber,
          cityId: _cityId,
        },
      } = getData() || {};
      const deliver = [];
      for (let i = 0; i < stores.length; i++) {
        const isDistribution = stores[i].isDistribution;
        if (isDistribution === 0) {
          await action.showMessage('当前地区不支持销售，可更换收货地址购买');
          await action.commonChange('main.isLoading', false);
          return
        }
        const tradeItems = stores[i].tradeItems || [];
        const storeId = stores[i].supplier._storeId;
        const gifts = stores[i].gifts || [];
        const all = [...tradeItems, ...gifts];
        for (let j = 0; j < all.length; j++) {
          const tradeItem = all[j];
          if (tradeItem.goodsType === 3) {
            if (tradeItem.deliveryDate === undefined) {
              await action.showMessage('请选择配送日期');
              await action.commonChange('main.isLoading', false);
              return false;
            }
            if (
              [undefined, null, ''].includes(tradeItem.deliveryStartTime) ||
              [undefined, null, ''].includes(tradeItem.deliveryEndTime)
            ) {
              await action.showMessage('请选择配送时间段');
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
              await action.showMessage('请填写订货人手机号');
              action.commonChange('main.isLoading', false);
              return false
            } else if (!ValidConst.phone.test(phone)) {
              await action.showMessage('请检查订货人手机号');
              action.commonChange('main.isLoading', false);
              return false;
            }
            if (dangaoDeliverWay[storeId] === undefined) {
              await action.showMessage('请选择配送方式');
              action.commonChange('main.isLoading', false);
              return false
            }
            //自提
            if (dangaoDeliverWay[storeId] === 4 && !dangaoShop[storeId]) {
              await action.showMessage('请选择门店');
              action.commonChange('main.isLoading', false);
              return false
            }
            if ([3, 4].includes(dangaoDeliverWay[storeId])) {
              if (!dangaoDate[storeId]) {
                await action.showMessage('请选择日期');
                action.commonChange('main.isLoading', false);
                return false
              }
              if (!dangaoTime[storeId]) {
                await action.showMessage('请选择时间');
                action.commonChange('main.isLoading', false);
                return false
              }
            }
          }
          if (tradeItem.goodsType === 6 && !kaGuanZhiChongNumber) {
            // 直冲
            const accountType = tradeItem.accountType ?? 0
            const value = kaGuanZhiChong[storeId]
            if (!value) {
              Taro.showToast({ title: '请输入充值号码', icon: 'none', duration: 2000 })
              action.commonChange('main.isLoading', false);
              return false
            }
            if (accountType != 0) {
              const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
              const regexQQ = /^[1-9]{1}[0-9]{4,9}$/;
              const reg = accountType == 1 ? regexTel : regexQQ
              if (!reg.test(value)) {
                Taro.showToast({ title: `请输入正确的${accountType == 1 ? '手机号' : 'QQ号'}`, icon: 'none', duration: 2000 })
                action.commonChange('main.isLoading', false);
                return false
              }
            }
          }
        }
      }

      // 是不是卡管卡券商品
      const isCouponOrZhichongGoods = stores?.map(e => e.tradeItems).flat().some(e => (e.goodsType === 7 || e.goodsType === 6))
      if (!isCouponOrZhichongGoods) {
        if (!address || !address.deliveryAddressId) {
          await action.showMessage('请选择收货地址');
          await action.commonChange('main.isLoading', false);
          return false;
        }
      }

      if (isBookingSaleGoods && !tailNoticeMobile) {
        await action.showMessage('请填写尾款手机号');
        await action.commonChange('main.isLoading', false);
        return false;
      }

      if (isBookingSaleGoods && !ValidConst.phone.test(tailNoticeMobile)) {
        await action.showMessage('请检查尾款手机号');
        await action.commonChange('main.isLoading', false);
        return false;
      }

      if (isBookingSaleGoods && !isCommit) {
        await action.showMessage('请同意支付定金');
        await action.commonChange('main.isLoading', false);
        return false;
      }
      const { provinceId, cityId, houseNum, areaId, streetId, deliveryAddress, dangaossAddrId } = address;
      const addrDetail = houseNum ? deliveryAddress : (await addressInfo(provinceId, cityId, areaId, streetId)) + deliveryAddress;
      let storeCommitInfoList = [];
      await Promise.all(
        stores.map(async (o, i) => {
          const storeId = o.supplier._storeId,
            supplierId = o.supplier.supplierId;
          const thisInvoice = invoiceData[supplierId];
          const invoiceAddress = invoiceData[supplierId]?.invoiceAddress;
          const commonCheck = invoiceData[supplierId]?.commonCheck;
          //是否单独的收货地址
          const sperator = Boolean(thisInvoice && thisInvoice.invoiceAddress && thisInvoice.invoiceAddress.deliveryAddressId);

          /* 本地存储的格式为 1:不需要发票 2:普通发票 3:增值发票 0:不支持发票
           开票类型，必传 0：普通发票 1：增值税专用发票 -1：无 */

          //若果为-2 置为-1
          const invoiceType = (thisInvoice?.supportInvoice || 0) - 2 === -2 ? -1 : thisInvoice.supportInvoice - 2;

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
            ...dangaossMap,
            buyerRemark: remark, //订单备注
            encloses: enclosuresOrder ? enclosuresOrder.join(',') : '',
            deliverWay: isVirtualGoods ? 0 : isDangaoss ? dangaossDeliverWay : 1, //配送方式，默认快递
            couponCodeId:
              checkCoupon && o.supplier.storeId === checkCoupon.storeId && checkCoupon.couponCodeId
                ? checkCoupon.couponCodeId
                : null, // 选择的店铺优惠券id
          });
        }),
      );
      const shareUserId = WMkit.shareUserId();
      const inviteeId = Taro.getStorageSync(cache.INVITEE_ID);
      const params: ICommitTradeCommitRequestReq = {
        cityId: _cityId,
        dangaossAddrId,
        consigneeId: address.deliveryAddressId,
        consigneeAddress: addrDetail,
        consigneeUpdateTime: address.updateTime ? moment(address.updateTime).format(Const.SECONDS_FORMAT) : null,
        storeCommitInfoList,
        commonCodeId:
          checkCouponStore && checkCouponStore.storeId === -1 && checkCouponStore.couponCodeId
            ? checkCouponStore.couponCodeId
            : null,
        orderSource: Taro.getEnv() === 'WEAPP' ? 'LITTLEPROGRAM' : 'WECHAT', // 需要校验营销活动
        forceCommit,
        //TODO shareUserId
        shareUserId: shareUserId || inviteeId,
        isBookingSaleGoods,
        tailNoticeMobile,
        goodsInfoDeliveryTimeList: deliver,
      };

      if (_.sub(usePoint, 0) > 0) {
        params['points'] = usePoint;
      }
      const checkedGiftCards = Taro.getStorageSync('confirm:split:info')?.checkedGiftCards || [];
      checkedGiftCards?.forEach((card) => {
        card.usePrice = card.deduction;
        if (!userGiftCardId) {
          card.isCommitUse = true;
        }
      });

      params.giftCardTradeCommitVOList = checkedGiftCards.map(v => {
        return {
          ...v,
          skuIdList: v.skuIdList.filter(e => !e.includes('mock'))
        }
      });
      let context;
      const list = stores.map(e => e.tradeItems).flat()
      const isCouponGoods = list.some(e => e.goodsType == 7)
      const isZhiChongoods = list.some(e => e.goodsType == 6)
      if (isCouponGoods || isZhiChongoods) {
        const id = stores[0].supplier._storeId
        const kaGuanZhiChongNum = kaGuanZhiChong[id]
        console.log(kaGuanZhiChongNum, 'kaGuanZhiChongNum')
        params.consigneeId = null
        params.kaGuanGoodsCommit = true
        if (isZhiChongoods) {
          params.kaGuanZhiChongNumber = kaGuanZhiChongNumber || kaGuanZhiChongNum
        }
      }
      try {
        context = await api.tradeBaseController.commit(params);
        let stringContext = encodeURIComponent(JSON.stringify(context));
        const { recommendType, pitType } = getCurrentInstance().router.params || {};
        if (pitType) {
          let recommendSwitch = await VAS.checkRecommendAuth();
          if (recommendSwitch) {
            pvUvStatics.buriedPoint({
              goodsId: stores[0]?.tradeItems[0]?.spuId,
              recommendType,
              type: pitType,
              eventType: 3, //0：浏览，1：点击，2：加购，3：下单
              orderType: 0, //0：立即购买下单；1：普通下单
              orderId: context && context[0]?.tid,
            });
          }
        } else {
          let _params = [];
          // 取customerId
          const customerId = pvUvStatics.getSendId();
          //遍历订单
          context?.map((item, index) => {
            //取订单id
            const orderId = item.tid;
            //取商品idlist
            let goodsIds = [];
            stores[index]?.tradeItems.forEach((e) => {
              goodsIds.push(e.spuId);
            });

            //编辑参数
            const data = {
              customerId: customerId,
              goodsIds: goodsIds,
              orderId: orderId,
              orderType: 1, //0：立即购买下单；1：普通下单
              eventType: 3, //0：浏览，1：点击，2：加购，3：下单
            };
            _params.push(data);
          });
          let recommendSwitch = await VAS.checkRecommendAuth();
          if (recommendSwitch) {
            await orderGoods({ orderGoodsLis: _params });
          }
        }
        // 如果是分销小店下单，刷新小店购物车
        if (WMkit.isShop()) {
          msg.emit('shopCart-C');
          const num = await api.purchaseBaseController.countGoods();
          msg.emit('shopCart-C-num', num);
        }

        //如果购买的是开店礼包，则更新底部tab
        if (storeBagsFlag) {
          WMkit.changeTabBarText();
        }

        // 0元订单直接支付
        const totalPrice = context.map((i) => i.price).reduce((a, b) => a + b, 0);
        // debugger
        if (totalPrice == 0) {
          // 0元订单且订单审核状态为不需要审核时直接跳转支付成功页
          let directPayFlag = context && context[0].tradeState.auditState == 'CHECKED';
          if (directPayFlag) {
            try {
              await api.payBaseController.defaultPayBatch({ tradeIds: context.map((item) => item.tid) });
              if (isBookingSaleGoods) {
                await Taro.redirectTo({
                  url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
                  // url: '/pages/package-C/order/order-list/index',
                });
              } else {
                await Taro.redirectTo({
                  url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
                  // url: '/pages/package-C/order/order-list/index',
                });
              }
              return;
            } catch (e) {
              // 外层有catch统一处理异常，这边去掉
              // await action.showMessage(e.message);
            }
          }
        }

        let directPayFlag = true;
        let isExamine = 0;
        // 当选择在线支付，且每个单子都为已审核、先款后货时，进行合并支付
        if (deliverType === 0 && context && context.length > 0) {
          const checked = context.every((res) => res.tradeState.auditState === 'CHECKED');
          if (checked) {
            isExamine = 2;
          }
          for (let i = 0; i < context.length; i++) {
            if (context[i].tradeState.auditState !== 'CHECKED' || context[i].paymentOrder !== 'PAY_FIRST') {
              directPayFlag = false;
              break;
            }
          }
          if (directPayFlag || context[0].isBookingSaleGoods) {
            // 是否是预售
            context.isBookingSaleGoods = context[0].isBookingSaleGoods;
            await action._clearLocal();
            await action._urlChange(4, JSON.stringify(context));
            return;
          }
        }

        if (deliverType === 1 && context && context.length > 0) {
          const i = context.filter((i) => i.tradeState.auditState !== 'CHECKED').length;
          if (i === 0) {
            isExamine = 1;
          }
        }
        Taro.removeStorageSync('confirm:split:info');
        await Taro.redirectTo({
          url: `/pages/package-C/order/order-tool/order-success/index?param=${stringContext}`,
        });
      } catch (e) {
        await action._confirmMaskInit(e);
      }
    },

    //错误提示框
    async _getMasK(code, message) {
      let mask = {};
      if (code !== 'K-999997') {
        switch (code) {
          case 'K-999999':
            mask = {
              isOpen: true,
              title: '优惠失效提醒',
              content: message,
              confirmText: '继续下单',
              cancelText: '重新下单',
              onCancel: async () => {
                await action.commonChange('main.mask.isOpen', false);
                await Taro.switchTab({ url: '/pages/shop-cart/index' });
              },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                await action._submit(true);
              },
            };
            break;
          case 'K-050205':
            mask = {
              isOpen: true,
              title: '商品失效提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                Taro.navigateBack();
              },
            };
            break;
          case 'K-050117':
            mask = {
              isOpen: true,
              title: '商品失效提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: () => {
                action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-091602':
            mask = {
              isOpen: true,
              title: '',
              content: '支持的支付方式发生了变化，请重新选择！',
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.offlineStatus', 0);
                await action.commonChange('main.localData.deliverType', 0);
                await action.commonChange('main.mask.isOpen', false);
              },
            };
            break;
          case 'K-180001':
            mask = {
              isOpen: true,
              title: '提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-080301':
            mask = {
              isOpen: true,
              title: '商品失效提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-080302':
            mask = {
              isOpen: true,
              title: '商品失效提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-050317':
            mask = {
              isOpen: true,
              title: '',
              content: '您的积分不足，无法操作',
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: () => this._handleAtModal(),
              onClose: () => this._handleAtModal(),
            };
            break;
          case 'K-010208':
            mask = {
              isOpen: true,
              title: '',
              content: '当前积分不足',
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', false);
                await Taro.startPullDownRefresh;
                await actions(dispatch).actions.init();
              },
            };
            break;
          case 'storeBagsFlag':
            mask = {
              isOpen: true,
              title: '商品失效提醒',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
                if (singerCardLogin) {
                  Taro.redirectTo({
                    url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${LOGIN_DATA.userGiftCardId}&preview=false`,
                  });
                } else {
                  // await Taro.switchTab({url: '/pages/index/index'});
                  Taro.navigateBack();
                }
              },
            };
            break;
          case 'K-130013':
            mask = {
              isOpen: true,
              title: '',
              content: '很抱歉，' + message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: () => {
                action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-050116':
            mask = {
              isOpen: true,
              title: '',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
              },
            };
            break;
          case 'K-600019':
            mask = {
              isOpen: true,
              title: '',
              content: message,
              confirmText: '确定',
              cancelText: '',
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                await Taro.navigateBack({ delta: 1 });
              },
            };
            break;
          case 'K-050144':
            mask = {
              isOpen: true,
              title: '提醒',
              content: message,
              confirmText: '返回购物车',
              cancelText: '更改收货地址',
              onCancel: async () => {
                await action.commonChange('main.mask.isOpen', false);
                await Taro.switchTab({
                  url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'confirmAddress'}`,
                });
              },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', false);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                Taro.navigateBack();
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
          case 'K-010015':
            mask = { isOpen: false };
            // [您的账号已被禁用] 不进行重复提示
            break;
          case 'K-999995':
            mask = { isOpen: false };
            WMkit.clearLoginCache();
            setTimeout(() => {
              Taro.navigateTo({
                url: '/pages/package-A/login/login/index',
              });
            }, 1000);
            // [暂无访问商城权限，请退出后重新登录！] 不进行重复提示
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
              onCancel: async () => { },
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', true);
                // await Taro.switchTab({url: '/pages/shop-cart/index'});
                await Taro.navigateBack({ delta: 1 });
              },
            };
        }
        //Taro.hideLoading();
        await action.commonChange('main.isLoading', false);
      } else {
        mask = getData().main?.mask;
      }
      return mask;
    },

    async showMessage(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },

    //修改SKU的数量
    async _changeSkuNum(skuId, skuNum) {
      try {
        var {
          totalPrice,
          goodsTotalPrice,
          discountsTotalPrice,
          storeBagsFlag,
          tradeConfirmItems,
          couponCodes,
          grouponFreeDelivery,
          openGroupon,
          totalBuyPoint,
        } = await api.tradeBaseController.modifyGoodsNumForConfirm({ goodsInfoId: skuId, buyCount: skuNum });
        var canPayOnLine = await api.payBaseController.queryGatewayIsOpen('H5');
        //地址初始化
        var address = await action._addressInit();
      } catch (e) {
        if (e.message) {
          action._confirmMaskInit(e);
        }
        return;
      }
      let payWay;
      let deliverType;
      if (canPayOnLine) {
        payWay = [
          { id: 0, name: '在线支付' },
          { id: 1, name: '线下支付' },
        ];
        deliverType = 0;
      } else {
        payWay = [{ id: 1, name: '线下支付' }];
        deliverType = 1;
      }
      if (openGroupon != null) {
        payWay = [{ id: 0, name: '在线支付' }];
        deliverType = 0;
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            stores: tradeConfirmItems,
            orderList: {
              //地址相关数据
              address: address,
              //订单备注
              buyRemark: {},
              //附件图片
              enclosures: {},
              kaGuanZhiChong: {}
            },
            coupons: couponCodes,
            price: {
              totalPrice,
              goodsTotalPrice,
              discountsTotalPrice,
              totalDeliveryPrice: 0,
              couponTotalPrice: 0,
              pointTotalPrice: 0,
              totalBuyPoint,
            },
            grouponFreeDelivery: grouponFreeDelivery,
            openGroupon: openGroupon,
            payWay: payWay,
            localData: {
              deliverType: deliverType,
              confirmCoupon: {
                unreachedIds: [],
                couponTotalPrice: 0,
                checkGoodsInfos: {},
                checkCoupon: {},
                checkCouponStore: {},
              },
            },
          },
        },
      });

      //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
      await action._switchInit();
      //算运费
      await action._calcFreight();
      //积分初始化
      await action._pointInit();
    },

    //校验sku数量 规则如下, 少于限订 更新限订 大于起订跟库存，显示起订跟库存
    _validSku(sku, checkSku) {
      if (!checkSku.includes(sku.goodsInfoId)) {
        return '';
      }
      let msgArray = [];
      const skuNum = sku.buyCount;
      const min = sku.count || 0;
      const max = sku.maxCount || Infinity;
      const stock = sku.stock;

      if (min && skuNum < min) {
        msgArray.push(`${min}起订`);
      }
      //当大于起订跟库存 去起订跟库存最小值
      if ((max && skuNum > max) || skuNum >= stock) {
        const maxNum = Math.min(max, stock);
        if (maxNum === max) {
          msgArray.push(`限订${maxNum}`);
        } else {
          msgArray.push(`库存${stock}`);
        }
      }

      return msgArray.length > 0 ? msgArray.join('|') : '';
    },

    //获取领取赠品列表
    async _getMarketingById(params, storeId = null) {
      const { marketingId, marketingLevelId } = params;
      const {
        stores = [],
        gifts: { selectedMarketingGifts },
      } = getData().main || {};
      try {
        const res = await api.marketingFullGiftController.getGiftByMarketingIdForOrder(0, marketingId);
        await action.commonChange('main.gifts.fullGiftLevelList', res);
        //匹配当前店铺信息
        const currentStore = stores?.find((v) => v?.supplier?.storeId == storeId);
        if (res.levelList && res.levelList.length > 0) {
          let selectedMarketingGiftsState = [];
          res.levelList.forEach((item) => {
            if (item.giftType == 0) {
              item.fullGiftDetailList.forEach((detail, key) => {
                const goodsInfo = res.giftList.find((_item) => _item.goodsInfoId == detail.productId);
                const productNum = detail.productNum;
                const { gifts } = currentStore || {};
                if (gifts && gifts.length > 0) {
                  gifts.forEach((gift) => {
                    if (
                      gift.marketingIds.indexOf(detail.marketingId) > -1 &&
                      gift.marketingLevelIds.indexOf(detail.giftLevelId) > -1 &&
                      gift.skuId === detail.productId
                    ) {
                      selectedMarketingGiftsState.push({
                        marketingId: detail.marketingId,
                        giftDetailId: detail.giftDetailId,
                        giftLevelId: detail.giftLevelId,
                        goodsInfoId: detail.productId,
                        storeId: goodsInfo.storeId,
                        goodsNum: productNum,
                      });
                    }
                  });
                }
              });
            } else if (item.giftType == 1) {
              item.fullGiftDetailList.forEach((detail, key) => {
                const goodsInfo = res.giftList.find((_item) => _item.goodsInfoId == detail.productId);
                const productNum = detail.productNum;
                //获取订单商品对应的赠品数据
                const { gifts } = currentStore || {};

                if (gifts && gifts.length > 0) {
                  gifts.forEach((gift) => {
                    if (
                      gift.marketingIds.indexOf(detail.marketingId) > -1 &&
                      gift.marketingLevelIds.indexOf(detail.giftLevelId) > -1 &&
                      gift.skuId === detail.productId
                    ) {
                      selectedMarketingGiftsState.push({
                        marketingId: detail.marketingId,
                        giftDetailId: detail.giftDetailId,
                        giftLevelId: detail.giftLevelId,
                        goodsInfoId: detail.productId,
                        storeId: goodsInfo.storeId,
                        goodsNum: productNum,
                      });
                    }
                  });
                }
              });
            }
          });
          action.commonChange([{ paths: 'main.gifts.selectedMarketingGifts', value: selectedMarketingGiftsState }]);
        }
      } catch (e) {
        await action.showMessage(e.message);
      }
    },

    async onChangeFullGiftConfirm() {
      try {
        const {
          stores,
          gifts: {
            fullGiftLevelList: { levelList },
            selectedMarketingGifts,
          },
        } = getData().main;
        let skuIdList = [],
          skuIds = [],
          giftSkuIds = [],
          marketingId,
          marketingLevelId;
        stores.map((store) => {
          let tradeConfirmMarketingList = store.tradeConfirmMarketingList;
          marketingId = selectedMarketingGifts[0].marketingId;
          tradeConfirmMarketingList?.map((item) => {
            if (item.marketingId == marketingId) {
              skuIds = item.skuIds;
            }
          });

          let tradeItems = store.tradeItems;
          tradeItems.map((item) => {
            if (skuIds.includes(item.skuId)) {
              skuIdList.push({
                skuId: item.skuId,
                num: item.num,
                storeId: item.storeId,
              });
            }
          });
        });

        selectedMarketingGifts.map((item) => {
          giftSkuIds.push(item.goodsInfoId);
          marketingLevelId = item.giftLevelId;
        });

        let params = {
          tradeItems: skuIdList,
          tradeMarketingDTO: {
            marketingId, //营销id
            marketingLevelId, //营销规则id
            skuIds, //与tradeItems的skuId保持一致
            giftSkuIds, //选中的赠品id
          },
        };
        await api.tradeBaseController.fullGiftConfirm(params);
        await this._clearLocal();
        await actions(dispatch).actions.init();
        //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
        await this._switchInit();
        //算运费
        await this._calcFreight();
        //积分初始化
        await this._pointInit();
      } catch (e) {
        await action.showMessage(e.message);
      }
    },

    // 您的积分不足，无法操作
    async _handleAtModal() {
      await action.commonChange('main.mask.isOpen', false);
      await Taro.startPullDownRefresh;
      await actions(dispatch).actions.init();
      await action._switchInit();
    },

    //校验vop商品区域销售限制
    async _verifyPurchase() {
      const {
        orderList: { address },
      } = getData().main || {};
      if (address && !address.provinceId) {
        return;
      }
      if (!address) return;
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

    // 计算礼品卡均摊信息
    calcSplitInfo() {
      const {
        points: { usePoint, pointConfig },
        stores,
        price,
        giftCardType,
        storeBagsFlag,
      } = getData().main;
      if (storeBagsFlag) return;
      // if ([1, 2].includes(giftCardType)) {
      //   // 提货卡
      //   action.commonChange([{paths: 'main.price', value: {...price, goodsTotalPrice: 0, totalPrice: 0}}]);
      //   return;
      // }
      const confirmCoupon = Taro.getStorageSync('mini::confirmCoupon');
      let checkGoodsInfos = confirmCoupon?.checkGoodsInfos || [];
      let checkPreferentialSku = confirmCoupon?.checkPreferentialSku || [];
      if (JSON.stringify(checkGoodsInfos) === '{}') checkGoodsInfos = [];
      if (JSON.stringify(checkPreferentialSku) === '{}') checkPreferentialSku = [];

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
            marketingIds: item.marketingIds,
            isPreferential: false,
          });
        });
        if (store.preferential) {
          store.preferential.forEach((item) => {
            goodsInfos.push({
              storeInfo,
              skuId: item.skuId,
              skuName: item.skuName,
              specDetails: item.specDetails,
              price: item.splitPrice,
              num: item.num,
              pic: item.pic,
              splitPrice: item.splitPrice,
              marketingIds: item.marketingIds,
              isPreferential: true,
            });
          });
        }
      });
      // 1.5 计算运费均摊 到每个商品价格上 
      let deliveryPrice = price.totalDeliveryPrice;
      if (deliveryPrice > 0) {
        const mockSkuId = Taro.getStorageSync('order_mock_skuId');
        const skuId = mockSkuId || +new Date() + '_mock';
        Taro.setStorageSync('order_mock_skuId', skuId);
        goodsInfos.push({
          storeInfo: {},
          skuId: skuId,
          skuName: null,
          specDetails: null,
          price: deliveryPrice,
          num: 1,
          pic: null,
          splitPrice: deliveryPrice,
          marketingIds: [],
          isPreferential: false,
        });
      }
      // if (deliveryPrice > 0) {
      //   const total = goodsInfos.reduce((a, b) => _.add(a, b.splitPrice), 0);
      //   goodsInfos.forEach((sku, idx) => {
      //     const split = _.mul(deliveryPrice, _.div(sku.splitPrice, total));
      //     sku.splitPrice = _.add(sku.splitPrice, split).toFixed(2);
      //   });
      // }


      // 2.读取券信息
      goodsInfos.forEach((goodsInfo) => {
        if (goodsInfo.isPreferential) {
          const marketingId = goodsInfo?.marketingIds?.[0];
          const couponSku = checkPreferentialSku.find(
            (i) => i.goodsInfoId === goodsInfo.skuId && marketingId === i.preferentialMarketingId,
          );
          if (couponSku) goodsInfo.splitPrice = couponSku.splitPrice;
        } else {
          const couponSku = checkGoodsInfos.find((i) => i.goodsInfoId === goodsInfo.skuId);
          if (couponSku) goodsInfo.splitPrice = couponSku.splitPrice;
        }
      });

      // 3.计算积分信息
      let pointDeduction = _.div(usePoint, pointConfig.pointsWorth || 100);
      if (pointDeduction > 0) {
        const total = goodsInfos.reduce((a, b) => _.add(a, b.splitPrice), 0);
        goodsInfos.forEach((sku, idx) => {
          if (idx === goodsInfos.length - 1) {
            sku.splitPrice = _.sub(sku.splitPrice, pointDeduction);
          } else {
            const split = lo.ceil(_.mul(pointDeduction, _.div(sku.splitPrice, total)), 2);
            sku.splitPrice = _.sub(sku.splitPrice, split);
            pointDeduction = _.sub(pointDeduction, split);
          }
        });
      }
      // 4.计算礼品卡信息
      goodsInfos.forEach((item) => (item.pointSplitPrice = item.splitPrice));
      giftCard.calcSplitInfo(checkedGiftCards, goodsInfos);
      const cardUsed = checkedGiftCards.reduce((a, b) => _.add(a, b.deduction), 0);
      action.commonChange('main.giftCardPrice', cardUsed);

      // 5.存储数据
      Taro.setStorageSync('confirm:split:info', { goodsInfos, checkedGiftCards });
      // action.commonChange('main.price.totalPrice', totalPrice);
      // action.commonChange('main.price.noCardTotalPrice', noCardTotalPrice);
      // action.commonChange('main.price.totalPrice', totalPrice);
    },

    //获取限售的商品
    async getRestrictedGoodsList() {
      const {
        orderList: { address },
        stores,
      } = getData().main;
      const goodsIdList = stores.map((e) => e.tradeItems.concat(e.gifts).map((el) => el.spuId)).flat();

      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: address.deliveryAddressId,
      });
      const list = res.goodsRestrictedTemplateVOList;
      const newStores = stores.map((item) => {
        const newTradeItems = item.tradeItems.map((e) => {
          const goods = list.find((el) => el.goodsId === e.spuId);
          if (goods) {
            return { ...e, restrictedFlag: goods.restrictedFlag };
          } else {
            return e;
          }
        });
        const newGifts = item.gifts.map((e) => {
          const goods = list.find((el) => el.goodsId === e.spuId);
          if (goods) {
            return { ...e, restrictedFlag: goods.restrictedFlag };
          } else {
            return e;
          }
        });
        return { ...item, gifts: newGifts, tradeItems: newTradeItems };
      });
      action.commonChange('main.stores', newStores);
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

export function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderOrderConfirmMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
