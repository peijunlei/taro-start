import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import '../index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import ReturnSkusBox from '../skus-list';
import ReturnRefundFile from './components/return-refund-file';
import ReturnRefundPrice from './components/return-refund-price';
import ReturnRefundReason from './components/return-refund-reason';
import ReturnRefundRemark from './components/return-refund-remark';
import ReturnType from './components/return-refund-type';
import GoodsState from './components/return-goods-state';
import ReturnSelect from './components/return-select';
import { PrivacyModal } from '@/pages/common';

import BottomBox from '../bottom-box';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCReturnRefund extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.initApplyPage();
  }

  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  onShareTimeline() {
    // 默认分享内容
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  componentDidShow() {
    if (__TARO_ENV === 'h5') {
      if (
        Taro.getStorageSync('mini::returnSuccessBackFlag') &&
        Taro.getStorageSync('mini::returnSuccessBackFlag').backFlag === '1'
      ) {
        Taro.navigateBack({delta: 2});
      }
    }
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if(main.returnType==='REFUND') {
      Taro.setNavigationBarTitle({title: '仅退款'});
    } else {
      Taro.setNavigationBarTitle({title: '退货退款'});
    }
    return (
      <View className="packageCReturnRefund">
        <ReturnSkusBox main={main} action={action} step="two" />
        <ReturnSelect />
        <ReturnRefundRemark />
        <ReturnRefundFile />
        <ReturnRefundPrice />
        <ReturnRefundReason />
        <ReturnType />
        <GoodsState />
        <PrivacyModal />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
