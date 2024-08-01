import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import api from 'api';
import Action from './goodsAction';
import PackageACustomerUserPointsOrdersListMain from '../reducers/main';
import action from '../../../../../../../../b2b-app/src/pages/goods-detail/evaluation-list/actions/action';

export default (dispatch: Dispatch) => {
  const actions = {
    goodsAction: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(key) {
      await actions.loadReducer();
      await actions.goodsAction.nativeTo();
      actions.goodsAction.changeTopActive(key);
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
        PackageACustomerUserPointsOrdersListMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['PackageACustomerUserPointsOrdersListMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
