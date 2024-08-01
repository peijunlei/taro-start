import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro, {setStorage as _setStorage} from '@tarojs/taro';
import {cache} from 'config';
import {WMkit} from 'wmkit';

const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 提交
     */
    async submit() {
      let {
        accountInfo: {
          uName,
          contact,
          phone,
          customerId,
          address,
          provinceId,
          cityId,
          areaId,
          streetId,
          birthDay,
          gender,
        },
      } = getData().main;
      if (!uName) {
        Taro.showToast({
          title: '请填写您的昵称',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!contact) {
        Taro.showToast({
          title: '请填写联系人信息',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!phone) {
        Taro.showToast({
          title: '请填写联系人常用手机号',
          icon: 'none',
          duration: 2000,
        });
        return false;
      } else if (!regexTel.test(phone)) {
        Taro.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000,
        });
        return false;
      }

      let areaIdsMap = {
        provinceId,
        cityId,
        areaId,
        streetId,
      } as any;
      // 校验是否需要完善地址,如果填写了的话
      if (areaIdsMap && provinceId) {
        const result = await api.platformAddressController.verifyAddress({...areaIdsMap});
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

      let result = await api.loginBaseController.perfect({
        customerId,
        customerName: uName,
        provinceId,
        cityId,
        areaId,
        streetId,
        customerAddress: address,
        contactName: contact,
        contactPhone: phone,
        birthDay: birthDay || null,
        gender: gender || 2,
      });

      //账户信息审核
      this.accountInfo(result);
    },

    //账户信息
    async accountInfo(result) {
      //清楚审核中或者审核未通过的用户信息
      Taro.removeStorageSync('pending-or-refused-useInfo');
      if (!result.isLoginFlag) {
        Taro.showToast({
          title: '提交成功，将会尽快给您审核！',
          icon: 'none',
          duration: 2000,
        });
        Taro.navigateTo({
          url: '/pages/package-A/login/success/index',
        });
      } else {
        //缓存登录信息
        await Taro.setStorage({
          key: 'b2b-wechat@login',
          data: result,
        });
        _setStorage({
          key: 'authInfo:token',
          data: result.token,
        });
        _setStorage({
          key: cache.LOGIN_DATA,
          data: result,
        });
        Taro.removeStorageSync(cache.ACCOUNT_TOKEN);
        //获取购物车本地缓存数据
        let purchaseData = Taro.getStorageSync('mini::shopCartSku');
        if (purchaseData) {
          //合并购物车数据
          this.mergePurchase(purchaseData);
          //清楚登录缓存信息
          Taro.removeStorageSync('mini::shopCartSku');
        }
        Taro.showToast({
          title: '登录成功！',
          icon: 'none',
          duration: 2000,
        });
        Taro.switchTab({url: '/pages/index/index'});
      }
    },
    //合并购物车数据
    async mergePurchase(list) {
      await api.purchaseBaseController.mergePurchase({purchaseMergeDTOList: list});
    },

    startTime() {
      let {checked, initialName} = getData().main;
      //正在审核中，开启倒计时，自动跳转到登录页
      if (checked === 0 && initialName !== null && initialName !== '') {
        this.setTime();
      }
    },

    setTime() {
      let {minutes} = getData().main;
      const start = minutes;
      const time = start - 1;
      if (time > 0) {
        action.commonChange('main.minutes', time);
        setTimeout(() => {
          this.setTime();
        }, 1000);
      } else {
        WMkit.clearLoginCache();
        Taro.redirectTo({
          url: '/pages/package-A/login/login/index',
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginAccountMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
