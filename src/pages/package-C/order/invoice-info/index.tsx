import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class InvoiceInfo extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let tid = getCurrentInstance().router.params.tid ? getCurrentInstance().router.params.tid : '';
    let type = getCurrentInstance().router.params.type ? getCurrentInstance().router.params.type : '';
    this.props.actions.init(tid, type);
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View>
        <Info />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
