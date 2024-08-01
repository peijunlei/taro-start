import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageCOrderFinanceRefundRecordMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(rid, returnFlowState) {
      await actions.loadReducer();
      const pointsIsOpen = await api.systemPointsConfigController.query();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            pointsIsOpen: pointsIsOpen.status == 1 ? true : false,
            returnFlowState: returnFlowState,
          },
        },
      });
      try {
        const res = await api.returnOrderBaseController.refundOrder(rid);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              refundOrderResponseList: res.refundOrderResponseList,
            },
          },
        });
      } catch (error) {
        const result = await api.returnOrderBaseController.findById(rid);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              refundOrderResponseList: [
                {
                  payType: result.payType,
                  returnAccountName: '',
                  customerAccountName: '',
                  actualReturnPrice: '',
                  refundBillTime: '',
                  returnPrice: result.returnPrice.totalPrice,
                  returnPoints: result.returnPoints.applyPoints || 0,
                },
              ],
            },
          },
        });
      }
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
        packageCOrderFinanceRefundRecordMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderFinanceRefundRecordMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
