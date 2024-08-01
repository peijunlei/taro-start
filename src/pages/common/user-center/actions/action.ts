import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async choseService() {
      let {aliUrl, wechatInfo, isWechatOpen} = getData().main;
      if (isWechatOpen && wechatInfo && wechatInfo.serviceUrl && wechatInfo.enterpriseId) {
        // 直接跳转
        if (__TARO_ENV === 'h5') {
          window.location.href = wechatInfo.serviceUrl;
          // window.open(wechatInfo.serviceUrl);
        } else {
          wx.openCustomerServiceChat({
            extInfo: {url: wechatInfo.serviceUrl},
            corpId: wechatInfo.enterpriseId,
            success(res) {
              console.log(res);
            },
            fail(res) {
              console.log(res);
            },
          });
        }
        return;
      }
      if (aliUrl) {
        window.location.href = aliUrl;
      } else {
        Taro.navigateTo({
          url: `/pages/package-A/customer/chose-service-webview/index`,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserCenterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
