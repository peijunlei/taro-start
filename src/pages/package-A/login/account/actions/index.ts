import * as reduxStore from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';

import Action from './action';

import loginAccountMain from '../reducers/main';
import {cache} from 'config';
import Taro from '@tarojs/taro';
import {addressInfo} from '@/utils/location/area/area';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(customerId) {
      await actions.loadReducer();
      const res = Taro.getStorageSync(cache.PENDING_AND_REFUSED);
      if (res) {
        const addressInfoStr = await addressInfo(
          res.customerDetail.provinceId || 0,
          res.customerDetail.cityId || 0,
          res.customerDetail.areaId || 0,
          res.customerDetail.streetId || 0,
        );
        dispatch({
          type: Command.init,
          payload: {
            main: {
              accountInfo: {
                uName: res.customerDetail.customerName,
                birthDay: res.customerDetail.birthDay,
                gender: res.customerDetail.gender || '',
                provinceId: res.customerDetail.provinceId || 0,
                cityId: res.customerDetail.cityId || 0,
                areaId: res.customerDetail.areaId || 0,
                streetId: res.customerDetail.streetId || 0,
                address: res.customerDetail.customerAddress,
                contact: res.customerDetail.contactName,
                phone: res.customerDetail.contactPhone,
                customerId: res.customerDetail.customerId,
              },
              areaIds: [
                res.customerDetail.provinceId || 0,
                res.customerDetail.cityId || 0,
                res.customerDetail.areaId || 0,
                res.customerDetail.streetId || 0,
              ],
              checked: res.checkState,
              rejectReason: res.customerDetail.rejectReason,
              areaInfo: addressInfoStr,
              initialName: res.customerDetail.customerName,
            },
          },
        });
        actions.action.startTime();
      } else {
        dispatch({
          type: Command.init,
          payload: {
            main: {
              accountInfo: {
                customerId: customerId,
              },
            },
          },
        });
      }
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
        loginAccountMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginAccountMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
