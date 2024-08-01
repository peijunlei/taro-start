import {Image, Input, View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormItem from '@/pages/common/form-item';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      main,
      // main: {payFocus, pwdVal},
      actions: {action},
    } = this.props;
    return (
      <View className="userPay__info">
        <View className="info">
          <View className="send">
            <Text className="send-Text">请输入新的支付密码</Text>
          </View>
          <View className="input_main">
            <View className="input_row">
              {[0, 1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <View key={index} className={index == 5 ? 'pwd_item pwd_item_bottom' : 'pwd_item'}>
                    {main?.pwdVal.length > index ? <Text className="pwd_itemtext"></Text> : null}
                  </View>
                );
              })}
            </View>
            <Input
              autoFocus={true}
              focus={main?.payFocus}
              type="number"
              maxlength={6}
              onInput={this.inputPwd}
              className="input_control"
            />
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
  inputPwd = (e) => {
    let {
      actions: {action},
    } = this.props;
    if (e.detail.value.length > 6) {
      action.setFocus(false);
    } else {
      action.setPassword(e.detail.value);
    }
  };
}
