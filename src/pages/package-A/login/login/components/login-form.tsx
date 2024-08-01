import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './login-form.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import phoneIcon from '@/assets/image/login/phone.png';
import codeIcon from '@/assets/image/login/code.png';
import logoIcon from '@/assets/image/login/logo.png';
import passIcon from '@/assets/image/login/pass.png';
import closeEyesIcon from '@/assets/image/login/close-eyes.png';
import openEyesIcon from '@/assets/image/login/open-eyes.png';
import Raven from 'raven-js';
import SendCode from '@/pages/common/send-code';
import Checkbox from '@/wmkit/common/checkbox/index';

type ILoginFormProps = T.IProps & T.ILoginFormProps;

@connect<Partial<ILoginFormProps>, Partial<T.ActionType>>(store2Props, actions)
export default class LoginForm extends Component<Partial<ILoginFormProps>, T.ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);
    this.state = {
      // flag: true,
      //true: 账号密码登录 false：验证码登录
    };
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    // let {flag} = this.state;

    return (
      <View className="loginLogin-loginForm">
        {/* 关闭按钮 */}
        {/* <View className="close">
          <Image className="close-icon" src={closeIcon} />
        </View> */}
        {/* logo */}
        <View className="logo-box">
          {/* 兼容小程序多加一层view */}
          <View className="logo-panel">
            <Image className="logo" mode="aspectFit" src={main?.pcLogo?.length > 0 && main?.pcLogo[0].url} />
          </View>
        </View>

        <View className="login-info">
          {/* 手机号 */}
          <View className="form-input">
            <Image className="l-icon" src={phoneIcon} />
            <Input
              className="int"
              value={main.phone}
              placeholder="请输入您的手机号"
              onBlur={(e) => {
                action.commonChange('main.phone', e.detail.value);
              }}
              maxlength={11}
              type="number"
            />
          </View>
          {main?.switchLogin ? (
            // 密码
            <View className="form-input">
              <Image className="l-icon" src={passIcon} />
              <Input
                className="int"
                value={main.password}
                placeholder="请输入密码"
                onInput={(e) => {
                  action.commonChange('main.password', e.detail.value);
                }}
                maxlength={16}
                type="text"
                password={main?.flag}
              />
              <View
                className="r-btn"
                onClick={() => {
                  action.commonChange('main.flag', !main?.flag);
                }}
              >
                <Image className="icon" src={main?.flag ? closeEyesIcon : openEyesIcon} />
              </View>
              <View
                className="forget-password"
                onClick={() =>
                  Taro.navigateTo({
                    url: '/pages/package-A/customer/user-pw/index',
                  })
                }
              >
                忘记密码
              </View>
            </View>
          ) : (
            // 验证码
            <View className="form-input">
              <Image className="l-icon" src={codeIcon} />
              <Input
                className="int"
                value={main.verifiCode}
                placeholder="请输入验证码"
                onInput={(e) => {
                  action.commonChange('main.verifiCode', e.detail.value);
                }}
                  password={false}
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
          {!main.mode && 
           <View className="regis-word">
            <Checkbox
              isCheckbox
              checked={main?.isAgree || false}
              onClick={(checked) => {
                action.commonChange('main.isAgree', checked);
              }}
            />
            <View className="regis-word-text">
              我已阅读并同意
              <View
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/package-A/login/vip-agreement/index?type=0',
                  });
                }}
                className="change-color"
              >
                《用户协议》
              </View>
              和
              <View
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/package-A/login/vip-agreement/index?type=2',
                  });
                }}
                className="change-color"
              >
                《隐私政策》
              </View>
            </View>
            </View>}
        </View>

        {/* 登录按钮 */}
        <View className="submit-btn" onClick={() => action.login(main?.switchLogin)}>
          登录
        </View>
        {/* 切换登录方式 注册样式 */}
        {!main.mode && 
        <View className="switch-login">
          <View className="l-login" onClick={() => this._changeLogin(!main?.switchLogin)}>
            {main?.switchLogin ? '短信验证码登录' : '账号密码登录'}
          </View>
          <View
            className="r-register"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/package-A/login/register/index',
              });
            }}
          >
            新用户注册
          </View>
          </View>}
      </View>
    );
  }
  //切换登录方式
  _changeLogin = async (type) => {
    let {
      actions: {action},
      main,
    } = this.props;
    if (type) {
      console.log('账号密码登录');
      await action.commonChange('main.password', '');
    } else {
      console.log('短信验证码登录');
      await action.commonChange('main.verifiCode', '');
    }
    await action.commonChange('main.switchLogin', type);
  };
}

//create by moon https://github.com/creasy2010/moon
