import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageCOrderOrderToolOrderCouponMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();

      const {coupons, selectCoupon, storeIds} = await Taro.getStorageSync('mini::orderCoupon');

      //可用优惠券
      let canUseCoupons = coupons.filter((item) => item.status == 0);
      const canUseCouponsLength = canUseCoupons.length;

      //平台优惠券
      let commonCoupons = canUseCoupons.filter((item) => item.platformFlag === 1);

      //店铺优惠券
      let stores = [];
      canUseCoupons.filter((item) => {
        if (item.status !== 1) {
          const index = stores.findIndex((store) => store.storeId == item.storeId);
          if (index == -1) {
            stores.push({
              storeId: item.storeId,
              storeName: item.storeName,
              coupons: [item],
            });
          } else {
            stores[index].coupons.push(item);
          }
        }
      });

      //不可用优惠券
      const disableCoupons = coupons
        .filter((coupon) => coupon.status != 0)
        .map((item) => {
          item.disabled = true;
          return item;
        });

      const disableCouponsLength = disableCoupons.length;

      const unReachPrice = disableCoupons.filter((item) => item.status == 1);
      const noAvailableSku = disableCoupons.filter((item) => item.status == 2);
      const unReachTime = disableCoupons.filter((item) => item.status == 3);

      const checkCoupon = await Taro.getStorageSync('mini::checkCoupon');
      const checkCouponStore = await Taro.getStorageSync('mini::checkCouponStore');

      dispatch({
        type: Command.init,
        payload: {
          main: {
            canUseCouponsLength,
            disableCouponsLength,
            canUseCoupons: [...stores],
            checkCoupon,
            checkCouponStore,
            disableCoupons: [
              {storeName: '未达到使用门槛', coupons: unReachPrice},
              {storeName: '本单商品不可用', coupons: noAvailableSku},
              {storeName: '未到可用时间', coupons: unReachTime},
            ],
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
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderOrderToolOrderCouponMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderToolOrderCouponMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
