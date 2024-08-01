import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/sales-total.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
type ISalesTotalProps = T.IProps & T.ISalesTotalProps;

@connect<Partial<ISalesTotalProps>, T.ISalesTotalState>(store2Props, actions)
export default class SalesTotal extends Component<Partial<ISalesTotalProps>, T.ISalesTotalState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISalesTotalProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      // actions: { action },
      main,
    } = this.props;
    const totalSaleAmount = main?.data ? main.data.totalSaleAmount : 0.0;
    const totalCommission = main?.data ? main.data.totalCommission : 0.0;

    return (
      <View className="salesTotal">
        <View className="total-item">
          <Text className="label">累计销售额</Text>
          <Text className="price">￥{_.addZero(totalSaleAmount)}</Text>
        </View>
        <View className="total-item">
          <Text className="label">预估收益</Text>
          <Text className="price">￥{_.addZero(totalCommission)}</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
