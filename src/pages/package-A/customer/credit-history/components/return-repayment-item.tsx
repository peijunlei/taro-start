import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './return-repayment-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import {Const} from 'config'
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
      status,
      item,
    } = this.props;

    return (
      <View
        className="return-repayment-item"
        onClick={() => Taro.navigateTo({url: `/pages/package-A/customer/credit-return-detail/index?id=${item.id}`})}
      >
        <View className="return-repayment-up">
          <Text>
            <Text className="return-repayment-font">额度</Text>
            <Text className="return-repayment-font">￥{_.addZero(item.creditAmount)}</Text>
          </Text>
          {item.usedStatus == 1 ? (
            <Text className="return-repayment-status">使用中</Text>
          ) : (
            <Text className="return-repayment-status-ending">已结束</Text>
          )}
        </View>
        <View>
          <Text className="return-repayment-time">
            {' '}
            {item.startTime ? moment(item.startTime).format(Const.SECONDS_FORMAT) : ''}
          </Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
