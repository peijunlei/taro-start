import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {OrderWrapper, immutable, getPrivacySetting, msg} from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './order-status.less';

type OrderStatusProps = T.IProps & T.OrderStatusProps;

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderStatus extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }

  stateStr = (detail, orderWrapper) => {
    let state = orderWrapper.orderState()
    const isZhiChongOrCoupon = detail.tradeItems?.some(e => [6, 7].includes(e.goodsType))
    if (isZhiChongOrCoupon) {
      if (['待发货', '已收货', '待收货', '已完成'].includes(state)) state = '已完成'
    }
    return state
  }

  render() {
    let {main = {}} = this.props;
    const {detail} = main;
    let orderWrapper;
    if (detail) orderWrapper = OrderWrapper(immutable.fromJS(detail));
    return (
      detail && (
        <View className="order-status">
          <View className="status">
            <Text className="text1">订单状态</Text>
            <Text className="result">
              {this.stateStr(detail, orderWrapper)}
              {/*待付款*/}
            </Text>
          </View>
          {orderWrapper.isVoidTrade() ? (
            <View className="status">
              <Text className="text2">作废原因</Text>
              <Text className="text textFlex">
                {orderWrapper.obsoloteReason()}
                {/*收货地址错误*/}
              </Text>
            </View>
          ) : (
            ''
          )}
          <View className="status">
            <Text className="text2">订单号</Text>
            <View className="text" style={{flexDirection: 'row', alignItems: 'center'}}>
              {' '}
              {orderWrapper.platform() != 'CUSTOMER' && <Image className="imgs" src={require('../img/dai.png')} />}{' '}
              {orderWrapper.orderNo()}
              <View
                className="btn"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: orderWrapper.orderNo(),
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: orderWrapper.orderNo(),
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });
                  
                }}
              >
                复制
              </View>
            </View>
          </View>
          <View className="status">
            <Text className="text2">下单时间</Text>
            <Text className="text">{orderWrapper.createTime()}</Text>
          </View>
        </View>
      )
    );
  }
}
