import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {VAS} from 'wmkit';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import TabBarGoodsListMain from '../reducers/main';
//更新购物车角标
import {getShopCartNum, WMkit} from 'wmkit';
export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      __TARO_ENV !== 'h5' && (await actions.loadReducer());
      //查询预置搜索词
      if (!params.spreadFlag) {
        await actions.activityAction.queryPrekeywords();
      } else {
        await actions.goodsAction.commonChange('main.preKeyword', '');
      }
      //商品维度 goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      let {goodsShowType, imageShowType} = await actions.goodsAction.goodsShowType();
      const {keywords, storeCateIds, cateId, storeId, spreadFlag} = params;
      actions.goodsAction.commonChange([
        {paths: 'main.request.keywords', value: (keywords && decodeURI(keywords)) || ''},
        {paths: 'main.request.cateId', value: cateId || ''},
        {paths: 'main.spreadFlag', value: spreadFlag || false},
        {paths: 'main.imageShowType', value: imageShowType},
      ]);
      if (storeId) {
        actions.goodsAction.commonChange([
          {paths: 'main.request.storeCateIds', value: storeCateIds ? [storeCateIds] : []},
          {paths: 'main.request.storeId', value: storeId},
          {paths: 'main.ifStore', value: true},
        ]);
      }

      //商品列表查询
      await actions.goodsAction.query(true, goodsShowType);

      await actions.activityAction.queryOpenFlag();

      actions.activityAction.getMenuList();

      //查询商品分类
      //await actions.goodsAction.findGoodsCates();
      let iepInfo = await VAS.fetchIepInfo();
      let iepSwitch = await VAS.checkIepAuth();
      const isOpenWechat = await WMkit.isOpenWechat();

      dispatch({
        type: Command.init,
        payload: {
          main: {
            goodsShowType,
            isDistributor: WMkit.isShowDistributionButton(), //是否显示分享赚、发圈素材、只看分享赚按钮,
            iepInfo,
            iepSwitch,
            isOpenWechat: isOpenWechat,
          },
        },
      });
      actions.goodsAction.commonChange('main.loadStatus', 'loaded');
    },

    async updateShopCartNum() {
      const num = await getShopCartNum();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            shopCarNum: num,
          },
        },
      });
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
      // __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        TabBarGoodsListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['TabBarGoodsListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
