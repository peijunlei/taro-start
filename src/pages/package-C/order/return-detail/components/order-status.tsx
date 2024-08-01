import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './order-status.less';
import {Const} from 'config';
import {_} from 'wmkit';

type OrderStatusProps = T.IProps & T.OrderStatusProps;

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderStatus extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }
  render() {
    let {
      main: {detail, rejectReason},
    } = this.props;
    const returnFlowState = detail.returnFlowState;
    let rejectLabel = '';
    switch (returnFlowState) {
      case 'REJECT_RECEIVE':
        rejectLabel = '拒绝收货原因';
        break;
      case 'REJECT_REFUND':
        rejectLabel = '拒绝退款原因';
        break;
      case 'VOID':
        rejectLabel = '作废原因';
        break;
    }
    const labelStatus =
      detail.returnType == 'RETURN' ? Const.returnGoodsState[returnFlowState] : Const.returnMoneyState[returnFlowState];
    console.log('rejectReason===', rejectReason);
    return (
      detail && (
        <View className="order-status">
          <View className="status">
            <Text className="text1">退单状态</Text>
            <Text className="result">{labelStatus}</Text>
          </View>

          {'REJECT_RECEIVE' == returnFlowState || 'REJECT_REFUND' == returnFlowState || 'VOID' == returnFlowState ? (
            <View className="status">
              <Text className="text">{rejectLabel}</Text>
              <View className="text" style={{flexDirection: 'row', alignItems: 'center'}}>
                {rejectReason}
              </View>
            </View>
          ) : null}

          <View className="status">
            <Text className="text">订单号</Text>
            <View className="text" style={{flexDirection: 'row', alignItems: 'center'}}>
              {detail.tid}
            </View>
          </View>

          <View className="status">
            <Text className="text">退单号</Text>
            <View className="text" style={{flexDirection: 'row', alignItems: 'center'}}>
              {' '}
              {detail.platform != 'CUSTOMER' && <Image className="imgs" src={require('../img/dai.png')} />} {detail.id}
            </View>
          </View>

          <View className="status">
            <Text className="text">退单时间</Text>
            <Text className="text">{_.formatDate(detail.createTime)}</Text>
          </View>
        </View>
      )
    );
  }
}
