import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    /**
     * 0元支付
     */
    async defaultPay(tid) {
      try {
        await api.tradeBaseController.defaultPay(tid);
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment-success/index?tid=${tid}`
        })
      }catch (e) {
        return false;
      }
      return true;
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderPayDetailMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
