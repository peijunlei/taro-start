import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import Taro from '@tarojs/taro';
import Action from './action';

import packageCOrderOrderMovieConfirmMain from '../reducers/main';
import {_} from 'wmkit';
import {cache, Const} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tradeno) {
      await actions.loadReducer();
      try {
        let purchaseItems = await api.tradeBaseController.tradeTrans(tradeno);
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
          totalCommission,
          shopName,
          inviteeName,
          purchaseBuy,
          orderTagVO,
        } = purchaseItems || {};
        if (!storeBagsFlag) {
          //检查小店分销状态(小店外购买返回true)
          const status = api.distributionController.checkStatus();
          if (!status) {
            await actions.action._getMasK('storeBagsFlag', '');
            return;
          }
        }
        // //地址初始化
        // var address = await actions.action._addressInit();

        var customer = await api.customerBaseController.findCustomerMobile();
      } catch (e) {
        // await actions.action._confirmMaskInit;
        if (e.code === 'K-969897') {
          //订单已支付
          await Taro.navigateTo({url: `/pages/package-C/order/order-list/index`});
        } else if(e.code === 'K-969898') {
          //订单已生成
          await Taro.navigateTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tradeno}`});
        } else { await actions.action._confirmMaskInit(e); }
        return;
      }
      //可用优惠券
      let canUseCoupons = couponCodes?.filter((item) => item.status == 0) || [];
      const canUseCouponsLength = canUseCoupons.length;
      let deliverType = 0;

      dispatch({
        type: Command.init,
        payload: {
          main: {
            tradeno:tradeno,
            stores: tradeConfirmItems,
            orderList: {
              //地址相关数据
              // address: address,
              //订单备注
              buyRemark: {},
              //附件图片
              enclosures: {},
              isVirtualGoods: orderTagVO?.electronicCouponFlag || orderTagVO?.virtualFlag,
            },
            coupons: couponCodes || [],
            price: {
              totalPrice,
              goodsTotalPrice,
              discountsTotalPrice,
              totalDeliveryPrice: 0,
              couponTotalPrice: 0,
              pointTotalPrice: 0,
              totalBuyPoint,
              totalCommission,
            },
            grouponFreeDelivery: grouponFreeDelivery,
            openGroupon: openGroupon,
            purchaseBuy: purchaseBuy,
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
            storeBagsFlag: storeBagsFlag == 1,
            isBookingSaleGoods:
              tradeConfirmItems &&
              tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods &&
              tradeConfirmItems[0].tradeItems[0].bookingType == '1', //预售定金
            isPresale: tradeConfirmItems && tradeConfirmItems[0].tradeItems[0].isBookingSaleGoods,
            isThirdPlatform: tradeConfirmItems.some((n) => n.tradeItems.some((item) => item.thirdPlatformType === 0)),
            tailNoticeMobile: customer && customer.customerAccount,
            inviteeName: inviteeName,
            shopName: shopName,
            canUseCouponsLength: canUseCouponsLength,
          },
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 为整数添加两位小数
     * 四舍五入
     */
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
    },

    /**
     * 设置了优惠券，重新计算可以使用的最大积分
     * @param maxpoint
     * @param couponTotalPrice
     * @private
     */
    _resetMaxPoint(maxpoint, couponTotalPrice) {
      //计算优惠券抵扣了多少积分
      let couponTotalPricePoint = Math.floor(_.mul(couponTotalPrice, Const.pointRatio));

      //用可用的最大积分减去优惠券抵用的积分
      if (_.sub(maxpoint, couponTotalPricePoint) <= 0) {
        return 0;
      }
      return _.sub(maxpoint, couponTotalPricePoint);
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
        packageCOrderOrderMovieConfirmMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderMovieConfirmMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
