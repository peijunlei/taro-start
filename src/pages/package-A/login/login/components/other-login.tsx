import { Button, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';
import * as T from '../types';
import './other-login.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import api from 'api';
import { getGlobalData } from '@/service/config';
import wecatIcon from '@/assets/image/login/wecat.png';
/** 授权登录icon */
import auth_login_icon from '@/assets/image/login/auth_login_icon.png';
import { _, getPrivacySetting, msg } from 'wmkit';

type IOtherLoginProps = T.IProps & T.IOtherLoginProps;
//@ts-ignore
__TARO_ENV === 'h5';
const isIphoneX = getGlobalData('isIphoneX');
@connect<Partial<IOtherLoginProps>, T.IOtherLoginState>(store2Props, actions)
export default class OtherLogin extends Component<Partial<IOtherLoginProps>, T.IOtherLoginState> {
  constructor(props: IOtherLoginProps) {
    super(props);
    this.state = {
      code: '',
      isNew: false,
      isOpened: false,
    };
  }

  componentDidMount() {
    let _this = this;
    //@ts-ignore
    let isH5 = __TARO_ENV === 'h5';
    if (!isH5) {
      // 判断是否已经授权过
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
      this._login();
    }
  }

  _login = (): Promise<string> => {
    let _this = this;
    return new Promise((resolve, reject) => {
      //@ts-ignore
      Taro.login({
        async success(res: { code: any | PromiseLike<string>; errMsg: string }) {
          console.log(444444, res);
          
          if (res.code) {
            resolve(res.code);
            console.log(res.code);
            _this.setState({
              code: res.code,
            });
          } else {
            reject(res.errMsg);
            console.log('登录失败！' + res.errMsg);
          }
        },
      });
    });
  };
  /**

   */
  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    let { isNew, isOpened } = this.state;
    //@ts-ignore
    let isH5 = __TARO_ENV === 'h5';
    return (
      <View className={isIphoneX ? 'loginLogin-otherLogin login-x-bottom ' : 'loginLogin-otherLogin'}>
        {/* H5页面唤起微信登录 暂时先不做*/}
        {isH5 && main.isOpenWechat && (
          <View className="three-login">
            {/* 渲染组件 - 手机号快捷登录 */}
            {this.renderMobileNumberAuthorizationLogin(() => action.h5_authorize())}
          </View>
        )}

        {!isH5 && main.isOpenWechat && (
          <View className="three-login">
            {!isNew ? (
              <>
                {/* 渲染组件 - 手机号快捷登录 */}
                {this.renderMobileNumberAuthorizationLogin(() => this.getUserInfo())}
              </>
            ) : (
                <>
                  {/* 渲染组件 - 手机号快捷登录 */}
                  {this.renderMobileNumberAuthorizationLogin(() => this.getPhoneNumberModel())}
                </>
              )}
          </View>
        )}

        {/* 公司信息 */}
        <View className="componey-info">
          <Text className={isIphoneX ? 'text text-X' : 'text'}>© 2023~2024 上海汉兆云软件有限公司</Text>
          {/* <Text className="text">版本号：SBC V1.0.0</Text> */}
        </View>

        {isOpened ? (
          <AtActionSheet
            isOpened
            cancelText="取消"
            onClose={() => this.setState({ isOpened: false })}
            onCancel={() => this.setState({ isOpened: false })}
          >
            <AtActionSheetItem>
              <Button className="use-wechat" openType="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
                使用手机号授权登录
              </Button>
            </AtActionSheetItem>
          </AtActionSheet>
        ) : null}
      </View>
    );
  }

  /**
   * 渲染组件 - 手机号快捷登录
   * @param callBack
   * @returns
   */
  renderMobileNumberAuthorizationLogin = (callBack: Function) => {
    return (
      <View className='mobile_number_authorization_login'
        onClick={() => {
          let {
            main: {isAgree},
          } = this.props;
          if (!isAgree) {
            Taro.showToast({
              title: '请先阅读并同意相关协议',
              icon: 'none',
              duration: 2000,
            });
            return false;
          }
          getPrivacySetting().then((res) => {
            if ((res as any).needAuthorization) {
              msg.emit('privacyModalVisible', {
                visible: true,
                privacyContractName: (res as any).privacyContractName
              });
            } else {
              callBack?.()
            }
          })
        }}
      >
        <Image src={auth_login_icon} className='mobile_number_authorization_login__icon' />
        <Text className='mobile_number_authorization_login__text'>手机号快捷登录</Text>
      </View>
    );
  }

  // //1.授权登录 获取微信用户信息
  // getUserInfo = async (e) => {
  //   console.log('授权登录 获取微信用户信息');
  //   let {
  //     main: {},
  //     actions: {action},
  //   } = this.props;
  //   if (e.detail.userInfo) {
  //     Taro.showLoading();
  //     console.log(1111111111)
  //     await action._authorize(this.state.code, e.detail.userInfo, e.detail);
  //     Taro.hideLoading();
  //     this.setState({
  //       isNew: true,
  //       isOpened: true,
  //     });
  //     await this._login();
  //   }
  // };
  getUserInfo = async () => {
    console.log('授权登录 获取微信用户信息');
    let {
      main: {isAgree},
      actions: {action},
    } = this.props;
    if (!isAgree) {
      await Taro.showToast({
        title: '请先阅读并同意相关协议',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    //微信登录获取用户信息接口调整
    wx.getUserProfile({
      desc: '用户获取头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        console.log(123123);
        const detail = {
          encryptedData: res.encryptedData,
          iv: res.iv,
        };
        Taro.showLoading();
        await action._authorize(this.state.code, res.userInfo, detail);
        Taro.hideLoading();
        this.setState({
          isNew: true,
          isOpened: true,
        });
        await this._login();
      },
    });
  };

  /*小程序登录流程代码，乱的一批，请结合后端一起看*/
  //2.快捷登录 获取用户信息 若绑定过手机号则直接登录
  //此处e首次是'getUserInfo'，选择手机号时是'getPhoneNumber'。微信改绑账户时通过getPhoneNumber拿不到用户头像，昵称，所以先getUserInfo
  getPhoneNumber = async (e) => {
    console.log('快捷登录 获取用户手机号 若绑定过手机号则直接登录11111');
    let {
      actions: { action },
      main,
    } = this.props;
    // 如果是新用户且要填写邀请码，要结合注册的设置,是邀请注册还是不限
    // 是登录还是注册，取决于该unionId是否绑定过
    let code = await this._login();
    await action.commonChange('main.code', code);
    await action.commonChange('main.encryptedData', e.detail.encryptedData);
    await action.commonChange('main.iv', e.detail.iv);
    let openFlag = null;
    if (!main.loginFlag) {
      const res = await api.loginBaseController.getRegisterLimitType();
      // 开启了社交分销且注册方式为邀请注册，则需弹出填写邀请码的弹窗
      if (res.openFlag == 1) {
        openFlag = res.openFlag;
        action.commonChange([
          {
            paths: 'main.openFlag',
            value: res.openFlag,
          },
          {
            paths: 'main.registerLimitType',
            value: res.registerLimitType,
          },
        ]);
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
        return
        // 弹框被关了的话，仍要弹出
        // if (main.visible == false) {
        //   action.commonChange('main.visible', true);
        // }
        // return;
      }
    }
    await this._login();
    this.setState({
      isOpened: false,
    });
    // 不是社交分销的注册方式为邀请注册的情况
    if (openFlag === null) {
      await action._authorizePhoneLogin(code, e.detail.encryptedData, e.detail.iv, '');
    }
  };

  getPhoneNumberModel = async () => {
    console.log('快捷登录 获取用户信息 若绑定过手机号则直接登录');
    let self = this;
    let {
      actions: {action},
      main: {isAgree},
    } = this.props;
    if (!isAgree) {
      await Taro.showToast({
        title: '请先阅读并同意相关协议',
        icon: 'none',
        duration: 2000,
      });
      return false;
    }
    wx.showModal({
      title: '温馨提示',
      content: '亲，授权登录后才能正常使用小程序功能',
      success(res) {
        //如果用户点击了确定按钮
        if (res.confirm) {
          //微信登录获取用户信息接口调整
          wx.getUserProfile({
            desc: '用户获取头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: async (res) => {
              console.log(123123, self.state.code,res);
              Taro.showLoading();
              //微信快捷登录1
              const result = (await action._authorizePhoneLogin(self.state.code, res.encryptedData, res.iv, '')) || {};
              Taro.hideLoading();
              if (!result.loginFlag) {
                //后端已有授权信息，但没有绑定手机号,后端已存储用户微信信息至redis,弹出手机号弹框进行绑定登录
                self.setState({
                  isOpened: true,
                });
              }
              action.commonChange('main.loginFlag', result.loginFlag);
              console.log(33333, result);
              
              await self._login();
            },
            fail: (err) => {
              console.log(11111, err);
            },
          });
        } else if (res.cancel) {
          //如果用户点击了取消按钮
          console.log(3);
          wx.showToast({
            title: '您拒绝了请求,不能正常使用小程序',
            icon: 'error',
            duration: 2000,
          });
          return;
        }
      },
    });
  };
}

//create by moon https://github.com/creasy2010/moon
