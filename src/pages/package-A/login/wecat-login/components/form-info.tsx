import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './form-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import api from 'api';
import banner from '@/assets/image/login/banner.png';
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
type IFormInfoProps = T.IProps & T.IFormInfoProps;

@connect<Partial<IFormInfoProps>, Partial<T.ActionType>>(store2Props, actions)
export default class FormInfo extends Component<Partial<IFormInfoProps>, T.IFormInfoState> {
  constructor(props: IFormInfoProps) {
    super(props);
    this.state = {
      code: '',
      isNew: false,
    };
  }

  componentDidMount() {
    let _this = this;
    Taro.getSetting({
      success: (res) => {
        console.log('是否授权', res.authSetting['scope.userInfo'] !== undefined);
        if (res.authSetting['scope.userInfo']) {
          _this.setState({
            isNew: true,
          });
        }
      },
    });
  }

  _login = (): Promise<string> => {
    let _this = this;
    return new Promise((resolve, reject) => {
      //@ts-ignore
      Taro.login({
        async success(res: {code: any | PromiseLike<string>; errMsg: string}) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res.errMsg);
            console.log('登录失败！' + res.errMsg);
          }
        },
      });
    });
  };

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    let {isNew} = this.state;
    return (
      <View className="loginWecatLoginformInfo">
        <Image className="wm-banner" src={banner} />
        {!isNew && !isH5 ? (
          <Button className="submit-btn green-btn" openType="getUserInfo" onGetUserInfo={this.getUserInfo}>
            微信授权登录
          </Button>
        ) : (
          !isH5 && (
            <Button className="submit-btn green-btn" openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
              微信快捷登录
            </Button>
          )
        )}
        {/* 手机号短信登录 */}
        <View
          className="submit-btn gray-btn"
          onClick={() =>
            Taro.navigateTo({
              url: '/pages/package-A/login/login/index',
            })
          }
        >
          手机号短信登录
        </View>
      </View>
    );
  }

  //授权登录 获取微信用户信息
  getUserInfo = async (e) => {
    let {
      main: {isNew},
      actions: {action},
    } = this.props;
    if (e.detail.userInfo) {
      Taro.showLoading();
      let code = await this._login();
      await action._authorize(code, e.detail.userInfo);
      //授权成功后 展示微信快捷登录按钮
      Taro.hideLoading();
      this.setState({
        isNew: true,
      });
    }
  };

  //快捷登录 获取用户信息
  getPhoneNumber = async (e) => {
    let {
      actions: {action},
      main,
    } = this.props;
    // 如果是新用户且要填写邀请码，要结合注册的设置,是邀请注册还是不限
    // 是登录还是注册，取决于该unionId是否绑定过
    if (main.loginFlag == false) {
      const res = await api.loginBaseController.getRegisterLimitType();
      // 开启了社交分销且注册方式为邀请注册，则需弹出填写邀请码的弹窗
      if (res.openFlag == 1 && res.registerLimitType == 1) {
        // 弹框被关了的话，仍要弹出
        if (main.visible == false) {
          action.commonChange('main.visible', true);
        }
        // 没有输入的话，提示输入
        if ((main.inviteCode = '')) {
          Taro.showToast({
            title: '请输入您的邀请码',
            icon: 'none',
          });
        }
      }
    } else {
      // 先校验后台设置的注册方式，
      if (e.detail.encryptedData) {
        // 邀请码，如果填了且必须要填
        const inviteCode = main.inviteCode;
        Taro.showLoading();
        //更新code
        let code = await this._login();
        //微信快捷登录
        await action._authorizePhoneLogin(code, e.detail.encryptedData, e.detail.iv, inviteCode);
      }
    }
  };
}

//create by moon https://github.com/creasy2010/moon
