import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import purchaseBaseController from 'api/PurchaseBaseController';
import marketingController from 'api/MarketingController';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';

let token = Taro.getStorageSync('authInfo:token');
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsListCouponMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
