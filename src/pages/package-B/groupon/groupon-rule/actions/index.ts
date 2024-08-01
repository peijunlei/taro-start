import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageBGrouponGrouponRuleMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingFlag',true)
      try {
        const res = await api.grouponSettingController.findOne();
        dispatch({
          type: Command.init,
          payload: {
            main: {
              context: res.grouponSettingVO.rule,
            },
          },
        });
      } catch (e) {
        Taro.showToast({
          title: e,
        });
      }
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
        packageBGrouponGrouponRuleMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBGrouponGrouponRuleMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
