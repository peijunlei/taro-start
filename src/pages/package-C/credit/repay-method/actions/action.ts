import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {_, WMkit} from 'wmkit';
import {cache} from 'config';
import config from '@/service/config';

declare const WeixinJSBridge: any;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //微信小程序支付
    async goToWeixinRePay(openid) {
      const {
        main: {repayInfo},
      } = getData();
      const repayOrderCode = repayInfo.repayOrderCode;
      const checkRepay = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
      if (checkRepay !== '0') {
        await action.setConfirm(checkRepay, repayOrderCode, undefined);
        return;
      }
      try {
        const context = (await api.payController.wxPayUnifiedorderForLittleProgram({repayOrderCode, openid})) as any;
        const {timeStamp, nonceStr, signType, paySign} = context;
        await Taro.requestPayment({
          //@ts-ignore
          timeStamp,
          nonceStr,
          package: context.package,
          signType,
          paySign,
          success: async (res) => {
            //微信支付成功的回调
            const context = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
            if (context === '1') {
              await Taro.navigateTo({
                url: `/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`,
              });
            }
          },
          fail: function (res) {},
        });
      } catch (e) {
        await action.setConfirm('4', repayOrderCode, e);
      }
    },

    //微信H5支付
    async goToWeixinWebRePay() {
      const {
        main: {repayInfo},
      } = getData();
      const repayOrderCode = repayInfo.repayOrderCode;
      const context = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
      if (context === '0') {
        try {
          const {mweb_url} = await api.payController.wxPayUnifiedorderForMweb({repayOrderCode});
          // 定时加载微信支付提示弹窗
          setTimeout(async () => {
            await action.setConfirm('3', repayOrderCode, undefined);
          }, 1000);
          window.location.href = mweb_url;
        } catch (e) {
          await action.setConfirm('4', repayOrderCode, e);
        }
      } else {
        await action.setConfirm(context, repayOrderCode, undefined);
      }
    },

    // 微信浏览器内js_api支付
    async getWXRePayJSApi() {
      const {
        main: {repayInfo},
      } = getData();
      const repayOrderCode = repayInfo.repayOrderCode;
      const checkRepay = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
      if (checkRepay !== '0') {
        await action.setConfirm(checkRepay, repayOrderCode, undefined);
        return;
      }

      // 获取openId
      const openId = WMkit.wechatOpenIdByH5();
      const params = {openid: openId, repayOrderCode: repayOrderCode};
      // 微信浏览器内JSApi支付统一下单接口
      try {
        const context = await api.payController.wxPayUnifiedorderForJSApi(params);
        function onBridgeReady() {
          WeixinJSBridge.invoke('getBrandWCPayRequest', context, function (res) {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              Taro.showToast({title: '支付成功!'});
              //更新tabbar
              WMkit.changeTabBarText();
              Taro.navigateTo({
                url: `/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`,
              });
            } else {
              Taro.showToast({
                title: '支付失败',
              });
            }
          });
        }
        if (typeof WeixinJSBridge == 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if ((document as any).attachEvent) {
            (document as any).attachEvent('WeixinJSBridgeReady', onBridgeReady);
            (document as any).attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      } catch (e) {
        if (e.code == 'K-010204') {
          Taro.hideToast();
          return;
        }
        if (e.code == 'K-000019' || e.code == 'K-999997') {
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        if (e.code === 'K-081013' || e.code === 'K-081014' || e.code === 'K-081015') {
          await action.setConfirm('4', repayOrderCode, e);
          return;
        }
        // 跳转至订单列表
        await Taro.navigateTo({
          url: `/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`,
        });
      }
    },

    //支付宝H5支付
    async zhifubaoRePay() {
      const {
        main: {payItems, repayInfo},
      } = getData();
      const repayOrderCode = repayInfo.repayOrderCode;
      const alipay = payItems.filter((item) => item.channel === 'Alipay')[0];
      const token = Taro.getStorageSync('authInfo:token');
      const origin = window.location.origin;
      const successUrl = `${origin}/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`;
      const context = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
      if (context !== '0') {
        await action.setConfirm(context, repayOrderCode, undefined);
        return;
      }
      const payRequest = {
        successUrl,
        repayOrderCode: repayOrderCode,
        terminal: 1,
        channelItemId: alipay.id,
        openId: '',
        origin: window.location.origin,
      };
      let result = JSON.stringify({...payRequest, token});
      const base64 = new _.Base64();
      let encrypted = base64.urlEncode(result);
      //@ts-ignore
      const host = config.host;
      const exportHref = `${host}/pay/aliPay/${encrypted}`;
      window.location.href = exportHref;
    },

    /**
     * 取消还款
     * @returns {Promise<void>}
     */
    async onCancelRepay() {
      // 取消还款申请
      try {
        await api.customerCreditRepayBaseController.cancel();

        // 删除缓存的授信订单信息
        Taro.removeStorageSync(cache.ONLINE_RELATED_ORDER);
        // 还款说明
        Taro.getStorageSync(cache.ONLINE_REPAY_NOTE);
        // 取消后，刷新页面
        await Taro.navigateTo({
          url: '/pages/package-C/credit/online-repayment/index',
        });
      } catch (e) {
        Taro.showToast({title: e.message, icon: 'none'});
      }
    },

    //订单支付状态设置
    async setConfirm(type, repayOrderCode, e) {
      switch (type) {
        //1：已支付
        case '1':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: '订单已支付，请勿重复提交',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({
                url: `/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`,
              });
            },
          });
          return;
        // 2:超时未支付
        case '2':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: '订单状态已变更，请重新下单',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({
                url: `/pages/package-C/credit/online-repayment/index`,
              });
            },
          });
          return;
        // 3:定时加载微信支付提示弹窗
        case '3':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '请确认微信支付是否完成',
            content: '请您根据付款情况，点击下面的按钮',
            confirmText: '确定',
            cancelText: '更换支付方式',
            onCancel: async () => {
              await action.commonChange('main.mask.isOpen', false);
            },
            onConfirm: async () => {
              setTimeout(async () => {
                const context = await api.payBaseController.checkCreditRepayPayState(repayOrderCode);
                // 如果已完成还款
                if (context === '1') {
                  await Taro.navigateTo({
                    url: `/pages/package-C/credit/repay-result/index?repayOrderCode=${repayOrderCode}`,
                  });
                } else {
                  await action.commonChange('main.mask.isOpen', false);
                  await Taro.navigateTo({
                    url: `/pages/package-C/credit/online-repayment/index`,
                  });
                }
              }, 1000);
            },
          });
          return;
        case '4':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: e.message,
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await this.onCancelRepay();
            },
          });
          return;
        default:
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: e.err_code_des,
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({
                url: `/pages/package-A/customer/credit-center/index`,
              });
            },
          });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('repayMethodMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
