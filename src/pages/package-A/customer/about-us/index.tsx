import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {RichText, View} from '@tarojs/components';
import api from 'api';
import {_} from 'wmkit';
import './index.less';
import WMLoading from '@/pages/common/loading';

/**
 * 关于我们
 */
export default class AboutUs extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      isShowFlag: true,
    };
    this.init();
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

  render() {
    return (
      <View className="customer_about_us">
        {this.state.isShowFlag && <WMLoading />}
        <RichText nodes={_.formatRichText(this.state.html)} />
      </View>
    );
  }

  init = async () => {
    const html = await api.mobileSettingController.getAboutUs();
    this.setState({html, isShowFlag: false});
  };
}
