import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import currencyBg from '@/assets/image/coupon/currency-bg.png';
import storeBg from '@/assets/image/coupon/store-bg.png';
import freightBg from '@/assets/image/coupon/freight-bg.png';
// import check from '@/assets/image/shop-cart/gift-check.png';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import willLose from '@/assets/image/coupon/will-lose.png';
import willEnd from '@/assets/image/coupon/will-end.png';

const COUPON_TYPE = {
  0: {img: currencyBg, text: '通用券'},
  1: {img: storeBg, text: '优惠券'},
  2: {img: freightBg, text: '运费券'},
};
type ICouponItemProps = T.IProps & T.ICouponItemProps;

@connect<Partial<ICouponItemProps>, T.ICouponItemState>(store2Props, actions)
export default class CouponItem extends Component<Partial<ICouponItemProps>, T.ICouponItemState> {
  constructor(props: ICouponItemProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  /**

   */
  render() {
    let {
      coupon,
      tabType,
      currentType,
      main: {checkCoupon = {}, checkCouponStore = {}},
      actions: {action},
    } = this.props;
    return (
      <View
        className="couponItem"
        style={{paddingRight:__TARO_ENV !== 'h5'?0+'px':12+'px'}}
        onClick={async () => {
          console.log(currentType);
          if (currentType == -1) {
            const bool = checkCouponStore.couponCodeId && checkCouponStore.couponCodeId === coupon.couponCodeId;
            await action.commonChange('main.checkCouponStore', bool ? {} : coupon);
          } else {
            const bool = checkCoupon.couponCodeId && checkCoupon.couponCodeId === coupon.couponCodeId;
            await action.commonChange('main.checkCoupon', bool ? {} : coupon);
          }
        }}
      >
        <View className="coupon-left">
          <Text className="coupon-value mb16">
            <Text className="coupon-label">￥</Text>
            {coupon.denomination}
          </Text>
          <Text className="fs24">{this._buildFullBuyPrice(coupon)}</Text>
          {coupon.nearOverdue && <Image className="expiring" src={coupon.nearOverdue ? willEnd : willLose} />}
        </View>
        <View className="coupon-info">
          <View className="info-name">
            <Image src={COUPON_TYPE[coupon.couponType].img} className="currencyBg" />
            <Text className="coupon-type">{COUPON_TYPE[coupon.couponType].text}</Text>
            <Text className="fs28 cp-name">{this._buildStorename(coupon)}</Text>
          </View>
          {coupon.couponType != 2 && <Text className="coupon-rang fs24 c999 mb8">限{this._buildScope(coupon)}</Text>}
          <Text className="fs24 c999">{this._buildRangDay(coupon)}</Text>
        </View>
        {tabType === 0 && (
          <View className="coupon-right">
            <View className="check-view">
              {currentType == -1 ? (
                <Image
                  className="check-image"
                  src={checkCouponStore.couponCodeId === coupon.couponCodeId ? check : uncheck}
                />
              ) : (
                <Image
                  className="check-image"
                  src={checkCoupon.couponCodeId === coupon.couponCodeId ? check : uncheck}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }

  /**
   * 获取优惠券状态
   * 1.立即领取 百分比
   * 2.立即领取 倒计时
   * 3.已经领取  立即使用|查看使用范围
   * 4.
   * 5.已抢光
   */
  _getCouponStatus = (coupon) => {
    let status = 0;
    // 立即领取
    if (!coupon.hasFetched && coupon.leftFlag) {
      // 1.立即领取 百分比
      status = 1;
      if (coupon.activityWillEnd) {
        //2.立即领取 倒计时
        status = 2;
      }
    }
    // 3.已经领取  立即使用|查看使用范围
    if (coupon.hasFetched) {
      status = 3;
    }
    // 5.已抢光
    if (!coupon.hasFetched && !coupon.leftFlag) {
      status = 5;
    }
    return status;
  };
  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.fullBuyType === 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`;
  };
  /**
   * 优惠券使用店铺名称
   */
  _buildStorename = (coupon) => {
    let text = '';
    if (coupon.platformFlag === 1) {
      text = '全平台可用';
    } else {
      text = `仅${coupon.storeName}可用`;
    }
    return `${text}`;
  };
  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    let text = '';
    let scopeType = '';
    if (coupon.scopeType == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '品牌：';
      text = '仅限';
      if (coupon.brandNames)
        coupon.brandNames.forEach((value) => {
          text = `${text}${value}`;
        });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      if (coupon.goodsCateNames)
        coupon.goodsCateNames.forEach((value) => {
          text = `${text}${value}`;
        });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      if (coupon.storeCateNames)
        coupon.storeCateNames.forEach((value) => {
          text = `${text}${value}`;
        });
    } else {
      scopeType = '商品：';
      text = '部分商品';
    }

    return `${scopeType}${text}`;
  };
  /***
   * 生效时间
   */
  _buildRangDay = (coupon) => {
    return `${coupon.startTime.split(' ')[0]}~${coupon.endTime.split(' ')[0]}`;
  };
}

//create by moon https://github.com/creasy2010/moon
