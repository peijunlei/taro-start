import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ICouponTabProps = T.IProps & T.ICouponTabProps;

@connect<Partial<ICouponTabProps>, T.ICouponTabState>(store2Props, actions)
export default class CouponTab extends Component<Partial<ICouponTabProps>, T.ICouponTabState> {
  constructor(props: ICouponTabProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main: {tabType, canUseCouponsLength, disableCouponsLength},
    } = this.props;
    const typeList = [
      {value: 0, text: '可用优惠券'},
      {value: 1, text: '不可用优惠券'},
    ];
    return (
      <View className="couponTab">
        {typeList.map((item, key) => {
          return (
            <View
              key={key}
              className={tabType === key ? 'tab-text curr' : 'tab-text'}
              onClick={async () => {
                await action.commonChange('main.tabType', key);
              }}
            >
              {/*<Text className={['coupon-item-text', tabType === key ? 'coupon-item-select' : ''].join(' ')}>*/}
              {item.text}({key ? disableCouponsLength : canUseCouponsLength}){/*</Text>*/}
              {/*<View className="coupon-item-line"/>*/}
            </View>
          );
        })}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
