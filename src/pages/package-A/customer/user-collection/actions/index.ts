import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro from '@tarojs/taro';

import Action, {getData} from './action';

import packageACustomerUserCollectionMain from '../reducers/main';
import SystemPointsConfigController from 'api/SystemPointsConfigController';
import GoodsFollowBaseController from 'api/GoodsFollowBaseController';
import PurchaseBaseController from 'api/PurchaseBaseController';
import {getShopCartNum, VAS, WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.ifEvalShow();

      let iepInfo = await VAS.fetchIepInfo();
      let iepSwitch = await VAS.checkIepAuth();
      const isOpenWechat = await WMkit.isOpenWechat();
      //数据加载完 关掉骨架屏
      actions.action.commonChange('main.iepInfo', iepInfo);
      actions.action.commonChange('main.loadSkeleton', false);
      actions.action.commonChange('main.isOpenWechat', isOpenWechat);
    },

    async clearGoods() {
      await GoodsFollowBaseController.deleteGoodsFollows_();
      const res = await GoodsFollowBaseController.info({});
      const {reload} = getData().main;
      const list = res.goodsInfos.content.map(v=>{
        const item = res.goodses.find(v2=>v2.goodsId===v.goodsId)
        return {
          ...v,
          goodsStatus:item?.goodsStatus,
          stock:item?.goodsStatus===5?9999999:v.stock,
          estimatedDeliveryTime:item?.estimatedDeliveryTime
        }
      })
      actions.action.commonChange([
        {
          paths: 'main.reload',
          value: !reload,
        },
        {
          paths: 'main.ifModify',
          value: false,
        },
        {
          paths: 'main.selectedList',
          value: [],
        },
        {
          paths: 'main.list',
          value: list,
        },
        {
          paths: 'main.total',
          value: res.goodsInfos.total,
        },
        {
          paths: 'main.ifSelectAll',
          value: false,
        },
      ]);
    },

    async deleteGoods() {
      const {selectedList, reload, list} = getData().main;
      await GoodsFollowBaseController.delete_({goodsInfoIds: selectedList});
      // const res = await GoodsFollowBaseController.info({});
      await actions.action.commonChange([
        {
          paths: 'main.reload',
          value: !reload,
        },
        {
          paths: 'main.ifModify',
          value: false,
        },
        {
          paths: 'main.selectedList',
          value: [],
        },
        // {
        //   paths: 'main.list',
        //   value: res.goodsInfos.content,
        // },
        // {
        //   paths: 'main.total',
        //   value: res.goodsInfos.total,
        // },
      ]);
    },

    //修改SKU的数量
    async _changeSkuNum(skuId, skuNum) {
      await actions._changeSkuNumDidLogin(skuId, skuNum);
    },

    //登录的情况下修改SKU
    async _changeSkuNumDidLogin(skuId, skuNum) {
      await PurchaseBaseController.edit({
        goodsInfoId: skuId,
        goodsNum: skuNum,
        verifyStock: false,
      });
    },

    async ifEvalShow() {
      const {evaluate} = await SystemPointsConfigController.isGoodsEvaluate();
      actions.action.commonChange('main.ifEvalShow', evaluate);
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({type: Command.clean});
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageACustomerUserCollectionMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerUserCollectionMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
