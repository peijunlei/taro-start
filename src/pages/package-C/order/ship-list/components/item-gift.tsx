import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './item.less';
type IOrderListProps = T.IProps & T.IOrderListProps;
import noneImg from '@/assets/image/coupon/empty.png';

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class ItemGift extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {order} = this.props;
    return (
      <View>
        <View
          className="user-box-ship "
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
            <View className="right_top">
              <Text className="zen">赠品</Text>
              {order.itemName ? order.itemName : '无'}
            </View>
            <Text className="right_middle">{order.specDetails ? order.specDetails : ''}</Text>
            <View className="right_bottom">
              <View className="bottom_left">
                ￥<Text className="bottom_right">{order.price ? order.price : '0.00'}</Text>
              </View>
              <Text className="bottom_b">
                × <Text className="bottom_a">{order.itemNum ? order.itemNum : ''}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
