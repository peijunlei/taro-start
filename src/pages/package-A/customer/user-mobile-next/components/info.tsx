import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMFormInput from '@/pages/common/form-input';
import SendCode from '@/pages/common/send-code';
type IInfoProps = T.IProps & T.IInfoProps;
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  render() {
    let {
      // main: {mobile, code, buttonValue},
      main,
      actions: {action},
    } = this.props;

    return (
      <View>
        <View className="user-mobile-info">
          <WMFormInput
            label="手机号"
            type="number"
            placeholder="请输入新的手机号"
            value={main?.mobile}
            onChange={(e) => action.getMobile(e)}
            underline={false}
            maxlength={11}
          />
          <View className="send">
            <WMFormInput
              label="验证码"
              type="number"
              placeholder="请输入验证码"
              value={main?.code}
              onChange={(e) => action.getCode(e)}
              underline={false}
              maxlength={6}
            />
            <SendCode
              onClick={async () => {
                return await action.sendCode();
              }}
            />
          </View>
        </View>

        <View className="register-tips">
          <View className="tishi">提示：</View>
          <View className="massage">1.修改绑定手机将会同时修改您的登录手机，请您谨慎操作！</View>
          <View className="massage">2.如出现收不到短信的情况，可能是由于通信网络异常造成，请您稍后重新尝试操作！</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
