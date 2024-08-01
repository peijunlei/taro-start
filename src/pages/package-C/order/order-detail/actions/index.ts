import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import OrderDetailMain from '../reducers/main';
import {_} from 'wmkit';
import {Const} from 'config';
import {action} from 'commander';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),
    /**
     * 初始化数据
     */
    async init(tid, pointsOrder, promotionOrder, usePoint) {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoadingFlag', true);
      await actions.action._dataReady(tid, pointsOrder, promotionOrder, usePoint);
      await actions.action.setServerTime();
      await actions.action.commonChange('main.isLoadingFlag', false);
    },

    /**
     * 为整数添加两位小数
     * 四舍五入
     */
    _addZero(num) {
      return new Number(num ? num : 0).toFixed(2);
    },

    //通过积分算对应的金额
    _pointToMoney(point) {
      return _.div(point, Const.pointRatio);
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
        OrderDetailMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['OrderDetailMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
