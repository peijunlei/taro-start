import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import { getPrivacySetting, msg } from 'wmkit';
import * as T from '../../types';
import './distribution-top.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import user from '@/assets/image/customer/user-center/default.png';
const arrow = require('@/assets/image/common/white-arrow.png');

type IDistributionTopProps = T.IProps & T.IDistributionTopProps;

@connect<Partial<IDistributionTopProps>, T.IDistributionTopState>(store2Props, actions)
export default class DistributionTop extends Component<Partial<IDistributionTopProps>, T.IDistributionTopState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IDistributionTopProps) {
    super(props);
  }
  state = {
    customerName: '',
  };
  /**

*/

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {
        action: {commonChange},
      },
      main: {
        customerInfo,
        distributor,
        isRuleShow,
        inviteInfo,
        distributeSetting,
        forbiddenShow,
        noticeNum,
        preferentialNum,
      },
    } = this.props;
    let headImg = customerInfo.headImg ? customerInfo.headImg : user;
    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor?.forbiddenFlag;
    return (
      <View className="distributionTop" style={{backgroundColor: '#FF4D00'}}>
        {/* <View style={{height: '100rpx'}}> */}
        <View className="content">
          <Image src={headImg} className="img" />
          <View className="topRight">
            <View className="name-bar">
              <Text className="name"> {customerInfo.customerName}</Text>
              <View
                className="box"
                onClick={() => {
                  commonChange('main.isRuleShow', !isRuleShow);
                }}
              >
                <Text className="red10">
                  {distributor?.distributorLevelName || distributeSetting.distributorLevelName}
                </Text>
              </View>
              {forbidFlag == 1 && (
                <View
                  className="forbidden-box"
                  onClick={() => {
                    commonChange('main.forbiddenShow', !forbiddenShow);
                  }}
                >
                  <Text className="forbidden">已禁用</Text>
                  <Image src={arrow} className="arrow" />
                </View>
              )}
            </View>
            {inviteInfo.customerName && <Text className="invite">邀请人：{inviteInfo.customerName}</Text>}
            <View className="invite-code">
              <Text className="white10">我的邀请码：{distributor?.inviteCode}</Text>
              <View
                className="copy"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: distributor?.inviteCode,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: distributor?.inviteCode,
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });
                  
                }}
              >
                <Text className="white8">复制</Text>
              </View>
            </View>
          </View>
        </View>

        {/* <Image src={bg} className="bg" /> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
