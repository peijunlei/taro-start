import { View, Button, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { _, noop } from 'wmkit';
import api from 'api';


type IPasswordMaskProps = T.IProps & T.IPasswordMaskProps;

@connect<Partial<IPasswordMaskProps>, T.IPasswordMaskState>(store2Props, actions)
export default class ServiceMask extends Component<Partial<IPasswordMaskProps>, T.IHeaderState> {
  //允许组件使用外部全局样式类
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IPasswordMaskProps) {
    super(props);
    this.state = {
      isFocus: false,
      isAutoFocus: true,
      // isFocusA: true,
    };
  }
  calcOriginPrice() {
    let {
      main: {
        servicePrice,
        serviceFeeAmount,
        tradePrice,
        ordersource
      },
    } = this.props;
    switch (ordersource) {
      case 'meituan':
      case 'shanmuyouxuan':
        return _.sub(tradePrice, _.add(servicePrice, serviceFeeAmount));
      case 'dingdong':
        return _.sub(tradePrice, servicePrice);
      default:
        return 0
    }
  }
  render() {
    let {
      actions: { action },
      main: {
        servicePrice,
        serviceFeeAmount, servicePriceRate,
        originPrice,
        tradePrice,
        ordersource
      },
    } = this.props;
    return (
      <View
        className="pass-bg service-mask"
        onClick={(e) => {
          e.stopPropagation();
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <View
          className="pass-show"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="pass-header">
            <Text className="pass-title">订单金额明细</Text>
          </View>

          <View
            className="pass-body"
            onClick={(e) => {
              e.stopPropagation();
            }}
            catchMove
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <View className='cell'>
              <View className='label'>原订单金额：</View>
              <View className='val'>¥{_.addZero(originPrice)}</View>
            </View>
            <View className='cell'>
              <View className='label'>服务费（{servicePriceRate}%）：</View>
              <View className='val'>¥{_.addZero(servicePrice)}</View>
            </View>
            <View className='cell'>
              <View className='label'>应支付金额：</View>
              <View className='val price'>¥{tradePrice}</View>
            </View>
          </View>

          <View className="pass-btn"
            onClick={(e) => {
              e.stopPropagation();
              action.commonChange('main.serviceShow', false);
            }}>
            <View className='btn'>
              我知道了
            </View>
          </View>
        </View>
      </View>
    );
  }
}

