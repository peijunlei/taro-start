import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderShipListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
