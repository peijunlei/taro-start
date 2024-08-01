import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { OrderWrapper, immutable } from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import './order-buyer-info.less';
import { isEmpty } from 'lodash';

type OrderStatusProps = T.IProps & T.OrderStatusProps;

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderBuyerInfo extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }
  render() {
    let { main = {} } = this.props;
    const { detail } = main;
    let orderWrapper;
    if (detail) {
      orderWrapper = OrderWrapper(immutable.fromJS(detail));
    }
    if (isEmpty(detail)) return null
    const isZhiChongGoods = detail.tradeItems.some(e => e.goodsType === 6)
    const isCouponGoods = detail.tradeItems.some(e => e.goodsType === 7)
    if (isZhiChongGoods || isCouponGoods) return null
    return (
      <View className="mb10">
        <View className="seperate_line"></View>
        <View className="address-info">
          <View className="address1">
            {orderWrapper.buyerAddress()}
            {/*北京朝阳区柳芳南里三号楼2单元*/}
          </View>
          <View className="tname">
            <Text className="name">
              {orderWrapper.buyerName()}
              {/*柒柒*/}
            </Text>
            <Text className="phone">
              {orderWrapper.buyerPhone()}
              {/*15901132649*/}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
