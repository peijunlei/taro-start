import {View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import './banner.less';

@connect(store2Props, actions)
export default class Banner extends Component<any, any> {
  render() {
    let {main = {}} = this.props;
    const {useConfig} = main;

    return (
      <View className="gift-card-banner">
        <Image className="bannerImg" mode="aspectFill" src={useConfig.bannerImage} />
      </View>
    );
  }
}
