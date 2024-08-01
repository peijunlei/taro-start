import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';

import React, {Component} from 'react';
import './index.less';

import success from './img/img.png';

import dayjs from 'dayjs';
import {debounce} from 'lodash';

export default class PrizeSuccess extends Component<any, any> {
  async componentDidShow() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await this.init();
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

  componentWillUnmount() {}

  state = {
    prizeInfo: {
      activityId: '',
      prizeId: '',
      prizeName: '',
      redeemPrizeTime: '',
    },
  } as any;

  render() {
    const {prizeInfo} = this.state;
    return (
      <View className="_page prize-success">
        <View className="returnS-info">
          <Image mode="aspectFit" className="success" src={success} />
          <Text className="stext">领取成功</Text>
          {prizeInfo.prizeType === 2 && (
            <View className="returnS-info">
              <Text className="stips">预计送货时间1～3个工作日</Text>
              <Text className="stips">您可在我的奖品查看配送进度</Text>
            </View>
          )}
        </View>
        <View className="slist-item">
          <View className="slist">
            <Image mode="aspectFit" className="prize-img" src={prizeInfo.prizeUrl}></Image>
            <View className="price-info">
              <View className="sitem-text">
                <View className="price-name">领取奖品：</View>
                <View className="price-value">{prizeInfo && prizeInfo.prizeName ? prizeInfo.prizeName : '-'}</View>
              </View>
              <View className="sitem sitem-text has-top">
                <View className="price-name">领取时间：</View>
                <View className="price-value">
                  {prizeInfo && prizeInfo.redeemPrizeTime
                    ? dayjs(prizeInfo.redeemPrizeTime).format('YYYY-MM-DD HH:mm:ss')
                    : '-'}
                </View>
              </View>
            </View>
          </View>
          <View
            className="slist-btn"
            onClick={debounce(async () => {
              await Taro.navigateTo({
                //跳转到抽奖页面
                url: `/pages/package-C/lottery/prize-detail/index?id=${prizeInfo.id}`,
              });
            }, 1000)}
          >
            查看领取详情
          </View>
        </View>

        <View className="bt-box">
          <View
            className="bt-item"
            onClick={debounce(async () => {
              await Taro.navigateTo({
                //跳转到抽奖页面
                url: `/pages/package-C/lottery/prize-draw/index?id=${prizeInfo.activityId}`,
              });
            }, 1000)}
          >
            继续抽奖
          </View>
          <View
            className="bt-item"
            onClick={debounce(async () => {
              await Taro.switchTab({url: '/pages/index/index'});
            }, 1000)}
          >
            返回首页
          </View>
        </View>
      </View>
    );
  }

  init = async () => {
    const result = await Taro.getStorageSync('mini::prize-draw-success');
    this.setState({prizeInfo: result});
  };
}

//create by moon https://github.com/creasy2010/moon
