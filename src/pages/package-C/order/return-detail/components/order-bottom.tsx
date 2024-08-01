import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {OrderWrapper} from 'wmkit';
import * as T from '../types';
import './order-bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';


type OrderStatusProps = T.IProps & T.OrderStatusProps;

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderBottom extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }
  render() {
    let {
      actions: {action},
      main: {detail},
    } = this.props;
    const rid = detail.id;
    const returnFlowState = detail.returnFlowState;
    // 退单类型 RETURN 退货, REFUND 退款
    const returnType = detail.returnType || 'RETURN';
    return returnFlowState == 'INIT' || (returnFlowState == 'AUDIT' && returnType == 'RETURN') ? (
      <View className="order-button">
        <View className="order-button-wrap ">
          {returnFlowState == 'INIT' && (
            <View
              className={'btn btn-warning'}
              onClick={() => {
                this.props.actions.action.cancelOrder(rid);
              }}
            >
              {'取消退单'}
            </View>
          )}

          {/*退货单的已审核状态*/}
          {returnFlowState === 'AUDIT' && returnType == 'RETURN' && (
            <View
              className={'btn btn-warning'}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-C/order/logistics-input/index?rid=${rid}`,
                });
              }}
            >
              {'填写物流'}
            </View>
          )}
        </View>
      </View>
    ) : null;
  }
}
