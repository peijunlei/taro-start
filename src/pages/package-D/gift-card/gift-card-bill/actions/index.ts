import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import {fetchMock} from 'wmkit';

import Action from './action';

import GIFTCARDBILLMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id, balance, giftCardType,giftCardId) {
      await actions.loadReducer();
      const action = actions.action;
      await action.commonChange('main.id', id);
      await action.commonChange('main.balance', balance);
      await action.commonChange('main.giftCardType', Number(giftCardType));
      await action.commonChange('main.giftCardId', giftCardId);
      await action.fetchGiftCardBillInfo(true);
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
        GIFTCARDBILLMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['GIFTCARDBILLMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};
