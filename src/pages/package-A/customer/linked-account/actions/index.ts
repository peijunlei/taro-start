import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageACustomerLinkedAccountMain from '../reducers/main';
import Taro from '@tarojs/taro';
import ThirdLoginController from 'api/ThirdLoginController';
import WechatLoginController from 'api/WechatLoginController';
import {_} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(code?) {
      await actions.loadReducer();
      if (code) {
        await actions.h5BindWechat(code);
      }

      //微信回调，获取code
      const res = await WechatLoginController.getWechatServerStatus('MOBILE');
      dispatch({
        type: Command.init,
        payload: {
          main: {
            serverStatus: {
              wechat: res,
            },
          },
        },
      });
      if (!!res) {
        const res1 = await ThirdLoginController.queryLinkedAccountFlags();
        actions.action.commonChange('main.wxFlag', res1.wxFlag);
      }
    },

    //小程序；待优化->应该是先调用wx.login，再去调用wx.getUserInfo方法,不然code登录凭证可能和解密信息所对应的sessionKey不对应，后台解密数据报错
    //现在解密报错，提示“网络不给力，请重试”
    async bindWechat(detail) {
      await Taro.login({
        async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
          if (res.code) {
            const result: any = await WechatLoginController.miniprogramBind({
              code: res.code,
              iv: detail.iv,
              encryptedData: detail.encryptedData,
            });
            await Taro.showToast({
              title: '绑定成功！',
              icon: 'none',
              complete: () => {
                actions.init();
              },
            });
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        },
      });
    },

    //H5绑定
    async h5BindWechat(code) {
      const result: any = await WechatLoginController.weChatBind2({
        code: code,
        type: 'MOBILE',
      });
      await Taro.showToast({
        title: '绑定成功！',
        icon: 'none',
        complete: () => actions.init(),
      });
      setTimeout(() => {
        Taro.switchTab({
          url: '/pages/user-center/index',
        });
      }, 1500);
    },

    async deleteWechat() {
      const res = await ThirdLoginController.removeBind_('WECHAT');
      console.log(res);
      await Taro.showToast({
        title: '解绑成功！',
        icon: 'none',
        complete: () => actions.init(),
      });
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
      //如果页面调用外部连接获取code后重定向到这个页面，按返回会报错。目前这样处理
      if (__TARO_ENV === 'h5') {
        console.log('---------*---------  ');
        // Taro.redirectTo({url: '/pages/package-A/customer/user-safe/index'});
      }
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        pagesPackageACustomerLinkedAccountMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerLinkedAccountMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
