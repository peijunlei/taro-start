import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import PackageBDistributionShopShopIndexCMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      await actions.loadReducer();
      let inviteeId = '';
      let res1 = null;
      if (Taro.getStorageSync(cache.LOGIN_DATA)) {
        inviteeId = Taro.getStorageSync(cache.LOGIN_DATA).customerId;
      }
      const res = await Promise.all([
        api.distributionController.queryDistributorInfoByCustomerId(), //获取分销员基本信息
        api.distributionController.getSettingAndInvitor(), //查询分销设置和邀请人信息
      ]);
      await actions.action.page(); //获取店铺精选List
      // await actions.action.pageSmall();
      if (inviteeId) {
        res1 = await api.distributionController.getSetting({inviteeId}); //获取分销员设置信息
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            baseInfo: {
              shopShareImg: res1.distributionSettingSimVO.shopShareImg,
              customerName: res[0].distributionCustomerVO.customerName,
              shopName: res[0].distributionCustomerVO.shopName,
              headImg: res[0].distributionCustomerVO.headImg,
              distributorName: res[0].distributionCustomerVO.distributorName,
            },
            customerInfo: res[0].distributionCustomerVO,
            settingInfo: res[1].distributionSettingSimVO,
          },
        },
      });
    },
    /**
     * 重置
     */
     async clean() {
      //@ts-ignore
      __TARO_ENV !== 'h5' && await actions.unloadReducer();
      dispatch({type: Command.clean});
    },

    /**
     * 动态添加注入reducer
     */
    async loadReducer() {
      reduxStore.registerReducer({
        PackageBDistributionShopShopIndexCMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['PackageBDistributionShopShopIndexCMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
