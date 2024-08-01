import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {_, WMkit} from 'wmkit';
import '../css/style.less';
import Price from '@/pages/common/goods/price';
const noneImg = require('../img/none.png');
type IOrderListProps = T.IProps & T.IOrderListProps;

/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const FLOW_STATE = {
  INIT: '待审核',
  AUDIT: '待发货',
  DELIVERED_PART: '待发货',
  DELIVERED: '待收货',
  CONFIRMED: '已收货',
  COMPLETED: '已完成',
  VOID: '已作废',
};
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

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderList extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {main, order, index, inviteeShopName} = this.props;
    const gifts = (order && order.gifts) || [];
    const isShowPurchase = order.buyer.id == order.inviteeId;
    return (
      <View>
        <View className="promote-order-list_user-box" key={order.id}>
          <View className="user-order-item">
            <View className="user-order-item-link">
              <View
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                // onClick={() =>
                //   Taro.navigateTo({url: `/pages/package-A/store/store-main/index?storeId=${order.supplier.storeId}`})
                // }
              >
                {order.platform != 'CUSTOMER' && <Image className="icon" src={require('../img/dai.png')} />}
                {order.supplier.isSelf == true ? <View className="ziying">自营</View> : null}
                <View className="dinapu">
                  <Text className="name"> {order.supplier.storeName}</Text>
                </View>
                <Image className="icon" src={require('../img/jiantou.png')} />
              </View>

              {order && (
                <View
                  className={
                    order.tradeState.flowState == 'COMPLETED' ||
                    order.tradeState.flowState == 'CONFIRMED' ||
                    order.tradeState.flowState == 'VOID'
                      ? 'status'
                      : 'status2'
                  }
                >
                  {FLOW_STATE[order.tradeState.flowState]}
                </View>
              )}
            </View>
            <View
              className="middle"
              onClick={() => {
                Taro.navigateTo({url: `/pages/package-C/order/order-detail/index?id=${order.id}&type=promotionOrder`});
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
              <View className="price">
                <View className="price-box">
                  <Price price={order.tradePrice.totalPrice} />
                </View>
                {order.commission
                  ? order.commission != 0 && (
                      <View className="commission">
                        <Text className="money2">/预计可赚</Text>
                        <Text className="money">￥{_.addZero(order.commission)}</Text>
                      </View>
                    )
                  : null}
              </View>
              <View style={{flexDirection: 'row'}}>
                {isShowPurchase && (
                  <View style={{flexDirection: 'row'}}>{isShowPurchase && <View className="promote-btn">自购</View>}</View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
