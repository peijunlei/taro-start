import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import Action from './action';

import chooseEnterpriseMain from '../reducers/main';
import api from 'api';
import Taro from '@tarojs/taro';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const {enterpriseInfoVOList} = await api.customerBaseController.getEnterpriseInfoByCustomerId();
      const resId = await  api.customerBaseController.getUsedEnterpriseId();
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      // // 当前登录的账号所属的企业id
      loginData.lastLoginEnterpriseId = resId;
      Taro.setStorageSync(cache.LOGIN_DATA, loginData);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            enterpriseList: enterpriseInfoVOList,
            enterpriseId: resId,
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
        chooseEnterpriseMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['chooseEnterpriseMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
