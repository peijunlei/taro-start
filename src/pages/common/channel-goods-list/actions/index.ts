import Store, { getReducerData } from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import TabbarChannelGoodsListMain from '../reducers/main';
//更新购物车角标
import { getShopCartNum, WMkit, VAS } from 'wmkit';
import { IAllReducerProps } from '../types';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),
    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(params,props:any) {
      __TARO_ENV !== 'h5' && (await actions.loadReducer());
      //查询预置搜索词
      if (!params.spreadFlag) {
        await actions.activityAction.queryPrekeywords();
      } else {
        await actions.goodsAction.commonChange('main.preKeyword', '');
      }
      //商品维度 goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      let { goodsShowType, imageShowType } = await actions.goodsAction.goodsShowType();
      const {id,isTabbar} = props||{}
      const { channelId=id, keywords, cateId, spreadFlag, brandIds } = params;
      const newCateId = WMkit.isMall() ? '' : cateId || '';
      // 查询频道商品配置
      if (channelId) {
        actions.goodsAction.findChannelGoodsConfig(channelId);
      }
      actions.goodsAction.commonChange([
        { paths: 'main.isTabbar', value: isTabbar },
        { paths: 'main.request.keywords', value: keywords ? decodeURI(keywords) : null },
        { paths: 'main.request.cateId', value: newCateId },
        { paths: 'main.spreadFlag', value: spreadFlag || false },
        { paths: 'main.request.storeId', value: '' },
        { paths: 'main.ifStore', value: false },
        { paths: 'main.imageShowType', value: imageShowType },
        { paths: 'main.request.brandIds', value: JSON.parse(brandIds || '[]') },
        { paths: 'main.isReady', value: false },
        { paths: 'main.request.pageNum', value: 0 },
        { paths: 'main.request.goodsChannelActivityId', value: channelId },
        { paths: 'main.goodsShowType', value: goodsShowType },
      ]);
      actions.goodsAction.query(true, goodsShowType);

    },

    async updateShopCartNum() {
      const num = await getShopCartNum();
      actions.goodsAction.commonChange('main.shopCarNum', num);
    },

    closeModal() {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            //批发规格显示隐藏
            batchSpecIsShow: false,
            //零售规格显示隐藏
            retailSpecIsShow: false,
            //分享赚弹窗
            goodsShareVisible: false,
            shareModalVisible: false,
            //筛选框显示隐藏
            screenIsShow: false,
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
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        TabbarChannelGoodsListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['TabbarChannelGoodsListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};
function getData(): IAllReducerProps {
  return {
    main: getReducerData('TabbarChannelGoodsListMain'),
  };
}
//create by moon https://github.com/creasy2010/moon
