import {Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {msg} from 'wmkit';

import InfoMask from './components/info-mask';

import CouponTab from './components/coupon-tab';

import CouponList from './components/coupon-list';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderToolOrderCoupon extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.init();
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
      actions: {action},
      main = {},
    } = this.props;
    const {checkCoupon, maskOpen, tabType} = main;
    const current = getCurrentInstance();
    const {onShow} = current.router;
    const param = getHashParam<{param: string}>(onShow.split('.')[0]);
    return (
      <View className="packageCOrderOrderToolOrderCoupon">
        <View className="coupon-log">
          <Text
            className="coupon-log-text"
            onClick={async () => {
              await action.commonChange('main.maskOpen', true);
            }}
          >
            使用说明
          </Text>
        </View>

        <CouponTab />

        <CouponList />

        {maskOpen && <InfoMask />}

        {tabType === 0 && (
          <View className="pay-order-con">
            <View
              className="pay-order-con-btn"
              onClick={async () => {
                await action.checkOutCoupon(param.param || 0);
                // 重置积分和开关，避免出现金额为负的情况
                // msg.emit('reset-point-value');
                await Taro.navigateBack();
              }}
            >
              <Text className="pay-order-con-text">确定</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
