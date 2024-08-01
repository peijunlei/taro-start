import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {cache} from 'config';
import Payment from './components/payment';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderFillPayment extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let tid = getCurrentInstance().router.params.tid;
    this.props.actions.init(tid);
  }

  componentDidShow() {
    this.props.actions.action.setSelectedAccount();
  }

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
  componentWillUnmount() {
    Taro.removeStorageSync(cache.SELLER_ACCOUNT);
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="packageCOrderFillPayment">
        <Payment />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
