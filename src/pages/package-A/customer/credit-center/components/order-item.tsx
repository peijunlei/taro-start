import * as T from '../types';
import { store2Props } from '../selectors';
import actions from '../actions/index';
import { View, Text, Image } from '@tarojs/components';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './order-item.less';
// import './style.less';
import { _ } from 'wmkit';
const noneImg = require('@/assets/image/default/no-goods-img.png');
import arrow from '@/assets/image/customer/credit/arrow.png';
type IOrderItemProps = T.IProps & T.IOrderItemProps;

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待支付';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
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
      return '#FF6600';
    }
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    //待发货
    return '#FF6600';
  } else if (status == 'DELIVERED') {
    //待收货
    return '#FF6600';
  } else if (status == 'CONFIRMED') {
    //已收货
    return '#333';
  } else if (status == 'COMPLETED') {
    //已完成
    return '#999';
  }
};

@connect<Partial<IOrderItemProps>, T.IOrderItemState>(store2Props, actions)
export default class OrderItem extends Component<Partial<IOrderItemProps>, T.IOrderItemState> {
  constructor(props: IOrderItemProps) {
    super(props);
  }

  render() {
    let { main, order, key, item } = this.props;
    const { historyUsedList } = main;
    const gifts = [];
    return (
      <View>
        <View
          className="credit-box"
          onClick={() => {
            if (item.outsideTradeFlag && item.outsideTradeUrl) {
              if (__TARO_ENV === 'h5') {
                window.location.href = item.outsideTradeUrl;
              } else {
                Taro.setStorageSync('movieOrderDetail', order.outsideTradeUrl);
                Taro.navigateTo({ url: `/pages/package-B/x-site/movie-order-detail/index` });
              }
            } else {
              Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${item.orderNo}` })
            }
          }}
        >
          <View className="user-order-item">
            <View className="user-order-item-link">
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View className="credit-order">订单号 {item.orderNo}</View>
              </View>
              {
                <View
                  className="status"
                  style={{
                    color: flowStatusColor(item.flowState, item.payOrderStatus),
                  }}
                >
                  {flowState(item.flowState, item.payOrderStatus)}
                </View>
              }
            </View>
            <View
              className="middle"
              onClick={() => {
                if (item.outsideTradeFlag && item.outsideTradeUrl) {
                  if (__TARO_ENV === 'h5') {
                    window.location.href = item.outsideTradeUrl;
                  } else {
                    Taro.setStorageSync('movieOrderDetail', item.outsideTradeUrl);
                    Taro.navigateTo({ url: `/pages/package-B/x-site/movie-order-detail/index` });
                  }
                } else {
                  Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${order.id}&type=pointsOrder` });
                }
              }}
            >
              <View className="pic">
                {item.urlList
                  ? item.urlList
                    .concat(gifts)
                    .filter((val, index) => index < 4)
                    .map((item) => <Image className="img-item" src={item ? item : noneImg} />)
                  : null}
              </View>
              <View className="right">
                {item.goodsNum}
                <Image className="icon" src={arrow} />
              </View>
            </View>
            <View className="bottom">
              <View style={{ flexDirection: 'row', paddingRight: '12px', color: '#FF6600' }}>
                <View className="bottomIcon">￥</View>
                <View className="bottomPrice">{_.addZero(item.orderOriginPrice)}</View>
              </View>
            </View>

            {historyUsedList.length - 1 != key && <View className="borderBottom"></View>}
          </View>
        </View>
      </View>
    );
  }
}
