import {View, Button, Text, Image, RichText} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './info-mask.less';
import actions from '../actions/index';
import {_} from 'wmkit';

import closeImg from '@/assets/image/common/coupon-close.png';

export default class InfoMask extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  /**

   */
  render() {
    let {recruitDesc, close} = this.props;

    return (
      <View className="info-mask">
        <View className="info-mask-con">
          <RichText nodes={_.formatRichText(recruitDesc)} />
        </View>

        <View className="info-mask-close" onClick={() => close()}>
          <Image src={closeImg} className="info-mask-close-img" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
