import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageALoginIepRegisterInfoMain from '../reducers/main';
import action from '@/pages/common/coupon/actions/action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(customerAccount, customerPassword, verifyCode, inviteCode) {
      await actions.loadReducer();
      const res = await actions.action.fetchDistributionSetting();
      console.log('===', res);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            openFlag: res.openFlag,
            companyInfo: {customerAccount, customerPassword, verifyCode, inviteCode},
          },
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageALoginIepRegisterInfoMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageALoginIepRegisterInfoMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
