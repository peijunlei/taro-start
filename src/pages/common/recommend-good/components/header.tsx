import {Button, Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_, WMkit} from 'wmkit';
import {cache} from 'config';

import money from '@/assets/image/distribution/money.png';
import arrow1 from '@/assets/image/distribution/arrow.png';
import linkUser from '@/assets/image/distribution/link-user.png';
import linkNew from '@/assets/image/distribution/link-new.png';
import defaultCustomer from '@/assets/image/customer/user-center/default-wechat.png';
type IHeaderProps = T.IProps & T.IHeaderProps;

@connect<Partial<IHeaderProps>, T.IHeaderState>(store2Props, actions)
export default class Header extends Component<Partial<IHeaderProps>, T.IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {
        customerInfo,
        customerBalance,
        distribute: {inviteInfo, distributeSetting},
        inviteCustomer,
        noticeNum,
      },
    } = this.props;

    let headImg = customerInfo.headImg ? customerInfo.headImg : defaultCustomer;

    const [accoutOne, accoutTwo] = this._getAccountNum(customerBalance);

    const openFlag = distributeSetting.openFlag; //是否打开分销设置
    const applyType = distributeSetting.applyType;
    const applyFlag = distributeSetting.applyFlag; //是否打开申请入口
    const inviteFlag = distributeSetting.inviteFlag; //是否开启邀请奖励
    const inviteNum = inviteCustomer ? inviteCustomer.inviteNum : 0;
    const validInviteNum = inviteCustomer ? inviteCustomer.validInviteNum : 0;
    const distributor = WMkit.isDistributor();

    const {inviteRecruitEnterImg, buyRecruitEnterImg, inviteEnterImg} = distributeSetting;
    return (
      <View className="reward-center">
        <View className="header">
          <View className="top-set">
            {noticeNum > 0 && (
              <View
                className="set-box"
                onClick={async () => {
                  Taro.navigateTo({
                    url: '/pages/package-A/customer/message-push/center/index',
                  });
                }}
              >
                <Image className="set-img" src={require('@/assets/image/customer/user-center/mesg.png')} />
                <View className="mess-num">
                  <Text className="mess-num-text">{noticeNum > 99 ? '99+' : noticeNum}</Text>
                </View>
              </View>
            )}
            <Image
              onClick={async () => {
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/my-set/index`,
                });
              }}
              className="set-img"
              style={{marginLeft: '16px'}}
              src={require('@/assets/image/customer/user-center/set.png')}
            />
          </View>
          <View className="content">
            <Image src={headImg} className="img" />
            <View className="infos">
              <View className="name-bar">
                <Text className="name">{customerInfo.customerName}</Text>
              </View>
              {inviteInfo.customerName && <Text className="invite">邀请人：{inviteInfo.customerName || '-'}</Text>}
            </View>
          </View>
        </View>

        <Button className="deposit-btn card" openType="getUserInfo" onGetUserInfo={this.getUserInfo}>
          <View className="left">
            <Image src={money} className="img" />
            <Text className="money">{accoutOne}.</Text>
            <Text className="small-money">{accoutTwo}</Text>
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
                  url: `/pages/package-B/distribution/my-customer/index?tab=${'1'}`,
                });
              }}
            >
              <Text className="fs24 c333">邀新用户</Text>
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
                  url: `/pages/package-B/distribution/my-customer/index?tab=${'2'}`,
                });
              }}
            >
              <Text className="fs24 c333">有效邀新</Text>
              <View className="box">
                <Text className="text">{validInviteNum ? validInviteNum : 0}</Text>
                <Image src={arrow1} className="arrow" />
              </View>
              <Image src={linkNew} className="bg" />
            </View>
          </View>
        ) : null}

        {this._getPicShow(distributeSetting, openFlag, applyFlag, distributor, inviteFlag) && (
          <Image
            className="banner"
            onClick={async () => {
              await this._getUrl(distributor, applyType, inviteFlag);
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
    );
  }

  _getPicShow = (distributeSetting, openFlag, applyFlag, distributor, inviteFlag) => {
    return distributeSetting && openFlag === 1 && applyFlag && !distributor && inviteFlag;
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
  _getUrl = async (distributor, applyType, inviteFlag) => {
    if (!distributor) {
      //小C
      if (applyType) {
        await Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
      } else {
        //开店礼包 url: `/pages/package-A/customer/my-set/index`,
        await Taro.navigateTo({url: '/pages/package-B/reward-center/store-bags/index'});
      }
    } else {
      //小B
      if (inviteFlag) {
        await Taro.navigateTo({url: '/pages/package-B/distribution/invite-friends/index'});
      }
    }
  };
  _getAccountNum = (customerBalance) =>
    (customerBalance.accountBalanceTotal ? _.fmoney(customerBalance.accountBalanceTotal, 2) : '0.00').split('.');
}

//create by moon https://github.com/creasy2010/moon
