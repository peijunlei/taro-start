import {View, Button, Text, Image, ScrollView, Progress} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {WMkit} from 'wmkit';
import Complete from '../complete/index';
import userImg from '@/assets/image/customer/user-center/default.png';
import warrow from '@/assets/image/common/white-arrow.png';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  render() {
    let {
      actions: {action},
      main: {
        userInfo,
        nextGradeInfo,
        isLastOne,
        pointsAvailable,
        pointsIsOpen,
        notGetGradeList,
        nowPossessGradeInfo,
        flag,
      },
    } = this.props;

    const isLogin = WMkit.isLogin();

    return (
      <View className="memberCenter__details">
        <View className="memberCenter__back" />
        <View className="memberCenter__userInfo">
          <View className="user-img-box">
            <Image className="user-img" src={userInfo && userInfo.headImg ? userInfo.headImg : userImg} />
          </View>
          <View className="user-bug-container">
            {isLogin && userInfo ? (
              <View className="user-account">
                <View className="account-box">
                  <View className="user-name">
                    <Text className="user-name-text">{userInfo.customerName}</Text>
                  </View>
                  <View className="user-level">
                    <Image
                      className="level-img"
                      style={process.env.TARO_ENV === 'h5' && {marginRight: 0}}
                      src={userInfo.rankBadgeImg}
                    />
                    <Text
                      className="level-name"
                      style={process.env.TARO_ENV === 'h5' && {lineHeight: 0, transform: 'scale(0.75)'}}
                    >
                      {userInfo.customerLevelName}
                    </Text>
                  </View>
                </View>
                <Text className="account-text">{userInfo.customerAccount}</Text>
                <View className="user-gp">
                  <View
                    className="user-growup"
                    onClick={() => {
                      Taro.navigateTo({
                        url: '/pages/package-A/customer/user/growth-value/index',
                      });
                    }}
                  >
                    <Text className="user-value">成长值{userInfo.customerGrowthValue}</Text>
                    <Image className="tim" src={require('../img/arrow_right.png')} />
                  </View>
                  {pointsIsOpen && (
                    <View
                      className="user-growup"
                      onClick={() =>
                        Taro.navigateTo({
                          url: '/pages/package-A/customer/user-integral/index',
                        })
                      }
                    >
                      <Text className="user-value">积分值{pointsAvailable}</Text>
                      <Image className="tim" src={require('../img/arrow_right.png')} />
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View className="user-account">
                <View className="account-box">
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
                  <View className="user-warrow">
                    <Image className="warrow-img" src={warrow} />
                  </View>
                </View>
              </View>
            )}
            <View
              className="body_bt"
              onClick={() => action.commonChange('main.flag', !flag)}
              style={isLogin ? {alignSelf: 'flex-start'} : {}}
            >
              积分规则
            </View>
          </View>
        </View>
        {isLogin && (
          <View className="info_box">
            <View className="info_box_top">
              <Text className="info_box_1">等级会员权益</Text>
            </View>

            <View className="body_button">
              <View style={{width: '100%'}}>
                <Progress
                  percent={
                    nextGradeInfo.growthValue - userInfo.customerGrowthValue < 0
                      ? 100
                      : (userInfo.customerGrowthValue / nextGradeInfo.growthValue) * 100
                  }
                  strokeWidth={5}
                  backgroundColor="rgba(152,91,49,0.1)"
                  activeColor="#ff6600"
                  borderRadius="4"
                />
              </View>
              <View className="progress-text">
                <View style={{flexDirection: 'row'}}>
                  <Text className="left text-color">
                    当前成长值
                    <Text className="mo_texts">
                      {userInfo.customerGrowthValue ? userInfo.customerGrowthValue : '0'}
                    </Text>
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {!isLastOne ? (
                    <Text className="right text-color">
                      距离<Text className="left mo_texts">{nextGradeInfo.customerLevelName}</Text>
                      还差
                      <Text className="left mo_texts">
                        {nextGradeInfo.growthValue - userInfo.customerGrowthValue < 0
                          ? 1
                          : nextGradeInfo.growthValue - userInfo.customerGrowthValue}
                      </Text>
                    </Text>
                  ) : (
                    <Text className="right mo_texts">您已达到最高等级</Text>
                  )}
                </View>
              </View>
            </View>

            <ScrollView scrollX className="member__scrollView">
              <View className="scroll__inner">
                {isLogin &&
                  nowPossessGradeInfo &&
                  nowPossessGradeInfo.customerLevelRightsVOS &&
                  nowPossessGradeInfo.customerLevelRightsVOS.map((value) => {
                    return (
                      <View
                        className="img-box"
                        key={value.rightsId}
                        onClick={() =>
                          Taro.navigateTo({
                            url: `/pages/package-A/customer/user/class-equity/index?id=${nowPossessGradeInfo.customerLevelId}`,
                          })
                        }
                      >
                        <Image className="img-lo" src={value.rightsLogo} />
                        <Text className="img-text"> {value.rightsName}</Text>
                      </View>
                    );
                  })}

                {notGetGradeList.map((value) => {
                  return (
                    <View
                      key={value.rightsId}
                      className="img-box dropShadow"
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/package-A/customer/user/class-equity/index?id=${value.customerLevelId}`,
                        })
                      }
                    >
                      <Image className="img-lo img-lo2" src={value.rightsLogo} />
                      <Text className="img-text img-text2">{value.rightsName}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}

        <Complete />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
