import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './index.less';
import classNames from 'classnames';
import actions from '@/pages/package-A/customer/user/member-center/actions';
import {getGlobalData} from '@/service/config';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
import {WMkit} from 'wmkit';

export default class MemberFooter extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  props: {
    path: string;
    pointsIsOpen: boolean;
  };

  componentWillMount() {
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

  render() {
    const isLogin = WMkit.isLogin();
    return (
      <View className={classNames('member-footer-box', {'ios-bottom': false})}>
        <View className="member-footer">
          <View
            className="footer-nav"
            onClick={() => {
              Taro.navigateTo({
                url: isLogin
                  ? `/pages/package-A/customer/user/member-center/index`
                  : `/pages/package-A/login/login/index`,
              });
            }}
          >
            <View className={this.props?.path == '/member-center' ? 'l-icon1 active' : 'l-icon1'} />
            <View className={this.props?.path == '/member-center' ? 'text active' : 'text'}>会员中心</View>
          </View>
          {this.props?.pointsIsOpen && (
            <View
              className="footer-nav"
              onClick={() =>
                Taro.redirectTo({
                  url: '/pages/package-A/customer/user/points-mall/index',
                })
              }
            >
              <View className={this.props?.path == '/points-mall' ? 'l-icon2 active' : 'l-icon2'} />
              <View className={this.props?.path == '/points-mall' ? 'text active' : 'text'}>积分商城</View>
            </View>
          )}
          <View className="footer-nav" onClick={() => Taro.switchTab({url: '/pages/user-center/index'})}>
            <View className={this.props?.path == '/user-center' ? 'l-icon3 active' : 'l-icon3'} />
            <View className={this.props?.path == '/user-center' ? 'text active' : 'text'}>我的</View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
