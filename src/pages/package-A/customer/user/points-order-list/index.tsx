import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderListTop from './components/order-list-top';
import OrderItem from './components/order-list-item';
import CouponItem from './components/coupon-order-list-item';
import WMListView from '@/pages/common/list-view';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PointsOrderList extends Component<Partial<T.IProps>, any> {
  config = {
    navigationBarTitleText: '积分订单',
  };
  componentDidMount() {}
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  async componentDidShow() {
    let state = getCurrentInstance().router.params.status ? getCurrentInstance().router.params.status : null;
    this.props.actions.init(state ? state : '');
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main = {
        form: {orderType: 'POINTS_ORDER', keywords: ''},
      },
      actions: {
        goodsAction: {commonChange},
      },
    } = this.props;

    return (
      <View className="points-OrderList">
        {/*订单状态tab*/}
        <OrderListTop />
        {/*订单数据*/}
        <WMListView
          url="/points/trade/page"
          params={main.form}
          noneContent={'您暂时还没有订单哦'}
          style={{height: 'calc(100vh - 44px)'}}
          getData={(list, total) => {
            commonChange([
              {
                paths: 'main.orders',
                value: list,
              },
            ]);
          }}
        >
          {main.orders &&
            main.orders.length > 0 &&
            main.orders.map((item, index) => {
              return (
                <View key={index}>
                  {item.pointsOrderType == 'POINTS_COUPON' ? (
                    <CouponItem order={item} index={index} />
                  ) : (
                    <OrderItem order={item} index={index} />
                  )}
                </View>
              );
            })}
        </WMListView>
      </View>
    );
  }
}
