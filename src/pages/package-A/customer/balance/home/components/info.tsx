import { View, Button, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import FormSelect from '@/pages/common/form-select';
import { _, WMkit, wxAuth } from 'wmkit';
import api from 'api';
import { debounce , throttle } from 'lodash';
import { cache } from 'config';

import entryImg from '@/assets/image/customer/give-gift/entry.png'
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = { addGlobalClass: true };
  render() {
    let {
      main,
      actions: { action },
    } = this.props;
    const { enterpriseId = '' } = getCurrentInstance().router.params;
    return (
      <View className="home_detail">
        <View className="balance_content"></View>
        <View className="balance_info">
          <View className="info_box">
            <View className="info_box_top">
              <Text className="info_box_1">当前余额（元）</Text>
              <Text className="info_box_2">
                {main?.amount?.accountBalanceTotal ? main?.amount?.accountBalanceTotal.toFixed(2) : '0.00'}
              </Text>
            </View>

            {/* <View className="info_box_bottom">
              <View className="info_box_bottom_">
                <Text className="info_box_3">待入账余额</Text>
                <Text className="info_box_4">{_.addZero(main?.amount?.blockedBalanceTotal)}</Text>
              </View>
              <View className="info_box_bottom_">
                <Text className="info_box_3">已提现余额</Text>
                <Text className="info_box_4">{_.addZero(main?.amount?.alreadyDrawAmount)}</Text>
              </View>
            </View> */}
          </View>
        </View>
        {/* {main?.isOpenWechat && (
          <View className="info_box2">
            <Image className="imgs" src={require('../img/tiXian.png')} />
            <View style={{ flex: 1 }}>
              <Button
                className="deposit-btn"
                openType="getUserInfo"
                onGetUserInfo={throttle((e) => this.getUserInfo(e), 250)}
                onClick={debounce(async () => {
                  // 在微信浏览器内
                  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
                    if (_.isWeixin()) {
                      // 重定向的路由
                      let url = location.href.split('/balance')[0];
                      wxAuth.getAuth(url + '/balance/deposit/index', 'deposit');
                      // Taro.navigateTo({url: `/pages/package-A/customer/balance/deposit/index`});
                    } else {
                      Taro.showToast({
                        title: '请到微信端操作',
                        icon: 'none',
                        duration: 2000,
                      });
                    }
                  }
                }, 500)}
              >
                <FormSelect labelName="提现" placeholder={''} leftStyle={{ fontSize: '28rpx' }} iconVisible={true} />
              </Button>
            </View>
          </View>
        )} */}

        <View className="info_box2">
          <Image className="imgs" src={require('../img/mingXi.png')} />
          <View style={{ flex: 1 }}>
            <FormSelect
              labelName="账户明细"
              placeholder=""
              leftStyle={{ fontSize: '28rpx' }}
              onClick={() => {
                Taro.navigateTo({ url: `/pages/package-A/customer/balance/account-detail/index${enterpriseId ? `?enterpriseId=${enterpriseId}` : ''}` });
              }}
              iconVisible
            />
          </View>
        </View>

        {/* <View className="info_box2">
          <Image className="imgs" src={require('../img/jiLu.png')} />
          <View style={{ flex: 1 }}>
            <FormSelect
              labelName="提现记录"
              placeholder={''}
              leftStyle={{ fontSize: '28rpx' }}
              onClick={async () => {
                await Taro.navigateTo({ url: `/pages/package-A/customer/balance/deposit/deposit-records/index` });
              }}
              iconVisible={true}
            />
          </View>
        </View> */}
        {
          main?.isOpenEnterprise && <View className="info_box2 entry" onClick={() => Taro.navigateTo({ url: `/pages/package-A/customer/give-gift/index` })}>
            <Image className="img" src={entryImg} />
          </View>
        }
      </View>
    );
  }
  //授权登录 获取微信用户信息
  getUserInfo = async (e) => {
    let {
      actions: { action },
    } = this.props;
    const userInfo = e.detail.userInfo;
    await Taro.setStorageSync(cache.AUTH_INFO, { nickName: userInfo.nickName, headimgurl: userInfo.avatarUrl });
    if (!(await wxAuth.getOpenId())) {
      Taro.showToast({
        title: '功能不可用',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    await Taro.navigateTo({ url: `/pages/package-A/customer/balance/deposit/index` });
  };
}

//create by moon https://github.com/creasy2010/moon
