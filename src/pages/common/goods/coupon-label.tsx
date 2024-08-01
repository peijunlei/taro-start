import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './coupon-label.less';
import coupon from '@/assets/image/goods/goods-list/coupon-bg.png';
interface ICouponLabelP {
  text: string;
  [name: string]: any;
}

interface ICouponLabelS {}
export default class CouponLabel extends Component<ICouponLabelP, ICouponLabelS> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {text} = this.props;
    const {} = this.state;
    return (
      <View className="coupon-box">
        <View className="coupon-contain">
          <Image src={coupon} className="coupon-my-img-left" />
          <Text className="text">{text}</Text>
          <Image src={coupon} className="coupon-my-img" />
        </View>
        {/*<View className="coupon-item">*/}
        {/*  <Text className="text">{text}</Text>*/}
        {/*  <Image src={couponImg} className="coupon-bj" />*/}
        {/*</View>*/}
      </View>
    );
  }
}
