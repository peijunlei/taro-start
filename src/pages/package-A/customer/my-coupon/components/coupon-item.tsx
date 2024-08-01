import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_, noop} from 'wmkit';
import currencyBg from '@/assets/image/coupon/currency-bg.png';
import storeBg from '@/assets/image/coupon/store-bg.png';
import freightBg from '@/assets/image/coupon/freight-bg.png';
import willEnd from '@/assets/image/coupon/will-end.png';
const COUPON_TYPE = {
  0: {img: currencyBg, text: '通用券'},
  1: {img: storeBg, text: '优惠券'},
  2: {img: freightBg, text: '运费券'},
};
const iconExplain = require('@/assets/image/coupon/explain.png');
type ICouponItemProps = T.IProps & T.ICouponItemProps;

@connect<Partial<ICouponItemProps>, T.ICouponItemState>(store2Props, actions)
export default class CouponItem extends Component<Partial<ICouponItemProps>, T.ICouponItemState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ICouponItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main: {useStatus, couponList},
    } = this.props;

    return (
      couponList &&
      couponList.map((coupon, index) => {
        return (
          <View className="couponItem" key={index}>
            <View className="coupon-left">
              <Text className="coupon-value mb16">
                <Text className="coupon-label">￥</Text>
                {coupon.denomination}
              </Text>
              <Text className="fs24"> {coupon.fullBuyType == 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`}</Text>
              {useStatus == 0 && coupon.nearOverdue && <Image className="expiring" src={willEnd} />}
            </View>
            <View className="coupon-info">
              <View className="info-name">
                <Image src={COUPON_TYPE[coupon.couponType].img} className="currencyBg" />
                <Text className="coupon-type">{COUPON_TYPE[coupon.couponType].text}</Text>
                <Text className="fs28 cp-name">
                  {coupon.couponType == 1 ? `仅${coupon.storeName}可用` : '全平台可用'}
                </Text>
              </View>
              <Text className="coupon-rang fs24 c999 mb8">限{this._getGoodScope(coupon)}</Text>

              <Text className="fs24 c999">{`${_.formatDay(coupon.startTime)}至${_.formatDay(coupon.endTime)}`}</Text>
            </View>
            <View
              className="coupon-right"
              onClick={() => {
                useStatus == 2 || useStatus == 1
                  ? noop
                  : Taro.navigateTo({
                      url: `/pages/package-B/goods/coupon-list-promotion/index?activity=${coupon.activityId}&couponId=${coupon.couponId}`,
                    });
              }}
            >
              {useStatus == 0 && coupon.couponType != 2 && (
                <Text className={coupon.couponCanUse ? 'cp-button' : 'cp-button  look-use'}>
                  {coupon.couponCanUse ? '立即使用' : '查看可用'}
                </Text>
              )}
              {useStatus != 0 && (
                <Text className="has-get">{useStatus == 1 ? '已使用' : useStatus == 2 ? '已过期' : ''}</Text>
              )}
            </View>
            <View className="image-explain" onClick={() => this._handleExplainChange(coupon.couponDesc)}>
              <Image src={iconExplain} className="image" />
            </View>
          </View>
        );
      })
    );
  }
  /**
   * 优惠券的使用范围
   * @private
   */
  _getGoodScope = (coupon) => {
    //营销类型(0,1,2,3,4) 0全部商品，1品牌，2平台(boss)类目,3店铺分类，4自定义货品（店铺可用）
    let scopeTypeStr = '商品：';
    //范围名称
    let goodsName = '仅限';

    switch (coupon.scopeType) {
      case 0:
        goodsName = '全部商品';
        break;
      case 1:
        scopeTypeStr = '品牌：';
        if (coupon.brandNames.length > 0) {
          coupon.brandNames.forEach((value) => {
            goodsName = `${goodsName}[${value}]`;
          });
        }
        break;
      case 2:
        scopeTypeStr = '品类：';
        if (coupon.goodsCateNames.length > 0) {
          coupon.goodsCateNames.forEach((value) => {
            goodsName = `${goodsName}[${value}]`;
          });
        }
        break;
      case 3:
        scopeTypeStr = '分类：';
        if (coupon.storeCateNames.length > 0) {
          coupon.storeCateNames.forEach((value) => {
            goodsName = `${goodsName}[${value}]`;
          });
        }
        break;
      default:
        goodsName = '部分商品';
        break;
    }
    return `${scopeTypeStr}${goodsName}`;
  };
  _handleExplainChange = async (couponDesc) => {
    let {
      actions: {action},
      main,
    } = this.props;
    await action.commonChange('main.isExplainFlag', true);
    await action.commonChange('main.couponDesc', couponDesc);
  };
}

//create by moon https://github.com/creasy2010/moon
