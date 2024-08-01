import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {_, WMkit} from 'wmkit';
import config from '@/service/config';
import Action from './index';
declare const WeixinJSBridge: any;
const isH5 = __TARO_ENV === 'h5';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //企业银联支付
    async bankPay() {
      action.commonChange('main.mask', {
        isOpen: true,
        title: '银联企业付款需在PC上进行完成',
        content: '系统会同时发送邮件至财务邮箱',
        confirmText: '通知财务',
        cancelText: '更换支付方式',
        onClose: async () => {
          await action.commonChange('main.mask.isOpen', false);
        },
        onConfirm: async () => {
          await action.commonChange('main.mask.isOpen', false);
          await action.sendMailToFinance();
        },
      });
    },

    //查询会员邮箱
    async sendMailToFinance() {
      const {
        main: {tradeNo},
      } = getData();
      const context = await api.customerBaseController.getCustomerEmailList();

      if (context.length > 0) {
        //发送邮件
        await api.customerBaseController.sendEmailsToFinance(tradeNo);
        await Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
      } else {
        action.commonChange('main.mask', {
          isOpen: true,
          title: '',
          content: '请维护财务邮箱',
          confirmText: '确定',
          cancelText: '',
          onClose: async () => {},
          onConfirm: async () => {
            await action.commonChange('main.mask.isOpen', false);
            //跳转财务邮箱
            await Taro.navigateTo({url: '/pages/package-A/customer/finance-email/index'});
          },
        });
      }
    },

    //校验是否开启余额支付
    async checkPwdValid(channelCode) {
      const {
        main: {balance, tradePrice},
      } = getData();

      try {
        await action.commonChange('main.balance.channelCode', channelCode);
        await api.customerBalanceBaseController.isPayPwdValid();
        if (Number(balance.balancMoney) < Number(tradePrice)) {
          await Taro.showToast({title: '可用余额不足!', icon: 'none', duration: 2000});
        } else {
          await action.commonChange('main.passwordMaskShow', true);
        }
      } catch (e) {
        if (e.code === 'K-010206') {
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: '您还没有设置支付密码，\r\n暂时无法使用余额支付',
            confirmText: '设置支付密码',
            cancelText: '',
            onClose: null,
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            },
          });
        }
      }
    },

    //组合支付时先使用余额支付
    async useBalancePay(payType) {
      const {
        main: {payInfo},
      } = getData();
      const channelCode = payInfo.filter((o) => o.channel === 'Balance')?.[0]?.id;

      try {
        await api.customerBalanceBaseController.isPayPwdValid();
        action.commonChange([
          {paths: 'main.comPayType', value: payType},
          {paths: 'main.passwordMaskShow', value: true},
          {paths: 'main.balance.channelCode', value: channelCode},
        ]);
      } catch (e) {
        if (e.code === 'K-010206') {
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: '您还没有设置支付密码，\r\n暂时无法使用余额支付',
            confirmText: '设置支付密码',
            cancelText: '',
            onClose: null,
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            },
          });
        }
      }
    },

    //校验是否开启授信
    async checkCreditPwdValid(channelCode) {
      const {
        main: {
          tradePrice,
          credit: {alias, id},
        },
      } = getData();
      //设置授信支付方式
      await action.commonChange('main.balance.channelCode', channelCode);

      //如果是未申请通过则提示用户
      if (!id) {
        await action.commonChange('main.credit.visible', true);
        await action.commonChange('main.credit.showType', 2);
        return;
      }
      //授信状态检验
      try {
        await api.payBaseController.creditCheck(Number(tradePrice));
      } catch (e) {
        if (e.code === 'K-081012') {
          await action.commonChange('main.credit.visible', true);
          await action.commonChange('main.credit.showType', 1);
        } else if (e.code === 'K-081010') {
          await action.commonChange('main.credit.visible', true);
          await action.commonChange('main.credit.showType', 2);
        } else {
          //授信方式不可用
          await action.commonChange('main.credit.visible', true);
          await action.commonChange('main.credit.showType', 0);
        }
        return;
      }

      //校验会员支付密码是否可用,与上面的try,catch分开，都没有异常的时候才会弹出输入密码的窗口
      try {
        await api.customerBalanceBaseController.isPayPwdValid();
      } catch (e) {
        if (e.code === 'K-010206') {
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: `您还没有设置支付密码，\r\n暂时无法使用${alias}支付`,
            confirmText: '去设置',
            cancelText: '取消',
            onClose: async () => {
              await action.commonChange('main.mask.isOpen', false);
            },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
            },
          });
        }
        return;
      }
      await action.commonChange('main.credit.passwordMaskShow', true);
    },

    //授信支付
    async creditPayPwd(payPassword) {
      const {
        main: {
          parentTid,
          tradeNo,
          balance: {channelCode},
          tradeState: {payState},
          bookingType,
        },
      } = getData();
      const payMobileRequest = {
        parentTid,
        channelItemId: channelCode,
        tid: tradeNo,
        payPassword,
        terminal: 1, //h5
      };
      try {
        await api.customerBalanceBaseController.checkCustomerPayPwd({payPassword});
        //设置支付状态加载中
        await action.commonChange('main.credit.passwordMaskShow', false);
        await action.commonChange('main.paying', true);
        await api.payBaseController.creditPay(payMobileRequest as any);
        //支付成功
        await Taro.showToast({title: '支付成功!'});
        WMkit.changeTabBarText();
        const param = {
          parentTid: parentTid,
          isExamine: false,
          payState: payState,
          tid: tradeNo,
        };
        let url = `/pages/package-C/order/order-tool/order-success/index?param=${JSON.stringify(param)}`;
        if ((await this.isBookingDeposit()) && bookingType !== 0) {
          url = '/pages/package-C/order/order-list/index';
        }
        Taro.redirectTo({
          url,
        });

        action.commonChange('main.isSubmit', false);
        await action.commonChange('main.paying', false);
      } catch (e) {
        await action.commonChange('main.paying', false);
        if (e.code == 'K-010204') {
          Taro.hideToast();
        }
        action.commonChange('main.isSubmit', false);
        const {payErrorTime} = await api.customerBaseController.getLoginCustomerInfo();
        await action.commonChange('main.payErrorTime', payErrorTime);
        // 订单已支付
        if (e.code == 'K-100203') {
          await action.commonChange('main.credit.passwordMaskShow', false);
          await action.setConfirm('1', undefined, undefined, undefined);
        }
        if (e.code === 'K-081012') {
          await action.commonChange('main.credit.visible', true);
          await action.commonChange('main.credit.showType', 1);
        } else if (e.code === 'K-081010') {
          await action.commonChange('main.credit.visible', true);
          await action.commonChange('main.credit.showType', 2);
        } else {
          if (e.code != 'K-010204') {
            //授信方式不可用
            await action.commonChange('main.credit.visible', true);
            await action.commonChange('main.credit.showType', 0);
          }
        }
      }
    },

    //余额支付 校验密码
    async checckPayPwd(payPassword) {
      const {
        main: {
          parentTid,
          tradeNo,
          balance: {channelCode},
          // 支付状态--尾款支付
          tradeState: {payState},
          bookingType,
        },
      } = getData();
      const payMobileRequest = {
        parentTid,
        channelItemId: channelCode,
        tid: tradeNo,
        payPassword,
      };
      try {
        await api.customerBalanceBaseController.checkCustomerPayPwd({payPassword});
        //设置支付状态加载中
        await action.commonChange('main.passwordMaskShow', false);
        await action.commonChange('main.paying', true);
        await api.payController.balancePay(payMobileRequest as any);
        //支付成功
        await Taro.showToast({title: '支付成功!'});
        WMkit.changeTabBarText();
        const param = {
          // tid: tradeNo,
          parentTid: parentTid,
          isExamine: false,
          // 支付状态-判断是否尾款支付
          payState: payState,
          tid: tradeNo,
        };
        let url = `/pages/package-C/order/order-tool/order-success/index?param=${JSON.stringify(param)}`;
        if ((await this.isBookingDeposit()) && bookingType !== 0) {
          url = '/pages/package-C/order/order-list/index';
        }
        Taro.redirectTo({
          url,
        });

        action.commonChange('main.isSubmit', false);
        await action.commonChange('main.paying', false);
      } catch (e) {
        await action.commonChange('main.paying', false);
        if (e.code == 'K-010204') {
          Taro.hideToast();
        }
        action.commonChange('main.isSubmit', false);
        const {payErrorTime} = await api.customerBaseController.getLoginCustomerInfo();
        await action.commonChange('main.payErrorTime', payErrorTime);
        // 订单已支付
        if (e.code == 'K-100203') {
          await action.commonChange('main.passwordMaskShow', false);
          await action.setConfirm('1', undefined, undefined, undefined);
        }
      }
    },

    //微信支付
    async goToWeixinPay(openid, password) {
      const {
        main: {
          tradeNo,
          parentTid,
          tradeState: {payState},
          bookingType,
          balance: {balancMoney},
          checkedBalance,
        },
      } = getData();

      let params = {tid: tradeNo, openid, parentTid};
      const param = {
        // tid: tradeNo,
        parentTid: parentTid,
        isExamine: false,
        // 支付状态-判断是否尾款支付
        payState: payState,
        tid: tradeNo,
      };
      if (checkedBalance) {
        params.combinePayFlag = 1;
        params.balancePrice = balancMoney;
        params.payPwd = password;
      }
      let url = `/pages/package-C/order/order-tool/order-success/index?param=${JSON.stringify(param)}`;
      // 定金支付跳列表页
      if ((await this.isBookingDeposit()) && bookingType !== 0) {
        url = '/pages/package-C/order/order-list/index';
      }
      try {
        const context = await api.payController.wxPayUnifiedorderForLittleProgram(params);
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
            // const context = await api.payController.getWeiXinPayOrderState(tradeNo ? tradeNo : parentTid);
            // if (context == 1) {
            //   await Taro.navigateTo({
            //     url: '/pages/package-C/order/order-list/index',
            //   });
            // }
            await Taro.navigateTo({
              url: url,
            });
          },
          fail: function (res) {
            console.log('微信支付', res);
          },
          complete: function (res) {
            console.log('微信支付', res);
          },
        });
      } catch (e) {
        console.log('组合支付', e);

        if (e.code == 'K-100203') {
          await action.setConfirm('1', undefined, undefined, undefined);
        } else if (e.code === 'K-000119') {
          await action.setConfirm('4', undefined, undefined, e);
        }
      }
    },

    //判断是否为定金支付
    async isBookingDeposit() {
      const {
        main: {isBookingSaleGoods},
      } = getData();
      if (isBookingSaleGoods) {
        return true;
      }
      return false;
    },

    //微信H5支付
    async goToWeixinWebPay() {
      const {
        main: {
          tradeNo,
          parentTid,
          balance: {balancMoney},
          checkedBalance,
          password,
          ordersource
        },
      } = getData();

      let params = {tid: tradeNo, parentTid, combinePayFlag: undefined};
      if (checkedBalance) {
        params.combinePayFlag = 1;
        params.balancePrice = balancMoney;
        params.payPwd = password;
      }
      const context = await api.payController.checkPayState(tradeNo);
      if (context == '0') {
        try {
          const {mweb_url} = await api.payController.wxPayUnifiedorderForMweb(params);
          if (_.isSafari()) {
            const redirectUrl = `https://${window.location.hostname}/mobile/pages/package-C/order/order-tool/order-pay/index?tid=${tradeNo}&ordersource=${ordersource}`;
            window.location.href = mweb_url + `&redirect_url=${encodeURIComponent(redirectUrl)}`;
          } else {
            // 定时加载微信支付提示弹窗
            setTimeout(async () => {
              await action.setConfirm('3', tradeNo, parentTid, undefined);
            }, 1000);
            window.location.href = mweb_url;
          }
        } catch (e) {
          await action.setConfirm(100, undefined, undefined, e);
        }
      } else {
        await action.setConfirm(context, undefined, undefined, undefined);
      }
    },

    // 微信浏览器内js_api支付
    async getWXPayJSApi() {
      const {
        main: {
          tradeNo,
          parentTid,
          isBookingSaleGoods, // 支付状态--定金支付
          tradeState: {payState},
          balance: {balancMoney},
          checkedBalance,
          password,
        },
      } = getData();
      // 0:未支付  1：已支付
      const context = await api.payController.checkPayState(tradeNo);
      if (context == '1') {
        await action.setConfirm(context, tradeNo, parentTid, undefined);
      } else {
        // 获取openId
        const openId = WMkit.wechatOpenIdByH5();
        let params = {tid: tradeNo, openid: openId, parentTid: parentTid, repayOrderCode: ''};
        if (checkedBalance) {
          params.combinePayFlag = 1;
          params.balancePrice = balancMoney;
          params.payPwd = password;
        }
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
                const param = {
                  tid: tradeNo,
                  parentTid: parentTid,
                  isExamine: false,
                  // 支付状态--尾款支付
                  payState: payState,
                };
                let url = `/pages/package-C/order/order-tool/order-success/index?param=${JSON.stringify(param)}`;
                if (isBookingSaleGoods) {
                  url = '/pages/package-C/order/order-list/index';
                }
                Taro.redirectTo({
                  url,
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
          // 跳转至订单列表
          Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
        }
      }
    },

    //支付宝H5支付
    async zhifubaoPay() {
      const {
        main: {
          tradeNo,
          parentTid,
          payInfo,
          // 支付状态--尾款支付
          tradeState: {payState},
          bookingType,
          balance: {balancMoney},
          checkedBalance,
          password,
        },
      } = getData();
      const alipay = payInfo.filter((item) => item.channel === 'Alipay')[0];
      // 0:未支付  1：已支付
      const context = await api.payController.checkPayState(tradeNo);
      const token = Taro.getStorageSync('authInfo:token');
      const param = {tid: tradeNo, parentTid, payState};
      const origin = window.location.origin,
        stringParam = JSON.stringify(param);

      let successUrl = `${origin}/mobile/pages/package-C/order/order-tool/order-success/index?param=${stringParam}`;

      if ((await this.isBookingDeposit()) && bookingType !== 0) {
        successUrl = '/pages/package-C/order/order-list/index';
      }

      let payRequest = {
        successUrl,
        terminal: 1,
        tid: tradeNo,
        parentTid,
        channelItemId: alipay.id,
        openId: '',
      };
      if (checkedBalance) {
        payRequest.combinePayFlag = 1;
        payRequest.balancePrice = balancMoney;
        payRequest.payPwd = password;
      }

      if (context == '1') {
        await action.setConfirm('1', tradeNo, parentTid, undefined);
      } else {
        let result = JSON.stringify({...payRequest, token});
        const base64 = new _.Base64();
        let encrypted = base64.urlEncode(result);
        //@ts-ignore
        const host = config.host;
        const exportHref = `${host}/pay/aliPay/${encrypted}`;
        window.location.href = exportHref;
      }
    },
    //银联H5支付
    async unionPay() {
      const {
        main: {
          tradeNo,
          parentTid,
          payInfo,
          // 支付状态--尾款支付
          tradeState: {payState},
          bookingType,
          balance: {balancMoney},
          checkedBalance,
          password,
        },
      } = getData();
      console.log(payInfo);
      const unionpay = payInfo.filter((item) => item.channel === 'unionpay')[0];
      console.log(unionpay);
      // 0:未支付  1：已支付
      const context = await api.payController.checkPayState(tradeNo);
      const token = Taro.getStorageSync('authInfo:token');
      const param = {tid: tradeNo, parentTid, payState};
      const origin = window.location.origin,
        stringParam = JSON.stringify(param);
      const base64 = new _.Base64();
      const string = encodeURIComponent(base64.urlEncode(stringParam));

      let successUrl = `${origin}/mobile/pages/package-C/order/order-tool/order-success/index?type=unionPay&param=${string}`;

      if ((await this.isBookingDeposit()) && bookingType !== 0) {
        successUrl = '/pages/package-C/order/order-list/index';
      }
      let payRequest = {
        successUrl,
        terminal: 1,
        tid: tradeNo,
        parentTid,
        channelItemId: unionpay.id,
        openId: '',
      };
      if (checkedBalance) {
        payRequest.combinePayFlag = 1;
        payRequest.balancePrice = balancMoney;
        payRequest.payPwd = password;
      }
      console.log(payRequest);

      if (context == '1') {
        await action.setConfirm('1', tradeNo, parentTid, undefined);
      } else {
        let result = JSON.stringify({...payRequest, token});

        let encrypted = base64.urlEncode(result);
        //@ts-ignore
        const host = config.host;
        const exportHref = `${host}/pay/pay-union/${encrypted}`;
        window.location.href = exportHref;
      }
    },
    //订单支付状态设置
    async setConfirm(type, tradeNo, parentTid, e) {
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
              await Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
            },
          });
          return;
        // 2:超时未支付
        case '2':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '',
            content: '支付失败，请重新下单支付',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
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
            onClose: async () => {
              await action.commonChange('main.mask.isOpen', false);
            },
            onConfirm: async () => {
              setTimeout(async () => {
                const context = await api.payController.checkOrderPayState(tradeNo ? tradeNo : parentTid);
                if (context == 1) {
                  await Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
                } else {
                  await action.commonChange('main.mask.isOpen', false);
                }
              }, 1000);
            },
          });
          return;
        //1：已支付
        case '4':
          action.commonChange('main.mask', {
            isOpen: true,
            title: '提示',
            content: e.message,
            confirmText: '确定',
            cancelText: '',
            onClose: async () => {},
            onConfirm: async () => {
              action.commonChange('main.mask.isOpen', false);
              action.commonChange('main.paying', false);
              // 去订单列表页面
              await Taro.redirectTo({url: '/pages/package-C/order/order-list/index'});
              // // 重新初始化
              // const params = getCurrentInstance().router.params;
              // let stringContext = decodeURIComponent(
              //   params.param || '',
              // ),
              //   tid = params.tid,
              //   // 从订单列表和订详情页面过来支付的，要带上isBookingSaleGoods这个标识，没法依赖接口，返回的都是null
              //   isBookingSaleGoods = params.isBookingSaleGoods,
              //   ordersource = params.ordersource,
              //   context = stringContext && JSON.parse(stringContext);
              // await Action(dispatch).actions.init(tid, context, isBookingSaleGoods, ordersource);
            },
          });
          return;
        default:
          if (e.err_code_des) {
            action.commonChange('main.mask', {
              isOpen: true,
              title: '',
              content: e.err_code_des,
              confirmText: '确定',
              cancelText: '',
              onClose: async () => {},
              onConfirm: async () => {
                await action.commonChange('main.mask.isOpen', false);
                await Taro.navigateTo({url: '/pages/package-C/order/order-list/index'});
              },
            });
          }
      }
    },

    // 只检验支付密码是否正确
    async checkPayPassWord(payPassword) {
      await api.customerBalanceBaseController.checkCustomerPayPwd({payPassword});
    },

    async alipay() {
      if (isH5) {
        await action.zhifubaoPay();
      } else {
        //
      }
    },

    async weChatpay(isWeixin, password?) {
      if (isH5) {
        // 普通浏览器内，使用wx_mweb支付
        if (!isWeixin) {
          await action.goToWeixinWebPay();
        } else {
          // 微信浏览器内，使用js_api支付
          await action.getWXPayJSApi();
        }
      } else {
        // 小程序内的支付
        Taro.login({
          async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
            if (res.code) {
              let openid;
              try {
                openid = await api.payController.getLittleProgramOpenId(res.code);
              } catch (e) {
                Taro.showToast({
                  title: '功能不可用',
                  icon: 'none',
                  duration: 2000,
                });
                return;
              }
              await action.goToWeixinPay(openid, password);
            } else {
              console.log('PayList_获取code失败！' + res.errMsg);
            }
          },
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageCOrderOrderToolOrderPayMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
