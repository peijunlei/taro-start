import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import success from '@/assets/image/common/success.png';
import {msg, _} from 'wmkit';
import WMButton from '@/pages/common/button';
import {cache} from 'config';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderFillPaymentSuccess extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let tid = getCurrentInstance().router.params.tid;
    this.props.actions.initSuccess(tid);
  }

  componentWillUnmount() {
    console.log('leave');
    msg.emit('payment-leave');
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    let tid = getCurrentInstance().router.params.tid;

    if (!main) return <View />;
    const {payOrder} = main;

    return (
      <View className="packageCOrderFillPaymentSuccess">
        <View className="returnS-info">
          <Image className="success" src={success} />
          <Text className="stext bold">付款单提交成功</Text>
          <Text className="stips">请等待商家确认</Text>
        </View>
        <View className="slist">
          <View className="sitem sitem-text">
            订单金额：<Text className="price bold"> ¥{_.addZero(payOrder.payOrderPrice)}</Text>
          </View>
          <View className="sitem-text">订单编号：{payOrder.orderCode}</View>
          <View className="sitem-text">付款流水号：{payOrder.receivableNo}</View>
        </View>
        <View className="bt-box">
          <View className="bt-contain" style={{height: '72px', position: 'relative', bottom: '-20px'}}>
            <View
              className="bt-item"
              onClick={() => {
                Taro.navigateTo({url: `/pages/package-C/order/order-detail/index?id=${tid}`});
              }}
            >
              查看订单
            </View>
            <View
              className="bt-item"
              onClick={() => {
                const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
                if (singerCardLogin) {
                  Taro.redirectTo({
                    url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${LOGIN_DATA.userGiftCardId}&preview=false`,
                  });
                } else {
                  Taro.switchTab({url: '/pages/index/index'});
                }
              }}
            >
              返回首页
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
