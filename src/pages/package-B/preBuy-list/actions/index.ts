import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action, {getData} from './action';

import packageACustomerUserCollectionMain from '../reducers/main';
import SystemPointsConfigController from 'api/SystemPointsConfigController';
import GoodsFollowBaseController from 'api/GoodsFollowBaseController';
import PurchaseBaseController from 'api/PurchaseBaseController';
import AppointmentSaleBaseController from 'api/AppointmentSaleBaseController';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.ifEvalShow();
      // this.fetchPrebuyList()
    },
    async fetchPrebuyList() {
      let params = {
        pageSize: 100,
      };
      const res = await AppointmentSaleBaseController.appointmentSalePage(params);
    },
    async clearGoods() {
      const res = await GoodsFollowBaseController.deleteGoodsFollows_();
    },

    async deleteGoods() {
      const {selectedList} = getData().main;
      const res = GoodsFollowBaseController.delete_({goodsInfoIds: selectedList});
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

    /**
     * 获取服务时间
     */
    async queryServerTime() {
      const result: any = await api.systemController.queryServerTime();
      actions.action.commonChange('main.serverTime', result);
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
