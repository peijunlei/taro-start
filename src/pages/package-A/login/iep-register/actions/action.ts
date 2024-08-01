import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit, ValidConst} from 'wmkit';
import {cache} from 'config';

const regexTel = ValidConst.phone;
const regexPass = ValidConst.pwd;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 发送验证码事件
     */
    async sendCode() {
      console.log(getData());
      let {
        userInfo: {phone},
      } = getData().main;

      if (phone == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await api.loginBaseController.checkSmsByRegister({
          customerAccount: phone,
          patchca: '',
          uuid: '',
        });
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000,
        });
      } catch (error) {
        return false;
      }

      return true;
    },

    /**
     * 企业用户注册事件
     */
    async submit() {
      let {
        userInfo: {phone, verifiCode, password},
        registerCode,
        openFlag,
        inviteeId,
        registerLimitType,
        isAgree
      } = getData().main;
      if (phone == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (verifiCode == '') {
        Taro.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (password == '') {
        Taro.showToast({
          title: '请输入密码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexPass.test(password)) {
        Taro.showToast({
          title: '密码格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (registerCode && !inviteeId && openFlag == 1 && !WMkit.testInviteCode(registerCode)) {
        Taro.showToast({
          title: '邀请码格式错误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!registerCode && openFlag == 1 && registerLimitType == 1) {
        await Taro.showToast({
          title: '请输入邀请码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }else if (!isAgree) {
        await Taro.showToast({
          title: '请先阅读并同意相关协议',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      let result = (await api.loginBaseController.registerEnterprise({
        firstRegisterFlag: true,
        customerAccount: phone,
        verifyCode: verifiCode,
        customerPassword: password,
        inviteCode: registerCode,
      })) as any;
      if (result) {
        // a.设置完善信息的token
        await Taro.setStorage({
          key: cache.ACCOUNT_TOKEN,
          data: result.token,
        });
        //注册完企业信息后跳转到，企业信息完善界面
        Taro.navigateTo({
          url: `/pages/package-A/login/iep-register-info/index?customerAccount=${phone}&customerPassword=${password}&verifyCode=${verifiCode}&inviteCode=${registerCode}`,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('iepRegisterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
