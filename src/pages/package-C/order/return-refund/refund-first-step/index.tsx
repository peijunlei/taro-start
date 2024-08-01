import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import '../index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from '../selectors';

import ReturnRefundFile from './components/return-refund-file';
import ReturnRefundPrice from './components/return-refund-price';
import ReturnRefundReason from './components/return-refund-reason';
import ReturnRefundRemark from './components/return-refund-remark';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCReturnRefund extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let tid = getCurrentInstance().router.params.tid ? getCurrentInstance().router.params.tid : '';
    this.props.actions.init(tid);
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

  render() {
    return (
      <View className="packageCReturnRefund">
        <ReturnRefundReason />
        <ReturnRefundRemark />
        <ReturnRefundFile />
        <ReturnRefundPrice />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
