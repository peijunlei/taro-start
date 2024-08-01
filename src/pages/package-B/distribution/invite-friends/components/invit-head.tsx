import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './invit-head.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {cache} from 'config';
import {WMkit} from 'wmkit';
// const inviteFriend = require('@/assets/image/distribution/invite-friend.png');
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';

type IInvitHeadProps = T.IProps & T.IInvitHeadProps;

@connect<Partial<IInvitHeadProps>, T.IInvitHeadState>(store2Props, actions)
export default class InvitHead extends Component<Partial<IInvitHeadProps>, T.IInvitHeadState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IInvitHeadProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;
    if (!main || Object.keys(main).length <= 0) return null;
    return (
      <View className="packageBDistributionInviteFriendsHead">
        <View className="invitHead">
          <Image src={main.picture} className="banner" />
          <View
            className="wm-button-1 mb24"
            onClick={() => {
              if (isH5) {
                Taro.showToast({
                  title: '请使用微信小程序进行分享',
                  icon: 'none',
                  duration: 2000,
                });
              } else {
                this._openInitFriend(main.setting);
              }
            }}
          >
            <Text className="text">立即邀请</Text>
          </View>
          <Text className="text1">
            您已成功邀请<Text className="yellow fs24">{main.totalNum===0 ? '0' : main.totalNum}</Text>位好友
          </Text>
          <View
            className="detail-bt"
            onClick={() => {
              commonChange('main.detailState', !main.detailState);
            }}
          >
            详细说明
          </View>
        </View>
      </View>
    );
  }
  _openInitFriend = (setting) => {
    let {
      actions: {
        action: {commonChange},
      },
      main: {isDistributor, invitState, isOpenWechat},
    } = this.props;
    if (!isOpenWechat) {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let shareImg;
    //分销员
    if (WMkit.isDistributor()) {
      //邀新奖励开启
      if (setting.inviteFlag) {
        shareImg = setting.inviteShareImg;
      }
    } else {
      //不是分销员，招募开关打开且为邀请注册，招募优先
      if (setting.applyFlag && setting.applyType) {
        //展示邀请的转发海报
        shareImg = setting.recruitShareImg;
      } else {
        //邀新奖励开启
        if (setting.inviteFlag) {
          shareImg = setting.inviteShareImg;
        }
      }
    }
    commonChange([
      {paths: 'main.shareImg', value: shareImg},
      {paths: 'main.inviteeId', value: Taro.getStorageSync(cache.LOGIN_DATA).customerId || ''},
      {paths: 'main.invitState', value: !invitState},
    ]);
  };
}

//create by moon https://github.com/creasy2010/moon
