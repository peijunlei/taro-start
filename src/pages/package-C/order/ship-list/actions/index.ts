import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import api from 'api';
import Action from './action';
import packageCOrderShipListMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id: string, type: string) {
      await actions.loadReducer();
      try {
        const res = await api.tradeBaseController.shippItemsByLogisticsNo(type, id, null);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              goodList: {
                deliveryInfo: res.logistics.deliveryInfo,
                remark: res.logistics.remark,
                logistics: {
                  logisticCompanyName: res.logistics.logisticCompanyName,
                  logisticNo: res.logistics.logisticNo,
                },
                status: res.status,
                failMessage: res.failMessage,
                shippingItems: res.shippingItems,
                giftItemList: res.giftItemList,
                deliveryTime: res.deliverTime,
              },
            },
          },
        });
      } catch (e) {}
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
        packageCOrderShipListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderShipListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
