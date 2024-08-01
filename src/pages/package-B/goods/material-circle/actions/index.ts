import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import goodsMaterialCircleMain from '../reducers/main';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(goodsInfoId) {
      await actions.loadReducer();
      try {
        const res = await Promise.all([
          api.distributionController.queryDistributorInfoByCustomerId(),
          api.messageController.page({pageNum: 0, pageSize: 10}),
          WMkit.isOpenWechat(),
        ]);
        const {noticeNum, preferentialNum} = res[1];
        const isOpenWechat = res[2];
        dispatch({
          type: Command.init,
          payload: {
            main: {
              customer: res[0].distributionCustomerVO,
              noticeNum: noticeNum,
              preferentialNum: preferentialNum,
              goodsInfoId,
              isOpenWechat: isOpenWechat,
            },
          },
        });
      } catch (e) {
        Taro.showToast({
          title: e.message,
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
        goodsMaterialCircleMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['goodsMaterialCircleMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
