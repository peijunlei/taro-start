import { View, Image, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';
import { cloneDeep } from 'lodash';

import './all-grouped.less';

@connect(store2Props, actions)
export default class CashAndGrouped extends Component<any, any> {
  state = {
    selectTab: null,
    // selectList: [],
  };
  componentWillReceiveProps(nextProps) {
    let { main = {} } = nextProps;
    const { goodsList } = main;
    const tabId = this.state.selectTab || goodsList[0]?.id;
    // console.log('tabId2', tabId);
    this.setState({
      selectTab: tabId,
    })
  }
  componentDidMount() {
    let { main = {} } = this.props;
    const { goodsList } = main;
    const tabId = this.state.selectTab || goodsList[0]?.id;
    // console.log('tabId1', tabId);
    this.setState({
      selectTab: tabId,
    })
  }
  render() {
    let { main = {}, actions = {} } = this.props;
    let { selectTab } = this.state;
    // console.log('selectTab', selectTab);
    const { goodsList, useConfig, giftCard } = main;
    const { cardRuleNum, cardUseNum, cardRuleTypes } = giftCard;
    const { noSelectedColor, selectedColor } = useConfig;
    if (goodsList.length === 0)
      return (
        <View className="gift-card-all-ungrouped" style={{}}>
          <View className="goods">
            <Text className="no-data">暂无数据...</Text>
          </View>
        </View>
      );
    if (!selectTab) return null;
    const thisSelectTab = selectTab
    const list = goodsList.find((item) => item.id === thisSelectTab).goodsInfoList || [];
    // console.log('list', list);
    return (
      <View className="gift-card-all-grouped" id="gift-card">
        <View className="top">
          <Text className="text">
            您可以购买以下商品
            {cardRuleTypes?.includes(0) ? `，该卡仅限消费${Number(cardRuleNum)}次，已消费${Number(cardUseNum)}次` : ''}
          </Text>
        </View>
        <ScrollView
          className="tab"
          scrollX
          enableFlex
          style={{ alignItems: 'unset', height: '30px' }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {goodsList.map((item) => {
            return (
              <View
                key={item.id}
                className={item.id === thisSelectTab ? 'tab-item-active' : 'tab-item'}
                onClick={() => {
                  this.setState({
                    selectTab: item.id,
                  });
                }}
              >
                <Text
                  className="text"
                  style={item.id === thisSelectTab ? { color: selectedColor } : { color: noSelectedColor }}
                >
                  {item?.groupName}
                </Text>
                {item.id === thisSelectTab && (
                  <View
                    className="blank"
                    style={item.id === thisSelectTab ? { background: selectedColor } : { background: 'transparent' }}
                  ></View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <View className="goods">
          {list.map((item) => {
            console.log('item', item);
            return <GoodsItem goodsInfo={item} isStepper groupId={thisSelectTab} />;
          })}
        </View>
      </View>
    );
  }
}
