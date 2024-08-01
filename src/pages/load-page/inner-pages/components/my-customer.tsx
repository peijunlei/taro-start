import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './my-customer.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {WMkit} from 'wmkit';
import arrow from '@/assets/image/common/arrow.png';

type IMyCustomerProps = T.IProps & T.IMyCustomerProps;

@connect<Partial<IMyCustomerProps>, T.IMyCustomerState>(store2Props, actions)
export default class MyCustomer extends Component<Partial<IMyCustomerProps>, T.IMyCustomerState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IMyCustomerProps) {
    super(props);
  }

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {inviteCustomer, distributeSetting},
    } = this.props;
    const showFlag = WMkit.isDistributorLoginForShare();
    const openFlag = distributeSetting.openFlag;
    let inviteNum = inviteCustomer ? inviteCustomer.inviteNum : 0;
    let validInviteNum = inviteCustomer ? inviteCustomer.validInviteNum : 0;
    let myCustomerNum = inviteCustomer ? inviteCustomer.myCustomerNum : 0;
    return (
      <View className="myCustomer">
        <View
          className="bar"
          onClick={() => {
            this._gotoMyCustomer('1');
          }}
        >
          <Text className="fs32 c333" style={{fontWeight: 'bold'}}>
            我的用户
          </Text>
          <View className="right">
            <Text className="fs24 c999">全部用户</Text>
            <Image src={arrow} className="img" />
          </View>
        </View>
        <View className="numbers">
          <View
            className="item"
            onClick={() => {
              this._gotoMyCustomer('1');
            }}
          >
            <Text className="num">{inviteNum ? inviteNum : '0'}</Text>
            <Text className="fs24 c999">邀新人数</Text>
          </View>
          <View
            className="item"
            onClick={() => {
              this._gotoMyCustomer('2');
            }}
          >
            <Text className="num">{validInviteNum ? validInviteNum : '0'}</Text>
            <Text className="fs24 c999">有效邀新</Text>
          </View>
          <View
            className="item"
            onClick={() => {
              this._gotoMyCustomer('3');
            }}
          >
            <Text className="num">{myCustomerNum ? myCustomerNum : '0'}</Text>
            <Text className="fs24 c999">我的顾客</Text>
          </View>
        </View>
      </View>
    );
  }
  /**
   * 跳转我的用户页面
   * @param tab
   * @private
   */
  _gotoMyCustomer = (tab) => {
    //邀请注册
    Taro.navigateTo({
      url: `/pages/package-B/distribution/my-customer/index?tab=${tab}`,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
