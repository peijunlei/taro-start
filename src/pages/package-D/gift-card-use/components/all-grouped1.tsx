import {View, Image, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';

import './all-grouped.less';

@connect(store2Props, actions)
export default class AllAndGrouped1 extends Component<any, any> {
  render() {
    let {main = {}, actions = {}} = this.props;
    const {goodsList, useConfig} = main;
    const {foregroundColor, backgroundColor, backgroundImage} = useConfig;

    if (goodsList.length === 0)
      return (
        <View className="gift-card-all-ungrouped" style={{}}>
          <View className="goods">
            <Text className="no-data">暂无数据...</Text>
          </View>
        </View>
      );

    return (
      <View className="gift-card-all-grouped" id="gift-card">
        <View className="top">
          <Text className="text">您可以兑换以下商品</Text>
        </View>
        <ScrollView className="goods" scrollY scrollWithAnimation>
          {goodsList.map((groupItem) => {
            return (
              <View key={groupItem.id}>
                <View
                  className="group-top"
                  style={
                    backgroundColor
                      ? {backgroundColor: backgroundColor, color: foregroundColor}
                      : {
                          backgroundImage: `url(${backgroundImage})`,
                          backgroundSize: '100% 100%',
                          color: foregroundColor,
                        }
                  }
                >
                  {groupItem.groupName}
                </View>
                {groupItem.goodsInfoList.map((item) => {
                  return <GoodsItem key={item.goodsInfoId} goodsInfo={item} isStepper={false} />;
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
