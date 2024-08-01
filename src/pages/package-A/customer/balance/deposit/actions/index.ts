import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import packageACustomerBalanceDepositMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const res = await api.customerFundsController.statistics();
      const withdrawAmountTotal = res?.withdrawAmountTotal || 0;
      const {nickName, headimgurl} = await Taro.getStorageSync(cache.AUTH_INFO);

      //查询会员当日已提现余额
      const context = await api.customerDrawCashController.countDrawCashSumByCustId();
      //获取用户相关信息
      const {payErrorTime = null, payLockTime = null} = await api.customerBaseController.getLoginCustomerInfo();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            cash: {
              money: withdrawAmountTotal,
              alreadyDrawCash: context ? context : 0,
            },
            payData: {
              payErrorTime,
              checkPayPwRes: await actions.action._getCheckPayPwdRes(payLockTime),
            },
            customerDrawCashAddRequest: {
              drawCashAccountName: nickName,
            },
            use: {nickName, headimgurl},
          },
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageACustomerBalanceDepositMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerBalanceDepositMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
