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
    async edit_3(customerAccount) {
      if (customerAccount && (customerAccount.length < 2 || customerAccount.length > 15)) {
        Taro.showToast({
          title: '联系人应为2～15个字符！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      await Taro.setStorageSync(`mini::editUserInfo`, 'contactName');
      await Taro.setStorageSync(`mini::contactName`, customerAccount);
      Taro.navigateBack();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserInfoEditEditContactNameMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
