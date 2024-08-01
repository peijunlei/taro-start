import {View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './repay-status.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import statusSuccess from '@/assets/image/common/success.png';

type IRepayStatusProps = T.IProps & T.IRepayStatusProps;

const repayStatusStr = (repayStatus) => {
  if (repayStatus == 0) {
    return '待还款！';
  } else if (repayStatus == 1) {
    return '还款成功！';
  } else if (repayStatus == 2) {
    return '已作废！';
  }
};

@connect<Partial<IRepayStatusProps>, T.IRepayStatusState>(store2Props, actions)
export default class RepayStatus extends Component<Partial<IRepayStatusProps>, T.IRepayStatusState> {
  constructor(props: IRepayStatusProps) {
    super(props);
  }

  static defaultProps = {
    main: {
      isReady: false,
      repayInfo: {},
    },
  };

  render() {
    const {
      main: {repayInfo},
    } = this.props;
    return (
      <View className="repayStatus">
        <Image src={statusSuccess} className="status-icon" />
        <View className="status-name">{repayStatusStr(repayInfo.repayStatus)}</View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
