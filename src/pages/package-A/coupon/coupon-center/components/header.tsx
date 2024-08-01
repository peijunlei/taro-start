import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dowmImg from '@/assets/image/coupon/down.png';
import upImg from '@/assets/image/coupon/up.png';

type IHeaderProps = T.IProps & T.IHeaderProps;

@connect<Partial<IHeaderProps>, T.IHeaderState>(store2Props, actions)
export default class Header extends Component<Partial<IHeaderProps>, T.IHeaderState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IHeaderProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {changeMaskShow},
      },
      main = {},
    } = this.props;
    const {showCateMask, request = {}, showDrapMenu, isLogin} = main;
    return (
      <View className="coupon__header">
        <View
          className="coupon-type"
          onClick={() => {
            showCateMask && changeMaskShow(2);
            changeMaskShow(1);
          }}
        >
          <Text className={showDrapMenu ? 'curr-text fs24' : 'fs24'}>
            {request.couponType == 0
              ? '通用券'
              : request.couponType == 1
              ? '优惠券'
              : request.couponType == null && '全部券类型'}
          </Text>
          <Image className="down-img" src={showDrapMenu ? upImg : dowmImg} />
        </View>
        <Text
          className="navText"
          onClick={() => {
            (showCateMask || showDrapMenu) && changeMaskShow(3);
            Taro.redirectTo({
              url: isLogin ? '/pages/package-A/customer/my-coupon/index' : '/pages/package-A/login/login/index',
            });
          }}
        >
          我的优惠券
        </Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
