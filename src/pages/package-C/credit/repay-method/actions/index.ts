import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {_} from '../../../../../wmkit/common/index';
import Action from './action';
import repayMethodMain from '../reducers/main';
import Taro from '@tarojs/taro';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(repayOrderCode) {
      await actions.loadReducer();
      //获取还款单
      const res = await api.customerCreditRepayBaseController.getDetailByRepayCode(repayOrderCode);
      let payItems = await api.payController.items('H5');
      payItems = (payItems as any)
        .filter((item) => item.channel == 'WeChat' || item.channel == 'Alipay')
        .filter((payItem1) => {
          if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP || _.isWeixin()) {
            // 微信浏览器,展示jsApi支付方式
            if (payItem1.channel == 'WeChat') {
              return payItem1.code == 'js_api';
            } else {
              return payItem1.channel != 'Alipay' && payItem1.channel != 'alipay';
            }
          } else {
            // 非微信浏览器,展示h5支付方式
            if (payItem1.channel == 'WeChat') {
              return payItem1.code == 'wx_mweb';
            } else {
              // 不展示ping++微信支付
              return payItem1.channel != 'WeChat';
            }
          }
        });
      dispatch({
        type: Command.init,
        payload: {
          main: {
            repayInfo: res.customerCreditRepayVO,
            payItems: payItems,
          },
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        repayMethodMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['repayMethodMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
