import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {getReducerData} from '@/redux/store';
import RepayOrderList from './components/repay-order-list';
import OrderBottom from './components/order-bottom';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CreditAssociateOrder extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidMount() {
    // 已选中的订单id
    const {selectedOrderIds} = getCurrentInstance().router.params;
    let {onlineRepay} = getReducerData('onlineRepaymentMain') || {};
    this.props.actions.init(onlineRepay ? onlineRepay.orderIds : []);
    Taro.setBackgroundColor({
      backgroundColor: '#f4f4f4', // 窗口的背景色为白色
    });
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="creditAssociateOrder">
        <View className="creditOrder">
          <RepayOrderList />
        </View>
        <OrderBottom />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
