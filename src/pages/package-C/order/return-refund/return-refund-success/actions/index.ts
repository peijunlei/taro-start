import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro from '@tarojs/taro';

import Action from './action';
import {_} from 'wmkit';
import packageCReturnRefundMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),
    /**
     * 退货成功初始化
     * @param rid
     */
    async returnsOkInit(rid) {
      await actions.loadReducer();
      try {
        let returnOrderRes = await api.returnOrderBaseController.findById(rid);
        dispatch({
          type: Command.init,
          payload: {
            main: {
              returnsResult: returnOrderRes,
            },
          },
        });
      } catch (error) {
        Taro.showToast({
          title: '退单不存在',
          icon: 'none',
          duration: 2000,
        });
        // Taro.navigateTo({
        //   url: `/pages/package-C/order/order-list/index`,
        // });
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
        packageCReturnRefundMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCReturnRefundMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
