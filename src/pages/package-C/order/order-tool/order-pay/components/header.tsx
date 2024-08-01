import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import InvoiceIcon from '@/assets/image/common/remind.png';
import { _ } from 'wmkit';
import IconFont from '@/wmkit/common/iconfont';
type IHeaderProps = T.IProps & T.IHeaderProps;

@connect<Partial<IHeaderProps>, T.IHeaderState>(store2Props, actions)
export default class Header extends Component<Partial<IHeaderProps>, T.IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    const { servicePrice, ordersource } = main
    const isTongKa = ['meituan', 'shanmuyouxuan', 'dingdong'].includes(ordersource)
    return (
      <View className="header">
        {main?.orderTimeOut && (
          <View className="invoice-header">
            <Image className="invoice-icon" src={InvoiceIcon} />
            <Text className="invoice-tips" decode>
              请在&nbsp;{_.formatDate(main?.orderTimeOut)}&nbsp;前完成支付，否则将会自动取消
            </Text>
          </View>
        )}

        <View className="price-con">
          <Text className="price-title">订单金额</Text>
          <View className="price-num-con">
            {
              main?.tradePrice && (
                <Text className="price-num">
                  <Text className="price-icon">¥</Text>
                  {main?.tradePrice}
                </Text>
              )
            }
            {
              isTongKa &&
              <View className='detail' onClick={() => action.commonChange('main.serviceShow', true)}>
                <Text className='text'>明细</Text>
                <IconFont value="zhuyi" size={12} color="#FF6600" />
              </View>
            }
          </View>
          {
            isTongKa &&
            <View className='service'>
              含服务费¥{_.addZero(servicePrice)}
            </View>
          }
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
