import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './result.less';
import * as T from '../types';
import actions from '../actions/index';
import {store2Props} from '../selectors';
import successIcon from '@/assets/image/login/success.png';

type IAccountInfoProps = T.IProps & T.IAccountInfoProps;

@connect<Partial<IAccountInfoProps>, T.IAccountInfoState>(store2Props, actions)
export default class Result extends Component<Partial<IAccountInfoProps>, T.IAccountInfoState> {
  constructor(props: IAccountInfoProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="loginSuccess">
        <Image className="success" src={successIcon} />
        <Text className="text1">您的账户信息已经提交审核</Text>
        <Text className="text2">请耐心等待。{main?.minutes}s后自动跳转到登录页面……</Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
