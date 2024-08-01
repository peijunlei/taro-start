import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import '@/pages/common/form-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormItem from '@/pages/common/form-item';
import WMFormInput from '@/pages/common/form-input';
import SendCode from '@/pages/common/send-code';
import WMLoading from '@/pages/common/loading';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  render() {
    let {
      // main: {mobile, code, buttonValue},
      main,
      actions: {action},
    } = this.props;

    return (
      <View>
        {/*如果已登录，则是修改密码，否则是忘记密码*/}
        <View className="user-pay-info user-pay-phone">
          {main && main.isLoadingFlag && <WMLoading />}
          {/* <FormItem
            labelName="手机号"
            placeholder={mobile}
            leftStyle={{fontSize: '14px'}}
            textStyle={{fontSize: '14px', color: '#333', fontWeight: 'bold'}}
          /> */}
          <View className="form-item flex-start-item">
            <Text className="form-text" style={{color: 'rgba(0, 0, 0, 0.8)'}}>
              手机号
            </Text>
            <View className="form-context2">
              <Text className="select-text2" style={{fontSize: '14px', lineHeight: '14px'}}>
                {main?.mobile}
              </Text>
            </View>
          </View>
          <View className="send">
            <WMFormInput
              label="验证码"
              type="number"
              placeholder="请输入验证码"
              value={main?.code}
              onChange={(e) => action.getCode(e)}
              underline={false}
              maxlength={6}
              textStyle={{fontSize: '14px', color: 'rgba(0, 0, 0, 0.8)', lineHeight: '14px', fontWeight: 'normal'}}
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
