import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageACustomerEvaluateCenterMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      // this._navClick(tabNum);
      await actions.loadReducer();
      const res = await Promise.all([
        api.goodsTobeEvaluateController.getGoodsTobeEvaluateNum(),
        api.storeTobeEvaluateController.getStoreTobeEvaluateNum(),
        api.goodsEvaluateController.getGoodsEvaluateNum(),
      ]);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            navData: {
              wait: res[0],
              storeWaitNum: res[1],
              evaluateNum: res[2],
            },
          },
        },
      });
    },

    switchTab(tabNum) {
      actions.action.commonChange([
        {paths: 'main.evaluateData', value: []},
        {paths: 'main.isId', value: tabNum},
      ]);
    },

    setEvaluateData(evaluateData) {
      actions.action.commonChange('main.evaluateData', evaluateData);
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
        packageACustomerEvaluateCenterMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerEvaluateCenterMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
