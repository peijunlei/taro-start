import {View, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dayjs from 'dayjs';
import './prize-goods.less';
import {_} from 'wmkit';

type PrizeGoodsProps = T.IProps & T.PrizeGoodsProps;

@connect<Partial<PrizeGoodsProps>, T.PrizeGoodsState>(store2Props, actions)
export default class PrizeInfo extends Component<Partial<PrizeGoodsProps>, T.PrizeGoodsState> {
  constructor(props: PrizeGoodsProps) {
    super(props);
  }
  render() {
    let {
      main: {detail},
    } = this.props;
    return (
      detail &&
      detail.prizeType === 3 && (
        <View className="prize-detail-info">
          <View className="title">奖品说明</View>
          <RichText nodes={_.formatRichText(detail.customize)} />
        </View>
      )
    );
  }
}
