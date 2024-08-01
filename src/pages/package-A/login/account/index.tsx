import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import AccountInfo from './components/account-info';
import Result from './components/result';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginAccount extends Component<Partial<T.IProps>, any> {
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
    const {customerId} = getCurrentInstance().router.params;
    this.props.actions.init(customerId);
    this.props.actions.action.commonChange('main.accountInfo.customerId', customerId);
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
      <View className="loginAccount">
        {main?.checked === 0 && main?.initialName !== null && main?.initialName !== '' ? null : <AccountInfo />}
        {main?.checked === 0 && main?.initialName !== null && main?.initialName !== '' ? <Result /> : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
