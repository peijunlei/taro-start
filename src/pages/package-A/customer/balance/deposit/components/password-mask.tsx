import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PasswordInput from '@/pages/common/password-input/password-input';
import {getGlobalData} from '@/service/config';
import {noop} from 'wmkit';
const isIOS = getGlobalData('isIOS');

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
    isFocus: false,
  };

  render() {
    let {
      actions: {action},
      main: {
        payData: {payErrorTime, checkPayPwRes},
        isSubmit,
      },
    } = this.props;
    const {isFocus} = this.state;
    return (
      <View className="pass-bg">
        <View className="pass-show" style={isFocus ? {top: '35%'} : {top: '50%'}}>
          <View className="pass-header">
            <Text className="pass-title">输入支付密码</Text>
          </View>

          <View className="pass-body">
            <PasswordInput
              focus={isIOS && __TARO_ENV === 'h5' ? false : true} //h5,ios需用户手动点击触发focus
              toPay={(val) => {
                this.setState({password: val});
              }}
              getValue={() => {}}
              onfocus={() => this.setState({isFocus: true})}
              onBlur={() => this.setState({isFocus: false})}
            />

            <View className="password-tips">
              {/* //这种数据设计真的很无语。。payLockTime过期后 接口应该把payerrTime过置为0.但它是3。。。 */}
              <Text className="password-error">
                {checkPayPwRes && ~[0, 3].indexOf(payErrorTime)
                  ? ''
                  : checkPayPwRes
                  ? payErrorTime !== null && `密码错误，还有${3 - payErrorTime}次机会`
                  : '账户已冻结，请30分钟后重试'}
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
                action.commonChange('main.passwordMaskShow', false);
                action.commonChange('main.isSubmit', false);
              }}
            >
              取消
            </View>
            <View
              className={this.state.password && checkPayPwRes ? 'pass-true' : 'pass-false'}
              onClick={
                isSubmit
                  ? noop
                  : async () => {
                      action.commonChange('main.isSubmit', true);
                      // debounce(async () => {
                      if (this.state.password && checkPayPwRes) {
                        //校验提现相关规则
                        (await action._paymentPass()) &&
                          //密码校验 and 生成add记录
                          (await action._checkPayPwd(this.state.password, () => {
                            this.setState({password: null});
                          }));
                      }
                      // }, 800)
                    }
              }
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
