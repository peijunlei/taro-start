import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderItem from './components/item';
import FormItem from '@/pages/common/form-item';
import ItemGift from './components/item-gift';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class shipRecord extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {oid, tid} = getCurrentInstance().router.params;
    this.props.actions.init(oid, tid);
  }
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {main = {}} = this.props;
    let {deliveryTime = '', logistics = {}, shippingItems = [], deliveryInfo, remark, giftItemList = []} =
      main.goodList || {};
    deliveryTime = deliveryTime || '';
    logistics = logistics || {};
    shippingItems = shippingItems || [];
    giftItemList = giftItemList || [];
    console.log('asdfasdfsdaf: ', deliveryInfo);
    return (
      <View className="packageACustomerUserInfoMain">
        {/*订单数据*/}
        <ScrollView scrollY>
          {deliveryInfo ? (
            <View className="box_ship">
              <View className="title">基本信息</View>
              <FormItem
                labelName="物流信息"
                textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                placeholder={deliveryInfo}
              />
              <FormItem
                labelName="备注"
                textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                placeholder={remark}
              />
            </View>
          ) : (
            <View className="box_ship">
              <FormItem
                labelName="发货日期"
                textStyle={{textAlign: 'right'}}
                placeholder={deliveryTime.split(' ')[0]}
              />
              <FormItem
                labelName="物流公司"
                textStyle={{textAlign: 'right'}}
                placeholder={logistics.logisticCompanyName}
              />
              <FormItem labelName="物流单号" textStyle={{textAlign: 'right'}} placeholder={logistics.logisticNo} />
            </View>
          )}
          <View>
            {shippingItems.length > 0 ? (
              <View>
                <View className="goods_list">
                  {shippingItems.map((order, index) => {
                    return (
                      <View key={index}>
                        <OrderItem order={order} index={index} />
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}
            {giftItemList.length ? (
              <View className="goods_list">
                {giftItemList.map((item, index1) => {
                  return (
                    <View key={index1} className="goods_list">
                      <ItemGift order={item} index={index1} />
                    </View>
                  );
                })}
              </View>
            ) : null}
            <View className="status">没有更多了</View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
