import Store, {getReducerData} from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import {getActionProxy} from '@/redux/action-util';
import Taro from '@tarojs/taro';
import api from 'api';
import * as reduxStore from '@/redux/store';

import PublicAction from './publicAction';

import OtherAction from './otherAction';

import loginGoodsDetailsMain from '../reducers/main';
//更新购物车角标
import {getShopCartNum, VAS, WMkit} from 'wmkit';
import {IAllReducerProps} from '@/pages/package-B/goods/goods-details/types';

export default (dispatch: Dispatch) => {
  const actions = {
    publicAction: getActionProxy<typeof PublicAction>(PublicAction)(dispatch),

    otherAction: getActionProxy<typeof OtherAction>(OtherAction)(dispatch),

    /**
     * 初始化数据
     */
    async init(skuId, pointsGoodsId) {
      await actions.loadReducer();
      actions.publicAction.getMenuList();
      let iepSwitch = await VAS.checkIepAuth();
      let iepInfo = await VAS.fetchIepInfoForGoodsDetail(iepSwitch);
      if (__TARO_ENV != 'h5') {
        await actions.publicAction.findSpuDetails(skuId, pointsGoodsId);
        actions.publicAction.initGoodsDetailSimple(skuId);
      }
      const isOpenWechat = await WMkit.isOpenWechat();
      dispatch({
        type: Command.init,
        payload: {
          main: {
            skuId,
            pointsGoodsId,
            isPointsGoods: !!pointsGoodsId,
            isReady: true,
            isShow: true,
            shopCarNum: await getShopCartNum(),
            iepInfo,
            iepSwitch,
            isOpenWechat: isOpenWechat,
          },
        },
      });
      actions.publicAction.commonChange('main.isLoadSkeleton', false);
    },

    _isLogin() {
      return Boolean(Taro.getStorageSync('b2b-wechat@login'));
    },

    /**
     *
     * @param skuId 切换规格
     */
    async changeSpecDetail(skuId, pointsGoodsId) {
      // 记录前一次skuid
      const preSkuId = getData().main.skuId;
      dispatch({
        type: Command.commonChange,
        payload: [
          {
            paths: 'main.skuId',
            value: skuId,
          },
          {
            paths: 'main.pointsGoodsId',
            value: pointsGoodsId,
          },
        ],
      });
      const {goodsDetail} = getData().main;
      await Promise.all([
        actions.publicAction.initMoreSuitInfo(skuId),
        actions.publicAction.findSpuDetails(skuId, pointsGoodsId),
      ]);
      // 切换规格埋点(打开弹窗会重组一次数据，若skuId没切换则不调用埋点)
      if (skuId != preSkuId) {
        const goodsInfoChange = goodsDetail?.goodsInfos?.filter((v) => v.goodsInfoId == skuId);
        actions.publicAction.pvUvStaticsMyPvUvStatis(goodsDetail, goodsInfoChange, skuId);
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
        loginGoodsDetailsMain,
      });
    },

    /**
     * 卸载reducer
     */
    async unloadReducer() {
      if (reduxStore.deregister) {
        reduxStore.deregister(['loginGoodsDetailsMain']);
      } else {
        console.error('请在redux/store中实现deregister逻辑. ');
      }
    },
  };

  function getData(): IAllReducerProps {
    return {
      main: getReducerData('loginGoodsDetailsMain'),
    };
  }

  return {actions};
};
//create by moon https://github.com/creasy2010/moon
