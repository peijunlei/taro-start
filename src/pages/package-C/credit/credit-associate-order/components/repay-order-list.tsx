import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Image} from '@tarojs/components';
import WMListView from '@/pages/common/list-view';
import {Checkbox} from '@wanmi/ui-taro';
import {_} from 'wmkit';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './repay-order-list.less';

const noneImg = require('@/assets/image/default/no-goods-img.png');
import arrow from '@/assets/image/customer/credit/arrow.png';

const emptyImage = require('@/assets/image/groupon/empty.png');

type IRepayOrderListProps = T.IProps & T.IRepayOrderListProps;

const flowState = (status, payState, paymentOrder, returningFlag) => {
  if (returningFlag) {
    //如果存在正在退款中的订单则不可点击
    return '退货/退款中';
  }
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
  } else if (status == 'AUDIT' && payState == 'NOT_PAID' && paymentOrder == 'PAY_FIRST') {
    return '待付款';
  } else if (status == 'AUDIT' && payState == 'UNCONFIRMED' && paymentOrder == 'PAY_FIRST') {
    return '待付款';
  } else if (status == 'WAIT_PAY_EARNEST' && payState == 'NOT_PAID') {
    return '待支付定金';
  } else if (
    (status == 'WAIT_PAY_TAIL' && payState == 'PAID_EARNEST') ||
    (status == 'AUDIT' && payState == 'PAID_EARNEST')
  ) {
    return '待支付尾款';
  } else if (status == 'CONFIRMED') {
    return '已收货';
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

@connect<Partial<IRepayOrderListProps>, T.IRepayOrderListState>(store2Props, actions)
export default class RepayOrderList extends Component<Partial<IRepayOrderListProps>, T.IRepayOrderListState> {
  constructor(props: IRepayOrderListProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View>
        <WMListView
          url={'/credit/repay/order-list'}
          getData={(list) => action.initOrderList(list)}
          dataPath={['tradePage']}
          noneContent={'暂无授信支付订单哦~'}
          noneImg={emptyImage}
          style={{height: '100vh', paddingBottom: '50px'}}
        >
          {main?.repayOrderList.map((item, index) => {
            const gifts = item.gifts;
            const returning = item.returningFlag
              ? '退货/退款中'
              : flowState(item.tradeState.flowState, item.tradeState.payState, item.paymentOrder, item.returningFlag);
            return (
              <View className="creditOrderItem" key={index}>
                <View className="user-credit">
                  <View className="order-check-view">
                    <Checkbox
                      disabled={!item.canCheckFlag}
                      checked={main?.selectedOrderIds.includes(item.id) || false}
                      onClick={(checked) => {
                        if (!item.canCheckFlag) {
                          Taro.showToast({title: '未发货和退货退款中的订单不可勾选', icon: 'none', duration: 2000});
                        } else {
                          action.checkOrder(item.id, checked);
                        }
                      }}
                    />
                  </View>
                  <View className="user-order-item">
                    <View className="user-order-item-link">
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View className="dinapu">订单号 {item.id}</View>
                      </View>
                      <View
                        className="status"
                        style={{
                          color: flowStatusColor(item.tradeState.flowState, item.tradeState.payState),
                        }}
                      >
                        {returning}
                      </View>
                    </View>
                    <View
                      className="middle"
                      onClick={() => {
                        Taro.navigateTo({url: `/pages/package-C/order/order-detail/index?id=${item.id}`});
                      }}
                    >
                      <View className="pic">
                        {item
                          ? item.tradeItems
                              .concat(gifts)
                              .filter((val, index) => index < 4)
                              .map((item) => (
                                <Image className="img-item" key={item.oid} src={item.pic ? item.pic : noneImg} />
                              ))
                          : null}
                      </View>
                      <View className="right">
                        {item ? item.tradeItems.length : null}
                        <Image className="icon" src={arrow} />
                      </View>
                    </View>
                    <View className="bottom">
                      <View style={{flexDirection: 'row', paddingRight: '12px'}}>
                        <View className="bottomIcon">￥</View>
                        <View style={{color: '#ff6600'}}>{_.addZero(item.tradePrice.totalPrice)}</View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </WMListView>
      </View>
    );
  }
}
