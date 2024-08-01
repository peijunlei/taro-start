import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import arrowImg from '@/assets/image/common/arrow.png';
import userImg from '@/assets/image/customer/user-center/default.png';
import {logout} from '@/wmkit/common/util';
type IInfoProps = T.IProps & T.IInfoProps;

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
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
    } = this.props;
    let headImg = main?.customer?.headImg ? main?.customer?.headImg : userImg;

    //企业会员
    let isIepCustomer = this._isIepCustomer(main?.customer?.customerLabelList);
    const flag = false;
    return (
      <View className="mySet__info">
        <View className="set-top">
          <Image className="user-img" src={headImg} />
          <View className="set-info">
            <Text className="fs36 set">{main?.customer?.customerName}</Text>
            <Text className="fs28 c999 mt16">{main?.customer?.customerAccount}</Text>
          </View>
        </View>
        <View
          className="set-item mb24 setItem__border_top border-half"
          onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/user-info/index'})}
        >
          <Text className="set-title fs28">基础信息</Text>
          <Image className="set-arrow" src={arrowImg} />
        </View>
        <View className="mb24 border-all">
          {flag && isIepCustomer && (
            <View
              className="set-item"
              onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/user-enterprise/index'})}
              style={{borderTop: 'none'}}
            >
              <Text className="set-title fs28">公司信息</Text>
              <Image className="set-arrow" src={arrowImg} />
            </View>
          )}

          <View
            className="set-item"
            onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/user-finance/index'})}
            style={isIepCustomer ? {} : {borderTop: 0}}
          >
            <Text className="set-title fs28">财务信息</Text>
            <Image className="set-arrow" src={arrowImg} />
          </View>
          <View
            className="set-item setItem__border_top"
            onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/receive-address/index'})}
          >
            <Text className="set-title fs28">收货地址</Text>
            <Image className="set-arrow" src={arrowImg} />
          </View>
          <View
            className="set-item setItem__border_top"
            onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/user-safe/index'})}
          >
            <Text className="set-title fs28">账户安全</Text>
            <Image className="set-arrow" src={arrowImg} />
          </View>
        </View>
        <View className="mb24 border-all">
          <View
            className="set-item"
            onClick={() => Taro.navigateTo({url: '/pages/package-A/customer/about-us/index'})}
            style={{borderTop: 'none'}}
          >
            <Text className="set-title fs28">关于我们</Text>

            <Image className="set-arrow" src={arrowImg} />
          </View>
          {/* <View className="set-item">
            <Text className="set-title fs28">分享App</Text>
            <Image className="set-arrow" src={arrowImg} />
          </View>
          <View className="set-item">
            <Text className="set-title fs28">消息推送设置</Text>
            <Image className="set-arrow" src={arrowImg} />
          </View>
          <View className="set-item">
            <View className="set-title">
              <Text className="fs28">版本号</Text>
              <Text className="new-v">new</Text>
            </View>
            <Text className="fs24 c999">1.25.0</Text>
          </View> */}
        </View>
        <View
          className="out-button border-all"
          onClick={async () => {
            await logout();
          }}
        >
          <Text className="fs28">退出账号</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
