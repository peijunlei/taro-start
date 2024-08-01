import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import PublicAction from './publicAction';

import OtherAction from './otherAction';

import rewardGoodsDetailsMain from '../reducers/main';
//更新购物车角标
import {getShopCartNum} from 'wmkit';
export default (dispatch: Dispatch) => {
  const actions = {
    publicAction: getActionProxy<typeof PublicAction>(PublicAction)(dispatch),

    otherAction: getActionProxy<typeof OtherAction>(OtherAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(skuId) {
      await actions.loadReducer();

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
        rewardGoodsDetailsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['rewardGoodsDetailsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
