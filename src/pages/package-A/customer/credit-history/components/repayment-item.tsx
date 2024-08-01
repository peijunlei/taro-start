import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './repayment-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {_} from 'wmkit';
import {Const} from 'config';
import {store2Props} from '../selectors';
import moment from 'dayjs';

type IReturnRepaymentItemProps = T.IProps & T.IReturnRepaymentItemProps;

@connect<Partial<IReturnRepaymentItemProps>, T.IReturnRepaymentItemState>(store2Props, actions)
export default class ReturnRepaymentItem extends Component<
  Partial<IReturnRepaymentItemProps>,
  T.IReturnRepaymentItemState
> {
  constructor(props: IReturnRepaymentItemProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main,
      item,
    } = this.props;
    return (
      main && (
        <View
          className="repayment-item"
          onClick={() =>
            Taro.navigateTo({url: `/pages/package-A/customer/credit-repayment-detail/index?id=${item.id}`})
          }
        >
          <View className="repayment-up">
            <View className="repayment-font">￥{_.addZero(item.repayAmount)}</View>
            {item.repayStatus == 0 ? (
              <View className="repayment-status">还款中</View>
            ) : item.repayStatus == 1 ? (
              <View className="repayment-status">已还款</View>
            ) : item.repayStatus == 2 ? (
              <View className="repayment-status-ending">已作废</View>
            ) : (
              ''
            )}
          </View>
          <View className="repayment-up">
            <View className="repayment-time">{item.repayOrderCode}</View>
            <View className="repayment-time">
              {item.repayTime ? moment(item.repayTime).format(Const.SECONDS_FORMAT) : ''}
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
