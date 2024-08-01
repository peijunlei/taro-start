import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './price.less';
interface IPriceP {
  price: string | number;
  [name: string]: any;
  sum: number;
}

interface IPriceS {}
export default class PriceAll extends Component<IPriceP, IPriceS> {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {price, sum} = this.props;
    return (
      <Text className="price-style">
        <Text className="sum">合计 </Text>
        <Text className="price-unit">￥</Text>
        <Text className="wm-price-text">{price}</Text>
      </Text>
    );
  }
}
