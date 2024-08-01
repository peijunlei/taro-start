import {ScrollView, Text, View, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderListTop from './components/order-list-top';
import OrderItem from './components/order-list-item';
import Blank from '@/pages/common/blank';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class RefundList extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let rids = getCurrentInstance().router.params.rids;
    this.props.actions.init(rids);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {main} = this.props;

    return (
      main && (
        <View className="refund-loginOrderList">
          {/*订单状态tab*/}
          <OrderListTop />
          {/*订单数据*/}
          <ScrollView scrollY onScrollToLower={this._onScrollToLower} className="scroll">
            <View>
              {main?.orders && main?.orders.length > 0 ? (
                <View>
                  {main?.orders.map((order: any) => {
                    return <OrderItem refundOrder={order} key={order.id} />;
                  })}
                  {/* {main?.orders.length != 0 && main.form.pageNum + 1 != main.total ? (
                    <View className="status">加载中</View>
                  ) : null} */}
                  {!main.isLoadingList && main?.orders.length != 0 && main.form.pageNum + 1 == main.total ? (
                    <View className="status">没有更多了</View>
                  ) : null}
                </View>
              ) : (
                !main.isLoadingList && (
                  <View>
                    <View className="refund-wm-list-none">
                      <Image src={require('./img/order_null.png')} className="refund-wm-none-img" mode="aspectFit" />
                      <Text className="refund-wm-none-text">您暂时还没有订单哦</Text>
                    </View>
                    <View className="refund-top">
                      <View className="top_btn">您可以</View>
                      <View
                        className="btn"
                        onClick={async () => {
                          await Taro.navigateTo({
                            url: '/pages/package-B/goods/goods-list/index',
                          });
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
          {main.isLoadingList ? <WMLoading /> : null}
        </View>
      )
    );
  }
  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}
