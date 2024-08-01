import {Image, Input, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMFormInput from '@/pages/common/form-input';
import openEyesIcon from '@/assets/image/login/open-eyes.png';
import closeEyesIcon from '@/assets/image/login/close-eyes.png';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  render() {
    let {
      main,
      actions: {action},
    } = this.props;
    let {flag} = this.state;
    return (
      <View>
        <View className="user-pw-info">
          <View className="send">
            <WMFormInput
              type="text"
              label="新密码"
              placeholder="输入新的登录密码"
              value={main?.password}
              password={!flag}
              onChange={(e) => action.setPassword(e)}
              underline={false}
              maxlength={16}
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
