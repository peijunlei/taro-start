import {QRCode} from 'taro-code';
import React, {Component} from 'react';
import Taro from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import './order-zt-code.less';

export interface IZTCodeProps {
  text: string;
  isVirtualFlag: boolean;
}

export default class ZTCode extends Component<IZTCodeProps> {
  autoFixPX = (wh: number, defaultW = 750) => {
    const sys = Taro.getSystemInfoSync();
    const scale = sys.screenWidth / defaultW;
    return (wh * scale) << 0;
  };

  render() {
    if (!this.props.text) return null;
    return (
      <View className="zt-cover">
        <Text className="code-title">{this.props.isVirtualFlag ? '核销码' : '提货码'}</Text>
        <QRCode text={this.props.text} size={this.autoFixPX(360)} />
        <Text className="code-text">{this.props.text}</Text>
        <Text className="code-tip">
          {this.props.isVirtualFlag ? '请勿随意与他人分享您的核销码' : '请勿随意与他人分享您的提货码'}
        </Text>
      </View>
    );
  }
}
