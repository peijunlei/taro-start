import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PasswordInput from '@/pages/common/password-input/password-input';

type IPasswordMaskProps = T.IProps & T.IPasswordMaskProps;

@connect<Partial<IPasswordMaskProps>, T.IPasswordMaskState>(store2Props, actions)
export default class PasswordMask extends Component<Partial<IPasswordMaskProps>, T.IPasswordMaskState> {
  //允许组件使用外部全局样式类
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IPasswordMaskProps) {
    super(props);
  }
  state = {
    password: null,
  };

  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {payErrorTime} = main;
    const inputStyle = {
      alignItems: 'center',
    };
    return (
      <View
        className="pass-bg"
        catchMove onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <View className="pass-show">
          <View className="pass-header">
            <Text className="pass-title">请输入支付密码</Text>
          </View>

          <View className="pass-body">
            <PasswordInput
              style={{alignItems: 'center'}}
              focus={true}
              toPay={(val) => {
                this.setState({password: val});
              }}
              getValue={() => {}}
            />

            <View className="password-tips">
              <Text className="password-error">
                {payErrorTime === 0
                  ? ''
                  : payErrorTime == 3
                  ? '账户已冻结，请30分钟后重试'
                  : `密码错误，还有${3 - payErrorTime}次机会`}
              </Text>
              <Text
                className="forget-pass"
                onClick={async () => {
                  await Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
                }}
              >
                忘记密码
              </Text>
            </View>
          </View>

          <View className="pass-btn">
            <View
              className="pass-cancel"
              onClick={async () => {
                this.setState({password: null});
                action.commonChange('main.visible', false);
              }}
            >
              取消
            </View>
            <View
              className={this.state.password ? 'pass-true' : 'pass-false'}
              onClick={async () => {
                if (this.state.password) {
                  await action.checckPayPwd(this.state.password);
                  this.setState({password: null});
                }
              }}
            >
              提交
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
