import {View, Button, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-cate-mask.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ICouponCateMaskProps = T.IProps & T.ICouponCateMaskProps;

@connect<Partial<ICouponCateMaskProps>, T.ICouponCateMaskState>(store2Props, actions)
export default class CouponCateMask extends Component<Partial<ICouponCateMaskProps>, T.ICouponCateMaskState> {
  constructor(props: ICouponCateMaskProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {
        action: {changeMaskShow, changeCateId},
      },
      main: {couponCateList, couponCateId, activedKey},
    } = this.props;
    // couponCateList = couponCateList.concat(couponCateList);
    return (
      <View
        className="couponCate__mask"
        onClick={(e) => changeMaskShow(2)}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
         // e.preventDefault();
        }}
      >
        <ScrollView scrollY className="coupon-list-box" onClick={(e) => e.stopPropagation()}>
          <View className="coupon-list">
            {couponCateList.map((cateItme, index) => {
              return (
                <View
                  key={cateItme.couponCateId}
                  className={couponCateId == cateItme.couponCateId ? 'couponC-item actived' : 'couponC-item'}
                  onClick={() => {
                    changeCateId(cateItme.couponCateId, index);
                    changeMaskShow(2);
                  }}
                >
                  {cateItme.couponCateName}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
