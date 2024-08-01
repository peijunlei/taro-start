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
    },

    setTime() {
      let {minutes} = getData().main;
      const start = minutes;
      const time = start - 1;
      if (time > 0) {
        action.commonChange('main.minutes', time);
        setTimeout(() => {
          this.setTime();
        }, 1000);
      } else {
        Taro.redirectTo({
          url: '/pages/package-A/login/login/index',
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginSuccessMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
