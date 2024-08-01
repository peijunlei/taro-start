import {Image, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import notData from '@/assets/image/goods/goods-detail/desc-img.png';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsFailure extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
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

  render() {
    return (
      <View className="goods-f-info">
        <Image src={notData} className="img" />
        <View className="status">积分商城已关闭,请返回主页!</View>
        <View
          className="go-home"
          onClick={() =>
            Taro.switchTab({
              url: '/pages/index/index',
            })
          }
        >
          去首页
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
