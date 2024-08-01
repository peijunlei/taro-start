import {Button, Input, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import FormInfo from './components/form-info';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginWecatLogin extends Component<Partial<T.IProps>, any> {
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
    await this.props.actions.init();
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
      <View className="loginWecatLogin">
        <FormInfo />
        {main?.visible && (
          <View
            className="register-form-mask"
            onClick={(e) => {
              e.stopPropagation();
              action.commonChange('main.visible', false);
              action.commonChange('main.inviteCode', '');
            }}
          >
            <View className="register-form">
              <View className="register-content">
                <Text className="content">请输入邀请码</Text>
                <Input
                  onInput={(e) => action.commonChange('main.inviteCode', e.detail.value)}
                  className="input"
                  placeholder="请输入您的邀请码"
                />
              </View>
              <Button className="register-button">提交</Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
