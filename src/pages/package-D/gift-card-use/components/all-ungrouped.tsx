import {View, Image, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';

import './all-ungrouped.less';

@connect(store2Props, actions)
export default class AllAndUngrouped extends Component<any, any> {
  render() {
    let {main = {}} = this.props;
    const {goodsList} = main;
    // if (goodsList.length === 0) return null;

    return (
      <View className="gift-card-all-ungrouped" style={{}}>
        <View className="top">
          <Text className="text">您可以兑换以下商品</Text>
        </View>
        <View className="goods">
          {!goodsList.length ? (
            <Text className="no-data">暂无数据...</Text>
          ) : (
            goodsList.map((item) => {
              return <GoodsItem goodsInfo={item} key={item.goodsId} isStepper={false} />;
            })
          )}
        </View>
      </View>
    );
  }
}
