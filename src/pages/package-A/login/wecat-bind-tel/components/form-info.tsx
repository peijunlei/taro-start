import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './form-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import phoneIcon from '@/assets/image/login/phone.png';
import codeIcon from '@/assets/image/login/code.png';

import SendCode from '@/pages/common/send-code';
type IFormInfoProps = T.IProps & T.IFormInfoProps;

@connect<Partial<IFormInfoProps>, T.IFormInfoState>(store2Props, actions)
export default class FormInfo extends Component<Partial<IFormInfoProps>, T.IFormInfoState> {
  constructor(props: IFormInfoProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="formInfo">
        <Text className="title">为了您的账号安全，请绑定手机号码</Text>

        <View className="login-info">
          {/* 手机号 */}
          <View className="form-input">
            <Image className="l-icon" src={phoneIcon} />
            <Input
              className="int"
              value={main?.phone}
              placeholder="请输入您的手机号"
              onInput={(e) => {
                action.commonChange('main.phone', e.detail.value);
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
              value={main?.verifiCode}
              placeholder="请输入验证码"
              onInput={(e) => {
                action.commonChange('main.verifiCode', e.detail.value);
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
          {main?.openFlag && main?.isRegister ? (
            <View className="form-input">
              <Image className="l-icon" src={codeIcon} />
              <Input
                className="int"
                value={main?.inviteCode}
                placeholder={main?.registerLimitType == 0 ? '如有邀请码，请填写' : '请输入邀请码'}
                onInput={(e) => {
                  action.commonChange('main.inviteCode', e.detail.value);
                }}
                maxlength={8}
                type="text"
              />
            </View>
          ) : null}
        </View>

        {/* 登录按钮 */}
        <View className="submit-btn" onClick={() => action.submit()}>
          提交
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
