import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {WebView} from '@tarojs/components';
import config from '@/service/config';
import {pvUvStatics, WMkit} from 'wmkit';
import {cache} from 'config';

/**
 * 文章页 || 列表页
 */
export default class PageLink extends Component<any, any> {
  constructor(props) {
    super(props);
    // 【验收测试-H5分类页】iphone x  系统：13.3     点开一个进入购买页面，再返回，到列表，会下滑不了，底部tab上移。
    this.state = {
      flag: true,
      params: {},
    };
  }

  async componentDidMount() {
    this.setState(
      {
        flag: false,
      },
      () => {
        this.setState({
          flag: true,
        });
      },
    );
  }

  componentDidShow() {
    const params = getCurrentInstance().router.params || {};
    this.setState({
      params,
    });
  }

  componentWillMount() {
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
    const {pageType, pageCode, storeId,isGiftCard} = this.state.params;
    const areaId = Taro.getStorageSync(cache.CACHE_POSITION_CITY)?.addrId;
    if(WMkit.isMall()) {
      (storeId as any) = Taro.getStorageSync(cache.STORE_ID);
    }
    let source = `${WMkit.prefixUrl(config.magicHost)}/mini/${pageType}/${pageCode}`;
    if (storeId) {
      source = `${source}/${storeId}`;
    }
    let token = Taro.getStorageSync('authInfo:token');
    if (token) {
      source = `${source}?token=${token}&areaId=${areaId}`;
    }else{
      source = `${source}?areaId=${areaId}`;
    }
    if(isGiftCard){
      source = `${source}&isGiftCard=${isGiftCard}`;
    }
    return this.state.flag ? <WebView src={source}></WebView> : null;
  }
}
