import {_} from 'wmkit';
import api from 'api';
import Taro from '@tarojs/taro';

/**
 * 微信授权登录--请求微信，跳转到微信授权页面，用户有感知
 */
export const getAuth = async (url, type) => {
  // 获取微信授信配置
  try {
    const context = await api.wechatLoginController.getWechatLoginSetDetail('MOBILE');
    // 获取公众号配置的appId
    if (!context || !context.appId) {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    const appId = context.appId;
    const scope = 'snsapi_userinfo';
    //仅表示有无授权
    const state = _.rndNum(10).toString() + type;
    const redirectURL = encodeURIComponent(url);
    // await WMkit.setIsDistributorFlag();
    //授权地址
    const authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectURL}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    console.log('**********请求微信，跳转到微信授权页面，用户有感知::state:' + state + '::url:' + url);
    window.location.href = authURL;
  } catch (e) {
    // 提示不展示出来，输出到控制台即可,便于开发排查
    console.error('获取微信授权配置异常');
    // Taro.showToast({
    //   title: '获取微信授权配置异常',
    //   icon:'none'
    // });
  }
};

/**
 * 微信授权,用户无感知
 */
export const wechatGetOpenId = async ({redirectURL}) => {
  // 获取微信授信配置
  try {
    const context = await api.wechatLoginController.getWechatLoginSetDetail('MOBILE');
    // 获取公众号配置的appId
    const appId = context.appId;
    // 这种方式用户无感知
    const scope = 'snsapi_base';
    //仅表示有无授权
    const state = 'b2bOpenId';
    console.log('**********微信授权,用户无感知::state' + state + '::url:' + redirectURL);
    redirectURL = encodeURIComponent(redirectURL);
    //授权地址
    const authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectURL}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    window.location.href = authURL;
  } catch (e) {
    // 提示不展示出来，输出到控制台即可,便于开发排查
    console.error('获取微信授权配置异常');
    // Taro.showToast({
    //   title: '获取微信授权配置异常',
    //   icon:'none'
    // });
  }
};

/**
 * 微信授权登录--请求微信，跳转到微信授权页面，用户有感知
 */
export const getOpenId = async () => {
  return new Promise(async (resolve, reject) => {
    await Taro.login({
      async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
        if (res.code) {
          try {
            const openid = await api.payController.getLittleProgramOpenId(res.code);
            resolve(openid);
          } catch (e) {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      },
    });
  });
};
