import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import * as _ from '@/wmkit/common/util';
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
    async query(id) {
      const res = await api.customerCreditAccountBaseController.getCreditRecoverDetail(id);
      await action.commonChange('main.creditDetailInfo', res);
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('creditReturnDetail'),
  };
}

//create by moon https://github.com/creasy2010/moon
