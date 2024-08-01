import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type IInfoProps = T.IProps & T.IInfoProps;
// import userImg from '@/assets/image/customer/user-center/default.png';
import userImg from '@/assets/image/customer/user-center/default.png';
import warrow from '@/assets/image/common/white-arrow.png';
import Complete from '../complete/index';

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

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
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {userInfo = {}, pointsAvailable, flag} = main;
    const isLogin = WMkit.isLogin();
    let pointsAvailableData = 0;
    if (isLogin && userInfo) {
      pointsAvailableData = pointsAvailable;
    }

    return (
      <View className="pointsMall__details">
        <View className="pointsMall__info">
          <View className="user-info">
            <View className="user-img-box">
              <Image className="user-img" src={isLogin && userInfo?.headImg ? userInfo.headImg : userImg} />
            </View>
            <View className="user-account">
              <View className="account-box">
                {isLogin && userInfo ? (
                  <Text className="user-name">{userInfo.customerName}</Text>
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
                {isLogin && userInfo ? (
                  <View
                    className="user-level"
                    onClick={() => {
                      Taro.navigateTo({url: '/pages/package-A/customer/user/member-center/index'});
                    }}
                  >
                    <Image className="level-img" src={userInfo.rankBadgeImg} />
                    <Text className="level-name" style={process.env.TARO_ENV === 'h5' && {transform: 'scale(0.8)'}}>
                      {userInfo.customerLevelName}
                    </Text>
                  </View>
                ) : (
                  <View className="user-warrow">
                    <Image className="warrow-img" src={warrow} />
                  </View>
                )}
              </View>
            </View>
            <View
              className="body_bt"
              onClick={() => {
                action.nativeTo();
                action.commonChange('main.flag', !flag);
              }}
            >
              积分规则
            </View>
          </View>
          <View className="info_box">
            <View className="user-growup">
              <Image src={require('../img/jifen.png')} className="info_box_img" />
              <Text className="user-value">{pointsAvailableData ? pointsAvailableData : '0'}</Text>
              积分
            </View>
            <View
              className="hot-city"
              onClick={() => {
                action.loginNativeTo(isLogin);
              }}
            >
              兑换记录
            </View>
          </View>
        </View>

        <Complete />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
