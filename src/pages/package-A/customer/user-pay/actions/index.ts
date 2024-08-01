import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro from '@tarojs/taro';
import Action from './action';

import pagesPackageACustomerUserPayMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(type) {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingFlag',true)
      const customer = await api.customerBaseController.findCustomerMobile(); //用户信息
      dispatch({
        type: Command.init,
        payload: {
          main: {
            mobile: customer.customerAccount,
            forget: type,
            code: '',
          },
        },
      });
      actions.action.commonChange('main.isLoadingFlag',false)
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
        pagesPackageACustomerUserPayMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerUserPayMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
