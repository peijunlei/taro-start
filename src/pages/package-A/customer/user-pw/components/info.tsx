import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import SendCode from '@/pages/common/send-code';
type IInfoProps = T.IProps & T.IInfoProps;
import {WMkit} from 'wmkit';
import WMLoading from '@/pages/common/loading';
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  componentDidMount() {
    let {
      main,
      actions: {action},
    } = this.props;
    action.commonChange('main.mobile', '');
    action.commonChange('main.code', '');
  }
  _isLogin() {
    return Boolean(Taro.getStorageSync('authInfo:token'));
  }
  render() {
    let {
      main,
      // main: {mobile, code, buttonValue},
      actions: {action},
    } = this.props;
    return (
      <View>
        {/*如果已登录，则是修改密码，否则是忘记密码*/}
        <View className="user-p-info">
          {main?.isLoadingFlag && <WMLoading />}
          {/* <WMFormInput
            label="手机号"
            type="number"
            placeholder="请输入您的手机号"
            value={mobile}
            disabled={this._isLogin()}
            onChange={(e) => action.getMobile(e)}
            underline={false}
            maxlength={11}
          /> */}
          <View className="form-input">
            <Text className="label">手机号</Text>
            <Input
              className="int"
              value={main?.mobile}
              disabled={WMkit.isLogin()}
              placeholder="请输入您的手机号"
              onInput={(e) => {
                action.commonChange('main.mobile', e.detail.value);
              }}
              maxlength={11}
              type="number"
            />
          </View>
          <View className="form-input">
            <Text className="label">验证码</Text>
            <Input
              className="int"
              value={main?.code}
              placeholder="请输入验证码"
              onInput={(e) => {
                action.commonChange('main.code', e.detail.value);
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
          {/* <View className="send">
            <WMFormInput
              label="验证码"
              type="number"
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => action.getCode(e)}
              underline={false}
              maxlength={6}
            />
            <SendCode
              onClick={async () => {
                return await action.sendCode();
              }}
            />
          </View> */}
        </View>

        <View className="register-tips">
          <View className="tishi">提示：</View>
          <View className="massage">
            1.为了保障您的账户信息安全，在您变更账户重要信息时，需要对您的身份进行验证。感谢您的理解和支持！
          </View>
          <View className="massage">2.如出现收不到短信的情况，可能是由于通信网络异常造成，请您稍后重新尝试操作！</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
