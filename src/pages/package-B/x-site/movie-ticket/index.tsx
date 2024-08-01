import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { WebView } from '@tarojs/components';
import config from '@/service/config';
import { pvUvStatics, WMkit } from 'wmkit';
import { cache } from 'config';
import api from 'api';
import WMLoading from '@/pages/common/loading';

/**
 * 文章页 || 列表页
 */
export default class PageLink extends Component<any, any> {
  constructor(props) {
    super(props);
    // 【验收测试-H5分类页】iphone x  系统：13.3     点开一个进入购买页面，再返回，到列表，会下滑不了，底部tab上移。
    this.state = {
      url: '',
      show:false
    };
  }

  async componentDidMount() {
  }

  async componentDidShow() {
    await this.getMovieTicketLoginUrl();
  }

  async componentWillMount() {
    Taro.getEnv() === 'WEAPP' &&
      Taro.showShareMenu({
        withShareTicket: true,
      });

  }
  componentDidHide() { 
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
  getMovieTicketLoginUrl = async () => {
    // this.setState({
    //   url: 'http://localhost:3000/'
    // })
    //获取免登url
    try {
      const { url } = await api.customerBaseController.getMovieTicketLoginUrl();
      this.setState({
        url: url,
        show:true
      })
    } catch (error) {
      this.setState({
        url: ''
      })
    }
  }
  handleLoad = (e) => {
    const nowUrl = e.detail.src;
    console.log('nowUrl',nowUrl);
    
    if (nowUrl.indexOf('/pages/package-C/order/order-movie-confirm/index') > -1) {
      this.setState({show:false})
      const url = nowUrl.split('mobile')[1]
      Taro.navigateTo({
        url
      })
      return;
    }
    // if(nowUrl.indexOf('/login/login/index') > -1){
    //   const url = nowUrl.split('mobile')[1]
    //   Taro.navigateBack()
    //   return
    // }
  }
  render() {
    const { url,show } = this.state;
    if(!show)return null
    return <WebView id="myWebView" onLoad={(e) => {
      this.handleLoad(e)
    }} src={url}></WebView>;
  }
}

