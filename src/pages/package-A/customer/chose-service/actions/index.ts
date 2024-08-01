import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import qQServiceController from 'api/QQServiceController';
import * as reduxStore from '@/redux/store';

import Action from './action';

import commonChoseServiceActor from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(storeId) {
      await actions.loadReducer();

      if (!storeId) {
        storeId = 0;
      }
      let type: any = 1;
      let context = [];
      let enterpriseId = '';
      const res = await Promise.all([
        qQServiceController.qqDetail(storeId, type),
        qQServiceController.weChatDetail(storeId),
      ]);
      if (res[0]?.qqOnlineServerRop?.status === 1) {
        context = res[0].qqOnlineServerItemRopList;
      }
      if (res[1]?.weChatOnlineServerRop?.status === 1) {
        context = res[1].weChatOnlineServerItemRopList;
        enterpriseId = res[1].weChatOnlineServerRop.enterpriseId;
      }

      dispatch({
        type: Command.init,
        payload: {
          main: {
            serviceList: context,
            enterpriseId,
          },
        },
      });
    },
    /**
     * 重置
     */
    async clean() {
      await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        commonChoseServiceActor,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['commonChoseServiceActor']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
