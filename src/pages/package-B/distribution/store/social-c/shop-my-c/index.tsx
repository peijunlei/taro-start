import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import Footer from './footer';
import UserCenter from '@/pages/common/user-center';
import './index.less';
import api from 'api';
import {msg} from 'wmkit';
// import 'taro-ui/dist/style/components/tab-bar.scss';
// import 'taro-ui/dist/style/components/badge.scss';

export default class ShopIndexC extends Component {
  componentDidMount() {
    this.initShare();
  }

  initShare() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  async componentDidShow() {
    if (Taro.getEnv() === 'WEAPP') {
      Taro.hideHomeButton();
    }
    const isLogin = Boolean(Taro.getStorageSync('authInfo:token'));
    let num = isLogin ? await api.purchaseBaseController.countGoods() : 0;
    msg.emit('shopCart-C-num', num);
    msg.emit('my-C');
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    if (wechatShareInfo.imgUrl.length > 0) {
      return {
        title: wechatShareInfo.title,
        imageUrl: wechatShareInfo.imgUrl[0].url,
      };
    }
  }
  onShareTimeline() {
    // 默认分享内容
  }

  render() {
    return (
      <View className="index">
        <ScrollView className="userCenterBox">
          <UserCenter isFromC />
        </ScrollView>
        <Footer current={2} />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
