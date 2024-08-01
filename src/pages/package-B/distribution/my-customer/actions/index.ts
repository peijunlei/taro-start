import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {cache} from 'config';
import Taro from '@tarojs/taro';
import {Const} from 'config';
import moment from 'dayjs';
import Action from './action';

import packageBDistributionMyCustomerMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tab) {
      await actions.loadReducer();
      let customerInfo = Taro.getStorageSync(cache.LOGIN_DATA);
      //是否为分销员
      let isDistributor = customerInfo && customerInfo.customerDetail.isDistributor;
      if (isDistributor) {
        // 当前用户是分销员
        actions.action.commonChange('main.isDistributor', true);
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            tab: tab,
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
        packageBDistributionMyCustomerMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBDistributionMyCustomerMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
