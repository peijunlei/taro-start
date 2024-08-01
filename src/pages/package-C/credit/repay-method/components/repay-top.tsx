import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './repay-top.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import moment from 'dayjs';
import InvoiceIcon from '@/assets/image/common/remind.png';

type IRepayTopProps = T.IProps & T.IRepayTopProps;

@connect<Partial<IRepayTopProps>, T.IRepayTopState>(store2Props, actions)
export default class RepayTop extends Component<Partial<IRepayTopProps>, T.IRepayTopState> {
  constructor(props: IRepayTopProps) {
    super(props);
  }

  static defaultProps = {
    main: {
      repayInfo: {},
    },
  };

  /**

*/
  render() {
    let {main} = this.props;
    if (!main) {
      return <View />;
    }
    let {
      main: {repayInfo},
    } = this.props;

    return (
      <View className="header">
        {repayInfo?.createTime && (
          <View className="invoice-header">
            <Image className="invoice-icon" src={InvoiceIcon} />
            <Text className="invoice-tips" decode={true}>
              请在&nbsp;{_.formatDate(moment(repayInfo?.createTime).add(10, 'minutes'))}
              &nbsp;前完成支付，否则将会自动取消
            </Text>
          </View>
        )}

        <View className="price-con">
          <Text className="price-title">还款金额</Text>
          <View className="price-num-con">
            <Text className="price-num">
              <Text className="price-icon">¥</Text>
              {_.addZero(repayInfo?.repayAmount || 0.0)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
