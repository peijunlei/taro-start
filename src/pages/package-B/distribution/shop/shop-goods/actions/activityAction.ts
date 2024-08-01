import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    //跳转到详情页
    loadPages(item) {
      //当商品允许分销且分销审核通过，视为分销商品，不展示促销和优惠券
      const distributionFlag = item.distributionGoodsAudit == '2';
      const grouponFlag = item.grouponLabel;
      //普通商品详情
      let url = `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`;
      if (!distributionFlag && grouponFlag) {
        //满足条件跳转到拼团详情
        url = `/pages/package-B/goods/group-details/index?skuId=${item.goodsInfoId}`;
      }
      Taro.navigateTo({
        url: url,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('PackageBDistributionShopShopGoodsMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
