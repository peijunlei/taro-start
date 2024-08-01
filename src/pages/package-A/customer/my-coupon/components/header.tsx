import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IHeaderProps = T.IProps & T.IHeaderProps;
import dowmImg from '@/assets/image/coupon/down.png';
import upImg from '@/assets/image/coupon/up.png';

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
      main: {showDrapMenu, couponType},
    } = this.props;

    return (
      <View className="coupon-header">
        <View
          className="coupon-type"
          onClick={() => {
            changeMaskShow();
          }}
        >
          <Text className={showDrapMenu ? 'color-theme fs24' : 'fs24'}>
            {couponType == 0 ? '通用券' : couponType == 1 ? '优惠券' : couponType == null && '全部券类型'}
          </Text>
          <Image className="down-img" src={showDrapMenu ? upImg : dowmImg} />
        </View>
        <Text
          className="fs24"
          onClick={() => {
            showDrapMenu && changeMaskShow();
            Taro.redirectTo({
              url: `/pages/package-A/coupon/coupon-center/index`,
            });
          }}
        >
          领券中心
        </Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
