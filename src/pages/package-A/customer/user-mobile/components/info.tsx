import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
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
  componentWillMount(): void {
    //判断是否登录
  }
  _isLogin() {
    return Boolean(Taro.getStorageSync('authInfo:token'));
  }
  render() {
    let {
      main,
      actions: {action},
    } = this.props;

    return (
      <View>
        {/*如果已登录，则是修改密码，否则是忘记密码*/}
        <View className="user-m-info">
          {
            main.isLoadingFlag && <WMLoading/>
          }
          <FormItem
            labelName="手机号"
            placeholder={main?.mobile}
            styles={{justifyContent: 'flex-start'}}
            leftStyle={{fontSize: '14px', minWidth: '60px'}}
            textStyle={{fontSize: '14px', color: 'rgba(0,0,0,0.8)'}}
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
