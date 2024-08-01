import { View, Button, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './form-info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import phoneIcon from '@/assets/image/login/phone.png';
import codeIcon from '@/assets/image/login/code.png';
import passIcon from '@/assets/image/login/pass.png';
import closeEyesIcon from '@/assets/image/login/close-eyes.png';
import openEyesIcon from '@/assets/image/login/open-eyes.png';

import SendCode from '@/pages/common/send-code';
import Checkbox from '@/wmkit/common/checkbox';

type IFormInfoProps = T.IProps & T.IFormInfoProps;

@connect<Partial<IFormInfoProps>, T.IFormInfoState>(store2Props, actions)
export default class FormInfo extends Component<Partial<IFormInfoProps>, T.IFormInfoState> {
  constructor(props: IFormInfoProps) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  render() {
    let {
      actions: { action },
      main,
    } = this.props;

    let { flag } = this.state;
    return (
      <View className="formInfo">
        {main?.inviteeId && <Text className="invite-per">邀请人：{main?.customerName}</Text>}
        <View className="regis-info">
          {/* 手机号 */}
          <View className="form-input">
            <Image className="l-icon" src={phoneIcon} />
            <Input
              className="int"
              value={main?.userInfo?.phone}
              placeholder="请输入您的手机号"
              onInput={(e) => {
                action.commonChange('main.userInfo.phone', e.detail.value);
              }}
              maxlength={11}
              type="number"
            />
          </View>

          {/* 验证码 */}
          <View className="form-input">
            <Image className="l-icon" src={codeIcon} />
            <Input
              className="int"
              value={main?.userInfo?.verifiCode}
              placeholder="请输入验证码"
              onInput={(e) => {
                action.commonChange('main.userInfo.verifiCode', e.detail.value);
              }}
              maxlength={6}
              type="number"
            />
            <SendCode
              onClick={async (e) => {
                return await action.sendCode();
              }}
            />
          </View>

          {/* 密码 */}
          <View className="form-input">
            <Image className="l-icon" src={passIcon} />
            <Input
              className="int"
              value={main?.userInfo?.password}
              placeholder="请输入6～16位字母或数字密码"
              onInput={(e) => {
                action.commonChange('main.userInfo.password', e.detail.value);
              }}
              maxlength={16}
              password={!flag}
            />
            <View
              className="r-btn"
              onClick={() => {
                this.setState({
                  flag: !flag,
                });
              }}
            >
              <Image className="icon" src={flag ? openEyesIcon : closeEyesIcon} />
            </View>
          </View>

          {/*邀请码*/}
          {!main?.inviteeId && main?.openFlag == 1 && (
            <View className="form-input">
              <Image className="l-icon" src={codeIcon} />
              <Input
                className="int"
                value={main.registerCode}
                placeholder={main?.registerLimitType == 0 ? '如有邀请码，请填写' : '请输入邀请码'}
                onInput={(e) => {
                  action.commonChange('main.registerCode', e.detail.value);
                }}
                maxlength={8}
                type="text"
              />
            </View>
          )}

          {/* 注册协议 */}
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
                《企业会员注册协议》
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
          </View>
        </View>
        {/* 注册按钮 */}
        <View className="submit-btn" onClick={() => action.submit()}>
          注册
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
