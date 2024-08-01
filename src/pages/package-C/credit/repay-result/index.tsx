import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import RepayStatus from './components/repay-status';

import RepayInfo from './components/repay-info';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class RepayResult extends Component<Partial<T.IProps>, any> {
  config = {
    navigationBarTitleText: '还款结果',
  };

  componentDidShow() {
    let {repayOrderCode} = getCurrentInstance().router.params;
    this.props.actions.init(repayOrderCode);
  }

  componentDidHide() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="repayResult">
        <RepayStatus />
        <RepayInfo />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
