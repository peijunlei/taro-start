import Store, {getReducerData} from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import PublicAction from './publicAction';

import OtherAction from './otherAction';

import GroupDetailsMain from '../reducers/main';
//更新购物车角标
import {getShopCartNum} from 'wmkit';
import {IAllReducerProps} from '@/pages/package-B/goods/group-details/types';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  const actions = {
    publicAction: getActionProxy<typeof PublicAction>(PublicAction)(dispatch),

    otherAction: getActionProxy<typeof OtherAction>(OtherAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(skuId) {
      //判断商品详情评价是否展示
      let res = await api.systemPointsConfigController.isGoodsEvaluate();

      //商品详情数据查询
      await actions.publicAction.findSpuDetails(skuId, res.evaluate);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            skuId,
            isShow: res.evaluate,
            shopCarNum: await getShopCartNum(),
          },
        },
      });

      await this.initMoreSuitInfo(skuId);
    },

    /**
     *
     * @param skuId 切换规格
     */
    async changeSpecDetail(skuId) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.skuId',
          value: skuId,
        },
      });
      // actions.initMoreSuitInfo(skuId);
      await actions.init(skuId, undefined);
    },

    /**
     * 更新组合购信息
     */
    async initMoreSuitInfo(skuId) {
      let token = Taro.getStorageSync('authInfo:token');
      const {storeInfo} = getData().main;
      let marketingSuits;
      //判断是否登录
      if (token) {
        marketingSuits = await api.marketingController.getMoreSuitsInfoForLogin({
          goodsInfoId: skuId,
          storeId: storeInfo.storeId,
        });
      } else {
        marketingSuits = await api.marketingController.getMoreSuitsInfo({
          goodsInfoId: skuId,
        });
      }
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.marketingSuits',
          value: marketingSuits.marketingMoreGoodsInfoResponseList,
        },
      });
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
        GroupDetailsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['GroupDetailsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GroupDetailsMain'),
  };
}
//create by moon https://github.com/creasy2010/moon
