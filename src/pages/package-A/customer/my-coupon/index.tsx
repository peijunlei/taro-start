import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Header from './components/header';

import CouponTypeMask from './components/coupon-type-mask';

import CouponList from './components/coupon-list';

import CouponStatusTab from './components/coupon-status-tab';
import Explain from './components/explain';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerMyCoupon extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
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
    let {
      // actions: {action},
      // main: { showDrapMenu, couponList, isExplainFlag },
      main,
    } = this.props;
    return (
      main && (
        <View className="packageACustomerMyCoupon">
          <Header />
          <CouponStatusTab />
          <CouponList />
          {main.showDrapMenu && <CouponTypeMask />}
          {main.isExplainFlag && <Explain />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
