import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //判断是否登录
    async _isLogin() {
      return Boolean(Taro.getStorageSync('authInfo:token'));
    },
    /**
     * 优惠券倒计时结束
     */
    async countOver(index) {
      await dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.coupon.couponViews',
          value: (couponViews) => {
            couponViews.splice(index, 1);
            return couponViews;
          },
        },
      });
    },
    /**
     * 领取优惠券
     */
    async receiveCoupon(couponInfoId, couponActivityId, index) {
      const isLogin = await action._isLogin();
      if (isLogin) {
        await api.couponCodeBaseController.customerFetchCoupon({
          couponInfoId: couponInfoId,
          couponActivityId: couponActivityId,
        });
        const {couponViews, storeMap} = await api.couponInfoController.listCouponForGoodsList(
          getData().main.goodsInfoIds,
        );
        await dispatch({
          type: Command.init,
          payload: {
            main: {
              coupon: {couponViews, storeMap},
            },
          },
        });
      } else {
        await Taro.navigateTo({
          url: '/pages/package-A/login/login/index',
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('commonCouponMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
