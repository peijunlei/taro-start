import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {WMkit} from 'wmkit';
import indexActions from './index';
import {cache} from 'config';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /**
     * 立刻抢购
     */
    async rushToBuyingFlashSaleGoodsInfo(flashSaleGoodsId, num) {
      if (WMkit.isLogin()) {
        try {
          await api.flashSaleController.rushToBuyFlashSaleGoods({
            flashSaleGoodsId: flashSaleGoodsId,
            flashSaleGoodsNum: num,
          });
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-buy-in/index?flashSaleGoodsId=${flashSaleGoodsId}&flashSaleGoodsNum=${num}`,
          });
        } catch (error) {}
      } else {
        //显示登录弹框
        Taro.navigateTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
    },

    // 查看评价大图
    findBigImg(item, index) {
      action.commonChange([
        {paths: 'main.currentImg', value: index},
        {paths: 'main.bigEvalItem', value: item},
        {paths: 'main.isBigImgShow', value: true},
      ]);
    },

    /**
     * 商品评价点赞
     * @param goodsEvaluateId
     */
    async addCustomerGoodsEvaluatePraise(goodsEvaluateId) {
      if (WMkit.isLogin()) {
        await api.customerGoodsEvaluatePraiseController.add({
          goodsEvaluateId: goodsEvaluateId,
        });
        Taro.showToast({
          title: '点赞成功!',
          icon: 'none',
          duration: 2000,
        });
        //获取评价详情
        const res = await api.goodsEvaluateController.getCustomerGoodsEvaluate({
          evaluateId: goodsEvaluateId,
        });
        const {evaluateId, isPraise, goodNum} = res;
        action.commonChange([
          {paths: 'main.goodsEvaluate', value: res},
          {paths: 'main.bigEvalItem', value: res},
          {paths: 'main.zanGoodsEvaluateList', value: {evaluateId, isPraise, goodNum}},
        ]);
      } else {
        Taro.showToast({
          title: '请先登录!',
          icon: 'none',
          duration: 2000,
        });
      }
    },

    //发圈素材
    async getDistributor(goodsInfo) {
      const result = await WMkit.getDistributorStatus();
      if (result.distributionEnable) {
        Taro.navigateTo({
          url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${goodsInfo.goodsInfoId}`,
        });
      } else {
        let reason = result.forbiddenReason;
        //店铺关闭或者分销员禁用时弹窗
        // msg.emit('bStoreCloseVisible', {
        //   visible: true,
        //   reason: reason
        // });
      }
    },

    /**
     *  立即购买
     * @param buyGoodsInfos
     */
    async _didConfirm(buyGoodsInfos) {
      let {skuId, goodsInfo} = getData().main;
      let inviteeId = Taro.getStorageSync(cache.INVITEE_ID) ? Taro.getStorageSync(cache.INVITEE_ID) : 0;

      try {
        let skuList = [];
        buyGoodsInfos.forEach((item) => {
          skuList.push({
            skuId: item.goodsInfoId,
            num: item.buyCount,
          });
        });

        //立即购买校验前置
        await api.tradeBaseController.checkGoods({
          tradeItems: skuList,
          tradeMarketingList: [],
          forceConfirm: false,
        });

        await api.tradeBaseController.immediateBuy({
          tradeItemRequests: skuList,
        });

        await Taro.navigateTo({url: '/pages/package-C/order/order-confirm/index?type=1'});
      } catch (e) {
        Taro.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000,
        });
      }
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('sociaDetailsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
