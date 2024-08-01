import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import RepayTop from './components/repay-top';

import ReapyList from './components/reapy-list';
import Mask from './components/mask';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class RepayMethod extends Component<Partial<T.IProps>, any> {
  componentDidShow() {
    let {repayOrderCode} = getCurrentInstance().router.params;
    this.props.actions.init(repayOrderCode);
  }

  componentDidHide() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="repayMethod">
        <RepayTop />
        <ReapyList />
        <Mask />
      </View>
    );
  }
}
