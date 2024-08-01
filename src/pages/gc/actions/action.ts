import React from 'react';
import ReactDOM from 'react-dom';
import Taro from '@tarojs/taro';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import { checkGiftCard, checkGiftCard2, exchangeGiftCard, exchangeGiftCard2 , activateGiftCard } from "api/GiftCardController";
import api from 'api';
import { cache } from 'config';

import { ValidConst, getPrivacySetting, msg } from 'wmkit';
import Qrcode from '../components/qrcode';


const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
let globalTimer;

let html5QrCode;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async fetchGiftCardDetailInfo() {
      const params = Taro.getCurrentInstance().router.params
      const list: POJO[] = [
        { paths: 'main.isReady', value: false },
      ]
      if (params) {
        if (params.g) {
          list.push({
            paths: 'main.cardNo', value: params.g
          })
        }
        if (params.e) {
          list.push({
            paths: 'main.cardPwd', value: params.e
          })
        }
      }
      action.commonChange(list);
    },
    async check() {
      const { cardNo, cardPwd, phoneNum, code } = getData().main;
      const valid = /^[A-Za-z0-9]+$/;
      if (!valid.test(cardNo)) {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '请输入卡号');
        return;
      }
      if (!valid.test(cardPwd)) {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '请输入正确的卡密');
        return;
      }
      const res = await checkGiftCard2({
        giftCardNo: cardNo,
        exchangeCode: cardPwd,
        customerAccount: phoneNum,
        verificationCode: code,
      });
      if (res.code === 'K-080044') {
        action.commonChange('main.failModal', true);
        action.commonChange('main.failMsg', '该卡已被激活绑定');
        return false
      }
      return true
    },

    async handleResult(value: string) {
      try {
        const waitUpt = []
        value.split('?')[1].split('&').forEach(item => {
          const [k, v] = item.split('=')
          if (k === 'giftCardNo'|| k === 'g') {
            waitUpt.push({ paths: 'main.cardNo', value: v })
          } else if (k === 'exchangeCode'|| k === 'e') {
            waitUpt.push({ paths: 'main.cardPwd', value: v })
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
                  needResult: 1,
                  scanType: ["qrCode"],
                  success: function (res) {
                    var result = res.resultStr;
                    action.handleResult(result)
                  },
                  fail: function () {
                    action.handleWithHtmlQRCode()
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

    toCodeLogin() {
      Taro.navigateTo({
        url: `/pages/package-A/login/login/index?mode=code&url=${encodeURIComponent('/pages/package-D/gift-card/my-gift-card/index')}`
      })
    },

    // 激活卡
    async login() {
      let {
        // 卡号
        cardNo,
        // 卡密
        cardPwd,
        // 手机号
        phoneNum,
        // 验证码
        code,
        // 辅助信息
        auxiliaryInformation,
      } = getData().main;
      const program = {
        giftCardNo: cardNo,
        exchangeCode: cardPwd,
        customerAccount: phoneNum,
        verificationCode: code,
      };
      try {
        if (!cardNo) throw new Error("请输入卡号")
        if (!cardPwd) throw new Error("请输入卡密")
        if (!phoneNum) throw new Error("请输入手机号")
        if (!code) throw new Error("请输入验证码")
        if (!ValidConst.phone.test(phoneNum)) throw new Error("请输入正确的手机号")
        let context = await exchangeGiftCard2(program);
        const id = context.userGiftCardInfoVO.giftCardId;
        const userGiftCardId = context.userGiftCardInfoVO.userGiftCardId;
        const { giftCardBlessingConfigVO } = await api.giftCardController.getGiftCardBlessing(id);
        const enableFlag = giftCardBlessingConfigVO.enableFlag;
        // a.设置登陆后token以及登陆信息缓存
        await Taro.setStorage({
          key: 'authInfo:token',
          data: context.loginResponse.token,
        });
        await Taro.setStorage({
          key: cache.LOGIN_DATA,
          data: {
            ...context.loginResponse,
            userGiftCardId,
          },
        });
        Taro.removeStorageSync('mini::shopCardAddress');
        Taro.removeStorageSync('mini::confirmAddress');
        //卡券独立登录相应的缓存，这个缓存会在访问首页个人中心时被移除
        await Taro.setStorage({
          key: cache.SINGER_CARD_LOGIN,
          data: true,
        });
        // 存储一次 登录成功存储一次
        if(__TARO_ENV==='h5'){
          sessionStorage.setItem(cache.IS_COMM_LOGIN,'1')
        }
        if (enableFlag === 1) {
          Taro.redirectTo({
            url: `/pages/package-D/gift-card/gift-card-bless/index?id=${id}&isCommLogin=1`,
          });
        } else {
          Taro.reLaunch({
            url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${context.userGiftCardInfoVO.userGiftCardId}&preview=false&isCommLogin=1`
          })
        }
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },

    /**
     * 发送验证码事件
     */
    async sendCode() {
      let { phoneNum } = getData().main;

      if (phoneNum == '') {
        Taro.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phoneNum)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }
      try {
        await api.loginBaseController.sendLoginCode2(phoneNum);
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

    cleanTimer() {
      if (globalTimer) {
        clearTimeout(globalTimer);
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('GiftCardLoginMain'),
  };
}
