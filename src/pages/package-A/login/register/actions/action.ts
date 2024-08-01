import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import { WMkit, ValidConst } from 'wmkit';
import { cache } from 'config';
// 手机号 支持  1开头 11位  
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
      let {
        userInfo: { phone },
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
     * 注册事件
     */
    async submit() {
      let {
        registerCode,
        registerLimitType,
        openFlag,
        userInfo: { phone, verifiCode, password },
        isAgree
      } = getData().main;

      let shareUserId = WMkit.shareUserId() ? WMkit.shareUserId() : '';
      const inviteeId = WMkit.inviteeId();
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
          title: '密码仅支持6-16位字母或数字或特殊字符',
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
      } else if (!registerCode && !inviteeId && openFlag == 1 && registerLimitType == 1) {
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

      let result = await api.loginBaseController.register({
        customerAccount: phone,
        verifyCode: verifiCode,
        customerPassword: password,
        inviteeId: inviteeId,
        inviteCode: registerCode, //邀请码
        patcha: '',
        uuid: '',
        employeeId: '',
        shareUserId: shareUserId,
      });

      //注册成功
      this.successRegister(result);
    },

    //注册成功
    async successRegister(result) {
      //清楚登录缓存信息
      Taro.removeStorageSync('b2b-wechat@login');
      Taro.removeStorageSync('authInfo:token');
      Taro.removeStorageSync('mini::shopCartSku');
      Taro.removeStorageSync('mini::shopCartMarketing');
      Taro.removeStorageSync('wecatAuthParams');
      Taro.removeStorageSync('historyKeyList'); //清空本地搜索记录
      Taro.removeStorageSync('mini::shopCardAddress'); //清空购物车地址
      Taro.removeStorageSync('mini::confirmAddress'); //清空订单确认页地址
      Taro.removeStorageSync('purchase:info'); //清空订单确认页地址
      Taro.removeStorageSync('mini::orderOtherList'); //清空多地址订单确认页数据

      if (!result.isLoginFlag) {
        Taro.showToast({
          title: '注册成功',
          duration: 1000,
        });
        // a.设置完善信息的token
        await Taro.setStorage({
          key: cache.ACCOUNT_TOKEN,
          data: result.token,
        });

        /** 查询当前登录用户是否为分销员 */
        await WMkit.setIsDistributor();

        Taro.navigateTo({
          url: `/pages/package-A/login/account/index?customerId=${result.customerDetail.customerId}`,
        });
      } else {
        //缓存登录信息
        await Taro.setStorage({
          key: 'b2b-wechat@login',
          data: result,
        });
        await Taro.setStorage({
          key: 'authInfo:token',
          data: result.token,
        });
        await Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: result,
        });

        /** 查询当前登录用户是否为分销员 */
        await WMkit.setIsDistributor();

        Taro.showToast({
          title: '注册成功',
          duration: 1000,
        });
        if (WMkit.inviteeId() && WMkit.channelType() == '2') {
          //分享店铺，则进入分销员店铺精选页
          Taro.redirectTo({
            url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
          });
        } else {
          const routes = Taro.getCurrentPages()
          const curr = routes.find(v => (v.route || v.path).includes('give-gift-red-packet'))
          if (curr) {
            const id = curr.options.id
            const redPacketPage = __TARO_ENV === 'h5' ? curr.path : `/${curr.route}?id=${id}`
            console.log('redPacketPage', redPacketPage);
            setTimeout(() => {
              Taro.reLaunch({
                url: redPacketPage,
              });
            }, 1000);
            return
          } else {
            setTimeout(() => {
              Taro.switchTab({
                url: `/pages/user-center/index`,
              });
            }, 1000);
          }

        }
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginRegisterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
