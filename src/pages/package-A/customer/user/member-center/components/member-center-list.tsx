import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './member-center-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import MarketingLabel from './marketing-label';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';
import CartCount from '@/pages/common/goods/cart-count';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class MemberCenterList extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  render() {
    let {
      main: {buyList, isShow},
      actions: {action},
      isHideModule,
    } = this.props;

    return (
      <View className="memberCenter__list" style={isHideModule ? {paddingBottom: 0} : {}}>
        <View className="hot-text">会员最爱买</View>
        <View className="bigSpuLists">
          {buyList.length > 0 && buyList.map((item, index) => <GoodsItem key={index} item={item} />)}
          {buyList.length > 0 && !isHideModule && <View className="status">没有更多了</View>}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
