import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
// import loading from '@/assets/image/common/loading.gif';
import loading from '@/assets/image/common/loading.gif';
import _ from 'lodash';
import './index.less';
import { cache } from 'config';

export default class WMLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className="wm-loading-box">
        <Image src={'https://wanmi-test.oss-cn-hangzhou.aliyuncs.com/mini/assets/image/common/loading.gif'} className="wm-loading-img" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
