import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-type-mask.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type ICouponTypeMaskProps = T.IProps & T.ICouponTypeMaskProps;
const typeList = [
  {
    value: null,
    text: '全部券类型',
  },
  {
    value: 0,
    text: '通用券',
  },
  {
    value: 1,
    text: '优惠券',
  },
];
@connect<Partial<ICouponTypeMaskProps>, T.ICouponTypeMaskState>(store2Props, actions)
export default class CouponTypeMask extends Component<Partial<ICouponTypeMaskProps>, T.ICouponTypeMaskState> {
  constructor(props: ICouponTypeMaskProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {changeMaskShow, changeTypeValue},
      },
      main,
    } = this.props;
    return (
      <View className="couponTypeMask">
        <View className="coupon-cate-box">
          <View className="coupon-top">
            {typeList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={main.request.couponType == item.value ? 'coupon-type-text actived' : 'coupon-type-text'}
                  onClick={() => {
                    changeMaskShow(1);
                    changeTypeValue(item.value);
                  }}
                >
                  {item.text}
                </View>
              );
            })}
          </View>
          <View
            className="coupon-bottom"
            onClick={() => {
              changeMaskShow(1);
            }}
          />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
