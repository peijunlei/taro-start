import Store from '@/redux/store';
import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import { _ } from 'wmkit';
import Action from './action';

const payData = [
  // {label: '银联支付', code: 'upacp_wap'},
  { label: '企业银联支付', code: 'unionpay_b2b_wx' },
  { label: '余额支付', code: 'balance_h5' },
  { label: '银联云闪付', code: 'unionpay_wx' },
];

import packageCOrderOrderToolOrderPayMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid, results, bookingSaleGoods, ordersource) {
      await actions.loadReducer();
      // 设置支付单的价格、超时时间、母订单id, isBookingSaleGoods是否是定金支付
      let price,giftCardPrice, orderTimeOut, parentTid, isBookingSaleGoods, tradeState, bookingType, balancePrice, servicePrice, servicePriceRate,originPrice, serviceFeeAmount;
      // 支付以后返回回来，依然需要查询最新的支付状态
      if (tid || results[0].tid) {
        if (ordersource && ordersource === 'xuankuadrama') {
          const context = await api.tradeBaseController.initXuanKuaDramaOrder({
            tid,
            orderSource: 'WECHAT'
          });
          tid = context.tid;
        }
        if (ordersource && ordersource === 'xuankualife') {
          const context = await api.tradeBaseController.initXuanKuaLifeOrder({
            tid,
            orderSource: 'WECHAT'
          });
          tid = context.tid;
        }
        //这里是从订单列表过来的
        const context = await api.tradeBaseController.commitResp(tid || results[0].tid);
        price = results && results[0] ? results.reduce((a, b) => a + b.price, 0) : context.price;
        parentTid = context.parentTid;
        balancePrice = context.balancePrice;
        orderTimeOut = context.orderTimeOut;
        tradeState = context.tradeState;
        // 订单列表或者详情过来，isBookingSaleGoods是直接传的
        isBookingSaleGoods = results[0] && results[0].tid ? results[0].isBookingSaleGoods : bookingSaleGoods;
        bookingType = context.bookingType;
        servicePrice = context.servicePrice;
        servicePriceRate = context.servicePriceRate;
        originPrice = context.originPrice;
        serviceFeeAmount = ordersource === 'meituan' ? context.meiTuanServiceFeeAmount || 0 : ordersource === 'shanmuyouxuan' ? context.serviceFeeAmount || 0 : 0;
        giftCardPrice = context.giftCardPrice;
      } else {
        // 立即购买，直接从router里面获取参数
        isBookingSaleGoods = results[0].isBookingSaleGoods;
        parentTid = results[0].parentTid;
        orderTimeOut = results[0].orderTimeOut;
        price = results.reduce((a, b) => a + b.price, 0);
        tradeState = results[0].tradeState;
        bookingType = results[0].bookingType;
        giftCardPrice = results[0].giftCardPrice;
      }

      //如果是组合购，tid不需要传
      const tradeNo = tid ? tid : results.length > 1 ? null : results[0].tid;
      const type = __TARO_ENV == 'h5' ? 'H5' : 'MINI';
      Promise.all([
        await api.customerFundsController.statistics(),
        await api.payController.items(type),
        await api.customerCreditQueryBaseController.getCreditAccountByCustomerId(),
      ]).then(([balanceData, payInfo, credit]) => {
        //过滤出余额的相关配置
        const balance = payInfo.filter((o) => o.channel === 'Balance')[0];
        dispatch({
          type: Command.init,
          payload: {
            main: {
              balance: {
                balancMoney: _.addZero(balanceData.withdrawAmountTotal),
                channelCode: balance ? balance.id : 0,
              },
              payInfo,
              tradeNo,
              parentTid: parentTid,
              tradePrice: _.addZero(price),
              orderTimeOut: orderTimeOut,
              isBookingSaleGoods,
              tradeState: tradeState,
              bookingType,
              credit: { ...credit },
              balancePrice: balancePrice || null,
              servicePrice: servicePrice || 0,
              servicePriceRate: servicePriceRate || 0,
              originPrice: originPrice || 0,
              serviceFeeAmount: serviceFeeAmount || 0,
              ordersource,
              giftCardPrice
            },
          },
        });
      });
      // if (['meituan', 'shanmuyouxuan', 'dingdong'].includes(ordersource)) {
      //   actions.action.commonChange('main.serviceShow', true)
      // }
      // 如果已经支付，则弹出提示窗
      if (tradeState.payState == 'PAID') {
        await actions.action.setConfirm('1', undefined, undefined, undefined);
      }
    },
    /**
     * 重置
     */
    async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderOrderToolOrderPayMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderToolOrderPayMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
