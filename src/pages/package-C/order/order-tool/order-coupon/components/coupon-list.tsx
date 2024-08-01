import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CouponItem from '@/pages/package-C/order/order-tool/order-coupon/components/coupon-item';
import noneImg from '@/assets/image/coupon/empty.png';
import Blank from '@/pages/common/blank';

type ICouponListProps = T.IProps & T.ICouponListProps;

@connect<Partial<ICouponListProps>, T.ICouponListState>(store2Props, actions)
export default class CouponList extends Component<Partial<ICouponListProps>, T.ICouponListState> {
  constructor(props: ICouponListProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main: {tabType, canUseCoupons, disableCoupons, canUseCouponsLength, disableCouponsLength},
    } = this.props;
    return (
      <ScrollView scrollY className="order-coupon-couponList">
        {(tabType ? disableCoupons : canUseCoupons).map((store, index) => {
          return (
            store.coupons &&
            Boolean(store.coupons.length) && (
              <View key={index}>
                <Text className="coupon-store-name">
                  {store.storeId === -1 ? '通用券' : store.storeName}({store.coupons.length})
                </Text>
                {store.coupons.map((coupon, _index) => (
                  <CouponItem key={_index} coupon={coupon} currentType={store.storeId} tabType={tabType} />
                ))}
              </View>
            )
          );
        })}
        {!(!tabType ? canUseCouponsLength : disableCouponsLength) && (
          <Blank content="啊哦，什么券都没有" img={noneImg} />
        )}
        <View className="coupon-visibity" />
      </ScrollView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
