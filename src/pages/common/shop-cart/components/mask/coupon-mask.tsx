import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import './../../css/coupon-mask.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import CommonCoupon from '@/pages/common/coupon/index';
type ICouponMaskProps = T.IProps & T.ICouponMaskProps;

@connect<Partial<ICouponMaskProps>, T.ICouponMaskState>(store2Props, actions)
export default class CouponMask extends Component<Partial<ICouponMaskProps>, T.ICouponMaskState> {
  constructor(props: ICouponMaskProps) {
    super(props);
  }

  componentDidMount(): void {
    const {
      actions: {action},
      main: {purInfo: goodsInfos},
    } = this.props;
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      actions,
      main: {
        coupon: {goodsInfoIds},
      },
    } = this.props;
    return (
      <View className="couponMask">
        {goodsInfoIds && <CommonCoupon onNav={() => actions.clean()} goodsInfoIds={goodsInfoIds} />}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
