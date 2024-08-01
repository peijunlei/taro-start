import Store from '@/redux/store';
import Taro from '@tarojs/taro';

import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {cache} from 'config';

import Action from './action';

import packageCOrderFillPaymentMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid) {
      await actions.loadReducer();
      actions.action.commonChange('main.tid', tid);
    },
    /**
     * 初始化订单支付成功
     */
    async initSuccess(tid) {
      await actions.loadReducer();
      const res = await api.tradeBaseController.payOrder(tid);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            payOrder: res,
          },
        },
      });
    },
    async initBySession() {},
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
        packageCOrderFillPaymentMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderFillPaymentMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
