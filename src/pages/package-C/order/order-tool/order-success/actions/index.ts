import {Command, BASE} from './../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import reducers from './../reducers/main';
import api from 'api';
import GoodsAction from './goodsAction';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof GoodsAction>(GoodsAction)(dispatch),

    // 初始化
    async init(objContext) {
      // payState是否尾款支付阶段PAID_EARNEST
      const {tid, parentTid, payState, paymentOrder, tradeState} = Array.isArray(objContext)
        ? objContext[0]
        : objContext;
      let context;
      try {
        actions.goodsAction.commonChange('main.paymentOrder', paymentOrder);
        actions.goodsAction.commonChange('main.auditState', tradeState?.auditState);
        let payOrders = [];
        if (Array.isArray(objContext) && objContext.length > 1) {
          context = await api.tradeBaseController.payOrders(parentTid);
          payOrders = context.payOrders;
        } else {
          if (tid === null || tid === undefined || tid === 'undefined' || tid === 'null') {
            context = await api.tradeBaseController.payOrders(parentTid);
            payOrders = context.payOrders;
          } else {
            context = await api.tradeBaseController.payOrder(tid);
            payOrders = [context];
          }
        }
        // 尾款支付阶段
        if (payState == 'PAID_EARNEST') {
          let payOrder = payOrders[0];
          // 查询订单信息
          //这里是从订单列表过来的
          const tradeInfo = await api.tradeBaseController.commitResp(payOrder.orderCode);
          payOrders.map((pay) => {
            pay.totalPrice = tradeInfo.totalPrice;
            return pay;
          });
        }

        const {goodsIdList} = context || {};
        if (Array.isArray(payOrders) && payOrders[0]) {
          const {payType, payOrderStatus} = payOrders[0] || {};
          actions.goodsAction.commonChange('main.payType', payType);
          actions.goodsAction.commonChange('main._payOrderStatus', payOrderStatus);
        }

        dispatch({
          type: Command.init,
          payload: {
            main: {
              payOrders,
              tid,
              relationGoodsIdList: Array.isArray(goodsIdList) ? goodsIdList : [],
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    },

    // 重置
    async clean() {
      //@ts-ignore
      // __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    // 动态添加注入reducer
    async loadReducer() {
      reduxStore.registerReducer({
        [BASE]: reducers,
      });
    },

    // 卸载reducer
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister([BASE]);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
