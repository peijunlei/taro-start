import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Header from './components/header';

import Tab from './components/tab';

import FriendList from './components/friend-list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBDistributionMyCustomer extends Component<Partial<T.IProps>, any> {
  static options = {
    addGlobalClass: true,
  };
  componentDidShow() {
    let tab = getCurrentInstance().router.params.tab;
    this.props.actions.init(tab);
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
    this.props.actions.clean();
  }
  config = {
    navigationBarTitleText: '我的用户',
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="packageBDistributionMyCustomer">
        <View className="fixed-box">
          <Header />
          <Tab />
        </View>
        <FriendList />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
