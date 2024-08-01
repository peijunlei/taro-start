import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';
import Taro from '@tarojs/taro';
import api from 'api';
import { addressInfo } from '@/utils/location/area/area';
import { cache } from 'config';
import {_} from 'wmkit'
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async _saveAddress(store) {
      const {
        main: { mode, localKey },
      } = getData();
      if (mode === '1') {
        if (store) {
          // 校验是否需要完善四级地址
          const flag = await this.isTrueAddress(store, localKey);
          if (flag) {
            return;
          }
          await Taro.setStorageSync(`mini::${localKey}`, store);
          await Taro.setStorageSync(cache.MINI_CHOOSE_ADDRESS, true);
          await Taro.navigateBack();
        }
      }
    },

    // 校验是否是四级地址
    async isTrueAddress(address, localKey) {
      // action.commonChange('main.currentAddress', address);
      if (address) {
        const result = await api.platformAddressController.verifyAddress({
          provinceId: address.provinceId,
          cityId: address.cityId,
          areaId: address.areaId,
          streetId: address.streetId,
          longitude: address.longitude,
          latitude: address.latitude,
          dangaossAddrId: address.dangaossAddrId
        });
        if (result) {
          Taro.showModal({
            title: '',
            content: '请完善收货地址',
            showCancel: false,
            confirmText: '立即完善',
          }).then(async (res) => {
            if (res.confirm) {
              try {
                // action.commonChange('main.pickerShow', true);
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/receive-address-edit/index?addressId=${address.deliveryAddressId}&mode=1&localKey=${localKey}`,
                });
              } catch (e) { }
            }
          });
          return true;
        }
      }
    },

    async _editAddress(item) {
      const {
        main: { mode, localKey },
      } = getData();
      if (mode === '1') {
        Taro.navigateTo({
          url: `/pages/package-A/customer/receive-address-edit/index?addressId=${
            item.deliveryAddressId
            }&mode=${1}&localKey=${localKey}`,
        });
      } else {
        Taro.navigateTo({
          url: `/pages/package-A/customer/receive-address-edit/index?addressId=${item.deliveryAddressId}`,
        });
      }
    },

    // mode = 1 => address可以点击
    async query(mode?: string, localKey?: string) {
      action.commonChange('main.isLoadingList', true);
      let list = await api.customerDeliveryAddressBaseController.findAddressList();
      if (list.length >= 20) {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.showAdd',
            value: true,
          },
        });
      } else {
        dispatch({
          type: Command.commonChange,
          payload: {
            paths: 'main.showAdd',
            value: false,
          },
        });
      }

      // 省、市、区（县）、街道（乡）+ 详细地址
      list.map((item) => {
        item['addressInfo'] = _.getAddressInfoStr(item as any)
      });

      dispatch({
        type: Command.queryResult,
        payload: {
          mode,
          localKey,
          list: [...list],
        },
      });
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 删除收货地址
     */
    async deleteAddress(addressId: string) {
      const {
        main: { mode, localKey },
      } = getData();
      try {
        await api.customerDeliveryAddressBaseController.deleteAddress_(addressId);
        // let { defaultAddr, orderConfirm } = Taro.getStorageSync(cache.ORDER_INVOICE) ? Taro.getStorageSync(cache.ORDER_INVOICE):{} as any;
        // if ((defaultAddr && defaultAddr.deliveryAddressId == addressId)
        //   || (orderConfirm && fromJS(orderConfirm).some(o => o.defaultInvoiceAddr
        //     && o.defaultInvoiceAddr.deliveryAddressId == addressId))) {
        //   const  context  = await api.customerDeliveryAddressBaseController.findDefaultAddress()
        //   orderConfirm = fromJS(orderConfirm).map(o => {
        //     if (o.getIn(['defaultInvoiceAddr', 'deliveryAddressId']) == addressId) {
        //       o = o.set('defaultInvoiceAddr', context)
        //     }
        //     return o
        //   }).toJS();
        //   let firstAddress = defaultAddr;
        //   if (defaultAddr.deliveryAddressId == addressId) {
        //     firstAddress = context
        //   }
        //   Taro.setStorageSync(cache.ORDER_INVOICE,{defaultAddr: firstAddress, orderConfirm});
        // }
        Taro.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000,
        });
        action.query(mode, localKey);
      } catch (e) { }
    },
    /**
     * 设为默认收货地址
     */
    async setDefault(addressId: string) {
      const {
        main: { mode, localKey },
      } = getData();
      try {
        await api.customerDeliveryAddressBaseController.setDefaultAddress(addressId);
        Taro.showToast({
          title: '设置成功！',
          icon: 'none',
          duration: 2000,
        });
        action.query(mode, localKey);
      } catch (e) { }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerReceiveAddressMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
