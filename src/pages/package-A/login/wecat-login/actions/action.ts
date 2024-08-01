import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
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

    //授权登录
    async _authorize(code, userInfo) {
      let result = await api.wechatLoginController.getWeappOpenId(code);
      await Taro.setStorageSync(cache.AUTH_INFO, {nickName: userInfo.nickName, headimgurl: userInfo.avatarUrl});
      //存储 sessionKey
      let wecatAuthParams = {
        unionId: result.unionId,
        openId: result.openid,
        sessionKey: result.sessionKey,
        appId: result.appId,
        nickName: userInfo.nickName,
        headimgurl: userInfo.avatarUrl,
      };
      await Taro.setStorageSync('wecatAuthParams', wecatAuthParams);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            wecatAuthParams,
            // 是否登录，这个字段不要忽视，是区分新老用户的标志，如果是新用户则视为注册，需要结合注册的设置
            loginFlag: result.loginFlag,
          },
        },
      });
    },

    //获取手机号
    async getPhoneNum(sessionKey, encryptedData, iv) {
      let result = await api.authorizeController.getPhoneNum({
        encryptedData,
        iv,
        sessionKey,
      });
      return result;
    },

    //快捷登录
    async _authorizePhoneLogin(code, encryptedData, iv, inviteCode) {
      let {
        wecatAuthParams: {sessionKey, unionId, openId, nickName, headimgurl},
      } = getData().main;

      let wecatAuthParams = Taro.getStorageSync('wecatAuthParams') ? Taro.getStorageSync('wecatAuthParams') : {};
      let userInfo;
      //如果缓存莫名其妙没获取到 就在请求一遍接口 拿相应的信息
      if (JSON.stringify(wecatAuthParams) == '{}') {
        Taro.getUserInfo({
          success: function(res) {
            userInfo = res.userInfo;
          },
        });

        let result = await api.wechatLoginController.getWeappOpenId(code);
        wecatAuthParams = {
          unionId: result.unionId,
          openId: result.openid,
          sessionKey: result.sessionKey,
          appId: result.appId,
          nickName: userInfo.nickName,
          headimgurl: userInfo.avatarUrl,
          // 邀请码，根据后台的设置，接口进行校验
          inviteCode: inviteCode,
        };
      }

      //获取手机号
      let phonNumber = await this.getPhoneNum(
        wecatAuthParams ? wecatAuthParams.sessionKey : sessionKey,
        encryptedData,
        iv,
      );

      try {
        let result = await api.wechatLoginController.weChatQuickLogin({
          code: code,
          channel: 'WEAPP',
          unionId: wecatAuthParams.unionId ? wecatAuthParams.unionId : unionId,
          phonNumber,
          nickName: wecatAuthParams.nickName ? wecatAuthParams.nickName : nickName,
          headimgurl: wecatAuthParams.headimgurl ? wecatAuthParams.headimgurl : nickName,
          openId: wecatAuthParams.openid ? wecatAuthParams.openid : openId,
          inviteCode: inviteCode,
        });
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
      } catch (e) {
        Taro.showToast({
          title: '请填写正确的邀请码!',
          icon: 'none',
          duration: 2000,
        });
      }
    },
    //合并购物车数据
    async mergePurchase(list) {
      await api.purchaseBaseController.mergePurchase({purchaseMergeDTOList: list});
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginWecatLoginMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
