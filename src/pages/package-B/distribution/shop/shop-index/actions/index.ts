import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageBDistriButionShopShopIndexMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {cache} from 'config';
import {WMkit, _, wxShare} from 'wmkit';

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
      if (inviteeId) {
        res1 = await api.distributionController.getSetting({inviteeId}); //获取分销员设置信息
      }
      const isOpenWechat = await WMkit.isOpenWechat();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            baseInfo: {
              shopShareImg: res[1].distributionSettingSimVO.shopShareImg,
              customerName: res[0].distributionCustomerVO.customerName,
              shopName: res[1].distributionSettingSimVO.shopName,
              headImg: res[0].distributionCustomerVO.headImg,
              distributorName: res[0].distributionCustomerVO.distributorName,
            },
            inviteeId,
            customerInfo: res[0].distributionCustomerVO,
            settingInfo: res[1].distributionSettingSimVO,
            form: {
              pageNum: 0,
              pageSize: 10,
            },
            isOpenWechat: isOpenWechat,
          },
        },
      });
      if (_.isWeixin()) {
        wxShare.initShare(
          '店铺分享',
          '店铺分享',
          'https://sbc-img.obs.cn-north-4.myhuaweicloud.com/202004011138219745.jpg',
          4,
        );
      }
      await actions.action.page(); //获取店铺精选List
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
        pagesPackageBDistriButionShopShopIndexMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageBDistriButionShopShopIndexMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
