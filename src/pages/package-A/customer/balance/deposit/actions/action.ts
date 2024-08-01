import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {Const} from 'config';
import moment from 'dayjs';
import {_, WMkit} from 'wmkit';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async _getCheckPayPwdRes(payLockTime) {
      return payLockTime == null
        ? true
        : Boolean(payLockTime) &&
            moment(moment(payLockTime).format(Const.SECONDS_FORMAT))
              .add(30, 'm')
              .isBefore(moment(moment(Date.now()).format(Const.SECONDS_FORMAT)));
    },

    async _paymentPass() {
      const {
        main: {
          cash: {inputMoney},
        },
      } = getData();
      try {
        await api.customerBalanceBaseController.isPayPwdValid();
      } catch (e) {
        if(e.code === 'K-010206') {
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
          return;
        }
      }
      if (!inputMoney || inputMoney < 1) {
        await this._showToast('提现金额不可低于1元!');
        return false;
      }
      //校验账户可提现金额
      const {withdrawAmountTotal} = await api.customerFundsController.statistics();
      if (inputMoney > withdrawAmountTotal) {
        await this._showToast('余额不足，请修改提现金额！');
        return false;
      }
      //校验当天提现金额时候超出限制
      const context = await api.customerDrawCashController.countDrawCashSumByCustId();
      // 即将提现金额+已提现金额
      const drawCashSum = _.add(inputMoney, context);
      if (drawCashSum > Const.MAX_DRAW_CASH) {
        await this._showToast('提现金额超出当天最大提现金额');
        return false;
      }
      action.commonChange('main.passwordMaskShow', true);
      return true;
    },

    async _checkPayPwd(payPassword, loadFn) {
      Taro.showLoading();
      const {
        main: {
          cash: {inputMoney},
          customerDrawCashAddRequest: {drawCashAccountName, drawCashRemark},
        },
      } = getData();
      try {
        //密码校验成功
        Taro.hideLoading();
        await api.customerBalanceBaseController.checkCustomerPayPwd({payPassword});
        let openId;
        let drawCashSource;
        // 在微信浏览器里，openId是被缓存的
        if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
          openId = WMkit.wechatOpenIdByH5();
          drawCashSource = '1';
        }
        // 小程序里面，openId通过Taro.login获取
        if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
          openId = await WMkit.getOpenIdByMini();
          drawCashSource = '3';
        }
        //新增提现记录
        const {
          customerDrawCashVO: {drawCashId},
        } = await api.customerDrawCashController.addCustomerDrawCash({
          drawCashSum: inputMoney,
          drawCashSource: drawCashSource,
          drawCashRemark,
          payPassword,
          openId,
          drawCashAccountName,
        });
        await action.commonChange('main.passwordMaskShow', false);
        await Taro.navigateTo({
          url: `/pages/package-A/customer/balance/deposit/deposit-success/index?drawCashId=${drawCashId}`,
        });
        action.commonChange('main.isSubmit', false);
      } catch (e) {
        action.commonChange('main.isSubmit', false);
        const {payErrorTime} = await api.customerBaseController.getLoginCustomerInfo();
        await action.commonChange([
          {paths: 'main.payData.payErrorTime', value: payErrorTime},
          {paths: 'main.payData.checkPayPwRes', value: !(payErrorTime === 3)},
        ]);
        loadFn();
      }
    },

    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerBalanceDepositMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
