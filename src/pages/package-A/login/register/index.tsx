import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import FormInfo from './components/form-info';
import {cache} from 'config';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginRegister extends Component<Partial<T.IProps>, any> {
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
  async componentDidMount() {
    const {inviteeId, shareTest} = getCurrentInstance().router.params;
    if (shareTest && shareTest == 'shareTest') {
      //  H5分享邀新进入
      //存储分销员ID
      await Taro.setStorageSync(cache.INVITEE_ID, inviteeId);
      //分销渠道为店铺内
      await Taro.setStorageSync(cache.CHANNEL_TYPE, '2');
    }

    this.props.actions.init(inviteeId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="loginRegister">
        <FormInfo />
        {/* 注册协议 */}
        {/* <VipAgreement /> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
