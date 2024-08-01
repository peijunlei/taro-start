import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import {getReducerData} from '@/redux/store';
import api from 'api';
import {extraPathsValue} from '@/redux/util';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {noop, _, WMkit} from 'wmkit';
import {cache} from 'config';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    /*
     *企业人数 / 企业行业
     */
    onChange(key, value, data) {
      let item = data[value];
      action.commonChange(key, item.label);
      action.commonChange(key + 'Value', item.value - 1);
    },

    /**
     * 更新企业
     */
    async submit() {
      const {enterpriseNum, industry, enterpriseNumValue, industryValue} = getData().main;
      console.log('submit', getData().main);
      if (!enterpriseNum) {
        Taro.showToast({
          title: '请选择企业人数',
          icon: 'none',
          duration: 2000,
        });
        return;
      }

      if (!industry) {
        Taro.showToast({
          title: '请选择企业行业',
          icon: 'none',
          duration: 2000,
        });
        return;
      }

      //登录后信息
      const user = await Taro.getStorageSync(cache.LOGIN_DATA);
      await api.enterpriseInfoBaseController.updateEnterpriseInfo({
        businessIndustryType: industryValue,
        businessEmployeeNum: enterpriseNumValue,
        customerId: user.customerId,
      });

      Taro.showToast({
        title: '保存成功！',
        icon: 'none',
        duration: 2000,
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: getReducerData('packageACustomerUserEnterpriseMain'),
  };
}

//create by moon https://github.com/creasy2010/moon
