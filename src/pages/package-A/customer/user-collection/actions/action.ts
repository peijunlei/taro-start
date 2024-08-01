import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    //发圈素材
    async getDistributor(goodsInfo) {
      const result = await WMkit.getDistributorStatus();
      if (result.distributionEnable) {
        Taro.navigateTo({
          url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${goodsInfo.goodsInfoId}`,
        });
      }
    },

    //分享赚
    async shareModal(goodsInfo) {
      action.commonChange('main.goodsInfo', goodsInfo);
      action.commonChange('main.goodsShareVisible', true);
    },
  };
  return action;
};

export function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserCollectionMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
