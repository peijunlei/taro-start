import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'dayjs';
import '../css/style.less';
type IOrderListProps = T.IProps & T.IOrderListProps;

const COUPON_TYPE = {
  0: '通用券',
  1: '优惠券',
  2: '运费券',
};
const FLOW_STATE = {
  AUDIT: '待发货',
  DELIVERED_PART: '待发货',
  DELIVERED: '待收货',
  COMPLETED: '已完成',
};
//状态文字颜色
const flowStatusColor = (status, payState) => {
  if (status == 'INIT') {
    //待审核
    return '#FF6600';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      //待支付
      return '#e61414';
    } else if (payState == 'UNCONFIRMED') {
      //待确认
      return '#333';
    } else if (payState == 'PAID') {
      //待发货
      return '#eeaa21';
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    //待发货
    return '#eeaa21';
  } else if (status == 'DELIVERED') {
    //待收货
    return '#36b260';
  } else if (status == 'CONFIRMED') {
    //已收货
    return '#333';
  } else if (status == 'COMPLETED') {
    //已完成
    return '#333';
  }
};

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class CouponOrderListItem extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {main, order, index} = this.props;
    const couponInfo = order.tradeCouponItem.couponInfoVO;

    return (
      <View>
        <View className="user-box" key={order?.id}>
          <View className="user-order-item">
            <View className="user-order-item-link">
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View className="dinapu">
                  订单积分
                  <Text className="points-num"> {order?.tradePrice.points || 0}</Text>
                </View>
              </View>

              {order && (
                <View
                  className="status"
                  style={{
                    color: flowStatusColor(order.tradeState.flowState, order.tradeState.payState),
                  }}
                >
                  {FLOW_STATE[order.tradeState.flowState]}
                </View>
              )}
            </View>

            <View className="normal">
              <View className="goods-info1">
                <View className="left">
                  <Text className="left1">
                    ￥<Text className="left2">{couponInfo.denomination}</Text>
                  </Text>
                  <Text className="left3">{this._buildFullBuyPrice(couponInfo)}</Text>
                </View>
                <View className="right">
                  <View className="right_lefts">
                    <View className="right_left">
                      <View className={couponInfo.couponType == 0 ? 'coupons' : 'coupon'}>
                        {COUPON_TYPE[couponInfo.couponType]}
                      </View>
                      <Text className="couponT">{this._buildStorename(couponInfo)}</Text>
                    </View>
                    {couponInfo.couponType != 2 && (
                      <Text className="couponText">{this._buildScope(couponInfo)}可用</Text>
                    )}
                    <Text className="couponText">{this._buildRangDay(couponInfo)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /***
   * 满减金额
   */
  _buildFullBuyPrice = (coupon) => {
    return coupon.fullBuyType === 0 ? '无门槛' : `满${coupon.fullBuyPrice}可用`;
  };

  /**
   * 优惠券使用店铺名称（暂时只有平台券）
   */
  _buildStorename = (coupon) => {
    let text = '';
    if (coupon.platformFlag === 1) {
      text = '全平台可用';
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
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 2) {
      scopeType = '品类：';
      text = '仅限';
      coupon.get('scopeNames').forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else if (coupon.scopeType == 3) {
      scopeType = '分类：';
      text = '仅限';
      coupon.scopeNames.forEach((value) => {
        let name = value ? '[' + value + ']' : '';
        text = `${text}${name}`;
      });
    } else {
      scopeType = '商品：';
      text = '部分商品';
    }
    return `${text}`;
  };
  /***
   * 生效时间
   */
  _buildRangDay = (coupon) => {
    return coupon.rangeDayType === 1
      ? `领取后${coupon.effectiveDays}天内有效`
      : `${moment(coupon.startTime).format('YYYY-MM-DD')}至${moment(coupon.endTime).format('YYYY-MM-DD')}`;
  };
}
