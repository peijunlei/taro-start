import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderStatus from './components/order-status';
import OrderBody from './components/order-body';
import OrderBottom from './components/order-bottom';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ReturnDetail extends Component<Partial<T.IProps>, any> {
  componentWillMount(): void {
    let tid = getCurrentInstance().router.params.id ? getCurrentInstance().router.params.id : '';
    this.props.actions.init(tid);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="packageCReturnDetail">
        {/*订单状态*/}
        <OrderStatus />

        {/*订单主体*/}
        <OrderBody />

        <View className="pad_ing">1111</View>

        {/*操作按钮*/}
        <OrderBottom />
      </View>
    );
  }
}
