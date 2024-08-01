import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import packageACustomerUserInfoMain from '../reducers/main';
import {addressInfo} from '@/utils/location/area/area';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 会员基本信息初始化
     * @returns {Promise<void>}
     */
    async init() {
      await actions.loadReducer();
      actions.action.commonChange('main.isLoadingList',true)
      const customer = await api.customerBaseController.findCustomerBaseInfo(); //用户信息
      const info = await api.customerBaseController.getGrowthValueAndPoint(); //积分成长值
      const addressInfoStr = await addressInfo(
        customer.provinceId,
        customer.cityId,
        customer.areaId,
        customer.streetId,
      );
      // 积分开关是否打开
      const pointOpenRes = await api.systemPointsConfigController.query();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            customer: customer,
            addressInfo: addressInfoStr == '请选择所在地区' ? '暂时保密' : addressInfoStr,
            growthValues: info,
            perfectInfo:
              customer &&
              customer.areaId &&
              customer.customerAddress &&
              customer.birthDay &&
              (customer.gender == 0 || customer.gender == 1) &&
              customer.contactPhone &&
              customer.contactName &&
              customer.customerName,
            pointsIsOpen: pointOpenRes.status == 1
          },
        },
      });
      actions.action.commonChange('main.isLoadingList',false)
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
        packageACustomerUserInfoMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageACustomerUserInfoMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
