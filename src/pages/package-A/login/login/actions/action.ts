import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import { cache } from 'config';
import { Base64 } from '@/utils/common-functions';
import { WMkit, wxAuth, msg, ValidConst, } from 'wmkit';

const regexTel = ValidConst.phone;
const regexPass = ValidConst.pwd;
const verificationCode = /^\d{6}$/;
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
      let { phone } = getData().main;

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
        await api.loginBaseController.sendLoginCode(phone);
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
     * 登录
     */
    async login(switchLogin) {
      let { phone, verifiCode, password, isAgree } = getData().main;

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
      //分别校验验证码跟密码登录
      if (switchLogin) {
        if (password == '') {
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
        } else if (!isAgree) {
          await Taro.showToast({
            title: '请先阅读并同意相关协议',
            icon: 'none',
            duration: 2000,
          });
          return false;
        }
        //密码登录
        this.passLogin(phone, password);
      } else {
        if (verifiCode == '') {
          Taro.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else if (!verificationCode.test(verifiCode)) {
          Taro.showToast({
            title: '验证码格式有误',
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
        //验证码登录
        this.codeLogin(phone, verifiCode);
      }
    },

    //密码登录
    async passLogin(phone, password) {
      const base64 = new Base64();
      let result = await api.loginBaseController.login({
        customerAccount: base64.urlEncode(phone),
        customerPassword: base64.urlEncode(password),
      });
      //获取审核状态
      this.getLoginState(result);
    },

    //验证码登录
    async codeLogin(phone, verifiCode) {
      let result = await api.loginBaseController.loginWithVerificationCode({
        customerAccount: phone,
        verificationCode: verifiCode,
      });
      //获取审核状态
      this.getLoginState(result);
    },

    //获取审核状态
    async getLoginState(result) {
      Taro.setStorageSync('recommend-goods-list', '2');

      const { mode, toUrl } = getData().main
      if (mode) { // 只有验证码登录
        await Taro.setStorage({
          key: 'authInfo:token',
          data: result.token,
        });
        await Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: result,
        });
        if(__TARO_ENV==='h5'){
          sessionStorage.setItem(cache.IS_COMM_LOGIN, '1');
        }
        Taro.redirectTo({
          url: toUrl+'?isCommLogin=1',
        })
      } else {
        //获取审核状态
        await WMkit.switchLogin(result, Taro.getCurrentPages());
      }
    },

    //小程序授权登录-1
    async _authorize(code, userInfo, detail) {
      let result = await api.wechatLoginController.authorize({
        code: code,
        iv: detail.iv,
        encryptedData: detail.encryptedData,
      });
      await Taro.setStorageSync(cache.AUTH_INFO, { nickName: userInfo.nickName, headimgurl: userInfo.avatarUrl });

      //新的登录流程
      this.newLoginProcess(result);
    },
    //新的登录流程
    async newLoginProcess(result) {
      //点击微信登录，会进行重定向，此时页面被刷新，state发生变化，走微信授权逻辑
      const { loginFlag, info } = result;
      // loginFlag 为true时表示走登录流程，false微信未绑定过账户
      if (loginFlag) {
        await WMkit.switchLogin(result.login, Taro.getCurrentPages());
        return false;
      } else {
        action.commonChange('main.loginFlag', false);
        // let infoStr = JSON.stringify(info);
        // await Taro.navigateTo({
        //   url: `/pages/package-A/login/wecat-bind-tel/index?info=${infoStr}&channel=WEAPP`,
        // });
      }
    },

    //小程序快捷登录-2
    async _authorizePhoneLogin(code, encryptedData, iv, inviteCode) {
      const result = await api.wechatLoginController.weChatLogin({
        code: code,
        channel: 'WEAPP',
        encryptedData,
        iv,
        inviteCode: inviteCode,
      });
      console.log('result2222', result);
      
      if (result.loginFlag) {
        await WMkit.switchLogin(result.login, Taro.getCurrentPages());
      } else {
        return result;
      }
    },
    //合并购物车数据
    async mergePurchase(list) {
      await api.purchaseBaseController.mergePurchase({ purchaseMergeDTOList: list });
    },

    //微信授权登录-h5-1
    async h5_authorize() {
      let {isAgree} = getData().main;
      if (!isAgree) {
        await Taro.showToast({
          title: '请先阅读并同意相关协议',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      const url = location.href;
      wxAuth.getAuth(url.split('?')[0], 'login');
    },

    //这个登录没有处理系统是否开启了用户信息完善开关、用户审核
    async login_handle(result) {
      if (result.loginFlag) {
        Taro.hideLoading();
        Taro.showToast({
          title: '登录成功',
          duration: 2000,
        });
        //缓存token
        await Taro.setStorage({
          key: 'authInfo:token',
          data: result.login.token,
        });
        await Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: result.login,
        });

        await WMkit.setIsDistributorFlag();

        //微信登录判断底部导航栏
        WMkit.changeTabBarText();

        //获取购物车本地缓存数据
        let purchaseData = Taro.getStorageSync('mini::shopCartSku');
        if (purchaseData) {
          //合并购物车数据
          this.mergePurchase(purchaseData);
          //清楚登录缓存信息
          Taro.removeStorageSync('mini::shopCartSku');
        }
        const routers = Taro.getCurrentPages();
        //如果是重定向方式过来的且是未登录时候点击分销中心或奖励中心的情形
        if (routers[0].options && routers[0].options.source == 'loadpage') {
          Taro.switchTab({
            url: `/pages/load-page/index`,
          });
        }
        //个别页面登录成功之后返回首页（如修改密码 注册页面已有登录）
        //开启需要登录才能访问时跳转
        if (
          (__TARO_ENV !== 'h5' &&
            routers[routers.length - 1].options &&
            routers[routers.length - 1].options.source == 'home') ||
          WMkit.needLogin
        ) {
          Taro.switchTab({
            url: `/pages/index/index`,
          });
          return false;
        }

        //点击发现
        if (routers[0].options && routers[0].options.source == 'find') {
          Taro.switchTab({
            url: `/pages/material-circle/index`,
          });
        } else {
          let url = routers[routers.length - 2];
          let obj = url.options;
          //登录跳转
          WMkit.loginJump(url, obj);
        }
      } else {
        Taro.hideLoading();
      }
      // 关闭弹窗,清空文本
      action.commonChange('main.visible', false);
      action.commonChange('main.inviteCode', '');
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginLoginMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
