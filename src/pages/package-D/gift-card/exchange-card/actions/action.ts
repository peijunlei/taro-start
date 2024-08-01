import Taro from '@tarojs/taro';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { checkGiftCard, exchangeGiftCard, getUserGiftCardDetailUnLogin } from "api/GiftCardController";
import { getPrivacySetting, msg } from 'wmkit';
import api from 'api';
import { cache } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import Qrcode from '../components/qrcode';
let html5QrCode
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    // 校验礼品卡
    async check() {
      const { giftCardNo, exchangeCode } = getData().main;
      const valid = /^[A-Za-z0-9]+$/;
      if (!valid.test(giftCardNo)) {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '请输入卡号');
        return;
      }
      if (!valid.test(exchangeCode)) {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '请输入正确的卡密');
        return;
      }
      const res = await checkGiftCard({ giftCardNo, exchangeCode });
      if (res.code === 'K-000000') {
        action.commonChange('main.confirmModal', true);
        action.commonChange('main.cardInfo', res.context.userGiftCardInfoVO);
      } else if (res.code === 'K-080044') {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '该卡已被激活绑定');
      }
    },
    // 兑换礼品卡
    async exchange() {
      const { giftCardNo, exchangeCode } = getData().main;
      const res = await exchangeGiftCard({ giftCardNo, exchangeCode });
      action.commonChange('main.confirmModal', false);
      if (res.code === 'K-000000') {
        action.commonChange('main.successModal', true);
        action.commonChange('main.cardId', res?.context?.userGiftCardInfoVO?.userGiftCardId);
        action.commonChange('main.enterpriseId', res?.context?.userGiftCardInfoVO?.enterpriseId);
      } else if (res.code === 'K-080044') {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '该卡已被激活绑定');
      }
    },
    // 手动切换企业
    async handleChangeEnterprise() {
      try {
        // 激活后的企业id
        const enterpriseId = getData().main.enterpriseId;
        const { enterpriseInfoVOList } = await api.customerBaseController.getEnterpriseInfoByCustomerId();
        const id = (enterpriseInfoVOList || []).find(v => v.enterpriseId === enterpriseId)?.enterpriseId || '-1'
        // 切换企业
        await api.customerBaseController.changeLoginEnterpriseId(id);
        // 获取当前登录的账号信息
        let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
        // 更新当前登录的企业id
        loginData.lastLoginEnterpriseId = id;
        // 更新缓存
        Taro.setStorageSync(cache.LOGIN_DATA, loginData);
        // 当前登录的企业与红包的不是一个企业
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
        return;
      }
    },
    async getCardDetail(giftCardNo) {
      const res = await getUserGiftCardDetailUnLogin(giftCardNo);
      if (res) {
        action.commonChange('main.giftCardDetailVO', res.giftCardDetailVO);
        action.commonChange('main.giftCardNo', res.giftCardDetailVO?.giftCardNo);
        action.commonChange('main.exchangeCode', res.giftCardDetailVO?.exchangeCode);
        await action.check();
      } else {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '卡号错误');
        return;
      }
    },
    async handleResult(value: string) {
      try {
        const waitUpt = []
        value.split('?')[1].split('&').forEach(item => {
          const [k, v] = item.split('=')
          if (k === 'giftCardNo'|| k === 'g') {
            waitUpt.push({ paths: 'main.giftCardNo', value: v })
          } else if (k === 'exchangeCode'|| k === 'e') {
            waitUpt.push({ paths: 'main.exchangeCode', value: v })
          }
        })
        if (waitUpt.length) action.commonChange(waitUpt)
      } catch (e) {
        Taro.showToast({
          title: '请扫描正确的二维码',
          duration: 2000,
          icon: 'none'
        })
      }
    },

    handleScanError(error?: string) {
      Taro.showToast({
        title: error || '扫描失败，请重试',
        duration: 2000,
        icon: 'none'
      })
    },

    handleWithHtmlQRCode() {
      const qrcodeDiv = React.createElement(Qrcode, {
        onClick: () => action.stop(html5QrCode)
      })
      setTimeout(async () => {
        try {
          // @ts-ignore

          const devices = await Html5Qrcode.getCameras()
          console.log('090909090099')
          if (!devices.length) {
            action.handleScanError('您需要授予相机访问权限')
            return
          }
          // @ts-ignore
          html5QrCode = new Html5Qrcode("reader");
          html5QrCode.start({ facingMode: "environment" },
            {
              fps: 2,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              action.handleResult(decodedText)
              action.stop(html5QrCode)
            })
            .catch(() => action.stop(html5QrCode))
        } catch (ex) {
          console.log(111);

          //@ts-ignore
          this.html5QrCode = new Html5Qrcode("reader")
          action.handleScanError('初始化相机失败')
          action.stop(html5QrCode)
        }
      }, 10);
      ReactDOM.render(qrcodeDiv, document.body)

    },

    stop(html5QrCode) {
      if (html5QrCode) html5QrCode.stop()
      html5QrCode = undefined
      // remove Qrcode
      ReactDOM.unmountComponentAtNode(document.body)
    },

    async onScan() {
      if (__TARO_ENV === 'h5') {
        let ua = window.navigator.userAgent.toLowerCase();
        const isWx = ua.indexOf('micromessenger') > -1
        if (isWx) {
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {
              if (res.checkResult.scanQRCode) {
                wx.scanQRCode({
                  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                  scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                  success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    action.handleResult(result)
                  },
                  error: function () {
                    action.handleScanError()
                  }
                });
              } else {
                action.handleWithHtmlQRCode()
              }
            }
          })
        } else {
          action.handleWithHtmlQRCode()
        }
      } else {
        getPrivacySetting().then((res) => {
          if ((res as any).needAuthorization) {
            msg.emit('privacyModalVisible', {
              visible: true,
              privacyContractName: (res as any).privacyContractName,
              callback: () => {
                Taro.scanCode({
                  success(res) {
                    action.handleResult(res.result)
                  },
                  fail() {
                    action.handleScanError()
                  }
                });
              },
            });
          } else {
            Taro.scanCode({
              success(res) {
                action.handleResult(res.result)
              },
              fail() {
                action.handleScanError()
              }
            });
          }
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('EXCHANGECARDMain'),
  };
}
