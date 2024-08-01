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
export default class CashAndUngrouped extends Component<any, any> {
  render() {
    let {main = {}, actions = {}} = this.props;
    const {goodsList, giftCard} = main;
    const {cardRuleNum, cardUseNum, cardRuleTypes} = giftCard;

    // if (goodsList.length === 0) return null;

    return (
      <View className="gift-card-all-ungrouped">
        <View className="top">
          <Text className="text">
            您可以购买以下商品
            {cardRuleTypes?.includes(0) ? `，该卡仅限消费${Number(cardRuleNum)}次，已消费${Number(cardUseNum)}次` : ''}
          </Text>
        </View>
        <View className="goods">
          {!goodsList.length ? (
            <Text className="no-data">暂无数据...</Text>
          ) : (
            goodsList.map((item) => {
              return <GoodsItem goodsInfo={item} key={item.goodsInfoId} isStepper />;
            })
          )}
          <View />
        </View>
      </View>
    );
  }
}
