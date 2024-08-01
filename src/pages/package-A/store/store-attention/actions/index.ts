import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';

import Action, {getData} from './action';

import packageAStoreStoreAttentionMain from '../reducers/main';
import StoreFollowBaseController from 'api/StoreFollowBaseController';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            selectedList: [],
            ifModify: false,
            ifSelectAll: false,
          },
        },
      });

      // setTimeout(() => {//测试是否加载太快导致不显示骨架屏
      actions.action.commonChange('main.isLoading', false)
      // },500)


    },

    async cancelAttention() {
      const {selectedList} = getData().main;
      await StoreFollowBaseController.delete_({storeIds: selectedList});
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
        packageAStoreStoreAttentionMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageAStoreStoreAttentionMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
