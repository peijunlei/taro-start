import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../css/style.less';
import {immutable} from 'wmkit'
const noneImg = require('@/assets/image/default/no-goods-img.png');
type IOrderListProps = T.IProps & T.IOrderListProps;

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState, payTypeId) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待付款';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status != 'VOID' && payState == 'NOT_PAID' && payTypeId == '0') {
    return '待付款';
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
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

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderListItem extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {main, order, index} = this.props;
    const opeBtnArr = this.getOpeBtnArr(immutable.fromJS(main?.orders[index]));
    const gifts = (order && order.gifts) || [];
    return (
      <View>
        <View className="user-box" key={order.id}>
          <View className="user-order-item">
            <View className="user-order-item-link">
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View className="dinapu">
                  订单积分
                  <Text className="points-num"> {order.tradePrice.points || 0}</Text>
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
            <View
              className="middle"
              onClick={() => {
                Taro.navigateTo({url: `/pages/package-C/order/order-detail/index?id=${order.id}&type=pointsOrder`});
              }}
            >
              <View className="pic">
                {order
                  ? order.tradeItems
                      .concat(gifts)
                      .filter((val, index) => index < 4)
                      .map((item) => <Image className="img-item" key={item.oid} src={item.pic ? item.pic : noneImg} />)
                  : null}
              </View>
              <View className="right">
                {order ? order.tradeItems.concat(gifts).length : null}
                <Image className="icon" src={require('../img/jiantou.png')} />
              </View>
            </View>
            <View className="bottom">
              <View style={{flexDirection: 'row', paddingRight: '12px'}}>
                {opeBtnArr.available.length > 0
                  ? opeBtnArr.available.map((availableButton) => {
                      return (
                        <View
                          key={opeBtnArr.id}
                          className={availableButton == '确认收货' ? 'btn-delivery' : 'btn'}
                          onClick={() => {
                            this._operationButtons(order.id, availableButton);
                          }}
                        >
                          {availableButton}
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /**
   * 订单可用操作按钮
   */
  getOpeBtnArr(order) {
    let orderButtons = {
      available: [],
      id: '',
    };
    let virtualFlag = order.get('orderTag')?.get('electronicCouponFlag') || order.get('orderTag')?.get('virtualFlag');

    if (order) {
      const flow = order.getIn(['tradeState', 'flowState']);
      const pay = order.getIn(['tradeState', 'payState']);

      //取消订单
      const cancelButtons = [
        ['INIT', 'NOT_PAID'],
        ['AUDIT', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID'],
      ];
      //付款
      const payButtons = [
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED_PART', 'NOT_PAID'],
        ['DELIVERED', 'NOT_PAID'],
        ['CONFIRMED', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID'],
      ];
      //确认收货
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED'],
      ];
      //退货退款
      let canReturnFlag = order.get('canReturnFlag');

      if (order.getIn(['tradeState', 'flowState']) == 'GROUPON') {
        // 待成团单，不展示退货退款
        canReturnFlag = false;
      }

      let availables = [];
      if (payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('去付款');
      }
      let confirmGoods = confirmButtons.filter((button) => this._calc(button)(flow, pay)).length > 0;
      if (confirmGoods && !virtualFlag) {
        availables.push('确认收货');
      }
      if (cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('取消订单');
      }
      // 退货退款
      if (canReturnFlag) {
        availables.push('退货退款');
      }
      orderButtons['available'] = availables;
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }
  /**
   * 计算订单有效按钮
   */
  _calc = (button: Array<string>) => {
    return function(flow: string, pay: string) {
      return button[0] === flow && button[1] === pay;
    };
  };
  /**
   * 订单按钮event handler
   */
  _operationButtons = async (tid, button) => {
    if (button == '确认收货') {
      Taro.navigateTo({
        url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=${0}`,
      });
    }
  };
}
