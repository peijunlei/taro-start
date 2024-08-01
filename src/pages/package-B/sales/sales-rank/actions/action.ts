import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async changeTitle(type) {
      action.commonChange([
        { paths: 'main.tab', value: type },{paths: 'main.isLoadingList', value: true}]);
      const res = await api.distributionCustomerRankingController.getRanking({ type: type });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            rankList: res.rankingVOList,
            myRank: res.distributionCustomerRankingVO,
            isLoadingList:false
          },
        },
      });
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageBSalesSalesRankMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
