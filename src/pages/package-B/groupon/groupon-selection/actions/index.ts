import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageBGrouponGrouponSelectionMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const hot = await api.grouponCenterController.list({pageNum: 0, pageSize: 15});
      const {
        grouponCenterVOList: {content},
      } = hot;
      const res = await api.grouponCateBaseController.findGrouponCateList();
      const {grouponCateVOList} = res;
      let grouponCate: any = {
        defaultCate: 0,
        grouponCateId: '-1',
        grouponCateName: '全部',
      };
      grouponCateVOList.unshift(grouponCate);
      dispatch({
        type: Command.init,
        payload: {
          main: {
            grouponHotList: content,
            grouponCates: grouponCateVOList,
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
        packageBGrouponGrouponSelectionMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBGrouponGrouponSelectionMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
