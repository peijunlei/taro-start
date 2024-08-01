import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './zhibo-status.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

const live = require('@/assets/image/live/live.gif');
const view = require('@/assets/image/live/view.png');

type IZhiboStatusProps = T.IProps & T.IZhiboStatusProps;

@connect<Partial<IZhiboStatusProps>, T.IZhiboStatusState>(store2Props, actions)
export default class ZhiboStatus extends Component<Partial<IZhiboStatusProps>, T.IZhiboStatusState> {
  constructor(props: IZhiboStatusProps) {
    super(props);
  }

  /**
  直播状态 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常, 107: 已过期
  后台直播状态 0: 直播中, 3: 未开始, 4: 已结束, 5: 禁播, 1: 暂停中, 2: 异常, 6: 已过期
   预告（未开始）、直播中（直播中、暂停中、异常）、回看生成中（直播结束回看视频未生成）、回看（已结束）
*/
  render() {
    let {
      actions: {action},
      main,
      status,
      startTimeSting,
    } = this.props;

    if (status == 0 || status == 1 || status == 2) {
      return (
        <View className="living">
          <View className="livingImgBox">
            <Image src={live} className="livingImg" />
          </View>
          <View className="text">直播中</View>
        </View>
      );
    }

    if (status == 3) {
      return (
        <View className="foreshow">
          <View className="foreshowBackground">
            <View className="foreshowLeft">预告</View>
            <View className="text">{startTimeSting}</View>
          </View>
        </View>
      );
    }

    return (
      <View className="lookBack">
        <View className="lookBackImgBox">
          <Image src={view} className="lookBackImg" />
        </View>
        <View className="text">回看</View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
