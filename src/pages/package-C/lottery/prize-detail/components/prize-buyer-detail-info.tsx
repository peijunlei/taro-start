import {View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './prize-buyer-detail-info.less';

type PrizeBuyerInfoProps = T.IProps & T.PrizeBuyerInfoProps;

@connect<Partial<PrizeBuyerInfoProps>, T.PrizeBuyerInfoState>(store2Props, actions)
export default class PrizeBuyerInfo extends Component<Partial<PrizeBuyerInfoProps>, T.PrizeBuyerInfoState> {
  constructor(props: PrizeBuyerInfoProps) {
    super(props);
  }
  render() {
    let {
      main: {detail},
    } = this.props;
    return (
      detail &&
      detail.prizeType !== 3 && (
        <View className="prize-buyer-detail-info">
          <View className="seperate_line"></View>
          <View className="address-info">
            <View className="address1">{detail.detailAddress ? detail.detailAddress : ''}</View>
            <View className="tname">
              <Text className="name">{detail.consigneeName ? detail.consigneeName : ''}</Text>
              <Text className="name">{detail.customerAccount ? detail.customerAccount : ''}</Text>
            </View>
          </View>
        </View>
      )
    );
  }
}
