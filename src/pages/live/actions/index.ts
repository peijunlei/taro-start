import Store from '@/redux/store';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import liveMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      //查询是否开启直播功能
      actions.action.commonChange('main.isLoadingFlag',true)
      const isOpenRes = await api.liveRoomController.isLiveOpen();
      const isOpenStatus = isOpenRes && isOpenRes.configVOList ? isOpenRes.configVOList[0].status : 0;

      //未开启直播功能或者是h5
      if (isOpenStatus == 0 || __TARO_ENV === 'h5') {
        actions.action.commonChange('main.isOpen', false);
        actions.action.commonChange('main.currentTab', 1);
        actions.action.commonChange('main.isReady', true);
        return false;
      }
      const data = await Promise.all([
        api.liveRoomController.getPage({
          pageNum: 0,
          pageSize: 10,
          liveStatus: null,
        }), //分页查询直播列表
        api.liveRoomController.getList({recommend: 1}), //查询轮播图
      ]);

      dispatch({
        type: Command.init,
        payload: {
          main: {
            roomInfo: data[0].liveRoomVOPage.content,
            liveGoodsList: data[0].liveGoodsList,
            pageNum: data[0].liveRoomVOPage.number,
            carouselList: data[1].liveRoomVOList,
            liveRoomReplayVOList: data[0].liveRoomReplayVOList,
            currentLiveTabIndex: -1,
            logoList: data[0].storeVO,
            isOpen: true,
          },
        },
      });
      actions.action.commonChange('main.isLoadingFlag',false)
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
        liveMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['liveMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
