import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import OrderGiftItem from './components/order-gift-item';

import OrderSkuItem from './components/order-sku-item';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderSkuList extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {

    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentDidMount() {
    const {tid, type} = getCurrentInstance().router.params;
    this.props.actions.init(tid, type);
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
      <View className="packageCOrderOrderSkuList">
        {/*正常订单商品清单，积分订单商品清单*/}
        <OrderSkuItem rebate={main.promotionOrder} />
        <OrderGiftItem />
        <View className="status">没有更多了</View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
