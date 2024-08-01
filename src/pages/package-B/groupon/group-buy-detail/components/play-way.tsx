import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './play-way.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IPlayWayProps = T.IProps & T.IPlayWayProps;

@connect<Partial<IPlayWayProps>, T.IPlayWayState>(store2Props, actions)
export default class PlayWay extends Component<Partial<IPlayWayProps>, T.IPlayWayState> {
  constructor(props: IPlayWayProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View
        className="playWay"
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/package-B/groupon/groupon-rule/index',
          });
        }}
      >
        <View className="pic">
          <Text className="text-weight">拼团玩法</Text>
        </View>
        <View className="number-container">
          <View className="way-number-box">
            <Text className="number">01</Text>
          </View>
          <View className="way-number-box">
            <Text className="number">02</Text>
          </View>
          <View className="way-number-box">
            <Text className="number">03</Text>
          </View>
        </View>
        <View className="long-line">
          <View className="dot"></View>
          <View className="short-line"></View>
          <View className="dot"></View>
          <View className="short-line"></View>
          <View className="dot"></View>
        </View>
        <View className="number-container">
          <View className="step-box">
            <Text className="step-text">选择商品</Text>
            <Text className="step-text">付款开团/参团</Text>
          </View>
          <View className="step-box">
            <Text className="step-text">邀请并等待</Text>
            <Text className="step-text">好友支付参团</Text>
          </View>
          <View className="step-box">
            <Text className="step-text">达到人数</Text>
            <Text className="step-text">顺利成团</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
