import { Command, BASE } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import Taro from '@tarojs/taro';
import api from 'api';
import * as reduxStore from '@/redux/store';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import Action, { getData } from './action';

import packageCShopCartMain from '../reducers/main';
import { VAS, WMkit,_ } from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const { isLoading } = getData().main || {};
      if (isLoading) return;
      actions.action.commonChange('main.isLoading', true);
      let list = [];
      let iepInfo, iepSwitch;
      if (WMkit.isLogin()) {
        list = await api.customerDeliveryAddressBaseController.findAddressList();
      }
      let result = await Promise.all([VAS.fetchIepInfo(), VAS.checkIepAuth()]);
      iepInfo = result[0];
      iepSwitch = result[1];
      let defaltAddress = null;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        // 省、市、区（县）、街道（乡）+ 详细地址
        item['addressInfo'] = _.getAddressInfoStr(item as any)
        if (item.isDefaltAddress != 0) {
          defaltAddress = item;
        }
      }

      if (!defaltAddress) {
        defaltAddress = list[0];
      }

      const address = Taro.getStorageSync('mini::shopCardAddress');
      if (Boolean(address) && address.deliveryAddressId) {
        // 是否有效
        const addr = list.find((item) => item.deliveryAddressId === address.deliveryAddressId);
        if (addr) {
          defaltAddress = addr;
        }
        //地址缓存
        Taro.setStorageSync('mini::confirmAddress', address);
        Taro.setStorageSync('mini::shopCardAddress', address);
      }

      // 检验是否需要完善四级地址
      if (defaltAddress && defaltAddress.deliveryAddressId) {
        const result = await api.platformAddressController.verifyAddress({
          provinceId: defaltAddress.provinceId,
          cityId: defaltAddress.cityId,
          areaId: defaltAddress.areaId,
          streetId: defaltAddress.streetId,
          longitude: defaltAddress.longitude,
          latitude: defaltAddress.latitude,
          dangaossAddrId: defaltAddress.dangaossAddrId
        });
        if (result) {
          defaltAddress.needComplete = true;
        }
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            iepInfo,
            iepSwitch,
            deliveryAddress: list,
            defaltAddress: defaltAddress || '',
            isSecondShopCart: false,
            canClick: true,
          },
        },
      });
      // 后置为了正确获取到 defaltAddress
      await actions.action.pageInit();

      // if (WMkit.isLogin()) {
      //   actions.initCouponFlag();
      // }
    },

    /**
     * 是否企业会员
     * @param customerLabelList
     * @private
     */
    async _isIepCustomer(customerLabelList) {
      if (customerLabelList) {
        return customerLabelList && customerLabelList.indexOf('enterprise-customer') > -1;
      }
      return false;
    },

    async initCouponFlag() {
      try {
        const res = await api.purchaseBaseController.getStoreCouponExist();
        actions.action.commonChange('main.purInfo.storeCouponMap', res.map);
      } catch (e) {
        if (e.code === 'K-999995') {
          WMkit.clearLoginCache();
        }
        //
      }
    },

    /**
     * 重置
     */
    async clean() {
      await Taro.setStorageSync('mini::shopCardAddress', null);
      await Taro.setStorageSync('mini::confirmAddress', null);
      // await Taro.setStorageSync('mini::forOrderConfirmHide', false);
      //@ts-ignore
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCShopCartMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCShopCartMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },

    // 校验是否是四级地址
    async isTrueAddress(address) {
      actions.action.commonChange('main.currentAddress', address);
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
                url: `/pages/package-A/customer/receive-address-edit/index?addressId=${address.deliveryAddressId}&mode=1&localKey=${'shopCardAddress'}`
              });
            }
          });
          return true;
        }
      }
    },

    //计算sku阶梯价格
    _calculateGoodsPrice(sku: any, intervalPrices: any) {
      if (!intervalPrices) {
        return sku.salePrice || 0.0;
      }
      //取出当前商品阶梯价
      const prices = intervalPrices.filter((intervalPrice) => intervalPrice.goodsInfoId === sku.goodsInfoId);
      //算所有满足当前商品数量的阶梯价格集合
      const priceList = prices.filter((price) => price.count <= sku.buyCount);
      //缺货状态下 求阶梯价最小值
      if (sku.goodsStatus !== 0 && prices.length > 0) {
        return prices.sort((a, b) => a.price - b.price)[0].price || 0.0;
      }

      if (prices.length > 0 && priceList.length > 0) {
        //算出阶梯价
        return priceList.sort((a, b) => a.price - b.price)[0].price || 0.0;
      } else {
        //算出原价
        return sku.salePrice || 0.0;
      }
    },
    _getIsAllCheck(checkSku, goodsInfos) {
      if (!checkSku) return false;
      //过滤正常的商品
      let correctGoodsInfos = this.getCollecrtGoods(goodsInfos) || [];
      // actions.action.loadingWML(false);
      return checkSku.length > 0 && correctGoodsInfos.length === checkSku.length;
      // return correctGoodsInfos.length > 0 && correctGoodsInfos.every((item) => checkSku.includes(item.goodsInfoId));
    },

    //获取店铺是否被选中
    _getStoreCheck(storeSpus, checkSku, goodsInfos) {
      // 店铺中的商品
      let storeGoodsInfos = [];
      storeGoodsInfos = goodsInfos.filter((item) => {
        return storeSpus.includes(item.goodsId);
      });
      //店铺中正常的商品
      let correctGoodsInfos = this.getCollecrtGoods(storeGoodsInfos);
      // actions.action.loadingWML(false); //动画关闭
      return (
        correctGoodsInfos &&
        correctGoodsInfos.length > 0 &&
        correctGoodsInfos.every((item) => checkSku.includes(item.goodsInfoId))
      );
    },

    //正常可选的商品
    getCollecrtGoods(goodsInfos) {
      if (!goodsInfos || (goodsInfos && goodsInfos.length == 0)) {
        return [];
      }
      const {
        main: {
          useStatus: { isEdit },
        },
      } = getData();
      // actions.action.loadingWML(false);
      const that = this;
      let correctGoodsInfos = goodsInfos.filter((item) => {
        return isEdit ? item.goodsStatus !== 2 : [0, 3, 5].includes(item.goodsStatus) && that.allowClick(item.goodsInfoId) && item.stock > 0;
      });
      return correctGoodsInfos;
    },

    //商品是否可以被选择结算 --true可以被选择 false不可以
    allowClick(goodsInfoId) {
      const {
        main: {
          purInfo: { bookingSaleVOList, appointmentSaleVOList },
        },
      } = getData();
      const isAppointmentArry = appointmentSaleVOList
        ? appointmentSaleVOList.filter((index) => goodsInfoId == index.appointmentSaleGood.goodsInfoId)
        : [];

      const bookingArry = bookingSaleVOList
        ? bookingSaleVOList.filter((index) => goodsInfoId == index.bookingSaleGoods.goodsInfoId)
        : [];

      //判断是否可以选择
      const isClick =
        // 非预售期内
        (bookingArry.length != 0 &&
          goodsInfoId == bookingArry[0].bookingSaleGoods.goodsInfoId &&
          this.isPresaleStatus(bookingArry[0])) ||
        // 预约
        (isAppointmentArry.length != 0 &&
          goodsInfoId == isAppointmentArry[0].appointmentSaleGood.goodsInfoId &&
          this.isBuyStatus(isAppointmentArry[0]) !== '抢购中');
      return !isClick;
    },

    //判断当前的预售状态
    isPresaleStatus(item) {
      const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
      let isBetween = false;
      //预售起止时间内 0:全款 1:定金
      if (bookingType == 0) {
        isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
      }
      //定金支付起止时间内
      if (bookingType == 1) {
        isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
      }
      return isBetween;
    },

    //获取SPU是否被选中
    _getSpuCheck(list, checkSku) {
      const newList = list.filter(({ sku: { goodsStatus } }) => goodsStatus === 0);
      return newList.length && newList.every(({ sku: { goodsInfoId, goodsStatus } }) => checkSku.includes(goodsInfoId));
    },

    //校验sku数量 规则如下, 少于限订 更新限订 大于起订跟库存，显示起订跟库存
    _validSku(sku, checkSku) {
      if (!checkSku.includes(sku.goodsInfoId)) {
        return '';
      }
      let msgArray = [];
      const skuNum = sku.buyCount;
      const min = sku.count || 0;
      const max = sku.maxCount !== null ? sku.maxCount : Infinity;
      const stock = sku.stock;

      if (min && skuNum < min) {
        msgArray.push(`起订量${min}`);
      }
      //当大于起订跟库存 去起订跟库存最小值
      if (skuNum > max || skuNum > stock) {
        const maxNum = Math.min(max, stock);
        if (maxNum === max) {
          msgArray.push(`可购${maxNum}`);
        } else {
          msgArray.push(`库存${stock}`);
        }
      }

      return msgArray.length > 0 ? msgArray.join('|') : '';
    },

    isBuyStatus(status) {
      if (!status) return;
      let appointmentStartTime = status.appointmentStartTime;
      let appointmentEndTime = status.appointmentEndTime;
      let snapUpStartTime = status.snapUpStartTime;
      let snapUpEndTime = status.snapUpEndTime;

      let isAppointmentStart = appointmentStartTime ? moment(appointmentStartTime).isBefore(new Date()) : null;
      let isAppointmentEnd = appointmentEndTime ? moment(new Date()).isBefore(appointmentEndTime) : null;

      let isSnapUpStartTime = snapUpStartTime ? moment(snapUpStartTime).isBefore(new Date()) : null;
      let isSnapUpEndTime = snapUpEndTime ? moment(new Date()).isBefore(snapUpEndTime) : null;

      let result = '';
      if (isAppointmentStart && isAppointmentEnd) result = '预约中';
      if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
      if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
      return result;
    },

    _marketingInit(skuMarketings) {
      // 是否有营销
      let hasMarketing = skuMarketings && skuMarketings.length !== 0;
      let selectedMarketing = null;
      if (hasMarketing) {
        skuMarketings.forEach((skuMarketing) => {
          if (skuMarketing.checked) {
            selectedMarketing = skuMarketing;
          }
        });
      }

      let hasManyMarketing = skuMarketings && skuMarketings.length > 1;
      return { selectedMarketing, hasMarketing, hasManyMarketing };
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
