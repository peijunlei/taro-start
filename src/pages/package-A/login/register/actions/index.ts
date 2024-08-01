import Store from '@/redux/store';
import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import {VAS} from 'wmkit';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import loginRegisterMain from '../reducers/main';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(inviteeId) {
      await actions.loadReducer();
      const res = await Promise.all([await api.loginBaseController.getRegisterLimitType(), await VAS.checkIepAuth()]);
      // const {openFlag, registerLimitType} = await api.loginBaseController.getRegisterLimitType();
      if (inviteeId) {
        var {customerName,} = await api.customerBaseController.getCustomerBaseInfo(inviteeId);
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            iepFlag: res[1],
            inviteeId,
            customerName,
            openFlag: res[0].openFlag,
            registerLimitType: res[0].registerLimitType,
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
        loginRegisterMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginRegisterMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
