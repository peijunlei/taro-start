import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import pagesPackageBGoodsCombinationGoodsMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(skuId, storeId) {
      await actions.loadReducer();
      let token = Taro.getStorageSync('authInfo:token');
      let combinationList;
      //判断是否登录
      if (token) {
        combinationList = await api.marketingController.getMoreSuitsInfoForLogin({
          goodsInfoId: skuId,
          storeId: storeId,
        });
      } else {
        combinationList = await api.marketingController.getMoreSuitsInfo({
          goodsInfoId: skuId,
        });
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            combinationList: combinationList.marketingMoreGoodsInfoResponseList,
            currId:
              combinationList.marketingMoreGoodsInfoResponseList.length > 0 &&
              combinationList.marketingMoreGoodsInfoResponseList[0].marketingSuitsGoodsInfoDetailVO.marketingId,
          },
        },
      });
      if (combinationList.marketingMoreGoodsInfoResponseList.length > 0) {
        actions.action.changeCheck(
          combinationList.marketingMoreGoodsInfoResponseList[0].marketingSuitsGoodsInfoDetailVO.marketingId,
        );
      }
    },
    /**
     * 重置
     */
    async clean() {
      await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        pagesPackageBGoodsCombinationGoodsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageBGoodsCombinationGoodsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
