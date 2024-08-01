import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import Taro from '@tarojs/taro';
import {cache} from 'config';
const regexPass = /^[A-Za-z0-9]{6}$/;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async submit() {
      let {pwdVal, forget} = getData().main;
      const vertiCode = Taro.getStorageSync(cache.PAY_CODE);
      const customerId = Taro.getStorageSync(cache.CUSTOMER_ID);
      if (pwdVal == '') {
        Taro.showToast({
          title: '请填写密码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexPass.test(pwdVal)) {
        Taro.showToast({
          title: '密码格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      await api.customerBalanceBaseController.passwordByForgot({
        customerId: customerId,
        verifyCode: vertiCode,
        customerPayPassword: pwdVal,
        isForgetPassword: forget,
      });
      await Taro.showToast({
        title: '设置成功!',
        icon: 'success',
        duration: 2000,
      });
      let a = setTimeout(() => {
        Taro.navigateBack();
        clearTimeout(a);
      }, 1000);
    },
    //输入密码
    setPassword(value) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.pwdVal',
          value: value,
        },
      });
    },
    setFocus(bool) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.payFocus',
          value: bool,
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageCustomerUserPayNextMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
