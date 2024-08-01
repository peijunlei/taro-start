import { View, Image, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';

import './footer.less'

@connect(store2Props, actions)
export default class Footer extends Component<any, any> {

  render() {
    let { actions = {} } = this.props;

    return (
      <View className="footer-cls">
        <View
          className="confirm-btn"
          onClick={() => {
            actions.action.submitOrder()
          }}
        >
          <Text className="confirm-text">提交订单</Text>
        </View>
      </View>
    );
  }
}
