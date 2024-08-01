import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Info from './components/info';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerMySet extends Component<Partial<T.IProps>, any> {
  static defaultProps = {
    isReady: false,
    customer: {
      customerLabelList: [],
      headImg: '',
      customerName: '',
      customerAccount: '',
    },
  };

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

  componentDidShow() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    if (!this.props.main) return <View />;
    return (
      <View className="packageACustomerMySet">
        <Info />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
