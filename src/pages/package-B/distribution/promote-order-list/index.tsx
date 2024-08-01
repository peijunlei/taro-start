import {ScrollView, View} from '@tarojs/components';
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
export default class PromoteOrderList extends Component<Partial<T.IProps>, any> {
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
    let {main} = this.props;
    return main ? (
      <View className="loginOrderList">
        <View style={main.isLoadingList?{display:'block'}:{display:'none'}}>{main.isLoadingList && <WMLoading />}</View>
        {/*订单状态tab*/}
        <OrderListTop />
        {/*订单数据*/}
        <ScrollView scrollY lowerThreshold={300} onScrollToLower={this._onScrollToLower} className="scroll">
          <View>
            {main.orders && main.orders.length > 0 ? (
              <View>
                {main.orders.map((order, index) => {
                  return (
                    <View key={index}>
                      <OrderItem order={order} key={index} index={index} />
                    </View>
                  );
                })}
                {main.form.pageNum + 1 != main.totalPages && <View className="status">加载中</View>}
                {main.form.pageNum + 1 == main.totalPages && !main.isLoadingList && (
                  <View className="status">没有更多了</View>
                )}
              </View>
            ) : (
              !main.isLoadingList && (
                <View>
                  <Blank
                    content="您暂时还没有订单哦"
                    img={require('./img/order_null.png')}
                    imgStyle={{width: '208rpx', height: '208rpx'}}
                  />
                </View>
              )
            )}
          </View>
        </ScrollView>
      </View>
    ) : null;
  }
  _onScrollToLower = () => {
    this.props.actions.goodsAction.nextPage();
  };
}
