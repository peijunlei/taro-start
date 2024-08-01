import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {Image, Text, View} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './item.less';
import noneImg from '@/assets/image/coupon/empty.png';

type IOrderListProps = T.IProps & T.IOrderListProps;

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class Item extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {main, order} = this.props;
    let price;
    if (order.points) {
      price = `${order.points}积分`;
    } else if (!order.buyPoint) {
      price = `¥${order.price.toFixed(2)}`;
    } else if (!order.price) {
      price = `${order.buyPoint}积分`;
    } else {
      price = `${order.buyPoint}积分 + ¥${order.price.toFixed(2)}`;
    }
    return (
      <View>
        <View
          className="user-box-ship"
          key={order.id}
          onClick={(e) => {
            e.stopPropagation();
            Taro.navigateTo({
              url: `/pages/package-B/goods/goods-details/index?skuId=${order.skuId}`,
            });
          }}
        >
          <Image className="Img" src={order.pic ? order.pic : noneImg} />
          <View className="right_box">
            <View className="right_top">{order.itemName}</View>
            <Text className="right_middle">{!order.specDetails ? '' : order.specDetails}</Text>
            <View className="right_bottom">
              <View className="bottom_left">
                <Text className="bottom_right">{price}</Text>
              </View>
              <Text className="bottom_b">
                × <Text className="bottom_a">{order.itemNum}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
