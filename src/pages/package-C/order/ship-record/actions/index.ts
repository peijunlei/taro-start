import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import api from 'api';
import Action from './action';
import packageCOrderShipRecordMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(id: string, type: string) {
      await actions.loadReducer();
      let res;
      try {
        res = await api.tradeBaseController.tradeDeliverRecord(id);
        let status = false;
        if (res.status == 'DELIVERED') {
          status = true;
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              tradeDilivery: res.tradeDeliver,
              type: type,
              deliveryStatus: status,
              orderId: id,
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
      //@ts-ignore
      __TARO_ENV !== 'h5' && (await actions.unloadReducer());
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        packageCOrderShipRecordMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderShipRecordMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
