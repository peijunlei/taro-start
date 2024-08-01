import * as reduxStore from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';

import Action from './action';

import GiftCardLoginMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const action = actions.action;
      await action.fetchGiftCardDetailInfo();
    },

    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        GiftCardLoginMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['GiftCardLoginMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};
