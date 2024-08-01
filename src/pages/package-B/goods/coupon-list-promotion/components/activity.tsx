import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './activity.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
//满赠 优惠券
import MZengIcon from '@/assets/image/goods/goods-list/mzeng.png';
import CouponLabel from '@/pages/common/goods/coupon-label';
type IActivityProps = T.IProps & T.IActivityProps;

@connect<Partial<IActivityProps>, T.IActivityState>(store2Props, actions)
export default class Activity extends Component<Partial<IActivityProps>, T.IActivityState> {
  constructor(props: IActivityProps) {
    super(props);
  }

  /**
    满减赠折活动组件
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main: {couponInfo},
    } = this.props;
    if (!couponInfo) {
      return null;
    }
    const fullBuyPrice = couponInfo.fullBuyPrice ? couponInfo.fullBuyPrice : 0;
    const denomination = couponInfo.denomination ? couponInfo.denomination : 0;
    //拼接优惠券面值
    let couponLabel = `${couponInfo.fullBuyType == 0 ? '满0' : `满${fullBuyPrice}`}减${denomination}`;
    return (
      <View className="coupon-list-promotion-activity">
        {/* 满减 */}
        <View className="active-item">
          <Image src={MZengIcon} className="icon" />
          <View className="right-info">
            <Text className="title">
              {`${couponInfo.startTime ? couponInfo.startTime : '--'}至${
                couponInfo.endTime ? couponInfo.endTime : '--'
              }以下商品可使用优惠券`}
            </Text>
            <Text className="middle-text">{this._buildScope(couponInfo)}</Text>
            <Text className="middle-text">
              {couponInfo.platformFlag == 1
                ? '限平台：全平台可用'
                : `限平台：${couponInfo.storeName ? couponInfo.storeName : ''}`}
            </Text>
            <CouponLabel text={couponLabel} />
          </View>
        </View>
      </View>
    );
  }
  /**
   * 优惠券使用范围
   */
  _buildScope = (coupon) => {
    //营销类型(0,1,2,3,4) 0全部商品，1品牌，2平台(boss)类目,3店铺分类，4自定义货品（店铺可用）
    let scopeType = '限商品：';
    //范围名称
    let goodsName = '';

    if (coupon.scopeType == 0) {
      goodsName = '全部商品';
    } else if (coupon.scopeType == 1) {
      scopeType = '限品牌：';
      goodsName = '仅限';
      if (coupon.brandMap) {
        coupon.brandIds.forEach((value) => {
          let name = coupon.brandMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
      }
    } else if (coupon.scopeType == 2) {
      scopeType = '限品类：';
      goodsName = '仅限';
      if (coupon.cateMap) {
        coupon.cateIds.forEach((value) => {
          let name = coupon.cateMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
      }
    } else if (coupon.scopeType == 3) {
      scopeType = '限分类：';
      goodsName = '仅限';
      if (coupon.storeCateMap) {
        coupon.storeCateIds.forEach((value) => {
          let name = coupon.storeCateMap[value];
          if (name != null || name != undefined) {
            goodsName = `${goodsName}[${name}]`;
          }
        });
      }
    } else if (coupon.scopeType == 4) {
      goodsName = '部分商品';
    }

    return `${scopeType}${goodsName}`;
  };
}

//create by moon https://github.com/creasy2010/moon
