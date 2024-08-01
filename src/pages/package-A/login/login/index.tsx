import {Button, Input, Text, View, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import 'taro-ui/dist/style/components/action-sheet.scss';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import LoginForm from './components/login-form';

import OtherLogin from './components/other-login';
import arrowIcon from '@/assets/image/login/r-arrow.png';
import {WMkit} from 'wmkit';
import { PrivacyModal } from '@/pages/common';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginLogin extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    Taro.setNavigationBarTitle({title: '登录'});
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidShow() {
    let {mobile} = getCurrentInstance().router.params || {};
    if (!this.props.main?.phone) this.props.actions.init(mobile);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const windowInfo = Taro?.getSystemInfoSync?.();

    return main ? (
      <View className="loginLogin"
        style={{ height: `${windowInfo?.windowHeight}px`, }}
      >
        <LoginForm />
        {!main.mode && <OtherLogin />}
        {!main.mode && main.visible && (
          <View
            className="login-bg"
            onClick={async (e) => {
              e.stopPropagation();
            }}
          >
            <View
              className="login-show"
              style={{top: '35%'}}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <View className="login-header">
                <Text className="login-title">请输入邀请码</Text>
                <View className="login-bo">
                  <Input
                    value={main.inviteCode}
                    onInput={(e) => action.commonChange('main.inviteCode', e.detail.value)}
                    className="int"
                    placeholder="请输入您的邀请码"
                  />
                  {main.registerLimitType == 0 && (
                    <View className="login-tips">
                      <Button
                        className="skip-buttom"
                        openType="getPhoneNumber"
                        onGetPhoneNumber={async (e) => {
                          Taro.login({
                            async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
                              if (res.code) {
                                console.log(res.code);
                                await action._authorizePhoneLogin(
                                  res.code,
                                  e.detail.encryptedData,
                                  e.detail.iv,
                                  main.inviteCode,
                                );
                              } else {
                                console.log('登录失败！' + res.errMsg);
                              }
                            },
                          });
                        }}
                      >
                        跳过
                      </Button>
                      <Image className="l-icon" src={arrowIcon} />
                    </View>
                  )}
                </View>
              </View>
              <View className="login-btn">
                <View
                  className="login-cancel"
                  onClick={async () => {
                    action.commonChange('main.visible', false);
                    action.commonChange('main.inviteCode', null);
                  }}
                >
                  取消
                </View>
                <Button
                  className="login-true"
                  onClick={async () => {
                    if (main.inviteCode == '') {
                      Taro.showToast({
                        title: '请输入您的邀请码',
                        icon: 'none',
                      });
                      return;
                    } else if (!WMkit.testInviteCode(main.inviteCode)) {
                      Taro.showToast({
                        title: '邀请码格式错误',
                        icon: 'none',
                      });
                      return;
                    }
                    Taro.login({
                      async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
                        if (res.code) {
                          await action._authorizePhoneLogin(main.code, main.encryptedData, main.iv, main.inviteCode);
                        } else {
                          console.log('登录失败！' + res.errMsg);
                        }
                      },
                    });
                  }}
                >
                  提交
                </Button>
              </View>
            </View>
          </View>
        )}
        {!main.mode && <PrivacyModal />}
      </View>
    ) : null;
  }
}

//create by moon https://github.com/creasy2010/moon
