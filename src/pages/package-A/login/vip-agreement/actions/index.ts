import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import loginVipAgreementMain from '../reducers/main';
import Taro from "@tarojs/taro";
import { cache } from "config";

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(type: string) {
      await actions.loadReducer();
      if (type === '0') {
        let res = await api.systemController.findBaseConfig();
        const { registerContent, storeId } = res;
        Taro.setStorageSync(cache.STORE_ID, storeId);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              words: registerContent,
            },
          },
        });
      } else if (type === '2') {
        Taro.setNavigationBarTitle({ title: '隐私政策' });
        //初始化隐私政策协议
        let res = await api.systemController.fetchPrivacyPolicyConfig();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              words: res.privacyPolicy,
            },
          },
        });
      }

    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        loginVipAgreementMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginVipAgreementMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
