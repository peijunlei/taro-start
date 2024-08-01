import { Text, View, Image, Button, Input } from '@tarojs/components';
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { BackgroundType, CardStatus, InvalidStatus } from 'api/GiftCardController';
import './login-info.less';
import loginImg from '@/assets/image/gift-card/login-img.png';
import SendCode from '@/pages/common/send-code';
import IconFont from '@/wmkit/common/iconfont';

type IGiftCardBottomProps = T.IProps & T.IGiftCardBottomProps;

@connect<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState>(store2Props, actions)
export default class LoginInfo extends Component<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState> {
  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    return (
      <View className="login-card-info">
        <View className="login-bg" style={{ backgroundColor: 'transparent' }} />

        <View className="login-card-box">
          <View className="title">卡券兑换</View>
          <View className="form-input">
            <Input
              className="int"
              value={main.cardNo}
              placeholder="请输入卡号"
              onInput={(e) => {
                action.commonChange('main.cardNo', e.detail.value);
              }}
              type="text"
            />
            <IconFont onClick={() => action.onScan()} value='saomahexiao' size={20} style={{ marginLeft: 10 }} />
          </View>
          <View className="form-input">
            <Input
              className="int"
              value={main.cardPwd}
              placeholder="请输入卡密"
              onInput={(e) => {
                action.commonChange('main.cardPwd', e.detail.value);
              }}
              type="text"
            />
          </View>
          <View className="form-input">
            <Input
              className="int"
              value={main.phoneNum}
              placeholder="请输入您的手机号"
              onBlur={(e) => {
                action.commonChange('main.phoneNum', e.detail.value);
              }}
              maxlength={11}
              type="number"
            />
          </View>
          <View className="form-input">
            <Input
              className="int"
              value={main.code}
              placeholder="请输入验证码"
              onInput={(e) => {
                action.commonChange('main.code', e.detail.value);
              }}
              maxlength={6}
              type="text"
            />
            <SendCode
              onClick={async (e) => {
                return await action.sendCode();
              }}
            />
          </View>
          {/* 登录按钮 */}
          <View className="submit-btn" onClick={() => action.login()}>
            登录
          </View>
          <View className='query-more' onClick={() => action.toCodeLogin()}>
            <Text className='query-more-text'>{`已有卡券或订单？点此查询>>`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
