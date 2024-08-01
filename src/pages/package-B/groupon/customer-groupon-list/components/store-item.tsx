import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import './store-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import SKUItem from './sku-item';
import WMButton from '@/pages/common/button';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import * as T from '@/pages/package-B/groupon/customer-groupon-list/types';
type IListProps = T.IProps & T.IListProps;
const GROUPON_STATE = {
  0: '待支付',
  1: '拼团中，已支付',
  2: '拼团成功，已支付',
  3: '拼团失败，金额退回',
  4: '拼团失败，订单未支付',
};

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class StoreItem extends Component<Partial<IListProps>, T.IListState> {
  constructor(props) {
    super(props);
  }

  async onPullDownRefresh() {
    await this.props.actions.reload();
    Taro.stopPullDownRefresh();
  }

  render() {
    let {main} = this.props;
    const item = this.props.storeInfo;
    const tradeItem = item && item.tradeItems[0] ? item.tradeItems[0] : null;
    const grouponInstance = item && item.grouponInstance;
    //拼团结束时间
    const orderStatus = this._orderStatus(item);
    let endTime;
    let countDown_labelText;
    if (orderStatus === 0) {
      endTime = item.orderTimeOut && moment(item.orderTimeOut);
      countDown_labelText = '支付倒计时:';
    } else {
      endTime = grouponInstance && moment(grouponInstance.endTime);
      countDown_labelText = '拼团倒计时';
    }
    return (
      <View
        className="store-wrap"
        onClick={(e) => {
          e.stopPropagation();
          this._handLink(item);
        }}
      >
        <View className="store-head">
          <View className="title">{item.supplier.storeName}</View>
          <View className="status">{GROUPON_STATE[this._orderStatus(item)]}</View>
        </View>

        <SKUItem goodsInfo={tradeItem} totalPrice={item.tradePrice.totalPrice}></SKUItem>
        {(this._orderStatus(item) == 0 || (this._orderStatus(item) == 1 && grouponInstance)) && (
          <View className="groupon-list-bottom">
            <View className="groupon-list-bottom-left">
              <View className="time">{countDown_labelText}</View>
              {
                <CountDown
                  overHandler={async () => {
                    await this.props.actions.reload();
                  }}
                  visible={endTime && main.serverTime}
                  theme={'black'}
                  allowFontScaling={false}
                  numberOfLines={1}
                  groupFlag={true}
                  showTimeDays={false}
                  timeOffset={moment(endTime)
                    .diff(moment(main.serverTime), 's')
                    .toFixed(0)}
                />
              }
            </View>
            {this._orderStatus(item) === 1 && grouponInstance && (
              <WMButton theme={'primary'}>
                还差{grouponInstance.grouponNum - grouponInstance.joinNum}人，邀请参团
              </WMButton>
            )}
          </View>
        )}
      </View>
    );
  }

  _handLink = (order) => {
    const orderStatus = this._orderStatus(order);
    if (orderStatus == 0) {
      Taro.navigateTo({url: `/pages/package-C/order/order-list/index?status=payState-NOT_PAID`});
    } else if (orderStatus == 1) {
      Taro.navigateTo({
        url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${order.tradeGroupon.grouponNo}`,
      });
    } else {
      Taro.navigateTo({url: `/pages/package-C/order/order-detail/index?id=${order.id}`});
    }
  };

  /**
   * 拼团状态
   */
  _orderStatus = (order) => {
    let {main} = this.props;
    let text = 0;

    if (order.tradeGroupon && order.tradeState) {
      let gs = order.tradeGroupon.grouponOrderStatus;
      let ps = order.tradeState.payState;
      // 待支付
      if (gs === 1 && ps === 'NOT_PAID') {
        if (order.orderTimeOut && moment(main.serverTime).isAfter(moment(order.orderTimeOut))) {
          text = 4;
        } else {
          text = 0;
        }
      }
      // 拼团中，已支付拼团中，已支付
      if (gs === 1 && ps === 'PAID') {
        if (
          order.grouponInstance &&
          order.grouponInstance.endTime &&
          moment(main.serverTime).isAfter(moment(order.grouponInstance.endTime))
        ) {
          text = 3;
        } else {
          text = 1;
        }
      }
      // 拼团成功，已支付
      if (gs === 2 && ps === 'PAID') {
        if (
          order.grouponInstance &&
          order.grouponInstance.endTime &&
          moment(main.serverTime).isAfter(moment(order.grouponInstance.endTime))
        ) {
          text = 3;
        } else {
          text = 2;
        }
      }
      // 拼团失败，金额退回
      if (gs === 3 && ps === 'PAID') {
        text = 3;
      }
      // 拼团失败，订单未支付
      if (gs === 3 && ps === 'NOT_PAID') {
        text = 4;
      }
    }

    return text;
  };
}

//create by moon https://github.com/creasy2010/moon
