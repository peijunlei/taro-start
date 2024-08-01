import SearchHistoryBaseController from 'api/SearchHistoryBaseController';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import Action, {getData} from './action';

import StoreSearchMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {ifLogin} from '@/utils/common-functions';
import {pvUvStatics, WMkit} from 'wmkit';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(storeId) {
      await actions.loadReducer();
      actions.action.commonChange('main.storeId', storeId);
      this.getHistory(storeId);
    },

    async pvUvStaticsMyPvUvStatis(storeId) {
      if (WMkit.isLogin()) {
        let result = await api.storeBaseController.queryStore({storeId});
        /**店铺pv/uv埋点*/
        pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
      } else {
        let result = await api.storeBaseController.queryStoreUnlogin({storeId});
        /**店铺pv/uv埋点*/
        pvUvStatics.myPvUvStatis({shopId: result.companyInfoId});
      }
    },

    async getHistory(storeId) {
      if (!ifLogin()) {
        return;
      }
      const historyList = await SearchHistoryBaseController.queryStore(storeId);
      actions.action.commonChange('main.history', historyList);
    },

    async addHistory(keywords, storeId) {
      if (!ifLogin()) {
        return;
      }
      if (!keywords) {
        return;
      }
      await SearchHistoryBaseController.addStore(storeId, {keyword: keywords});
    },

    async clearHistory() {
      if (!ifLogin()) {
        return;
      }
      actions.action.commonChange('main.history', []);
      const {storeId} = getData().main;
      await SearchHistoryBaseController.deleteStore_(+storeId);
    },

    async search() {
      const {keywords = '', storeId} = getData().main;
      if (ifLogin()) {
        actions.addHistory(keywords, storeId);
        actions.action.commonChange('main.keywords', '');
      }
      let url = `/pages/package-B/goods/goods-list/index?keywords=${keywords}&storeId=${storeId}`;

      Taro.redirectTo({
        url,
      });
    },

    /**
     * 重置
     */
    async clean() {
      actions.action.commonChange('main.keywords', '');
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        StoreSearchMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['StoreSearchMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
