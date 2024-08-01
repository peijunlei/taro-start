import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './tool-img.less';
import actions from '../../actions/index';

import {store2Props} from '../../selectors';
const arrow1 = require('@/assets/image/distribution/arrow.png');

export default class ToolImgItem extends Component<any, any> {
  /**
    
*/
  render() {
    const {src, title, contant} = this.props;

    return (
      <View className="toolBox">
        <View className="toolTitle">{title}</View>
        <View className="toolBottom">
          <View className="toolContant">
            <View className="toolText">{contant}</View>
            <View className="toolArrow">
              <Image src={arrow1} className="toolArrowImg" />
            </View>
          </View>
          <View className="toolImgBox">
            <Image src={src} className="toolImage" />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
