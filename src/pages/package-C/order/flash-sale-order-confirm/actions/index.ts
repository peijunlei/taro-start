import * as reduxStore from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import Taro from '@tarojs/taro';
import Action from './action';

import packageCOrderOrderConfirmMain from '../reducers/main';
import { _ } from 'wmkit';
import { Const, cache } from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      //地址初始化
      const address = await actions.action._addressInit();
      let data;
      try {
        data = await api.tradeBaseController.getPurchaseItems();
        var {
          totalPrice,
          goodsTotalPrice,
          discountsTotalPrice,
          storeBagsFlag,
          tradeConfirmItems,
          couponCodes,
          grouponFreeDelivery,
          flashFreeDelivery,
          openGroupon,
          orderTagVO,
          cityId
        } = data;
      } catch (e) {
        e.message && actions.action._confirmMaskInit;
      }
      const canPayOnLine = await api.payBaseController.queryGatewayIsOpen('H5');
      let payWay;
      if (canPayOnLine) {
        payWay = [{ id: 0, name: '在线支付' }];
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cityId,
            stores: tradeConfirmItems,
            orderList: {
              //地址相关数据
              address,
              //订单备注
              buyRemark: {},
              //附件图片
              enclosures: {},
              dangaoDate: {},
              dangaoGreeting: {},
              dangaoPhone: {},
              dangaoTime: {},
              dangaoShop: {},
              dangaoDeliverWay: {},
              dangaoDeliveryText: {},
              dangaoDistributionRuleId: {},
              dangaoDeliveryAmount: {},
              isVirtualGoods: orderTagVO?.electronicCouponFlag || orderTagVO?.virtualFlag,
            },
            coupons: couponCodes,
            price: {
              totalPrice,
              goodsTotalPrice,
              discountsTotalPrice,
              totalDeliveryPrice: 0,
              couponTotalPrice: 0,
              pointTotalPrice: 0,
            },
            grouponFreeDelivery: grouponFreeDelivery,
            flashFreeDelivery: flashFreeDelivery,
            openGroupon: openGroupon,
            payWay: payWay,
            giftCardNum: data?.giftCardNum || 0,
          },
        },
      });
      // 页面初始时计算均摊信息
      Taro.setStorageSync('confirm:split:info', {});
      actions.action.calcSplitInfo();
    },
    async initConfirm(address: any) {
      if (!address) return
      // TODO 缓存中获取订单确认参数 区分立即购买和购物车结算
      const cacheParams = Taro.getStorageSync(cache.ORDER_CONFIRM_PARAMS)
      if (cacheParams) {
        const { type, ...restPatams } = cacheParams;
        const immediateBuyParams = {
          ...restPatams,
          consigneeId: address.deliveryAddressId,
          platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
          dangaossAddrId: address.dangaossAddrId,
        }
        await api.flashSaleController.rushToBuyFlashSaleGoods(immediateBuyParams);
      }
    },

    async initConfirmRefresh(address: any) {
      if (!address) return
      // TODO 缓存中获取订单确认参数 区分立即购买和购物车结算
      const cacheParams = Taro.getStorageSync(cache.ORDER_CONFIRM_PARAMS)
      if (cacheParams) {
        const { type, ...restPatams } = cacheParams;
        const immediateBuyParams = {
          ...restPatams,
          consigneeId: address.deliveryAddressId,
          platformAddrIds: address.provinceId ? [address.provinceId, address.cityId, address.areaId, address.streetId] : null,
          dangaossAddrId: address.dangaossAddrId,
        }
        try {
          await api.flashSaleController.rushToBuyFlashSaleGoodsRefresh(immediateBuyParams);
        } catch (ex) {
          actions.action._confirmMaskInit(ex)
        }
      }
    },


    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({ type: Command.clean });
    },

    /**
     * 为整数添加两位小数
     * 四舍五入
     */
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
    },

    //通过积分算对应的金额
    _pointToMoney(point) {
      return _.div(point, Const.pointRatio);
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderOrderConfirmMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderConfirmMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
