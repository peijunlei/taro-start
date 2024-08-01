import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import commonCouponMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(goodsInfoIds) {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.loadReducer());
      const {couponViews, storeMap} = (await actions.action._isLogin())
        ? await api.couponInfoController.listCouponForGoodsList(goodsInfoIds)
        : await api.couponInfoController.listCouponForGoodsListFront(goodsInfoIds);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            coupon: {couponViews, storeMap},
            goodsInfoIds: goodsInfoIds,
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
        commonCouponMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['commonCouponMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
