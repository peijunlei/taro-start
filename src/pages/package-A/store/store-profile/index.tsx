import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import Tab from './components/tab';

import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions/index';
import {store2Props} from './selectors';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class Index extends Component<Partial<T.IProps>, any> {
  constructor(props, context) {
    super(props);
  }

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
  componentDidMount() {
    this.props.actions.init(getCurrentInstance().router.params);
  }

  render() {
    const tabIndex = getCurrentInstance().router.params.tabIndex;
    return (
      <View className="store-profile">
        <Tab tabIndex={tabIndex} />
      </View>
    );
  }
}
