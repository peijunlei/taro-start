import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import {WMkit} from 'wmkit';
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

        action.commonChange('main.goodsEvaluate', res);
        action.commonChange('main.bigEvalItem', res);
        const {evaluateId, isPraise, goodNum} = res;
        action.commonChange('main.zanGoodsEvaluateList', {evaluateId, isPraise, goodNum});
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
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginGoodsDetailsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
