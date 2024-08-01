import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';

import Action, {getData} from './action';

import packageACustomerMessagePushCenterMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();

      let {noticeNum, preferentialNum, appMessageVOPage} = await api.messageController.page({pageNum: 0, pageSize: 15});
      dispatch({
        type: Command.init,
        payload: {
          main: {
            noticeNum: noticeNum,
            preferentialNum: preferentialNum,
            reload: !getData()?.main?.reload,
            list: appMessageVOPage.content,
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
        packageACustomerMessagePushCenterMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerMessagePushCenterMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },

    async reload() {
      await actions.loadReducer();
      let {noticeNum, preferentialNum} = await api.messageController.page({pageNum: 0, pageSize: 15});
      dispatch({
        type: Command.init,
        payload: {
          main: {
            noticeNum: noticeNum,
            preferentialNum: preferentialNum,
            reload: !getData().main.reload,
          },
        },
      });
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
