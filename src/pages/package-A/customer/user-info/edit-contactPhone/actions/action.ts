import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async edit_4(customerAccount) {
      if (customerAccount && !regexTel.test(customerAccount)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      await Taro.setStorageSync(`mini::editUserInfo`, 'contactPhone');
      await Taro.setStorageSync(`mini::contactPhone`, customerAccount);
      Taro.navigateBack();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserInfoEditEditContactPhoneMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
