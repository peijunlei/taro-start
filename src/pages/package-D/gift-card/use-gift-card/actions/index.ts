import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import {getTradeUserGiftCard} from 'api/GiftCardController';

import Action from './action';

import USEGIFTCARDMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      const action = actions.action;
      await actions.loadReducer();
      const {goodsInfos = [], checkedGiftCards = []} = Taro.getStorageSync('confirm:split:info');
      const checkedCardIds = checkedGiftCards.map((i) => i.userGiftCardId);
      goodsInfos.forEach((item) => (item.splitPrice = item.pointSplitPrice));
      action.commonChange([
        {paths: 'main.goodsInfos', value: goodsInfos},
        {paths: 'main.checkedCardIds', value: checkedCardIds},
      ]);
      const info = await getTradeUserGiftCard({skuIdList: goodsInfos.map((i) => i.skuId)});
      
      const mockSkuId = Taro.getStorageSync('order_mock_skuId');
      const validList = info.validGiftCardInfoVO.map(v=>{
        return {
          ...v,
          skuIdList: v.skuIdList.concat(mockSkuId),
        }
      });
      validList.forEach((item) => {
        const skus = [];
        item.skuIdList.forEach((id) => {
          goodsInfos.forEach((g) => {
            if (g.skuId === id) skus.push(g);
          });
        });
        const stores = [];
        skus.forEach((item) => {
          let store = stores.find((s) => s.storeId === item.storeInfo.storeId);
          if (store) {
            store.goodsInfos.push(item);
          } else {
            store = JSON.parse(JSON.stringify(item.storeInfo));
            stores.push(store);
            store.goodsInfos = [item];
          }
        });
        item.storeGoods = stores;
      });
      action.commonChange([
        {paths: 'main.validNum', value: info.validNum},
        {paths: 'main.validList', value: validList},
        {paths: 'main.invalidNum', value: info.invalidNum},
        {paths: 'main.invalidList', value: info.invalidGiftCardInfoVO},
        {paths: 'main.isReady', value: true},
      ]);

      if (checkedCardIds.length > 0) {
        action.calcPrice(checkedCardIds);
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
        USEGIFTCARDMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['USEGIFTCARDMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};
