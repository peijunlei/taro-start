import { View, Button, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './form-info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { WMkit } from 'wmkit';

import phoneIcon from '@/assets/image/login/phone.png';
import codeIcon from '@/assets/image/login/code.png';
import passIcon from '@/assets/image/login/pass.png';
import closeEyesIcon from '@/assets/image/login/close-eyes.png';
import inputYZ from '@/assets/image/login/inputYZma.png';
import openEyesIcon from '@/assets/image/login/open-eyes.png';
import rArrowIcon from '@/assets/image/login/r-arrow.png';

import SendCode from '@/pages/common/send-code';
import Checkbox from '@/wmkit/common/checkbox';

type IFormInfoProps = T.IProps & T.IFormInfoProps;

// @ts-ignore
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
      <View className="loginRegister-formInfo">
        {main?.inviteeId && <Text className="invite-per">邀请人：{main?.customerName}</Text>}
        <View className="regis-info">
          {/* 手机号 */}
          <View className="form-input">
            <Image className="l-icon" src={phoneIcon} />
            <Input
              className="int"
              // value={main.userInfo.phone}
              placeholder="请输入您的手机号"
              placeholderClass="placeholderColor"
              onInput={(e) => {
                action.commonChange('main.userInfo.phone', e.detail.value);
              }}
              maxlength={11}
              type="number"
            />
          </View>

          {/* 验证码 */}
          <View className="form-input">
            <Image className="l-icon" src={inputYZ} />
            <Input
              className="int"
              // value={main.userInfo.verifiCode}
              placeholder="请输入验证码"
              placeholderClass="placeholderColor"
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
              // value={main.userInfo.password}
              placeholder="请输入6～16位字母或数字或特殊字符"
              placeholderClass="placeholderColor"
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
          {/*邀请码 openFlag: 1:是 0：否  registerLimitType 0:不限，1：仅限邀请*/}
          {!main?.inviteeId && main?.openFlag == 1 && (
            <View className="form-input">
              <Image className="l-icon" src={codeIcon} />
              <Input
                className="int"
                // value={main.registerCode}
                placeholder={main?.registerLimitType == 0 ? '如有邀请码，请填写' : '请输入邀请码'}
                placeholderClass="placeholderColor"
                onInput={(e) => {
                  action.commonChange('main.registerCode', e.detail.value);
                }}
                maxlength={8}
                type="text"
              />
            </View>
          )}

          {/* {!inviteeId && openFlag == 1 && registerLimitType == 0 && (
            <Text className="regis-word">若无邀请码，可直接提交</Text>
          )} */}

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
                《会员注册协议》
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
        <View className="register-state">
          {/*{!WMkit.isMall() && main?.iepFlag && (*/}
          {/* <View*/}
          {/*   className="iep-register"*/}
          {/*   onClick={() => {*/}
          {/*     Taro.navigateTo({*/}
          {/*       url: '/pages/package-A/login/iep-register/index',*/}
          {/*     });*/}
          {/*   }}*/}
          {/* >*/}
          {/*   <Text className="l-text l-text-register register-font">企业用户注册</Text>*/}
          {/* </View>*/}
          {/*)}*/}
          <View
            className="go-login"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/package-A/login/login/index?source=home',
              });
            }}
          >
            <Text className="l-text register-font">已有账号，去登录</Text>
            <Image className="r-icon" src={rArrowIcon} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
