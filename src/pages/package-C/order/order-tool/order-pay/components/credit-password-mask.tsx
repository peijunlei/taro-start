import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {getGlobalData} from '@/service/config';
import {Modal} from '@wanmi/ui-taro';
import {Text, View} from "@tarojs/components";
import PasswordInput from "@/pages/common/password-input/password-input";

type IPasswordMaskProps = T.IProps & T.IPasswordMaskProps;
const isIOS = getGlobalData('isIOS');
@connect<Partial<IPasswordMaskProps>, T.IPasswordMaskState>(store2Props, actions)
export default class PasswordMask extends Component<Partial<IPasswordMaskProps>, T.IPasswordMaskState> {
  //允许组件使用外部全局样式类
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IPasswordMaskProps) {
    super(props);
    this.state = {
      password: null,
      isFocus: false,
      isAutoFocus: true,
      // isFocusA: true,
    };
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {isFocus, isAutoFocus} = this.state;
    return(
      <View
        className="pass-bg"
        onClick={(e) => {
          e.stopPropagation();
          action.commonChange('main.credit.passwordMaskShow', false);
        }}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <View
          className="pass-show"
          style={isFocus ? {top: '35%'} : {top: '50%'}}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="pass-header">
            <Text className="pass-title">输入支付密码</Text>
          </View>

          <View
            className="pass-body"
            onClick={(e) => {
              e.stopPropagation();
            }}
            catchMove
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <PasswordInput
              focus={isIOS && __TARO_ENV === 'h5' ? false : isAutoFocus} //h5,ios需用户手动点击触发focus
              holdKeyboard={isAutoFocus}
              autoFocus={isAutoFocus}
              disabled={main?.payErrorTime === 3}
              toPay={(val) => {
                this.setState({password: val});
              }}
              getValue={() => {}}
              onfocus={() => this.setState({isFocus: true})}
              onBlur={() => this.setState({isFocus: false, isAutoFocus: true})}
            />

            <View className="password-tips">
              <Text className="password-error">
                {main?.payErrorTime === 0
                  ? ''
                  : main?.payErrorTime == 3
                    ? '账户已冻结，请30分钟后重试'
                    : `密码错误，还有${3 - main?.payErrorTime}次机会`}
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
              onClick={async (e) => {
                e.stopPropagation();
                this.setState({password: null});
                action.commonChange('main.credit.passwordMaskShow', false);
                action.commonChange('main.payErrorTime', 0);
                action.commonChange('main.isSubmit', false);
              }}
            >
              取消
            </View>
            <View className={this.state.password ? 'pass-true' : 'pass-false'} onTouchStart={this.submit.bind(this)}>
              提交
            </View>
          </View>
        </View>
      </View>
    )

    // return (
    //   <Modal
    //     type="password"
    //     visible={main?.credit.passwordMaskShow}
    //     errorText={
    //       main?.payErrorTime === 0
    //         ? ''
    //         : main?.payErrorTime == 3
    //         ? '账户已冻结，请30分钟后重试'
    //         : `密码错误，还有${3 - main?.payErrorTime}次机会`
    //     }
    //     onCancel={() => {
    //       action.commonChange('main.credit.passwordMaskShow', false);
    //     }}
    //     onOk={(value) => {
    //       if (value) {
    //         action.creditPayPwd(value);
    //       }
    //     }}
    //     onForget={() => {
    //       action.commonChange('main.credit.passwordMaskShow', false);
    //       Taro.navigateTo({url: '/pages/package-A/customer/user-pay/index'});
    //     }}
    //     title="输入支付密码"
    //   />
    // );
  }

  submit = async (e) => {
    let {
      actions: {action},
      main,
    } = this.props;
    e.stopPropagation();
    action.commonChange('main.isSubmit', true);
    // debounce(async () => {
    if (this.state.password) {
      await action.creditPayPwd(this.state.password);
      this.setState({password: null});
    }
  };
}

//create by moon https://github.com/creasy2010/moon
