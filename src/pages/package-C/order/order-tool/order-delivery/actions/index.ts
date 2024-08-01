import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';

import Action from './action';

import packageCOrderOrderToolOrderDeliveryMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {WMkit} from "wmkit";

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const offlinePaySetting = await api.PaySettingConfigController.getOfflinePaySetting();
      let payWay = [{id: 0, name: '在线支付'}];
      // 如果是拼团单，设置成在线支付
      const openGroupon = await Taro.getStorageSync('mini::openGroupon');
      // 线下支付开关开启时
      !openGroupon && offlinePaySetting.status === 1 && !WMkit.isMall() && payWay.push({id: 1, name: '线下支付'});
      dispatch({
        type: Command.init,
        payload: {
          main: {
            payWay: payWay,
            offlineStatus: offlinePaySetting.status,
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
        packageCOrderOrderToolOrderDeliveryMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageCOrderOrderToolOrderDeliveryMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
