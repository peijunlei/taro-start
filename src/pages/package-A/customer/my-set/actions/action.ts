import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import {_, setShopCartNum, WMkit, msg} from 'wmkit';
import {cache} from 'config';
import {mergePurchase} from '@/wmkit/common/kit';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
    async logout() {
      Promise.all([
        api.loginBaseController.logout(),
        Taro.removeStorageSync(cache.LOGIN_DATA),
        Taro.removeStorageSync('authInfo:token'),
        Taro.removeStorageSync(cache.IS_DISTRIBUTOR),
        Taro.removeStorageSync(cache.DISTRIBUTOR_FLAG),
        Taro.removeStorageSync(cache.INVITEE_ID),
        // Taro.removeStorageSync(cache.AUTH_INFO),
        Taro.removeStorageSync('mini::shopCartSku'),
        Taro.removeStorageSync('mini::shopCartMarketing'),
        Taro.removeStorageSync('wecatAuthParams'),
        Taro.removeStorageSync('historyKeyList'), //清空本地搜索记录
        Taro.removeStorageSync('mini::shopCardAddress'), //清空购物车地址
        Taro.removeStorageSync('mini::confirmAddress'), //清空订单确认页地址
        Taro.removeStorageSync('purchase:info'), //清空订单确认页地址
      ]);
      //退出登录将店铺精选的购物车角标设为0
      msg.emit('shopCart-C-num', 0);
      msg.emit('refresh-reward');
      Taro.setStorageSync('recommend-goods-list', '1');
      // await setShopCartNum(true);
      if (WMkit.needLogin()) {
        Taro.redirectTo({
          url: '/pages/package-A/login/login/index',
        });
        return;
      }

      if (__TARO_ENV === 'weapp') {
        if (WMkit.inviteeId() && WMkit.channelType() == '2') {
          await Taro.navigateBack();
        } else {
          Taro.removeStorageSync(cache.INVITEE_ID);
          Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
          await Taro.switchTab({
            url: '/pages/user-center/index',
          });
        }
      }

      const isOpenDistributor = await WMkit.isOpenDistributor(); //是否开启分销功能
      if (isOpenDistributor) {
        //tab变为奖励中心
        Taro?.setTabBarItem?.({
          index: 2,
          text: '奖励中心',
          iconPath: require('@/assets/image/tab/reward.png').default,
          selectedIconPath: require('@/assets/image/tab/reward-curr.png').default,
        });
      } else {
        // Taro?.setTabBarItem?.({
        //   index: 1,
        //   text: '分类',
        //   iconPath: require('@/assets/image/common/goods.png').default,
        //   selectedIconPath: require('@/assets/image/common/goods-curr.png').default,
        // });
        // Taro?.setTabBarItem?.({
        //   index: 2,
        //   text: '发现',
        //   iconPath: require('@/assets/image/tab/material.png').default,
        //   selectedIconPath: require('@/assets/image/tab/material-red.png').default,
        // });
      }

      if (__TARO_ENV === 'h5') {
        if (WMkit.inviteeId() && WMkit.channelType() == '2') {
          await Taro.navigateTo({
            url: '/pages/package-B/distribution/store/social-c/shop-my-c/index',
          });
        } else {
          Taro.removeStorageSync(cache.INVITEE_ID);
          Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
          await Taro.switchTab({
            url: '/pages/user-center/index',
          });
        }
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerMySetMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
