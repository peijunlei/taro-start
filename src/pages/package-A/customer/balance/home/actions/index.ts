import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageACustomerBalanceHomeMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';
import { cache } from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(enterpriseId?:string) {
      await actions.loadReducer();
      await actions.action.commonChange('isLoadingFlag', true);
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA)||{};
      const lastLoginEnterpriseId = loginData.lastLoginEnterpriseId

      try {
        const res = await Promise.all([api.customerFundsController.statistics(enterpriseId), WMkit.isOpenWechat(), api.customerBaseController.getEnterpriseInfoByCustomerId()]);
        const isOpenWechat = res[1];
        //是否开启余额转赠
        const enterpriseList = (res[2].enterpriseInfoVOList||[]) as any[]
        let isOpenEnterprise = enterpriseList.find(v=>v.enterpriseId===lastLoginEnterpriseId)?.transferLoyaltyPointsType===1
        if(lastLoginEnterpriseId==='-1'){
          isOpenEnterprise = true
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              amount: res[0],
              isOpenEnterprise,
              isOpenWechat: isOpenWechat,
              isLoadingFlag: false,
            },
          },
        });
      } catch (e) {}
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
        pagesPackageACustomerBalanceHomeMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerBalanceHomeMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
