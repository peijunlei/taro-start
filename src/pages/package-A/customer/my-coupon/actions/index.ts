import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {WMkit} from 'wmkit';

import Action from './action';

import packageACustomerMyCouponMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const {couponCodeVos, overDueCount, unUseCount, usedCount} = await api.couponCodeBaseController.listMyCouponList({
        useStatus: 0,
        couponType: WMkit.isMall() ? 1 : null,
        pageNum: 0,
        pageSize: 10,
      });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            couponList: couponCodeVos ? couponCodeVos.content : [],
            couponType: WMkit.isMall() ? 1 : null,
            useStatus: 0,
            overDueCount,
            unUseCount,
            usedCount,
          },
        },
      });
      await actions.action.modifySearch(
        {pageNum: 0, useStatus: 0, couponType: WMkit.isMall() ? 1 : null},
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
        packageACustomerMyCouponMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerMyCouponMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
