import {Command} from '../constant';
import {cache} from 'config';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import api from 'api';
import * as reduxStore from '@/redux/store';
import Action from './action';
import pagesPackageBDistriButionStoreSocialCShopIndexCMain from '../reducers/main';
import Taro from '@tarojs/taro';
import {WMkit} from 'wmkit';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),
    /**
     * 初始化数据
     */
    async init1(params) {
      await actions.loadReducer();
      let {keywords, inviteeId, customerId} = params;
      if (inviteeId) {
        WMkit.setShareInfoCache(inviteeId, 2);
      } else {
        inviteeId = WMkit.inviteeId();
      }
      if (customerId) {
        await actions.action.getLoginInfo(customerId);
      }

      const res = await Promise.all([
        api.goodsInfoBaseController.getShopInfo(inviteeId || 0), //查询店铺精选-小店名称
        api.distributionController.checkStatus(), //查询分销设置和邀请人信息
      ]);
      if (!res[1]) {
        Taro.showModal({
          title: '已失效',
          content: '该店铺已失效，不可在店铺内购买商品',
        }).then(async (res) => {
          if (res.confirm) {
            WMkit.changeTabBarText(); //更新tab页展示
            Taro.removeStorageSync(cache.INVITEE_ID);
            Taro.setStorageSync(cache.CHANNEL_TYPE, '1');
            //前往个人中心
            Taro.switchTab({url: '/pages/user-center/index'});
          }
        });
        return false;
      }
      dispatch({
        type: Command.init,
        payload: {
          main: {
            shopName: (res[0] as any).shopName,
            headImg: (res[0] as any).headImg,
            request: {
              keywords: keywords || '',
              customerId: WMkit.inviteeId() ? WMkit.inviteeId() : null,
              //批量品牌id
              brandIds: [],
              //分页
              pageNum: 0,
              pageSize: 10,
            },
          },
        },
      });
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
        pagesPackageBDistriButionStoreSocialCShopIndexCMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['pagesPackageBDistriButionStoreSocialCShopIndexCMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
