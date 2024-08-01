import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import successIcon from '@/assets/image/login/success.png';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginSuccess extends Component<Partial<T.IProps>, any> {
  // config = {
  //   navigationBarTitleText: '提交成功',
  // };
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
    this.props.actions.init();
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
      <View className="loginSuccess">
        <Image className="success" src={successIcon} />
        <Text className="text1">账户信息提交成功！</Text>
        <Text className="text2">您的账户信息已经提交审核请您耐心等待。{main?.minutes}s后自动跳转到登录页面……</Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
