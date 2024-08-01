import {View, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {_} from 'wmkit';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import ruleEmpty from '@/assets/image/prize-draw/rule-empty.png';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MyPrize extends Component<Partial<T.IProps>, any> {
  componentDidShow() {
    this.props.actions.init();
  }
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  componentWillUnmount() {
    this.props.actions.clean();
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
    const {main = {} as any} = this.props;
    const {isReady, activityContent} = main;
    return main && isReady ? (
      <View className="packageAPrizeRuleMain">
        <View className="prize-rule-desc" style={{padding: '10px'}}>
          <RichText nodes={_.formatRichText(activityContent)} />
        </View>
        {_.formatRichText(activityContent) == '' && (
          <View className="prize-rule-not-data">
            <Image mode="aspectFit" src={ruleEmpty} className="prize-rule-img" />
            <Text className="prize-rule-not-text">暂无规则介绍</Text>
          </View>
        )}
      </View>
    ) : null;
  }
}
