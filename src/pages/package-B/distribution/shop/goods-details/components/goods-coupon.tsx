import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/goods-coupon.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moreIcon from '@/assets/image/goods/goods-detail/more.png';
import couponBjIcon from '@/assets/image/goods/goods-detail/coupon-bj.png';
type IGoodsCouponProps = T.IProps & T.IGoodsCouponProps;

@connect<Partial<IGoodsCouponProps>, T.IGoodsCouponState>(store2Props, actions)
export default class GoodsCoupon extends Component<Partial<IGoodsCouponProps>, T.IGoodsCouponState> {
  constructor(props: IGoodsCouponProps) {
    super(props);
  }

  /**
    领券
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail},
    } = this.props;
    if (JSON.stringify(goodsDetail) == '{}') {
      return;
    }
    let couponLabels = goodsDetail.goodsInfos[0].couponLabels.length > 0 ? goodsDetail.goodsInfos[0].couponLabels : [];
    return (
      <View
        className="goodsCoupon"
        onClick={async () => {
          await publicAction.commonChange([{paths: 'main.isCouponShow', value: true}]);
        }}
      >
        <View className="l-content">
          <Text className="label">领券</Text>
          {/* 优惠券集合 */}
          <View className="coupon-box">
            {couponLabels.length > 0 &&
              couponLabels.slice(0, 3).map((label, i) => {
                return (
                  <View className="coupon-item" id={i}>
                    <Text className="text">{label.couponDesc} </Text>
                    <Image src={couponBjIcon} className="coupon-bj" />
                  </View>
                );
              })}
          </View>
        </View>
        {/* 更多 */}
        <Image src={moreIcon} className="more" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
