import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dayjs from 'dayjs';
import './prize-receive-goods.less';

type IPrizeReceiveGoodsProps = T.IProps & T.IPrizeReceiveGoodsProps;

@connect<Partial<IPrizeReceiveGoodsProps>, T.IPrizeReceiveGoodsState>(store2Props, actions)
export default class PrizeGoods extends Component<Partial<IPrizeReceiveGoodsProps>, T.IPrizeReceiveGoodsState> {
  constructor(props: IPrizeReceiveGoodsProps) {
    super(props);
  }
  render() {
    let {
      main: {prizeInfo},
    } = this.props;
    return (
      prizeInfo && (
        <View className="prize-detail-goods">
          <Image mode="aspectFit" className="prize-img" src={prizeInfo.prizeUrl}></Image>
          <View className="prize-info">
            <Text className="prize-title">{prizeInfo.prizeName}</Text>
            <Text className="prize-time">中奖时间：{dayjs(prizeInfo.drawTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          </View>
        </View>
      )
    );
  }
}
