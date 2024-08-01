import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {cache} from 'config';
import Taro from '@tarojs/taro';
import {Const} from 'config';
import moment from 'dayjs';

import Action from './action';

import packageBSalesSalesRankMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingList', true);
      let customerInfo = Taro.getStorageSync(cache.LOGIN_DATA);
      //是否为分销员
      let isDistributor = customerInfo && customerInfo.customerDetail.isDistributor;
      if (isDistributor) {
        // 当前用户是分销员
        actions.action.commonChange('main.isDistributor', true);
      }
      // 最近一周
      let start = moment()
        .subtract(7, 'days')
        .format(Const.DATE_INCLINE);
      let end = moment()
        .subtract(1, 'days')
        .format(Const.DATE_INCLINE);
      actions.action.commonChange([
        {paths: 'main.rang', value: `${start}~${end}`},
        {paths: 'main.tab', value: 'inviteCount'},
      ]);
      const res = await api.distributionCustomerRankingController.getRanking({type: 'inviteCount'});
      dispatch({
        type: Command.init,
        payload: {
          main: {
            rankList: res.rankingVOList,
            myRank: res.distributionCustomerRankingVO,
          },
        },
      });
      actions.action.commonChange('main.isLoadingList', false);
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
        packageBSalesSalesRankMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBSalesSalesRankMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
