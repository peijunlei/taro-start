import {Command} from '../constant';
import {Dispatch} from 'typings';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import {extraPathsValue} from '@/redux/util';
import api from 'api';
import {ValidConst} from 'wmkit';
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
     * 查询 会员最爱买 列表
     */
    async query() {
      const isLogin = Boolean(Taro.getStorageSync('authInfo:token')); //是否登录
      let {form} = getData().main || {};
      let res;
      if (isLogin) {
        res = await api.goodsInfoBaseController.list(form);
      } else {
        res = await api.goodsInfoBaseController.skuListFront(form);
      }
      action.commonChange([
        {paths: 'main.buyList', value: res.esGoodsInfoPage.content},
        {paths: 'main.total', value: res.esGoodsInfoPage.size || 0},
      ]);
    },
    //修改SKU的数量
    async _changeSkuNum(skuId, skuNum) {
      await action._changeSkuNumDidLogin(skuId, skuNum);
    },
    //登录的情况下修改SKU
    async _changeSkuNumDidLogin(skuId, skuNum) {
      await api.purchaseBaseController.edit({
        goodsInfoId: skuId,
        goodsNum: skuNum,
        //TODO
        verifyStock: false,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageACustomerUserMemberCenterMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
