import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Taro from '@tarojs/taro';
import Action from './action';

import spikeHomeMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingList', true);
      let {flashSaleCateVOList} = await api.flashSaleController.cateList();
      let {imgJSON} = await api.flashSaleController.getSetting();
      let {flashSaleActivityVOList, recentDate, recentTime} = await api.flashSaleController.sceneList();

      let index = flashSaleActivityVOList.findIndex((item) => {
        return item.activityDate == recentDate && item.activityTime == recentTime;
      });
      let activityStatus = null;
      if (flashSaleActivityVOList.length > 0) {
        activityStatus = flashSaleActivityVOList[index].status;
      }
      let flashBanner = imgJSON ? JSON.parse(imgJSON) : [];
      dispatch({
        type: Command.init,
        payload: {
          main: {
            sceneList: flashSaleActivityVOList,
            flashBanner: flashBanner,
            activityDate: recentDate,
            activityTime: recentTime,
            activityStatus: activityStatus,
            cateList: flashSaleCateVOList,
          },
        },
      });
      actions.action.commonChange('main.isLoadingList', false);
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
        spikeHomeMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['spikeHomeMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
