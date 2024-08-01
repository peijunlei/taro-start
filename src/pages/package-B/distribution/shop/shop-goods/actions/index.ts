import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import PackageBDistributionShopShopGoodsMain from '../reducers/main';
//更新购物车角标
import {_, WMkit} from 'wmkit';
export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      await actions.loadReducer();
      const {keywords, cateId, storeId, storeCateIds} = params || _.searchToObj(window.location.search) || {};
      actions.goodsAction.commonChange([
        {paths: 'main.request.keywords', value: (keywords && decodeURI(keywords)) || ''},
        {paths: 'main.request.cateId', value: cateId || ''},
      ]);
      if (storeId) {
        actions.goodsAction.commonChange([
          {paths: 'main.request.storeId', value: storeId},
          {paths: 'main.ifStore', value: true},
          {paths: 'main.request.storeCateIds', value: storeCateIds ? [storeCateIds] : []},
        ]);
      }
      //商品列表查询
      await actions.goodsAction.query(true);
      //查询商品分类
      if (cateId) {
        await actions.goodsAction.findGoodsCates();
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            isDistributor: WMkit.isShowDistributionButton(), //是否显示分享赚、发圈素材、只看分享赚按钮
          },
        },
      });
      actions.goodsAction.commonChange('main.loadStatus', 'loaded');
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
        PackageBDistributionShopShopGoodsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['PackageBDistributionShopShopGoodsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
