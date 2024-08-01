import {Button, Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import arrowIcon from '@/assets/image/common/arrow.png';
import {_, wxAuth} from 'wmkit';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, any> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      isOpened: false, //权限弹窗是否展示
    };
  }

  static options = {addGlobalClass: true};

  render() {
    let {
      main,
      // main: { serverStatus, wxFlag },
      // actions: { action, bindWechat },
    } = this.props;
    const showFlag = main?.serverStatus.wechat != null && main?.wxFlag != null;
    const enableFlag = main?.serverStatus.wechat;
    return (
      main && (
        <View>
          <View className="link-info">
            <View className="item">
              <View className="left-wrap">
                <Image src={require('../img/wechat.png')} className="item_img" />
                <Text className="wechat">微信</Text>
              </View>
              <View className="right-wrap">
                {showFlag ? (
                  enableFlag ? (
                    main.wxFlag ? (
                      <View
                        className="bind"
                        onClick={() => {
                          this.unBind();
                        }}
                      >
                        解绑
                      </View>
                    ) : (
                      <Button
                        className="userinfo-btn"
                        openType={'getUserInfo'}
                        onGetUserInfo={this.bind}
                        onClick={async () => {
                          // 微信浏览器内
                          if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
                            // 重定向
                            let url = location.href;
                            await wxAuth.getAuth(url.split('?')[0], 'linked-account');
                          }
                        }}
                      >
                        未绑定
                      </Button>
                    )
                  ) : (
                    '未启用'
                  )
                ) : (
                  <Button
                    className="userinfo-btn"
                    openType={'getUserInfo'}
                    onGetUserInfo={this.bind}
                    onClick={async () => {
                      // 微信浏览器内
                      if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
                        // 重定向
                        let url = location.href;
                        await wxAuth.getAuth(url.split('?')[0], 'linked-account');
                      }
                    }}
                  >
                    未绑定
                  </Button>
                )}
                <Image src={arrowIcon} className="right-icon" />
              </View>
            </View>
          </View>

          <View className="register-tips">
            <View className="tishi">提示：</View>
            <View className="massage">
              账号关联之后，用户可使用快捷登录进入商城。为了您的账号安全，30天内不可重复解除绑定账号
            </View>
          </View>
        </View>
      )
    );
  }

  bind = (e) => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
      return;
    }
    if (e?.detail?.rawData) {
      this.props?.actions?.bindWechat(e.detail);
    } else {
      console.warn('getUserInfo为空。绑定失败。');
    }
  };

  unBind() {
    let {
      main: {serverStatus},
      actions: {deleteWechat},
    } = this.props;
    if (!serverStatus.wechat) return;
    //解绑流程
    Taro.showModal({
      content: '您是否要解除关联？\n' + '解除后将无法使用快捷登录',
      cancelText: '取消',
      confirmText: '解除',
    }).then(async (res) => {
      if (res.confirm) {
        deleteWechat();
      }
    });
  }
}

//create by moon https://github.com/creasy2010/moon
