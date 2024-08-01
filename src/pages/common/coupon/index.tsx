import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import CouponItem from './components/coupon-item';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/coupon/empty.png';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CommonCoupon extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    const goodsInfoIds = this.props.goodsInfoIds;
    await this.props.actions.init(goodsInfoIds);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      main: {
        coupon: {couponViews, storeMap},
      },
    } = this.props;

    return (
      <View>
        {couponViews.length ? (
          <View className="couponList">
            <CouponItem
              couponClose={this.props.closeModal}
              onNav={this.props.onNav}
              couponViews={couponViews}
              storeMap={storeMap}
            />
            {/* <View className="status">————＞ω＜我是有底线的————</View> */}
          </View>
        ) : (
          <View className="none-coupon">
            <Blank content="啊哦，什么券都没有" img={noneImg} />
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
