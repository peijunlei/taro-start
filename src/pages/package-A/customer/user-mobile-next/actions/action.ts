import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
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
    /**
     * 发送验证码给新手机号码
     * @returns {Promise<Result<ReturnResult>>}
     */
    async sendCode() {
      const regex = ValidConst.phone;
      let {mobile, oldMobile} = getData().main;

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
      } else if (mobile == oldMobile) {
        Taro.showToast({
          title: '请输入新的手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await api.customerBaseController.sendVerifiedCodeNew(mobile);
        Taro.showToast({
          title: '验证码已发送，请注意查收!',
          icon: 'none',
          duration: 2000,
        });
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
      const regex = ValidConst.phone;
      let {mobile, code} = getData().main;
      const oldVerifyCode = Taro.getStorageSync(cache.OLD_VERIFY_CODE);
      if (mobile == '') {
        Taro.showToast({
          title: '请填写手机号！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regex.test(mobile)) {
        Taro.showToast({
          title: '无效的手机号！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (code == '') {
        Taro.showToast({
          title: '请填写验证码！',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else {
        try {
          await api.customerBaseController.changeNewMobile({
            oldVerifyCode: oldVerifyCode,
            customerAccount: mobile,
            verifyCode: code,
          });
          Taro.showToast({
            title: '修改绑定手机号成功!',
            icon: 'none',
            duration: 2000,
          });
          Taro.clearStorageSync(); //清除全部缓存
          Taro.navigateTo({url: '/pages/package-A/login/login/index'});
          return true;
        } catch (error) {
          return false;
        }
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserMobileNextMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
