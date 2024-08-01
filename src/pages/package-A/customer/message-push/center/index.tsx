import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '@/pages/common/style/swipe.scss';
import {connect} from 'react-redux';
import {ifLogin} from '@/utils/common-functions';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Top from './components/top';

import List from './components/list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerMessagePushCenter extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    const isLogin = ifLogin();
    if (!isLogin) {
      Taro.redirectTo({
        url: '/pages/package-A/login/login/index',
      });
      return;
    }

    Taro.setNavigationBarTitle({title: '消息中心'});
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
  async componentWillUnmount() {
    await this.props.actions.clean();
  }

  async componentDidShow() {
    await this.props.actions.init();
  }

  render() {
    return (
      <View className="packageACustomerMessagePushCenter">
        <Top />
        <List />
      </View>
    );
  }
}
