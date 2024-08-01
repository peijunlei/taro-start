import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageACouponCouponCenterMain from '../reducers/main';

import packageACouponCouponCenterActor from '../reducers/actor';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const res = await api.couponCateController.listCouponCate(); //CouponCateVO
      res.push({couponCateId: null, couponCateName: '全部优惠券'});
      const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
      dispatch({
        type: Command.init,
        payload: {
          main: {
            couponCateList: res,
            couponCateId: res[0] ? res[0].couponCateId : -1,
            isLogin: isLogin,
            couponType: 0,
          },
        },
      });

      await actions.action.modifySearch(
        {pageNum: 0, couponCateId: res[0] ? res[0].couponCateId : -1},
        {isQuery: true, isResetPage: true},
      );
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
        packageACouponCouponCenterMain,

        packageACouponCouponCenterActor,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACouponCouponCenterMain', 'packageACouponCouponCenterActor']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
