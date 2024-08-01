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
export default class AllAndGrouped extends Component<any, any> {
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
    let {main = {}, actions = {}} = this.props;
    let {selectTab, selectList} = this.state;
    const {goodsList, useConfig} = main;
    const {noSelectedColor, selectedColor} = useConfig;
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
    return (
      <View className="gift-card-all-grouped" id="gift-card">
        <View className="top">
          <Text className="text">您可以兑换以下商品</Text>
        </View>
        <ScrollView
          className="tab"
          scrollX
          enableFlex
          style={{justifyContent: 'center', alignItems: 'unset', height: '30px'}}
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
                <Text
                  className="text"
                  style={item.id === thisSelectTab ? {color: selectedColor} : {color: noSelectedColor}}
                >
                  {item?.groupName}
                </Text>
                {item.id === thisSelectTab && (
                  <View
                    className="blank"
                    style={item.id === thisSelectTab ? {background: selectedColor} : {background: 'transparent'}}
                  ></View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <ScrollView className="goods" scrollY scrollWithAnimation>
          {list.map((item) => {
            return <GoodsItem goodsInfo={item} isStepper={false} />;
          })}
        </ScrollView>
      </View>
    );
  }
}
