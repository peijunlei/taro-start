import * as T from '../types';
import {store2Props} from '../selectors';
import actions from '../actions/index';
import {View, Text, Image, Button} from '@tarojs/components';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './item.less';
import {immutable} from 'wmkit';
type IOrderListProps = T.IProps & T.IOrderListProps;
import noneImg from '@/assets/image/coupon/empty.png';
import clearIcon from '@/assets/image/common/arrow.png';

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderList extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
  }

  render() {
    let {order} = this.props;
    let total = 0;
    const skuIdSet = immutable
      .fromJS(order.shippingItems)
      .concat(immutable.fromJS(order.giftItemList))
      .map((item) => {
        total += item.get('itemNum');
        return item.get('skuId');
      })
      .toSet();

    let {orderType} = Taro.getCurrentInstance().router.params || {};

    return (
      <View>
        <View className="user-box" key={order.id}>
          <View className="user-order-item">
            <View className="user-order-item-top">
              {/*{main.orderMType && main.orderMType == 'NORMAL_ORDER' ?*/}
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text className="name">{order.logistics?.logisticCompanyName}</Text>
                <Text className="grey">{order.logistics?.logisticNo}</Text>
              </View>
              {/*: null }*/}
              {order.status && order.status == 'SHIPPED' && order.deliverTime ? (
                <View style={{flexDirection: 'row', marginTop: '10px'}}>
                  <Text className="name1">发货时间</Text>
                  <Text className="name1">{order.deliverTime && order.deliverTime.split(' ')[0]}</Text>
                </View>
              ) : null}
            </View>
            <View
              onClick={() => {
                if (!['1', '2'].includes(orderType)) {
                  this._toShipList(order.deliverId);
                }
              }}
              className="img_box"
            >
              <View className="img-content">
                {order.shippingItems.concat(order.giftItemList).map((item, index) => {
                  return index < 4 ? (
                    <Image className="img-item" key={index} src={item.pic ? item.pic : noneImg} />
                  ) : null;
                })}
              </View>
              <View className="right-context">
                <View className="total-num">
                  <Text className="num">{skuIdSet.size}</Text>种<Text style={{marginLeft: '3px'}}>{''}</Text>共
                  <Text className="num">{total}</Text>件
                </View>
                {!['1', '2'].includes(orderType) && <Image src={clearIcon} style={{width: '12px', height: '12px'}} />}
              </View>
            </View>
            {!['1', '2'].includes(orderType) && (
              <View className="bottom">
                <View
                  className="btn"
                  onClick={() =>
                    this._toLogisticInfo(
                      order.deliverId,
                      order.thirdPlatformType,
                      order.logistics?.buyerId,
                      order.logistics?.thirdPlatformOrderId,
                    )
                  }
                >
                  物流信息
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
  _toShipList = (deliverId) => {
    const {orderId} = this.props.main;
    Taro.navigateTo({url: `/pages/package-C/order/ship-list/index?oid=${orderId}&tid=${deliverId}`});
  };
  _toLogisticInfo = (deliverId, thirdPlatformType, buyerId, thirdPlatformOrderId) => {
    const {orderId, type} = this.props.main;
    Taro.navigateTo({
      url: `/pages/package-C/order/logistics-info/index?oid=${orderId}&tid=${deliverId}&type=${type}&thirdPlatformType=${thirdPlatformType}&buyerId=${buyerId}&thirdPlatformOrderId=${thirdPlatformOrderId}`,
    });
  };
}
