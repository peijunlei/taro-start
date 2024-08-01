import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import {IAllReducerProps} from '../types';

import Action from './action';

import packageAGoodsAllListMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(cateId) {
      await actions.loadReducer();
      await actions.action.commonChange('main.isLoading', true);
      let cateList = await api.goodsCateBaseController.allGoodsCates();
      cateList = JSON.parse(cateList) || [];
      actions.action._initOtherHandle(cateId, cateList, 'content');
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
        packageAGoodsAllListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageAGoodsAllListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

function getData(): IAllReducerProps {
  return {
    main: reduxStore.getReducerData('packageAGoodsAllListMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
