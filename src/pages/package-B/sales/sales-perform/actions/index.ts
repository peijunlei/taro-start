import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {WMkit} from 'wmkit';
import {getReducerData} from '@/redux/store';
import Taro from '@tarojs/taro';
import Action from './action';

import packageBSalesSalesPerformMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      if (await !WMkit.isDistributor()) {
        // 当前用户不是分销员
        return;
      }
      actions.action.commonChange([
        {paths: 'main.data.dataList', value: []},
        {paths: 'main.length', value: 1},
      ]);
      const res = await api.distributionController.queryDistributorInfoByCustomerId();
      const distributionId = res.distributionCustomerVO.distributionId;
      //分销员销售业绩
      actions.action.commonChange('main.distributionId', distributionId);
      //日销售统计
      //设置日销售统计条件
      const query = {
        distributionId: distributionId,
        dateCycleEnum: 0,
      };
      const res1 = await api.distributionPerformanceController.queryByDay({...query});
      actions.action.commonChange([
        {paths: 'main.data', value: res1},
        {paths: 'main.length', value: res1.dataList.length},
      ]);
      //初始化自然月数据
      this.getMonthData();
      actions.action.commonChange('main.isLoadingList',false)
    },

    /**
     * 得到自然月的时间
     */
    getMonthData() {
      let date = new Date();
      let monthData = new Array();
      for (let i = 0; i < 6; i++) {
        date.setMonth(date.getMonth() - 1, 1);
        monthData.push(this._formateDate(date));
      }
      actions.action.commonChange('main.monthData', monthData);
    },
    /*
    格式化日期
    */
    _formateDate(date) {
      const dateMap = {} as any;
      if (date instanceof Date) {
        dateMap.value = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        dateMap.year = date.getFullYear();
        dateMap.month = date.getMonth() + 1;
        return dateMap;
      }
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageBSalesSalesPerformMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBSalesSalesPerformMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
    getData() {
      return {
        main: getReducerData('packageBSalesSalesPerformMain'),
      };
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
