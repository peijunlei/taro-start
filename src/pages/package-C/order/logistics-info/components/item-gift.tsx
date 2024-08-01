import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './item.less';
type IOrderListProps = T.IProps & T.IOrderListProps;

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class ItemGift extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {order} = this.props;
    return (
      <View>
        <View className="user-box" key={order.id}>
          <View className="left_box">
            <Image src={require('../img/little.png')} className="img_little" />
          </View>
          <View className="right_box">
            <View className="right_top">{order.context}</View>
            <View className="right_bottom">{order.time}</View>
          </View>
        </View>
      </View>
    );
  }
}
