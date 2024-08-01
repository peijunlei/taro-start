import {Image, View, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import dhIcon from '@/assets/image/common/qq-error.png';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class chooseEnterpriseMain extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.init();
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    if (!this.props.main) return;
    let {
      actions: {action},
      main: {enterpriseList, enterpriseId},
    } = this.props;
    return (
      <View className="choose-enterprise-main">
        <View className="change-text">选择你要登录的企业账号</View>
        <ScrollView scrollY className="choose-enterprise-scroll">
          {enterpriseList
            .filter((item) => item.enterpriseId === enterpriseId)
            .map((item) => {
              return this.renderView(item);
            })}
          {enterpriseList
            .filter((item) => item.enterpriseId !== enterpriseId)
            .map((item) => {
              return this.renderView(item);
            })}
        </ScrollView>
      </View>
    );
  }

  renderView(item) {
    let {
      actions: {action},
      main: {enterpriseId},
    } = this.props;
    return (
      <View
        key={item.enterpriseId}
        className={item.enterpriseStatus === 1 ? 'enterprise-item enterprise-item-disabled' : 'enterprise-item'}
        onClick={async () => {
          if (item.enterpriseStatus === 0 || item.enterpriseId === '-1') {
            await action.changeEnterprise(item.enterpriseId);
          }
        }}
      >
        <Text className="enterprise-title">{item.enterpriseName}</Text>
        {item.enterpriseAbbreviation && <Text className="enterprise-spec">{item.enterpriseAbbreviation}</Text>}
        {item.enterpriseId === enterpriseId && <View className="current">当前</View>}
        {item.enterpriseStatus === 1 && (
          <View className="enterprise-disabled">
            <Image src={dhIcon} className="tip-icon" />
            <Text className="text1">企业账号禁用中</Text>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
