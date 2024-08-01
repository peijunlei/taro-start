import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import Action from './action';
import PointsConfirmMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(params) {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingFlag', true);
      try {
        var {pointsTradeConfirmItem, totalPoints, orderTagVO} = await api.pointsTradeControl.getExchangeItem(params);
        // var canPayOnLine = await api.payBaseController.queryGatewayIsOpen('H5');
        //地址初始化
        var address = await actions.action._addressInit();
        //获取用户相关信息
        const {payErrorTime = null, payLockTime = null} = await api.customerBaseController.getLoginCustomerInfo();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              myStore: {pointsTradeConfirmItem, totalPoints},
              payData: {
                payErrorTime,
                checkPayPwRes: await actions.action._getCheckPayPwdRes(payLockTime),
              },
              orderList: {
                //地址相关数据
                address: address,
                //订单备注
                buyRemark: {},
                isVirtualGoods: orderTagVO.electronicCouponFlag || orderTagVO.virtualFlag
              },
              isShowCheckPayPwRes: false,
            },
          },
        });
      } catch (e) {
        e.message && actions.action._confirmMaskInit;
      }
      actions.action.commonChange('main.isLoadingFlag', false);
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
        PointsConfirmMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['PointsConfirmMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
