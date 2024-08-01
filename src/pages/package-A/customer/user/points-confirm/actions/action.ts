import { Command } from '../constant';
import { Dispatch } from 'typings';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import api from 'api';
import Taro from '@tarojs/taro';
import { extraPathsValue } from '@/redux/util';
import { addressInfo } from '@/utils/location/area/area';
import { Const } from 'config';
import moment from 'dayjs';
import { immutable } from 'wmkit';

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
      const {
        myStore,
      } = getData().main;
      const context = await api.customerDeliveryAddressBaseController.findAddressList();
      const selectAddr = Taro.getStorageSync('mini::confirmAddress');

      let address: any = {};
      let defaltAddress;
      if (context.length) {
        //过滤默认地址
        // const defaltAddress = context.filter((item) => item.isDefaltAddress === 1)[0];
        for (let i = 0; i < context.length; i++) {
          const item = context[i];
          const addressInfoStr = await addressInfo(item.provinceId, item.cityId, item.areaId, item.streetId);
          item.addressInfo = addressInfoStr + item.deliveryAddress;
          if (item.isDefaltAddress != 0) {
            defaltAddress = item;
          }
        }
        //没有默认地址取第一个
        address = defaltAddress || context[0];
      }
      if (selectAddr && selectAddr.deliveryAddressId) {
        // 是否有效
        const addr = context.find((item) => item.deliveryAddressId === selectAddr.deliveryAddressId);
        if (addr) {
          address = addr;
        }
      }
      // 校验是否需要完善地址
      if (address && address.deliveryAddressId) {
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
          address.needComplete = true;
        }
      }
      if (myStore) {
        let newData = immutable.fromJS(myStore)
        newData = newData.setIn(['pointsTradeConfirmItem', 'tradeItem', 'restrictedFlag'], false)
        action.commonChange('main.myStore', newData.toJS())
      }
      return address;
    },

    async _savaLocal() {
      const { orderList = {} } = getData().main || {};
      //地址缓存
      await Taro.setStorageSync('mini::confirmAddress', orderList.address);
    },

    async _getLoacl() {
      let address = await Taro.getStorageSync('mini::confirmAddress');
      await action.commonChange([{ paths: 'main.orderList.address', value: address }]);
      // await action._clearLocal();
    },

    async _clearLocal() {
      await Taro.removeStorageSync('mini::confirmAddress');
    },
    //订单备注修改
    _orderBuyRemarkChange(storeId, val) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.orderList.buyRemark',
          value: (buyRemark) => {
            buyRemark[storeId] = val;
          },
        },
      });
    },

    async _confirmMaskInit(e) {
      const mask = await action._getMasK(e.code, e.message);
      await action.commonChange('main.mask', mask);
    },

    async _getCheckPayPwdRes(payLockTime) {
      return payLockTime == null
        ? true
        : Boolean(payLockTime) &&
        moment(moment(payLockTime).format(Const.SECONDS_FORMAT))
          .add(30, 'm')
          .isBefore(moment(moment(Date.now()).format(Const.SECONDS_FORMAT)));
    },
    //密码校验
    async _checkPayPwd(payPassword) {
      try {
        //密码校验成功
        await api.customerBalanceBaseController.checkCustomerPayPwd({ payPassword });
        await action._submit();
        await action.commonChange('main.passwordMaskShow', false);
      } catch (e) {
        const { payErrorTime } = await api.customerBaseController.getLoginCustomerInfo();
        await action.commonChange('main.payData.payErrorTime', payErrorTime);
        await action.commonChange([
          { paths: 'main.payData.payErrorTime', value: payErrorTime },
          { paths: 'main.payData.checkPayPwRes', value: !(payErrorTime === 3) },
          { paths: 'main.isShowCheckPayPwRes', value: true },
        ]);
      }
    },

    // 校验是否是四级地址
    async isTrueAddress(address) {
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
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/receive-address-edit/index?addressId=${
                    address.deliveryAddressId
                    }&mode=1&localKey=${'confirmAddress'}`,
                });
              } catch (e) { }
            }
          });
          return true;
        }
      }
    },

    //提交订单
    async _submit() {
      const {
        main: {
          myStore,
          orderList: { address, buyRemark },
        },
      } = getData();
      const {
        pointsTradeConfirmItem: { supplier, tradeItem },
      } = myStore;
      if (!address || !address.deliveryAddressId) {
        await action._showToast('请选择收货地址');
        return false;
      }
      // 校验是否需要完善地址
      if (address && address.deliveryAddressId) {
        let flag = await this.isTrueAddress(address);
        if (flag) {
          return false;
        }
      }

      const { provinceId, cityId, areaId, streetId, deliveryAddress } = address;
      const addrDetail = (await addressInfo(provinceId, cityId, areaId, streetId)) + deliveryAddress;

      const params = {
        consigneeId: address.deliveryAddressId,
        consigneeAddress: addrDetail,
        consigneeUpdateTime: address.updateTime ? moment(address.updateTime).format(Const.SECONDS_FORMAT) : null,
        buyerRemark: buyRemark[supplier.storeId], //订单备注
        pointsGoodsId: tradeItem.pointsGoodsId, //积分商品Id
        num: tradeItem.num, //购买数量
      };

      try {
        const { tid, points } = await api.pointsTradeControl.commit(params);
        //TODO 积分成功
        await Taro.redirectTo({
          url: `/pages/package-A/customer/user/points-confirm/order-success/index?tid=${tid}&points=${points}`,
        });
      } catch (e) {
        await action._confirmMaskInit(e);
      }
    },

    //校验会员支付密码是否可用
    async _checkIsPayPwdValid() {
      const {
        main: {
          orderList: { address },
          isShowCheckPayPwRes,
        },
      } = getData();
      if (!address || !address.deliveryAddressId) {
        await action._showToast('请选择收货地址');
        return false;
      }
      try {
        await api.customerBalanceBaseController.isPayPwdValid();
        action.commonChange('main.passwordMaskShow', true);
        action.commonChange('main.isShowCheckPayPwRes', false);
      } catch (e) {
        if (e.code === 'K-010206') {
          await action._confirmMaskInit(e);
        }
      }
    },
    //错误提示框
    async _getMasK(code, message) {
      let mask = {};
      if (code === 'K-999997') {
        return;
      }
      switch (code) {
        case 'K-010206':
          mask = {
            isOpen: true,
            title: '',
            content: '您还没有设置支付密码，\r\n暂时无法使用积分支付',
            confirmText: '设置支付密码',
            cancelText: '',
            onClose: async () => {
              await action.commonChange('main.mask.isOpen', false);
            },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({ url: '/pages/package-A/customer/user-pay/index' });
            },
          };
          break;
        case 'K-010208':
          mask = {
            isOpen: true,
            title: '当前积分不足',
            content: '',
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.navigateTo({
                url: '/pages/package-A/customer/user/points-mall/index',
              });
            },
          };
          break;
        case 'K-120001':
          mask = {};
          break;
        case 'K-120002':
          mask = {};
          break;
        case 'K-120003':
          mask = {};
          break;
        case 'K-120004':
          mask = {};
          break;
        case 'K-080157':
          mask = {
            isOpen: true,
            title: '',
            content: message,
            confirmText: '确定',
            cancelText: '',
            onCancel: async () => { },
            onConfirm: async () => {
              await this.getRestrictedGoodsList()
              action.commonChange('main.mask.isOpen', false);
            },
          };
          break;
        default:
          mask = {
            isOpen: true,
            title: '',
            content: message,
            confirmText: '确定',
            cancelText: '',
            onClose: async () => { },
            onConfirm: async () => {
              await action.commonChange('main.mask.isOpen', false);
              await Taro.redirectTo({
                url: '/pages/package-A/customer/user/points-mall/index',
              });
            },
          };
      }
      return mask;
    },

    async _showToast(title) {
      await Taro.showToast({
        title,
        icon: 'none',
        duration: 2000,
      });
    },
    //获取限售的商品
    async getRestrictedGoodsList() {
      const {
        myStore,
        orderList: { address }
      } = getData().main;
      const goodsId = myStore.pointsTradeConfirmItem.tradeItem.spuId
      const goodsIdList = [goodsId]

      const res = await api.tradeBaseController.getRestrictedByGoodsIds({
        goodsIdList,
        consigneeId: address.deliveryAddressId
      })
      const list = res.goodsRestrictedTemplateVOList
      let restrictedFlag = false
      const goods = list.find((el) => el.goodsId === goodsId)
      if (goods) {
        restrictedFlag = goods.restrictedFlag
      }
      let newData = immutable.fromJS(myStore)
      newData = newData.setIn(['pointsTradeConfirmItem', 'tradeItem', 'restrictedFlag'], restrictedFlag)
      action.commonChange('main.myStore', newData.toJS())
    }
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PointsConfirmMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
