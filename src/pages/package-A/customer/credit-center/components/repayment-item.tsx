import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {Const} from 'config';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import moment from 'dayjs';
import './repayment-item.less';
import {immutable} from 'wmkit';

const noneImg = require('@/assets/image/default/no-goods-img.png');
import arrow from '@/assets/image/customer/credit/arrow.png';

type IRepaymentItemProps = T.IProps & T.IRepaymentItemProps;

@connect<Partial<IRepaymentItemProps>, T.IRepaymentItemState>(store2Props, actions)
export default class RepaymentItem extends Component<Partial<IRepaymentItemProps>, T.IRepaymentItemState> {
  constructor(props: IRepaymentItemProps) {
    super(props);
  }

  render() {
    const {item, main, key} = this.props;
    const {historyRecoverList} = main;
    console.log('item', item);
    return (
      <View
        className="RepaymentItem"
        onClick={() => Taro.navigateTo({url: `/pages/package-A/customer/credit-repayment-detail/index?id=${item.id}`})}
      >
        <View className="repaymentState">
          <View className="repaymentAmount">
            <View className="repaymentAmountIcon">￥</View>
            <View className="repaymentAmountNum">{item.repayAmount?.toFixed(2)}</View>
          </View>
          {item.repayStatus == 0 ? (
            <View className="repaymentIng">还款中</View>
          ) : item.repayStatus == 1 ? (
            <View className="repaymentIng">已还款</View>
          ) : item.repayStatus == 2 ? (
            <View className="repaymentZuofei">已作废</View>
          ) : (
            ''
          )}
        </View>
        <View className="repaymentStateNo">
          <View className="repaymentStateNoNum">{item.repayOrderCode}</View>
          <View className="repaymentStateNoDate">
            {item.repayTime ? moment(item.repayTime).format(Const.SECONDS_FORMAT) : ''}
          </View>
        </View>
        {historyRecoverList.length - 1 != key && <View className="borderBottom"></View>}
      </View>
    );
  }
}
