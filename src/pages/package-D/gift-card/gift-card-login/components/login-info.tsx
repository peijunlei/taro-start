import {Text, View, Image, Button, Input} from '@tarojs/components';
import React, {Component} from 'react';
import Taro from '@tarojs/taro';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {BackgroundType, CardStatus, InvalidStatus} from 'api/GiftCardController';
import './login-info.less';
import loginImg from '@/assets/image/gift-card/login-img.png';
import SendCode from '@/pages/common/send-code';

type IGiftCardBottomProps = T.IProps & T.IGiftCardBottomProps;

@connect<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState>(store2Props, actions)
export default class LoginInfo extends Component<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState> {
  render() {
    let {
      actions: {action},
      main: {cardLoginForm},
      main,
    } = this.props;
    console.log('cardLoginForm', cardLoginForm);
    if (!main?.id) return null;
    return (
      <View className="login-card-info">
        {cardLoginForm.pageColor && (
          <View className="login-bg" style={{background: `linear-gradient(90deg,${cardLoginForm.pageColor})`}}>
            <Image src={loginImg} className="loginImg" />
          </View>
        )}
        {cardLoginForm.backgroundImage && <Image src={cardLoginForm.backgroundImage} className="backgroundImage" />}

        <View className="login-card-box">
          <View className="title">{cardLoginForm.title}</View>
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
          </View>
          {cardLoginForm.verifyType.includes(1) && (
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
          )}
          {cardLoginForm.verifyType.includes(2) && (
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
          )}
          {cardLoginForm.verifyType.includes(3) && (
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
          )}
          {cardLoginForm.verifyType.includes(4) && (
            <View className="form-input">
              <Input
                className="int"
                value={main.auxiliaryInformation}
                placeholder="请输入辅助信息"
                onInput={(e) => {
                  action.commonChange('main.auxiliaryInformation', e.detail.value);
                }}
                type="text"
              />
            </View>
          )}
          {/* 登录按钮 */}
          <View className="submit-btn" onClick={() => action.login()}>
            {cardLoginForm.buttonCopywriter}
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
