import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageAcustomerUserSafeMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoadingFlag',true)
      const customer = await api.customerBaseController.findCustomerCenterInfo(); //用户信息
      let flag = false; //支付密码是否可用
      try {
        await api.customerBalanceBaseController.isPayPwdValid();
        flag = true;
      } catch (e) {

      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            customer:{
              customerAccount:customer.customerAccount
            },
            flag:flag
          },
        },
      });
      await actions.action.commonChange('main.isLoadingFlag',false)
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
        pagesPackageAcustomerUserSafeMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageAcustomerUserSafeMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
