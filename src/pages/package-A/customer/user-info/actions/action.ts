import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import api from 'api';

const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async _clearLocal() {
      await Taro.removeStorageSync('mini::account');
      await Taro.removeStorageSync('mini::contactName');
      await Taro.removeStorageSync('mini::contactPhone');
      await Taro.removeStorageSync('mini::contactAddressInfo');
      await Taro.removeStorageSync('mini::editUserInfo');
    },
    async _getLoacl() {
      const editUserInfo = Taro.getStorageSync('mini::editUserInfo');
      const account = Taro.getStorageSync('mini::account');
      if (editUserInfo == 'account') {
        await action.commonChange([{ paths: 'main.customer.customerName', value: account }]);
      }
      const contactName = Taro.getStorageSync('mini::contactName');
      if (editUserInfo == 'contactName') {
        await action.commonChange([{ paths: 'main.customer.contactName', value: contactName }]);
      }
      const contactPhone = Taro.getStorageSync('mini::contactPhone');
      if (editUserInfo == 'contactPhone') {
        await action.commonChange([{ paths: 'main.customer.contactPhone', value: contactPhone }]);
      }
      const contactAddressInfo = Taro.getStorageSync('mini::contactAddressInfo');
      if (editUserInfo == 'contactAddressInfo') {
        await action.commonChange([{ paths: 'main.customer.customerAddress', value: contactAddressInfo }]);
      }
    },
    async submit() {
      let { customer, growthValues, perfectInfo, flag, rewardFlag } = getData().main;
      if (customer.contactPhone && !regexTel.test(customer.contactPhone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (customer.provinceId && customer.provinceId != 0) {
        // 校验是否需要完善地址
        if (customer && customer.provinceId) {
          const result = await api.platformAddressController.verifyAddress({
            provinceId: customer.provinceId && customer.provinceId.toString(),
            cityId: customer.cityId && customer.cityId.toString(),
            areaId: customer.areaId && customer.areaId.toString(),
            streetId: customer.streetId && customer.streetId.toString(),
            longitude: customer.longitude,
            latitude: customer.latitude,
            dangaossAddrId: customer.dangaossAddrId
          });
          if (result) {
            Taro.showModal({
              title: '',
              content: '请完善地址',
              showCancel: false,
              confirmText: '立即完善',
            });
            return false;
          }
        }
        //所在地区和详细地址不是必填，但如果填写所在地区，则详细地址不能为空，反之亦然
        if (!customer.customerAddress || customer.customerAddress.length == 0) {
          Taro.showToast({
            title: '请填写详细地址',
            icon: 'none',
            duration: 2000,
          });
          return false;
        } else if (customer.customerAddress.length < 5 || customer.customerAddress.length > 60) {
          Taro.showToast({
            title: '地址长度为5-60个字符！',
            icon: 'none',
            duration: 2000,
          });
          return false;
        }
      }
      try {
        await api.customerBaseController.updateCustomerBaseInfo(customer);
        Taro.showToast({
          title: '提交成功！',
          icon: 'none',
          duration: 2000,
        });

        let displayFlag = false;
        if (growthValues.growthFlag && growthValues.growthValue > 0) {
          displayFlag = displayFlag || true;
        }
        if (growthValues.pointFlag && growthValues.point > 0) {
          displayFlag = displayFlag || true;
        }
        //之前没有完善，现在完善了同时可以获得成长值或积分，提示弹框去看看
        if (
          !perfectInfo &&
          displayFlag &&
          customer.areaId &&
          customer.customerAddress &&
          customer.birthDay &&
          (customer.gender == 0 || customer.gender == 1) &&
          customer.customerName &&
          customer.contactName &&
          customer.contactPhone
        ) {
          action.commonChange('main.rewardFlag', true);
          action.commonChange('main.flag', !flag);
          //信息完善不展示完善信息按钮
          action.commonChange('main.perfectInfo', true);
        }
      } catch (e) { }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserInfoMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
