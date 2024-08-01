import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageACustomerUserIntegralMain from '../reducers/main';
import api from 'api';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const res = await Promise.all([
        api.customerBaseController.findCustomerCenterInfo(),
        api.customerPointsController.queryWillExpirePoints(),
        api.systemPointsConfigController.query(),

      ]);
      await actions.action.page();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            pointsValue: res[0].pointsAvailable,
            willExpirePointsData: res[1],
            pointsRule: res[2].remark
          }
        }
      });
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        pagesPackageACustomerUserIntegralMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerUserIntegralMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
