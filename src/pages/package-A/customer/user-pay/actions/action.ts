import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {ValidConst} from 'wmkit';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //修改手机号
    getMobile(tel) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.mobile',
          value: tel,
        },
      });
    },
    //修改验证码
    getCode(code) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.code',
          value: code,
        },
      });
    },
    //发送验证码
    async sendCode() {
      let {mobile, forget} = getData().main;
      if (this._testTel(mobile)) {
        api.customerBalanceBaseController.balancePayPassword({customerAccount: mobile, isForgetPassword: forget});
        return true;
      }
    },
    // 手机号码校验
    _testTel(tel: string) {
      const regex = ValidConst.phone;
      if (tel == '') {
        Taro.showToast({
          title: '请填写手机号！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regex.test(tel)) {
        Taro.showToast({
          title: '无效的手机号！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else {
        return true;
      }
    },
    //点击下一步
    async doNext() {
      let {mobile, code, forget} = getData().main;
      if (this._testTel(mobile)) {
        if (code == '') {
          Taro.showToast({
            title: '请填写验证码！',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else {
          const res = await api.customerBalanceBaseController.validatePayCode({
            customerAccount: mobile,
            verifyCode: code,
            isForgetPassword: forget,
          });
          if (res) {
            /**验证码校验成功，跳转到下一个页面*/
            Taro.redirectTo({url: `/pages/package-A/customer/user-pay-next/index?forget=${forget}`});
            /**验证码和customerId写入localstorage*/
            await Taro.setStorageSync(cache.PAY_CODE, code);
            await Taro.setStorageSync(cache.CUSTOMER_ID, res);
          } else {
            return false;
          }
        }
      } else {
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserPayMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
