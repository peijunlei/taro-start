import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import pointsSkuListMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      await actions.loadReducer();
      try {
        const {pointsTradeConfirmItem} = await api.pointsTradeControl.getExchangeItem(params);

        dispatch({
          type: Command.init,
          payload: {
            main: {
              skus: pointsTradeConfirmItem.tradeItem,
              isSelf: pointsTradeConfirmItem.supplier.isSelf,
            },
          },
        });
      } catch (e) {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              mask: {
                isOpen: true,
                message: e.message,
              },
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
        pointsSkuListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pointsSkuListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
