import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageCOrderOrderSkuListMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid, type) {
      await actions.loadReducer();
      try {
        let res;
        if (type == 'promotionOrder') {
          res = await api.tradeBaseController.distributeDetails(tid);
        } else {
          res = await api.tradeBaseController.details(tid);
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              promotionOrder: type == 'promotionOrder',
              order: {
                skus: res.tradeItems,
                gifts: res.gifts,
                isSelf: res.supplier.isSelf,
              },
            },
          },
        });
      } catch (error) {}
    },
    /**
     * 退单-商品清单
     */
    async initReturn(tid) {
      await actions.loadReducer();
      try {
        const res = await api.returnOrderBaseController.findById(tid);
        if (res.returnType == 'RETURN') {
          res.returnItems.forEach((item) => {
            item.price = this._addZero(item.splitPrice); //初始化每个商品的均摊平均价格,向下截取金额
          });
        }

        dispatch({
          type: Command.init,
          payload: {
            main: {
              order: {
                skus: res.returnItems,
                gifts: res.returnGifts,
              },
              tradeItems: res.tradeVO.tradeItems,
            },
          },
        });
      } catch (error) {}
    },
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
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
        packageCOrderOrderSkuListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderSkuListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
