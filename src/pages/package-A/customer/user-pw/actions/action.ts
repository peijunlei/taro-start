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
    _isLogin() {
      return Boolean(Taro.getStorageSync('b2b-wechat@login'));
    },
    //发送验证码
    async sendCode() {
      const regex = ValidConst.phone;
      let {mobile} = getData().main;
      if (mobile == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regex.test(mobile)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await api.loginBaseController.checkSmsByForgot({
          customerAccount: mobile,
          isForgetPassword: Boolean(!this._isLogin()),
        });
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000,
        });
        return true;
      } catch (error) {
        return false;
      }
      return true;
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
      let {mobile, code} = getData().main;
      if (action._testTel(mobile)) {
        if (code == '') {
          Taro.showToast({
            title: '请填写验证码！',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else {
          const res = await api.loginBaseController.validateSmsByForgot({
            customerAccount: mobile,
            verifyCode: code,
            isForgetPassword: false,
          });
          if (res) {
            /**验证码校验成功，跳转到下一个页面*/
            Taro.navigateTo({url: '/pages/package-A/customer/user-pw-next/index'});
            /**验证码和customerId写入localstorage*/
            Taro.setStorageSync(cache.FORGET_CODE, code);
            Taro.setStorageSync(cache.CUSTOMER_ID, res);
          } else {
            return false;
          }
        }
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserPasswordMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
