import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dayjs from 'dayjs';
import './prize-goods.less';

type PrizeGoodsProps = T.IProps & T.PrizeGoodsProps;

@connect<Partial<PrizeGoodsProps>, T.PrizeGoodsState>(store2Props, actions)
export default class PrizeGoods extends Component<Partial<PrizeGoodsProps>, T.PrizeGoodsState> {
  constructor(props: PrizeGoodsProps) {
    super(props);
  }
  render() {
    let {
      main: {detail},
    } = this.props;
    return (
      detail && (
        <View className="prize-detail-goods">
          <Image mode="aspectFit" className="prize-img" src={detail.prizeUrl}></Image>
          <View className="prize-info">
            <Text className="prize-title">{detail.prizeName}</Text>
            <Text className="prize-time">中奖时间：{dayjs(detail.drawTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          </View>
        </View>
      )
    );
  }
}
