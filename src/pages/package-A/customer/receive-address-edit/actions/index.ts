import { Command } from '../constant';
import { Dispatch } from 'typings';
import { getActionProxy } from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageACustomerReceiveAddressEditMain from '../reducers/main';
import { addressInfo } from '@/utils/location/area/area';
import { cache } from 'config';
import Taro from '@tarojs/taro';
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(tid, mode?: string, localKey?: string) {
      await actions.loadReducer();
      // 编辑
      if (tid != '-1') {
        const res = await api.customerDeliveryAddressBaseController.findById(tid);

        let addressInfoStr = res.deliveryAddress;
        // 兼容老数据代码
        if (!res.latitude) {
          if (res.streetId != -1) {
            addressInfoStr = await addressInfo(res.provinceId, res.cityId, res.areaId, res.streetId);
          } else {
            addressInfoStr = await addressInfo(res.provinceId, res.cityId, res.areaId);
          }
        }
        let houseNum = res.houseNum||res.deliveryAddress;
        Taro.setStorageSync(cache.SELECT_HOUSE_NUM,houseNum);
        Taro.setStorageSync(cache.SELECT_ADDRESS, addressInfoStr);
        if (__TARO_ENV === 'weapp') {
          Taro.setStorageSync(cache.CODE_ARR, {
            areaId: res.areaId,
            cityId: res.cityId,
            provinceId: res.provinceId,
            streetId: res.streetId,
            location: res.longitude + ',' + res.latitude,
          });
        }
        if (__TARO_ENV === 'h5') {
          Taro.setStorageSync(cache.CODE_ARR, {
            areaId: res.areaId,
            cityId: res.cityId,
            provinceId: res.provinceId,
            streetId: res.streetId,
            latitude: res.latitude,
            longitude: res.longitude,
          });
        }
        dispatch({
          type: Command.init,
          payload: {
            main: {
              consigneeName: res.consigneeName,
              consigneeNumber: res.consigneeNumber,
              deliveryAddress: addressInfoStr,
              isDefaltAddress: res.isDefaltAddress,
              deliveryAddressId: res.deliveryAddressId,
              houseNum,
              areaIds: [res.provinceId, res.cityId, res.areaId, res.streetId],
              provinceId: res.provinceId,
              cityId: res.cityId,
              areaId: res.areaId,
              streetId: res.streetId,
              latitude: res.latitude,
              longitude: res.longitude,
              mode: mode,
              localKey: localKey,
              needComplete:res.needComplete,
            },
          },
        });
      } else {
        const selectAddress = Taro.getStorageSync(cache.SELECT_ADDRESS) || '';
        const codeArr = Taro.getStorageSync(cache.CODE_ARR) || null;
        const houseNum = Taro.getStorageSync(cache.SELECT_HOUSE_NUM) || '';
        let latitude, longitude;
        if (codeArr?.location) {
          const loc = codeArr.location?.split(',');
          if (loc?.length === 2) {
            latitude = loc[1];
            longitude = loc[0];
          }
        }
        const lng = codeArr?.longitude || longitude;
        const lat = codeArr?.latitude || latitude;
        //新增
        dispatch({
          type: Command.init,
          payload: {
            main: {
              deliveryAddress: selectAddress,
              latitude: lat,
              longitude: lng,
              cityId: codeArr?.cityId,
              needComplete:lng?false:true,
              houseNum,
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
      dispatch({ type: Command.clean });
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        pagesPackageACustomerReceiveAddressEditMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageACustomerReceiveAddressEditMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return { actions };
};

//create by moon https://github.com/creasy2010/moon
