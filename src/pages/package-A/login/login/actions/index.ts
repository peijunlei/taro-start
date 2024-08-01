import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import Action from './action';
import {addressInit} from '@/utils/getAddressInfo';

import loginLoginMain from '../reducers/main';
import {WMkit} from 'wmkit';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(mobile) {
      await actions.loadReducer();
      const { mode, url } = getCurrentInstance().router.params || {}
      let res = await api.systemController.findBaseConfig();
      const {pcLogo, storeId} = res;
      // 存储当前品牌商城ID
      Taro.setStorageSync(cache.STORE_ID, storeId);
      await addressInit();
      const isOpenWechat = await WMkit.isOpenWechat();
      const isCodeLoginMode = mode === 'code'
      dispatch({
        type: Command.init,
        payload: {
          main: {
            mode: isCodeLoginMode,
            phone: mobile || '',
            password: '',
            isAgree: isCodeLoginMode,
            switchLogin: isCodeLoginMode ? false : true,
            toUrl: decodeURIComponent(url),
            isOpenWechat: isOpenWechat,
          },
        },
      });
      actions.action.commonChange('main.pcLogo', JSON.parse(pcLogo));
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
        loginLoginMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginLoginMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
