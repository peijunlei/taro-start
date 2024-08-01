import Store, {getReducerData} from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {VAS} from 'wmkit';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import GoodsAction from './goodsAction';

import ActivityAction from './activityAction';

import loginGoodsListMain from '../reducers/main';
//更新购物车角标
import {getShopCartNum, WMkit} from 'wmkit';
import api from '@/webapi';
import {IAllReducerProps} from '@/pages/package-B/goods/goods-list/types';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    activityAction: getActionProxy<typeof ActivityAction>(ActivityAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      __TARO_ENV !== 'h5' && (await actions.loadReducer());
      // if(WMkit.isLogin()){
      //   const id = await actions.activityAction.getDeliveryAddressId()
      //   actions.goodsAction.commonChange('main.request.deliveryAddressId', id)
      // }
      //查询预置搜索词
      if (!params.spreadFlag) {
        await actions.activityAction.queryPrekeywords();
      } else {
        await actions.goodsAction.commonChange('main.preKeyword', '');
      }
      //商品维度 goodsShowType(0:sku列表,1:spu列表)  imageShowType(0:小图,1:大图)
      let {goodsShowType, imageShowType} = await actions.goodsAction.goodsShowType();
      const {keywords, storeCateIds, cateId, storeId, spreadFlag, brandIds} = params;
      const newCateId = WMkit.isMall() ? '' : cateId || '';
      actions.goodsAction.commonChange([
        {paths: 'main.request.keywords', value: keywords ? decodeURI(keywords) : null},
        {paths: 'main.request.cateId', value: newCateId},
        {paths: 'main.spreadFlag', value: spreadFlag || false},
        {paths: 'main.request.storeId', value: ''},
        {paths: 'main.ifStore', value: false},
        {paths: 'main.imageShowType', value: imageShowType},
        {paths: 'main.request.brandIds', value: JSON.parse(brandIds || '[]')},
        {paths: 'main.isReady', value: false},
        {paths: 'main.request.pageNum', value: 0},
      ]);

      if (storeId) {
        if (WMkit.isMall()) {
          actions.goodsAction.commonChange([
            {paths: 'main.request.storeCateIds', value: storeCateIds ? [storeCateIds] : cateId ? [cateId] : []},
          ]);
        } else {
          actions.goodsAction.commonChange([
            {paths: 'main.request.storeCateIds', value: storeCateIds ? [storeCateIds] : []},
          ]);
        }
        actions.goodsAction.commonChange([
          {paths: 'main.request.keywords', value: keywords ? decodeURI(keywords) : null},
          {paths: 'main.request.storeId', value: storeId},
          {paths: 'main.ifStore', value: true},
        ]);
      } else {
        if (WMkit.isMall()) {
          actions.goodsAction.commonChange([
            {paths: 'main.request.storeCateIds', value: storeCateIds ? [storeCateIds] : cateId ? [cateId] : []},
          ]);
        }
      }

      let res: any;
      try {
        res = await Promise.all([
          actions.goodsAction.query(true, goodsShowType),
          actions.activityAction.queryOpenFlag(),
          actions.activityAction.getMenuList(),
          VAS.fetchIepInfo(),
          VAS.checkIepAuth(),
          WMkit.isOpenWechat(),
        ]);
      } catch (e) {}
      //查询商品分类
      //await actions.goodsAction.findGoodsCates();
      let iepInfo = res[3];
      let iepSwitch = res[4];
      let isOpenWechat = res[5];

      dispatch({
        type: Command.init,
        payload: {
          main: {
            goodsShowType,
            isDistributor: WMkit.isShowDistributionButton(), //是否显示分享赚、发圈素材、只看分享赚按钮,
            iepInfo,
            iepSwitch,
            isOpenWechat,
          },
        },
      });
      // actions.goodsAction.commonChange('main.loadStatus', 'loaded');
    },

    async updateShopCartNum() {
      // dispatch({
      //   type: Command.clean,
      //   payload: {},
      // });
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
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        loginGoodsListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginGoodsListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};
function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListMain'),
  };
}
//create by moon https://github.com/creasy2010/moon
