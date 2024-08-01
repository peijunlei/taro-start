import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';

import Action, {getData} from './action';

import packageACustomerMessagePushListMain from '../reducers/main';

export default function mapDispatchToProps(dispatch: Dispatch) {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(messageType) {
      await actions.loadReducer();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            messageType: messageType,
          },
        },
      });
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
        packageACustomerMessagePushListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerMessagePushListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },

    async reload(messageType) {
      await actions.loadReducer();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            messageType: messageType,
            reload: !getData().main.reload,
          },
        },
      });
    },
  };

  return {actions};
}

//create by moon https://github.com/creasy2010/moon
