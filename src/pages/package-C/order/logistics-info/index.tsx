import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import FormItem from '@/pages/common/form-item';
import ItemGift from './components/item-gift';
import Blank from '@/pages/common/blank';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LogisticsInfo extends Component<Partial<T.IProps>, any> {
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
  componentDidMount() {
    const {
      oid,
      tid,
      type,
      thirdPlatformType,
      buyerId,
      thirdPlatformOrderId,
      refId,
      logisticsCode,
      logisticsNo,
      logisticsCompany,
      deliveryTimeOfString,
    } = getCurrentInstance().router.params;
    const prizeType = type;
    this.props.actions.init(
      oid,
      tid,
      type,
      thirdPlatformType,
      buyerId,
      thirdPlatformOrderId,
      refId,
      prizeType,
      logisticsCode,
      logisticsNo,
      logisticsCompany,
      deliveryTimeOfString,
    );
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {main} = this.props;
    return (
      <View className="logisticsInfo">
        {/*订单数据*/}
        <ScrollView scrollY>
          <View>
            {main?.goodList.deliveryInfo ? (
              <View className="box">
                <View className="title">基本信息</View>
                <FormItem
                  labelName="物流信息"
                  textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                  placeholder={main?.goodList.deliveryInfo}
                />
                <FormItem
                  labelName="备注"
                  textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                  placeholder={main?.goodList.remark}
                />
              </View>
            ) : (
              <View className="box">
                {/* <View className="title">基本信息</View> */}
                <FormItem
                  labelName="发货日期"
                  textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                  placeholder={main?.goodList.deliveryTime?.split(' ')?.[0]}
                />
                <FormItem
                  labelName="物流公司"
                  textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                  placeholder={main?.goodList.logistics.logisticCompanyName}
                />
                <FormItem
                  labelName="物流单号"
                  textStyle={{textAlign: 'right', fontWeight: '500', color: '#333'}}
                  placeholder={main?.goodList.logistics.logisticNo}
                />
              </View>
            )}
          </View>
          <View>
            {main?.detail && main?.detail.length > 0 ? (
              <View className="goods_list">
                <View className="title">物流详情</View>
                {main?.detail.map((item, index1) => {
                  return (
                    <View key={index1} className="goods_list">
                      <ItemGift order={item} index={index1} />
                    </View>
                  );
                })}
              </View>
            ) : (
              <Blank
                content="暂无相关物流信息"
                img={require('./img/empty.png')}
                imgStyle={{width: '208rpx', height: '208rpx'}}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
