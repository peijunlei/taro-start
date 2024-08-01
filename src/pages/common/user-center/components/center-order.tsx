import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './center-order.less';

import arrow from '@/assets/image/customer/user-center/arrow.png';
import pay from '@/assets/image/customer/user-center/pay.png';
import send from '@/assets/image/customer/user-center/send.png';
import get from '@/assets/image/customer/user-center/get.png';
import message from '@/assets/image/customer/user-center/message.png';
import refund from '@/assets/image/customer/user-center/refund.png';
import DeliverySlider from '../components/delivery-slider';

type ICenterOrderProps = T.IProps & T.ICenterOrderProps;

@connect<Partial<ICenterOrderProps>, T.ICenterOrderState>(store2Props, actions)
export default class CenterOrder extends Component<Partial<ICenterOrderProps>, T.ICenterOrderState> {
  static options = {addGlobalClass: true};
  constructor(props: ICenterOrderProps) {
    super(props);
  }

  /**

*/
  render() {
    let {main} = this.props;
    const {evaluateIsOpen} = this.props.main || {};
    const isShop = WMkit.isShop();

    return (
      main && (
        <View className={isShop ? 'centerOrders__panels  userc-order' : 'centerOrders__panels'}>
          <View className="title">
            <Text className="title-name">订单</Text>
            <View
              className="title-arrow"
              onClick={() => {
                // 存储tab
                Taro.removeStorageSync('order_list_tab');
                Taro.navigateTo({
                  url: WMkit.isLogin()
                    ? '/pages/package-C/order/order-list/index'
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="click-text">全部订单</Text>
              <Image className="arrow-img" src={arrow} />
            </View>
          </View>
          <View className="panels-list panels-list-top">
            <View
              className="panels-item"
              onClick={() => {
                // 存储tab
                Taro.setStorageSync('order_list_tab', {status: 'payState-NOT_PAID'});
                Taro.navigateTo({
                  url: WMkit.isLogin()
                    ? `/pages/package-C/order/order-list/index?status=${'payState-NOT_PAID'}`
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Image className="item-img" src={pay} />
              <Text className="item-text">待付款</Text>
              {main?.orderCount?.[0] > 0 && (
                <View className="item-badge">
                  <View className="item-badge-value">{main?.orderCount?.[0] > 99 ? '99+' : main.orderCount[0]}</View>
                </View>
              )}
            </View>
            <View
              className="panels-item"
              onClick={() => {
                // 存储tab
                Taro.setStorageSync('order_list_tab', {status: 'flowState-AUDIT'});
                Taro.navigateTo({
                  url: WMkit.isLogin()
                    ? `/pages/package-C/order/order-list/index?status=${'flowState-AUDIT'}`
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Image className="item-img" src={send} />
              <Text className="item-text">待发货</Text>
              {main?.orderCount?.[1] > 0 && (
                <View className="item-badge">
                  <View className="item-badge-value">{main?.orderCount?.[1] > 99 ? '99+' : main.orderCount[1]}</View>
                </View>
              )}
            </View>
            <View
              className="panels-item"
              onClick={() => {
                // 存储tab
                Taro.setStorageSync('order_list_tab', {status: 'flowState-DELIVERED'});
                Taro.navigateTo({
                  url: WMkit.isLogin()
                    ? `/pages/package-C/order/order-list/index?status=${'flowState-DELIVERED'}`
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Image className="item-img" src={get} />
              <Text className="item-text">待收货</Text>
              {main?.orderCount?.[2] > 0 && (
                <View className="item-badge">
                  <View className="item-badge-value">{main?.orderCount?.[2] > 99 ? '99+' : main.orderCount[2]}</View>
                </View>
              )}
            </View>
            {evaluateIsOpen ? (
              <View
                className="panels-item"
                onClick={() => {
                  Taro.navigateTo({
                    url: WMkit.isLogin()
                      ? '/pages/package-A/customer/evaluate-center/index'
                      : '/pages/package-A/login/login/index',
                  });
                }}
              >
                <Image className="item-img" src={message} />
                <Text className="item-text">待评价</Text>
                {main?.orderCount?.[3] > 0 && (
                  <View className="item-badge">
                    <View className="item-badge-value">{main?.orderCount?.[3] > 99 ? '99+' : main.orderCount[3]}</View>
                  </View>
                )}
              </View>
            ) : null}
            <View
              className="panels-item"
              onClick={() =>
                Taro.navigateTo({
                  url: WMkit.isLogin()
                    ? '/pages/package-C/order/refund-list/index'
                    : '/pages/package-A/login/login/index',
                })
              }
            >
              <Image className="item-img" src={refund} />
              <Text className="item-text">退货/退款</Text>
              {main?.orderCount?.[4] > 0 && (
                <View className="item-badge">
                  <View className="item-badge-value">{main?.orderCount?.[4] > 99 ? '99+' : main.orderCount[4]}</View>
                </View>
              )}
            </View>
          </View>
          <DeliverySlider />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
