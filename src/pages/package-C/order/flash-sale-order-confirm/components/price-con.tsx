import {Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/price-con.less';
import '../css/index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

type IPriceConProps = T.IProps & T.IPriceConProps;

@connect<Partial<IPriceConProps>, T.IPriceConState>(store2Props, actions)
export default class PriceCon extends Component<Partial<IPriceConProps>, T.IPriceConState> {
  constructor(props: IPriceConProps) {
    super(props);
  }

  /**

   */
  render() {
    let {actions, main} = this.props;
    const {orderList} = main || {};
    const couponTotalPrice = main?.localData.confirmCoupon.couponTotalPrice
      ? main?.localData.confirmCoupon.couponTotalPrice
      : 0;
    return (
      <View className="priceCon">
        <View className="order-store-item">
          <Text className="order-item-label">订单总额</Text>
          <View className="store-item-right">
            <Text className="item-input-price">
              ¥
              {_.sub(
                _.sub(main?.price.totalPrice, couponTotalPrice),
                actions._pointToMoney(main?.points.usePoint),
              ).toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="order-store-item">
          <Text className="order-item-label">商品金额</Text>
          <View className="store-item-right">
            <Text className="item-text">¥{main?.price.goodsTotalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {!orderList?.isVirtualGoods && (
          <View className="order-store-item">
            <Text className="order-item-label">配送费用</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{main?.price.totalDeliveryPrice.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
