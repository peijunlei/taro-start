import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageACustomerEvaluateDryingMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init({storeId, orderId, goodsInfoId, evaluateType}) {
      await actions.loadReducer();
      if (evaluateType == 2) {
        const res = await api.goodsEvaluateController.evaluateInfo({
          storeId: storeId,
          tid: orderId,
          skuId: goodsInfoId,
        });
        const {
          storeEvaluateSumVO,
          tradeVO,
          storeEvaluateVO,
          goodsEvaluateVO,
          goodsEvaluateImageVOS,
          storeVO,
          createTime,
        } = res;
        dispatch({
          type: Command.init,
          payload: {
            main: {
              storeBaseInfo: storeEvaluateSumVO,
              orderBaseInfo: tradeVO,
              storeEvaluate: storeEvaluateVO,
              orderEvaluate: goodsEvaluateVO,
              enclosures: goodsEvaluateImageVOS,
              storeVO: storeVO,
              createTime,
              evaluateType: evaluateType,
            },
          },
        });
      } else {
        goodsInfoId = goodsInfoId ? goodsInfoId : '-1';
        const res = await api.goodsEvaluateController.getGoodsAndStore({
          storeId: storeId,
          tid: orderId,
          skuId: goodsInfoId,
        });
        const {storeEvaluateSumVO, tradeVO, storeTobe, storeVO, tid, createTime} = res;
        dispatch({
          type: Command.init,
          payload: {
            main: {
              storeBaseInfo: storeEvaluateSumVO,
              orderBaseInfo: tradeVO,
              isShow: storeTobe,
              storeInfo: storeVO,
              tid,
              createTime,
              evaluateType: evaluateType,
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
        packageACustomerEvaluateDryingMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerEvaluateDryingMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
