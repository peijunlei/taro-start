import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { WebView } from '@tarojs/components';
import config from '@/service/config';
import { pvUvStatics, WMkit } from 'wmkit';
import { cache } from 'config';
import api from 'api';

/**
 * 文章页 || 列表页
 */
export default class PageLink extends Component<any, any> {
  constructor(props) {
    super(props);
    // 【验收测试-H5分类页】iphone x  系统：13.3     点开一个进入购买页面，再返回，到列表，会下滑不了，底部tab上移。
    this.state = {
      url: '',
    };
  }

  async componentDidMount() {
  }

  async componentDidShow() {

  }

  async componentWillMount() {
    Taro.getEnv() === 'WEAPP' &&
      Taro.showShareMenu({
        withShareTicket: true,
      });

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
  render() {
    const url = Taro.getStorageSync('movieOrderDetail');
    return <WebView id="myWebView" src={url}></WebView>;
  }
}

