import Taro, {Component, Config} from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import {addressInfo} from '@/utils/location/area/area';

import {redeemPrize} from 'api/DrawRecordController';
import {findAddressList} from 'api/CustomerDeliveryAddressBaseController';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    //地址初始化
    async _addressInit() {
      let localAddress = await action._getLoacl();
      if (localAddress) return localAddress;
      const context = await findAddressList();
      let address: any = {};
      if (context.length) {
        //过滤默认地址
        const defaltAddress = context.filter((item) => item.isDefaltAddress === 1)[0];
        //没有默认地址取第一个
        address = defaltAddress || context[0];
      }
      return address;
    },
    async _savaLocal() {
      const {
        main: {address},
      } = getData();
      //地址缓存
      await Taro.setStorageSync('mini::prize-recevice-address', address);
    },
    async _getLoacl() {
      let address = await Taro.getStorageSync('mini::prize-recevice-address');
      await action.commonChange([{paths: 'main.address', value: address}]);
      await Taro.removeStorageSync('mini::prize-recevice-address');
      return address;
    },
    async submit() {
      const {
        main: {prizeId, address, prizeInfo},
      } = getData();
      const {
        provinceName = '',
        cityName = '',
        areaName = '',
        streetName = '',
        deliveryAddress = '',
        consigneeName = '',
        consigneeNumber = '',
        deliveryAddressId = '',
        houseNum = '',
      } = address || {};
      Taro.showLoading();
      try {
        if (prizeInfo.prizeType === 2 && (!address || !deliveryAddressId)) {
          Taro.showToast({
            title: '请选择收货地址',
            icon: 'none',
            duration: 2000,
          });
          return;
        }
        let program = null;
        // 实物奖品
        if (prizeInfo.prizeType === 2) {
          program = {
            consigneeName,
            consigneeNumber,
            deliveryAddress:
              (provinceName + provinceName != cityName ? cityName : '') +
              (areaName + streetName + deliveryAddress + houseNum),
            id: prizeId,
          };
        } else {
          // 自定义奖品
          program = {
            id: prizeId,
          };
        }
        let result = await redeemPrize(program);
        Taro.showToast({
          title: '领取成功',
          icon: null,
          duration: 3000,
        });
        Taro.hideLoading();
        //缓存领取成功信息
        await Taro.removeStorageSync('mini::prize-recevice-address');
        await Taro.setStorageSync('mini::prize-draw-success', result.drawRecordVO);
        await Taro.redirectTo({
          url: `/pages/package-C/lottery/prize-success/index`,
        });
      } catch (e) {
        Taro.hideLoading();
        Taro.showToast({
          title: e.message,
          icon: null,
          duration: 3000,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageAPrizeReceiveMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
