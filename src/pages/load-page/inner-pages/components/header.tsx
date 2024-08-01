import {Button, Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './header.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {_, WMkit, wxAuth} from 'wmkit';
import {cache} from 'config';
import {debounce} from 'lodash';
import money from '@/assets/image/distribution/money.png';
import arrow1 from '@/assets/image/distribution/arrow.png';
import linkUser from '@/assets/image/distribution/link-user.png';
import linkNew from '@/assets/image/distribution/link-new.png';
import defaultCustomer from '@/assets/image/customer/user-center/default.png';
type IHeaderProps = T.IProps & T.IHeaderProps;
let isH5 = __TARO_ENV === 'h5';

@connect<Partial<IHeaderProps>, T.IHeaderState>(store2Props, actions)
export default class Header extends Component<Partial<IHeaderProps>, T.IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {
        customerInfo,
        customerBalance,
        distribute: {inviteInfo, distributeSetting},
        inviteCustomer,
      },
    } = this.props;

    let headImg = customerInfo && customerInfo.headImg ? customerInfo.headImg : defaultCustomer;

    const [accoutOne, accoutTwo] = this._getAccountNum(customerBalance);

    // const openFlag = Taro.getStorageSync(cache.IS_OPEN_DISTRIBUTOR); //是否打开分销设置
    const openFlag = distributeSetting.openFlag; //是否打开分销设置
    const applyType = distributeSetting.applyType; //0,购买商品，1，邀请注册
    const applyFlag = distributeSetting.applyFlag; //是否打开申请入口
    const inviteFlag = distributeSetting.inviteFlag; //是否开启邀请奖励
    const inviteNum = inviteCustomer ? inviteCustomer.inviteNum : 0;
    const validInviteNum = inviteCustomer ? inviteCustomer.validInviteNum : 0;
    const distributor = WMkit.isDistributor();
    const isLogin = WMkit.isLogin();

    const {inviteRecruitEnterImg, buyRecruitEnterImg, inviteEnterImg} = distributeSetting;

    console.log('distributeSetting,distributeSetting', distributeSetting);
    return (
      <View className="reward-center">
        <View className="header">
          <View className="content">
            <Image src={headImg} className="img" />
            <View className="infos">
              <View className="name-bar">
                {isLogin && customerInfo ? (
                  <Text className="name">{customerInfo.customerName}</Text>
                ) : (
                  <Text
                    className="user-name"
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/package-A/login/login/index`,
                      });
                    }}
                  >
                    登录/注册
                  </Text>
                )}
              </View>
              {inviteInfo.customerName && <Text className="invite">邀请人：{inviteInfo.customerName || '-'}</Text>}
            </View>
          </View>
        </View>

        <View className="header-box">
          <Button
            className="deposit-btn card"
            onGetUserInfo={this.getUserInfo}
            onClick={debounce(async () => {
              if (!WMkit.isLogin()) {
                // 未登录，引导去登录
                Taro.navigateTo({url: `/pages/package-A/login/login/index`});
              } else {
                // 微信浏览器内
                if (Taro.getEnv() === Taro.ENV_TYPE.WEB && _.isWeixin()) {
                  // 重定向
                  let url = location.href;
                  wxAuth.getAuth(url.split('?')[0], 'deposit');
                }
                // 小程序内
                if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
                  Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
                }
              }
            }, 500)}
          >
            <View className="left">
              <Image src={money} className="img" />
              <Text>
                <Text className={`money`}>{accoutOne}.</Text>
                <Text className={`small-money`}>{accoutTwo}</Text>
              </Text>
            </View>
            <View className="right">
              <Text className="text">立即提现</Text>
            </View>
          </Button>

          {openFlag ? (
            <View className="links">
              <View
                className="link"
                onClick={async () => {
                  await Taro.navigateTo({
                    url: isLogin
                      ? `/pages/package-B/distribution/my-customer/index?tab=${'1'}`
                      : `/pages/package-A/login/login/index`,
                  });
                }}
              >
                <Text className="fs24 c333">邀新人数</Text>
                <View className="box">
                  <Text className="text">{inviteNum ? inviteNum : '0'}</Text>
                  <Image src={arrow1} className="arrow" />
                </View>
                <Image src={linkUser} className="bg" />
              </View>
              <View
                className="link"
                onClick={async () => {
                  await Taro.navigateTo({
                    url: isLogin
                      ? `/pages/package-B/distribution/my-customer/index?tab=${'2'}`
                      : `/pages/package-A/login/login/index`,
                  });
                }}
              >
                <Text className="fs24 c333">有效邀新</Text>
                <View className="box">
                  <Text className="text">{validInviteNum ? validInviteNum : '0'}</Text>
                  <Image src={arrow1} className="arrow" />
                </View>
                <Image src={linkNew} className="bg" />
              </View>
            </View>
          ) : null}

          {!!this._getPicShow(distributeSetting, openFlag, applyFlag, distributor, inviteFlag) && (
            <Image
              className="banner"
              onClick={async () => {
                await this._getUrl(distributor, applyType, inviteFlag, applyFlag);
              }}
              src={
                applyFlag && !distributor
                  ? applyType
                    ? inviteRecruitEnterImg
                    : buyRecruitEnterImg
                  : inviteFlag
                  ? inviteEnterImg
                  : null
              }
            />
          )}
        </View>
      </View>
    );
  }

  _getPicShow = (distributeSetting, openFlag, applyFlag, distributor, inviteFlag) => {
    console.log('distributeSetting', distributeSetting);
    console.log('openFlag', openFlag);
    console.log('applyFlag', applyFlag);
    console.log('distributor', distributor);
    console.log('inviteFlag', inviteFlag);
    return distributeSetting && openFlag == 1 && (applyFlag || inviteFlag) && !distributor;
  };
  //授权登录 获取微信用户信息
  getUserInfo = async (e) => {
    let {
      actions: {action},
    } = this.props;
    const userInfo = e.detail.userInfo;
    await Taro.setStorageSync(cache.AUTH_INFO, {nickName: userInfo.nickName, headimgurl: userInfo.avatarUrl});
    await Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
  };
  _getUrl = async (distributor, applyType, inviteFlag, applyFlag) => {
    //如果是登录状态直接跳转否则跳转登录界面
    if (WMkit.isLogin()) {
      if (!distributor) {
        if (applyFlag === 1) {
          if (applyType === 0) {
            await Taro.navigateTo({url: '/pages/package-B/reward-center/store-bags/index'});
          } else if (applyType === 1) {
            await Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
          }
        } else if (applyFlag === 0 && inviteFlag === 1) {
          await Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
        }
      } else {
        //小B
        if (inviteFlag) {
          await Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
        }
      }
    } else {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
    }
  };
  _getAccountNum = (customerBalance) =>
    (customerBalance && customerBalance.accountBalanceTotal
      ? _.fmoney(customerBalance.accountBalanceTotal, 2)
      : '0.00'
    ).split('.');
}

//create by moon https://github.com/creasy2010/moon
