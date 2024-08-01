import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageCOrderOrderToolOrderSkuListMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(storeId) {
      await actions.loadReducer();
      try {
        const skuRes = await api.tradeBaseController.getPurchaseItems();
        const store = skuRes.tradeConfirmItems.filter((f) => f.supplier.storeId == storeId)[0];
        store.tradeItems.forEach((item) => {
          if (item.distributionCommission) {
            item.distributionCommission = item.distributionCommission * item.num;
          }
        });
        dispatch({
          type: Command.init,
          payload: {
            main: {
              skus: store.tradeItems,
              isSelf: store.supplier.isSelf,
              gifts: store.gifts,
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
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderOrderToolOrderSkuListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderToolOrderSkuListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
