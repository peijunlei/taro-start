import Store from '@/redux/store';
import Taro from '@tarojs/taro';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import {cache} from 'config';
import api from 'api';
import {WMkit} from 'wmkit';
import * as reduxStore from '@/redux/store';

import Action from './action';

import packageBGrouponGroupBuyDetailMain from '../reducers/main';

export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init(gid, shareUserId) {
      await actions.loadReducer();
      //获取服务时间
      const serverTime = await api.systemController.queryServerTime().context;
      try {
        //根据团号获取团信息
        const res = WMkit.isLogin()
          ? await api.goodsBaseController.grouponDetailByGrouponNo(gid)
          : await api.goodsBaseController.grouponDetailByGrouponNoUnLogin(gid);
        //获取团详情
        const grouponDetails = res.grouponDetails;
        if (res.goodsInfos) res.goodsInfos = res.goodsInfos.filter((e) => e.grouponPrice != null);
        //如果团长的SKU在团实例goodsInfos里面不存在，直接进入错误页面
        if (
          res.grouponDetails &&
          res.goodsInfos.filter((info) => info.goodsInfoId == grouponDetails.goodInfoId).length == 0
        ) {
          //跳转至错误页面
          Taro.redirectTo({
            url: '/pages/package-B/goods/goods-failure/index',
          });
        } else {
          const isOpenWechat = await WMkit.isOpenWechat();
          dispatch({
            type: Command.init,
            payload: {
              main: Object.assign(res, {
                serverTime: serverTime,
                grouponNo: gid,
                skuId: grouponDetails.goodInfoId,
                isOpenWechat: isOpenWechat,
                shareUserId: shareUserId,
              }),
            },
          });
        }
        if (WMkit.isLogin() && shareUserId) {
          await api.grouponShareRecordController.addVisit({
            grouponNo: gid,
            shareCustomerId: shareUserId,
            goodsInfoId: grouponDetails.goodInfoId,
            grouponActivityId: grouponDetails.grouponActivity.grouponActivityId,
            terminalSource: 4,
          });
        }
      } catch (e) {
        Taro.redirectTo({
          url: '/pages/package-B/goods/goods-failure/index',
        });
        setTimeout(() => {
          Taro.showToast({
            title: e.message,
            icon: 'none',
            duration: 2000,
          });
        }, 50);
      }
    },

    /**
     * 获取服务时间
     */
    async queryServerTime() {
      const result: any = await api.systemController.queryServerTime();
      actions.action.commonChange('main.serverTime', result);
    },

    async doGroup(grouponNo, goodsInfoId, status) {
      const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
      if (status == 4 || status == 5) {
        //已登录
        if (isLogin) {
          //先校验
          this.immediateJoin(grouponNo, goodsInfoId, status);
          //我要参团或者我也开个团
          this.action.commonChange('main.specModal', true);
        } else {
          //跳转至登录页
          Taro.navigateTo({
            url: '/pages/package-A/login/login/index',
          });
        }
      }
      //邀请参团，弹出分享框
      if (status == 8) {
        if (Taro.getEnv() === 'WEAPP') {
          // this.action.commonChange('main.goodsShareVisible', true);
          this.action.commonChange('main.groupShareModal', true);
        } else {
          Taro.showToast({
            title: '请到小程序端操作',
            icon: 'none',
          });
        }
      }
      //查看其它团购，跳转至拼团首页
      if (status == 2 || status == 7) {
        Taro.navigateTo({
          url: '/pages/package-B/groupon/groupon-center/index',
        });
      }
    },

    async immediateJoin(grouponNo, goodsInfoId, status) {
      const loginData = Taro.getStorageSync(cache.LOGIN_DATA);
      const customerId = loginData.customerId;
      try {
        const res = await api.grouponBaseController.vaildateGrouponStatusForOpenOrJoin({
          customerId: customerId,
          grouponNo: status == 5 ? null : grouponNo,
          goodsInfoId: goodsInfoId,
          openGroupon: status == 5,
        });
        this.action.commonChange('main.specModal', true);
        //弹出规格框
        if (status == 5) {
          //我要开团，存储的团号为空
          this.action.commonChange('main.targetGroupNo', '');
        } else {
          this.action.commonChange('main.targetGroupNo', grouponNo);
        }
      } catch (e) {
        if (e.code == 'K-050402' || e.code == 'K-050403') {
          Taro.showToast({
            title: '已参与该团!',
          });
        } else if (e.code == 'K-050401' || e.code == 'K-050404') {
          Taro.showToast({
            title: e.message,
          });
          //刷新页面
        } else {
          Taro.showToast({
            title: e.message,
          });
        }
      }
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
        packageBGrouponGroupBuyDetailMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['packageBGrouponGroupBuyDetailMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  return {actions};
};

//create by moon https://github.com/creasy2010/moon
