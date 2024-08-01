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
    async page() {
      let {form, goodsList} = getData().main;
      action.commonChange('main.isLoadingList', true);
      const res = await api.goodsInfoBaseController.shopSkuList(form);
      action.commonChange([{paths: 'main.totalPages', value: (res as any).esGoodsInfoPage.totalPages}]);
      if (form.pageNum == 0) {
        action.commonChange([{paths: 'main.goodsList', value: (res as any).esGoodsInfoPage.content}]);
      } else {
        action.commonChange([{paths: 'main.goodsList', value: goodsList.concat(res.esGoodsInfoPage.content)}]);
      }
      action.commonChange('main.isLoadingList', false);
    },
    /**
     * 查询下一页
     */
    async nextPage() {
      let {form, totalPages} = getData().main;
      let num = form.pageNum + 1;
      if (num == totalPages) return;
      dispatch({
        type: Command.commonChange,
        payload: {
          paths: 'main.form.pageNum',
          value: num,
        },
      });
      await this.page();
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('pagesPackageBDistriButionShopShopIndexMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
