import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './goodsAction';
import loginOrdersListMain from '../reducers/main';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(key) {
      await actions.loadReducer();
      await actions.goodsAction.changeTopActive(key);
      await actions.goodsAction.setServerTime();

      try {
        const {status} = await api.orderListShowTypeController.query();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              orderListType: status,
            },
          },
        });
      } catch (e) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              orderListType: 0,
            },
          },
        });
      }
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
        loginOrdersListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginOrdersListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
