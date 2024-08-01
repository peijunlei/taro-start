import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';

import Action from './action';

import customerGrouponListMain from '../reducers/main';
import {getData} from './action';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const serverTime = await api.systemController.queryServerTime();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            serverTime: serverTime.context,
          },
        },
      });
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        customerGrouponListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['customerGrouponListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },

    async reload() {
      await actions.loadReducer();
      const serverTime = await api.systemController.queryServerTime();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            reload: !getData().main.reload,
            serverTime: serverTime,
          },
        },
      });
    },
  };
  return {actions};
};
