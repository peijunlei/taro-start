import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import businessIndustries from '../../../../../wmkit/common/json/business/businessIndustry.json';
import businessEmployeeNums from '../../../../../wmkit/common/json/business/businessEmployeeNums.json';
import Action from './action';

import packageACustomerUserEnterpriseMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      const res = await api.enterpriseInfoBaseController.getEnterpriseInfo();

      const enterpriseInfoVO = res.enterpriseInfoVO;
      const industry =
        enterpriseInfoVO.businessIndustryType >= 0 && enterpriseInfoVO?.businessIndustryType != null
          ? businessIndustries[enterpriseInfoVO?.businessIndustryType].label
          : '';
      const enterpriseNum =
        enterpriseInfoVO.businessEmployeeNum >= 0 && enterpriseInfoVO?.businessEmployeeNum != null
          ? businessEmployeeNums[enterpriseInfoVO?.businessEmployeeNum].label
          : '';

      dispatch({
        type: Command.init,
        payload: {
          main: {
            enterpriseInfoVO: res.enterpriseInfoVO,
            enterpriseNum,
            industry,
            enterpriseNumValue: res.enterpriseInfoVO?.businessEmployeeNum,
            businessIndustryValue: res.enterpriseInfoVO?.businessIndustryType,
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
        packageACustomerUserEnterpriseMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerUserEnterpriseMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
