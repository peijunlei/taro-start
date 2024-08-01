import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {Modal} from '@wanmi/ui-taro';

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

  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {payErrorTime, checkPayPwRes} = main.payData || {};
    const isShowCheckPayPwRes = main?.isShowCheckPayPwRes;

    return (
      <Modal
        type="password"
        visible={main.passwordMaskShow}
        errorText={
          !isShowCheckPayPwRes
            ? ''
            :
            checkPayPwRes && ~[0, 3].indexOf(payErrorTime)
            ? ''
            : checkPayPwRes
            ? `密码错误，还有${3 - payErrorTime}次机会`
            : '账户已冻结，请30分钟后重试'
        }
        onCancel={() => {
          action.commonChange('main.passwordMaskShow', false);
        }}
        onOk={(value) => {
          if (value && checkPayPwRes) {
            action._checkPayPwd(value);
          }
        }}
        onForget={() => {
          action.commonChange('main.passwordMaskShow', false);
          Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
        }}
        title="输入支付密码"
      />
    );
  }
}

//create by moon https://github.com/creasy2010/moon
