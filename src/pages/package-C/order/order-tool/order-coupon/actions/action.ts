import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {msg} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //优惠券校验
    async checkOutCoupon(param) {
      const {
        main: {checkCoupon, checkCouponStore},
      } = getData();
      const {
        unreachedIds,
        couponTotalPrice,
        checkGoodsInfos,
        commission,
      } = await api.couponCodeBaseController.checkoutCoupons({
        couponCodeIds: [checkCoupon.couponCodeId, checkCouponStore.couponCodeId],
        points: Number(param),
      });
      await Taro.setStorageSync('mini::confirmCoupon', {
        unreachedIds,
        couponTotalPrice,
        checkGoodsInfos,
        checkCoupon,
        checkCouponStore,
        commission,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderOrderToolOrderCouponMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
