import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import GiftCardUseMain from '../reducers/main';
import {_} from 'wmkit';
import {ifLogin} from '@/utils/common-functions';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    async init(userGiftCardId, type, cardStatus?) {
      await actions.action.commonChange('main.isLoading', true);
      if (ifLogin()) {
        // 查询地址
        await actions.action.addressInit();
      }
      await actions.action.getGiftCardUseConfig(userGiftCardId, type, cardStatus);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            isLoading: false,
          },
        },
      });
    },

    async clean() {
      //@ts-ignore
      dispatch({type: Command.clean});
    },

    async loadReducer() {
      reduxStore.registerReducer({
        GiftCardUseMain,
      });
    },

    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['GiftCardUseMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
