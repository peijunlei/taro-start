import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import materialCircleMain from '../reducers/main';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      try {
        const res = await api.distributionController.queryDistributorInfoByCustomerId();
        const {noticeNum, preferentialNum} = await api.messageController.page({pageNum: 0, pageSize: 10});
        dispatch({
          type: Command.init,
          payload: {
            main: {
              customer: res.distributionCustomerVO ? res.distributionCustomerVO : {},
              noticeNum: noticeNum,
              preferentialNum: preferentialNum,
            },
          },
        });

        const openFlag = await api.distributionController.queryOpenFlag();
        const isOpenWechat = await WMkit.isOpenWechat();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              openFlag: openFlag,
              isOpenWechat: isOpenWechat,
            },
          },
        });
        Taro.hideLoading();
      } catch (e) {
        Taro.showToast({
          title: e.message,
        });
        Taro.hideLoading();
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
        materialCircleMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['materialCircleMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
