import Store from '@/redux/store';
import { Command } from '../constant';
import { getActionProxy } from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import Action from './action';

import SelectAddressMapMain from '../reducers/main';

export default (dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    // 初始化数据
    async init(address, from?: string) {
      await actions.loadReducer();
      await actions.action.query(address, from);
      await actions.action.showMap(true);
      await actions.action.getNearAddress('');
    },

    // 动态注入reducer
    async loadReducer() {
      reduxStore.registerReducer({
        SelectAddressMapMain,
      });
    },

    // 卸载reducer
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['SelectAddressMapMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
