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
export default class OptAndGrouped extends Component<any, any> {
  state = {
    selectTab: null,
    selectList: [],
  };
  componentWillReceiveProps(nextProps) {
    let { main = {} } = nextProps;
    const { goodsList } = main;
    const tabId = this.state.selectTab || goodsList[0]?.id;
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
    let { selectTab, selectList } = this.state;
    const { goodsList, giftCard, useConfig } = main;
    const { crossGroupNum, crossGroupType } = giftCard;
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
    const active = goodsList.find((e) => e.id === thisSelectTab);
    return (
      <View className="gift-card-all-grouped" id="gift-card">
        <View className="top">
          {crossGroupType === 1 && <Text className="text">您可任选{crossGroupNum}个分组兑换商品</Text>}
        </View>
        <ScrollView
          className="tab"
          scrollX
          enableFlex
          style={{ justifyContent: 'center', alignItems: 'unset', height: '30px' }}
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
                    selectList: item.goodsInfoList,
                  });
                }}
              >
                <Text className="text" style={{ color: item.id === thisSelectTab ? selectedColor : noSelectedColor }}>
                  {item?.groupName}
                </Text>
                <View
                  className="blank"
                  style={{ backgroundColor: item.id === thisSelectTab ? selectedColor : 'transparent' }}
                ></View>
              </View>
            );
          })}
        </ScrollView>
        <View className="goods">
          {active ? <Text className="counts">该分组可选{active.checkNum}份商品</Text> : null}
          {list.map((item, i) => {
            return <GoodsItem goodsInfo={item} isStepper groupId={thisSelectTab} key={i} checkNum={active.checkNum} />;
          })}
        </View>
      </View>
    );
  }
}
