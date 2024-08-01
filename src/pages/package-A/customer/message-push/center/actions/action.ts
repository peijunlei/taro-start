import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import actions from './index';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async setMessageAllRead() {
      try {
        await api.messageController.setMessageAllRead();
      } catch (e) { }
      actions(dispatch).actions.init();
    },
  };
  return action;
};

export function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerMessagePushCenterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
