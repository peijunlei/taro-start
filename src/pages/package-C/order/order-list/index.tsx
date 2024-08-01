import {ScrollView, Text, View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderListTop from './components/order-list-top';
import OrderItem from './components/order-list-item';
import Blank from '@/pages/common/blank';
import {WMkit} from 'wmkit';
import api from 'api';

import OrderCateMask from './components/order-cate-mask';
import WMLoading from '@/pages/common/loading';
import {Modal} from '@wanmi/ui-taro';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginOrderList extends Component<Partial<T.IProps>, any> {
  scrollHeight = 0;
  componentWillMount() {
    Taro.removeStorageSync('mini::returnSuccessBackFlag');
  }
  async componentDidShow() {
    // let state = getCurrentInstance().router.params.status ? getCurrentInstance().router.params.status : null;
    let state = null;
    //tab切换后返回需要重新选中之前的tab
    const order_list_tab = Taro.getStorageSync('order_list_tab');
    if (order_list_tab) {
      state = order_list_tab.status;
    }
    this.props.actions.init(state ? state : '');
    Taro.removeStorageSync('mini::returnSuccessBackFlag');
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {main} = this.props || {};
    //@ts-ignore
    const isH5 = __TARO_ENV === 'h5';
    let displayStyle = {display: 'none'};
    if (!main || main.isLoading) {
      displayStyle = {display: 'block'};
    }
    const isShop = WMkit.isShop();
    let inviteeId = WMkit.inviteeId();
    return (
      main && (
        <View className="loginOrderList">
          <View style={displayStyle}>{main.isLoadingList && <WMLoading />}</View>
          {/*订单状态tab*/}
          <OrderListTop />
          {main?.showCateMask && <OrderCateMask />}
          {/*订单数据*/}
          <ScrollView scrollY onScrollToLower={this._onScrollToLower} className="scroll">
            <View>
              {main?.orders && main?.orders.length > 0 ? (
                <View>
                  {main?.orders.map((order, index) => {
                    return (
                      <View key={index}>
                        <OrderItem order={order} index={index} />
                      </View>
                    );
                  })}
                  {main?.orders.length != 0 && main.form.pageNum + 1 != main.total && (
                    <View className="status">加载中</View>
                  )}
                  {!main.isLoadingList && main?.orders.length != 0 && main.form.pageNum + 1 == main.total && (
                    <View className="status">没有更多了</View>
                  )}
                </View>
              ) : (
                !main.isLoadingList && (
                  <View className="not-orders-list">
                    <View className="current-wm-list-none">
                      <Image src={require('./img/order_null.png')} className="current-wm-none-img" mode="aspectFit" />
                      <Text className="current-wm-none-text">您暂时还没有订单哦</Text>
                    </View>
                    <View className="order-b-top">
                      <View className="top_btn">您可以</View>
                      <View
                        className="btn"
                        onClick={async () => {
                          if (isShop) {
                            Taro.navigateTo({
                              url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${inviteeId}`,
                            });
                          } else {
                            await Taro.navigateTo({
                              url: '/pages/package-B/goods/goods-list/index',
                            });
                          }
                        }}
                      >
                        <Text className="goods-btn-text">逛逛商品</Text>
                      </View>
                    </View>
                  </View>
                )
              )}
            </View>
          </ScrollView>
          <Modal
            visible={main.visible}
            title="取消订单"
            content="您确定要取消该订单?"
            onCancel={() => this.props.actions.goodsAction.commonChange('main.visible', false)}
            onOk={this.onConfirm}
          />
        </View>
      )
    );
  }

  //确认取消订单
  onConfirm = async () => {
    const {orders, tid} = this.props.main;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == tid) {
        orders.splice(i, 1);
      }
    }
    await api.tradeBaseController.cancel(tid);
    Taro.showToast({
      title: '取消成功',
      icon: 'none',
      duration: 2000,
    });
    // 关闭弹窗
    this.props.actions.goodsAction.commonChange('main.visible', false);
    //获取订单列表
    this.props.actions.goodsAction.query();
  };
  _onScrollToLower = () => {
    this.props.actions.goodsAction.nextPage();
  };
}
