import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    setCateId(cateId) {
      action.commonChange([
        {paths: 'main.cateId', value: cateId},
        {paths: 'main.isLoadingList', value: true},
      ]);
    },

    setScene(activityDate, activityTime, status) {
      action.commonChange([
        {paths: 'main.activityDate', value: activityDate},
        {paths: 'main.activityTime', value: activityTime},
        {paths: 'main.activityStatus', value: status},
        {paths: 'main.cateId', value: null},
        {paths: 'main.isLoadingList', value: true},
      ]);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('spikeHomeMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
