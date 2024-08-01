import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './repay-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';

type IRepayInfoProps = T.IProps & T.IRepayInfoProps;

function PayTypeName(payType) {
  switch (payType) {
    case 'WECHAT':
      return '微信';
    case 'ALIPAY':
      return '支付宝';
    case 'UNIONPAY':
      return '银联';
  }
}

@connect<Partial<IRepayInfoProps>, T.IRepayInfoState>(store2Props, actions)
export default class RepayInfo extends Component<Partial<IRepayInfoProps>, T.IRepayInfoState> {
  constructor(props: IRepayInfoProps) {
    super(props);
  }

  static defaultProps = {
    main: {
      isReady: false,
      repayInfo: {},
    },
  };

  render() {
    let {
      main: {repayInfo},
    } = this.props;

    console.log(11);
    console.log(repayInfo.repayType);

    return (
      <View className="repayInfo">
        <View className="info__item">
          还款额度：
          <Price price={repayInfo.repayAmount} />
        </View>
        <View className="info__item">
          还款方式：{repayInfo.repayType != undefined && PayTypeName(repayInfo.repayType) + '支付'}
        </View>
        <View className="info__item">还款单号：{repayInfo.repayOrderCode}</View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
