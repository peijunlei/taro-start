import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
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
    async edit_2(customerAccount) {
      if (customerAccount && (customerAccount.length < 5 || customerAccount.length > 60)) {
        Taro.showToast({
          title: '应为5-60个字符以内！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      await Taro.setStorageSync(`mini::editUserInfo`, 'contactAddressInfo');
      await Taro.setStorageSync(`mini::contactAddressInfo`, customerAccount);
      await Taro.navigateBack();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserInfoEditEditAssressInfoMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
