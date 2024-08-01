import {View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

// 还款申请页面
import RepayForm from './components/repay-form';
// 还款中页面
import Repaying from './components/credit-repay';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class OnlineRepayment extends Component<Partial<T.IProps>, any> {
  async componentDidShow() {
    await this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  render() {
    let {main} = this.props;

    return main && <View className="onlineRepayment">{main?.waitRepay ? <Repaying /> : <RepayForm />}</View>;
  }
}
