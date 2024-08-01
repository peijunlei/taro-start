import warrow from '@/assets/image/common/white-arrow.png';
import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Component} from 'react';
import {connect} from 'react-redux';
import {WMkit} from 'wmkit';
import actions from '../actions/index';
import {store2Props} from '../selectors';
import * as T from '../types';
import './member-center.less';

import userImg from '@/assets/image/customer/user-center/default.png';

type IMenberCenterProps = T.IProps & T.IMenberCenterProps;

@connect<Partial<IMenberCenterProps>, T.IMenberCenterState>(store2Props, actions)
export default class MenberCenterInner extends Component<Partial<IMenberCenterProps>, T.IMenberCenterState> {
  static options = {addGlobalClass: true};

  constructor(props: IMenberCenterProps) {
    super(props);
  }

  /**
   * 是否企业会员
   * @param customerLabelList
   * @private
   */
  _isIepCustomer = (customerLabelList) => {
    if (customerLabelList) {
      return customerLabelList && customerLabelList.indexOf('enterprise-customer') > -1;
    }
    return false;
  };

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {pointsIsOpen, customer, goodsFollow, storeFollow, growthValueIsOpen, signFlag, isLogin, messNum},
    } = this.props;
    let headImg = customer.headImg ? customer.headImg : userImg;

    // 小B访问其他小B店铺
    let isback = WMkit.isDistributor() && !!WMkit.inviteeId();
    //企业会员
    let isIepCustomer = this._isIepCustomer(customer.customerLabelList);
    const enterpriseCustomerLogo =
      customer.enterpriseCustomerLogo && JSON.parse(customer.enterpriseCustomerLogo)[0].url;
    const isShop = WMkit.isShop();
    return (
      customer && (
        <View className="wm-user-center-top">
          <View className="user-center-top-bg"></View>
          <View className={isback ? 'top-set' : 'top-set has-back'}>
            {isback && (
              <View className="left-bottom" onClick={() => WMkit.toMainPageAndClearInviteCache()}>
                <View className="left-bottom-text">返回自己店铺</View>
              </View>
            )}
            <View className="right-btns" style={{flexDirection: 'row'}}>
              {!isShop && (
                <View className="set-box">
                  <Image
                    className="set-img"
                    src={require('@/assets/image/customer/user-center/mesg.png')}
                    onClick={async () => {
                      await Taro.navigateTo({
                        url: isLogin
                          ? `/pages/package-A/customer/message-push/center/index`
                          : `/pages/package-A/login/login/index`,
                      });
                    }}
                  />
                  {messNum > 0 && <View className="mess-num">{messNum >= 100 ? '99+' : messNum}</View>}
                </View>
              )}
              <Image
                onClick={() => {
                  Taro.navigateTo({
                    url: isLogin
                      ? `/pages/package-A/customer/my-set/index?source=home`
                      : `/pages/package-A/login/login/index`,
                  });
                }}
                className="set-img"
                style={{marginLeft: '16px'}}
                src={require('@/assets/image/customer/user-center/set.png')}
              />
            </View>
          </View>
          {isLogin ? (
            <View className="user-info">
              <View className="user-img-box">
                <Image className="user-img" src={headImg} />
              </View>
              <View className="user-account">
                <View className="account-box">
                  <Text className="user-name">{customer.customerName == null ? '' : customer.customerName}</Text>

                  <View
                    className="user-level"
                    onClick={() => {
                      if (!isShop) {
                        Taro.navigateTo({
                          url: '/pages/package-A/customer/user/member-center/index',
                        });
                      }
                    }}
                  >
                    <Image className="level-img" src="https://wanmi-test.oss-cn-hangzhou.aliyuncs.com/6ed6de79c01401e4df23620e345e7c44.png" />
                    <Text className="level-name">
                      {customer.customerLevelName}
                    </Text>
                  </View>
                </View>
                <Text className="account-text">{customer.customerAccount}</Text>
                {growthValueIsOpen && (
                  <View
                    className="user-growup"
                    onClick={() => {
                      if (!isShop) {
                        Taro.navigateTo({
                          url: '/pages/package-A/customer/user/member-center/index',
                        });
                      }
                    }}
                  >
                    <Text className="user-value">成长值{customer.growthValue}</Text>
                  </View>
                )}
              </View>
              {!isShop && pointsIsOpen ? (
                signFlag ? (
                  <View
                    className="has-signed"
                    onClick={() => {
                      Taro.navigateTo({
                        url: '/pages/package-A/customer/sign/index',
                      });
                    }}
                  >
                    {/* <Image className="sign-img" src={require('@/assets/image/customer/user-center/signed.png')} /> */}
                    <Text className="sign-text">已签到</Text>
                  </View>
                ) : (
                  <View
                    className="sign-in"
                    onClick={() => {
                      Taro.navigateTo({
                        url: '/pages/package-A/customer/sign/index',
                      });
                    }}
                  >
                    <Image className="sign-img" src={require('@/assets/image/customer/user-center/sign-in.png')} />
                    <Text className="sign-text">签到</Text>
                  </View>
                )
              ) : null}
            </View>
          ) : (
            <View className="user-info">
              <View className="user-img-box">
                <Image className="user-img" src={headImg} />
              </View>
              <View
                className="user-account login-label"
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/package-A/login/login/index`,
                  });
                }}
              >
                <Text className="noLogin">登录/注册</Text>
                <Image src={warrow} className="warrow" />
              </View>
            </View>
          )}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
