import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {addressInfo} from '@/utils/location/area/area';
import {msg, ValidConst} from 'wmkit';
import {cache} from 'config';
const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    onChange(key, value) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: `main.${key}`,
          value: value,
        },
      });
    },
    /**
     * 提交
     */
    async submit(addressId) {
      let {
        consigneeName,
        consigneeNumber,
        areaIds,
        deliveryAddress,
        isDefaltAddress,
        deliveryAddressId,
        houseNum,
      } = getData().main;

      const {
        main: {mode, localKey},
      } = getData();
      const codeArr = Taro.getStorageSync(cache.CODE_ARR);
      const latitude = codeArr.latitude;
      const longitude = codeArr.longitude;

      let areaIdsMap = {
        provinceId: codeArr.provinceId,
        cityId: codeArr.cityId,
        areaId: codeArr.areaId,
        streetId: codeArr.streetId||null,
      } as any;
      if (consigneeName == '') {
        Taro.showToast({
          title: '请填写收货人',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (consigneeNumber == '') {
        Taro.showToast({
          title: '请填写手机号码',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(consigneeNumber)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!areaIdsMap.provinceId) {
        Taro.showToast({
          title: '请选择所在地区',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }else if (!houseNum) {
        Taro.showToast({
          title: '请填写详细地址',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (houseNum&&houseNum.length>50) {
        Taro.showToast({
          title: '详细地址最多输入50个字符',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } 
      // 校验是否需要完善地址
      // if (areaIdsMap) {
      //   const result = await api.platformAddressController.verifyAddress({...areaIdsMap});
      //   console.log(result);
      //   if (result) {
      //     action.onChange('maskShow', false);
      //     // Taro.showModal({
      //     //   title: '',
      //     //   content: '请完善收货地址',
      //     //   showCancel: false,
      //     //   confirmText: '立即完善',
      //     // }).then(async (res) => {
      //     //   if (res.confirm) {
      //     //     action.commonChange('main.pickerShow', true);
      //     //   }
      //     // });
      //     return false;
      //   }
      // }


      let address;
      if (addressId != '-1') {
        try {
          address = await api.customerDeliveryAddressBaseController.updateAddress({
            consigneeName,
            consigneeNumber,
            ...areaIdsMap,
            houseNum,
            deliveryAddress,
            isDefaltAddress,
            deliveryAddressId,
            latitude,
            longitude,
          });
        } catch (e) {
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        Taro.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 2000,
        });
        if (mode === '1') {
          address.addressInfo =
            (await addressInfo(address.provinceId, address.cityId, address.areaId, address.streetId)) +
            address.deliveryAddress;
          await Taro.setStorageSync(`mini::${localKey}`, address);
        }
        await Taro.navigateBack();
      } else {
        try {
          await api.customerDeliveryAddressBaseController.saveAddress({
            consigneeName,
            consigneeNumber,
            ...areaIdsMap,
            deliveryAddress,
            houseNum,
            isDefaltAddress,
            latitude,
            longitude,
          });
        } catch (e) {
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        Taro.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 2000,
        });
        if (mode === '1') {
          address.addressInfo =
            (await addressInfo(address.provinceId, address.cityId, address.areaId, address.streetId)) +
            address.deliveryAddress;
          await Taro.setStorageSync(`mini::${localKey}`, address);
        }
        await Taro.navigateBack();
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerReceiveAddressEditMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
