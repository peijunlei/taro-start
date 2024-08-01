import {View, Button, Text, Image, Form} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {WMkit} from 'wmkit';
import CountDown from '@/pages/common/count-down';
import RoundProgress from '@/pages/common/coupon/components/progress';
import Explain from '../components/explain';

import currencyBg from '@/assets/image/coupon/currency-bg.png';
import storeBg from '@/assets/image/coupon/store-bg.png';
import freightBg from '@/assets/image/coupon/freight-bg.png';
import willEnd from '@/assets/image/coupon/will-end.png';
import willLose from '@/assets/image/coupon/will-lose.png';
const COUPON_TYPE = {
  0: {img: currencyBg, text: '通用券'},
  1: {img: storeBg, text: '优惠券'},
  2: {img: freightBg, text: '运费券'},
};
// const iconExplain = require('@/assets/image/coupon/explain.png');
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
      actions: {
        action: {receiveCoupon, countOver},
        action,
      },
      main: {couponInfo, couponList, isLogin, isExplainFlag},
      actor,
      coupon,
      index,
    } = this.props;
    const storeMap = couponInfo.storeMap;
    const activityConfigId = coupon.activityConfigId;
    return (
      this._getCouponStatus(coupon) !== 0 && (
        <View className="wm-coupon__item">
          <View className="coupon-center-coupon-type">
            <View className="coupon-left">
              <Text className="coupon-value mb16">
                <Text className="coupon-label">￥</Text>
                {coupon.denomination}
              </Text>
              <Text className="fs24">{this._buildFullBuyPrice(coupon)}</Text>
              {coupon.couponWillEnd ? (
                <Image className="expiring" src={willEnd} />
              ) : (
                this._getCouponStatus(coupon) === 2 && <Image className="expiring" src={willLose} />
              )}
            </View>
            <View className="coupon-info">
              <View className="info-name">
                <Image src={COUPON_TYPE[coupon.couponType].img} className="currencyBg" />
                <Text className="coupon-type">{COUPON_TYPE[coupon.couponType].text}</Text>
                <Text className="fs28 cp-name">{this._buildStorename(coupon, storeMap)}</Text>
              </View>
              {coupon.couponType != 2 && (
                <Text className="coupon-rang fs24 c999 mb8">限{this._buildScope(coupon, couponInfo)}</Text>
              )}
              <Text className="fs24 c999">{this._buildRangDay(coupon)}</Text>
            </View>
            {/* * 1 立即领取 百分比  */}
            {this._getCouponStatus(coupon) === 1 && (
              <View
                className="coupon-right"
                onClick={() => {
                  WMkit.isLogin()
                    ? receiveCoupon(coupon, index)
                    : Taro.navigateTo({
                        url: `/pages/package-A/login/login/index`,
                      });
                }}
              >
                <RoundProgress
                  data={(coupon.fetchPercent * 100).toFixed(0) + '%'}
                  progress={(coupon.fetchPercent * 100).toFixed(0)}
                  color="#FF6600"
                />
                <Text className="cp-button">领取</Text>
              </View>
            )}
            {/* * 2 立即领取  倒计时 */}
            {this._getCouponStatus(coupon) === 2 ? (
              <View
                className="coupon-right"
                onClick={() => {
                  WMkit.isLogin()
                    ? receiveCoupon(coupon, index)
                    : Taro.navigateTo({
                        url: `/pages/package-A/login/login/index`,
                      });
                }}
              >
                <Text className="coming-end">即将结束</Text>
                <CountDown
                  allowFontScaling={false}
                  numberOfLines={1}
                  // endHandle={countOver(index)}
                  parame={coupon}
                  timeOffset={this._getTimeoffset(coupon)}
                  timeStyle={{fontWeight: 500, margin: '2px 0 0 0'}}
                />
                <Text className="cp-button">领取</Text>
              </View>
            ) : null}
            {/* * 3 已经领取  立即使用|查看使用范围*/}
            {this._getCouponStatus(coupon) === 3 && (
              <View
                className="coupon-right"
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/package-B/goods/coupon-list-promotion/index?activity=${coupon.activityId}&couponId=${coupon.couponId}`,
                  });
                }}
              >
                <Text className="coming-end has-get">已领取</Text>
                <Text className={coupon.couponStarted ? 'cp-button' : 'cp-button  look-use'}>
                  {coupon.couponStarted ? '立即使用' : '查看可用'}
                </Text>
              </View>
            )}
            {/* * 5.已抢光 */}
            {this._getCouponStatus(coupon) === 5 && (
              <View className="coupon-right loot-all">
                <Text className="coming-end has-get">已抢光</Text>
                <Text className="cp-button">领取</Text>
              </View>
            )}
            {/* <View className="image-explain" onClick={() => this._handleExplainChange(coupon.couponDesc)}>
              <Image src={iconExplain} className="image" />
            </View> */}
          </View>
        </View>
      )
      //   );
      // })
    );
  }
  // _handleExplainChange = async (couponDesc) => {
  //   let {
  //     actions: {action},
  //     main,
  //   } = this.props;
  //   await action.commonChange('main.isExplainFlag', true);
  //   await action.commonChange('main.couponDesc', couponDesc);
  // };
  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.fullBuyType === 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`;
  };
  /**
   * 优惠券使用店铺名称
   */
  _buildStorename = (coupon, storeMap) => {
    let text = '';
    if (coupon.platformFlag === 1) {
      text = '全平台可用';
    } else if (storeMap && JSON.stringify(storeMap) != '{}') {
      text = storeMap[coupon.storeId];
      text = `仅${text}可用`;
    }
    return `${text}`;
  };
  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon, couponInfo) => {
    let text = '';
    let scopeType = '';
    if (coupon.scopeType == 0) {
      scopeType = '商品：';
      text = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '品牌：';
      text = '仅限';
      if (couponInfo)
        coupon.scopeIds.forEach((value) => {
          let name = couponInfo.brandMap && couponInfo.brandMap[value] ? '[' + couponInfo.brandMap[value] + ']' : '';
          text = `${text}${name}`;
        });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      if (couponInfo)
        coupon.scopeIds.forEach((value) => {
          let name = couponInfo.cateMap && couponInfo.cateMap[value] ? '[' + couponInfo.cateMap[value] + ']' : '';
          text = `${text}${name}`;
        });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      if (couponInfo)
        coupon.scopeIds.forEach((value) => {
          let name =
            couponInfo.storeCateMap && couponInfo.storeCateMap[value] ? '[' + couponInfo.storeCateMap[value] + ']' : '';
          text = `${text}${name}`;
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
    return coupon.rangeDayType === 1
      ? `领取后${coupon.effectiveDays}天内有效`
      : `${coupon.couponStartTime}至${coupon.couponEndTime}`;
  };
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
  /**
   * 倒计时
   * 一小时内：倒计时+59秒  避免出现00：00 的时候活动仍在进行中
   *
   */
  _getTimeoffset = (coupon) => {
    return (coupon.activityCountDown / 1000 - 3600 > 0
      ? coupon.activityCountDown / 1000
      : coupon.activityCountDown / 1000 + 59
    ).toFixed(0);
  };
}

//create by moon https://github.com/creasy2010/moon
