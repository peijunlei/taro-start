import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {cache} from 'config';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //输入密码
    setPassword(value) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.password',
          value: value,
        },
      });
    },
    _isLogin() {
      return Boolean(Taro.getStorageSync('b2b-wechat@login'));
    },
    //点击下一步
    async submit() {
      let {password} = getData().main;
      const vertiCode = Taro.getStorageSync(cache.FORGET_CODE);
      const customerId = Taro.getStorageSync(cache.CUSTOMER_ID);
      const regex = /^[A-Za-z0-9]{6,16}$/;
      // const regex = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/;

      if (password == '') {
        Taro.showToast({
          title: '请填写密码！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regex.test(password)) {
        Taro.showToast({
          title: '密码仅限6~16位数字或字母！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else {
        try {
          await api.loginBaseController.passwordByForgot({
            customerId: customerId,
            verifyCode: vertiCode,
            customerPassword: password,
            isForgetPassword: false,
          });
          await Taro.showToast({
            title: '密码修改成功!',
            icon: 'none',
            duration: 2000,
          });
          await this.isLogin();
          return true;
        } catch (error) {
          return false;
        }
      }
    },
    async isLogin() {
      if (WMkit.isLogin()) {
        const customer = await api.customerBaseController.findCustomerMobile(); //用户信息
        await Taro.removeStorageSync(cache.LOGIN_DATA);
        await Taro.removeStorageSync('authInfo:token');
        await Taro.removeStorageSync(cache.IS_DISTRIBUTOR);
        await Taro.removeStorageSync(cache.DISTRIBUTOR_FLAG);
        await Taro.removeStorageSync(cache.AUTH_INFO);
        await Taro.removeStorageSync('mini::shopCartSku');
        await Taro.removeStorageSync('mini::shopCartMarketing');
        await Taro.removeStorageSync('wecatAuthParams');
        setTimeout(() => {
          Taro.navigateTo({
            url: `/pages/package-A/login/login/index?source=home&mobile=${customer.customerAccount}`,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          Taro.navigateTo({
            url: `/pages/package-A/login/login/index?source=home&mobile=`,
          });
        }, 1000);
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserPwNextMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
