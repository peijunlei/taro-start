import {ScrollView, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import OrderItem from './components/item';
import ConfirmMask from '@/pages/common/modal/confrim-mask';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class shipRecord extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {tid, type} = getCurrentInstance().router.params;
    this.props.actions.init(tid, type);
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
    let {
      main,
      actions,
      actions: {action},
    } = this.props;
    const {orderType} = getCurrentInstance().router.params;

    return (
      <View className="shipRecord">
        {/*订单数据*/}
        <ScrollView
          scrollY
          style={{
            // @ts-ignore
            height:
              'calc(100vh - 56px - env(safe-area-inset-bottom))' ||
              'calc(100vh - 56px - constant(safe-area-inset-bottom))',
          }}
        >
          <View>
            {main?.tradeDilivery && main?.tradeDilivery.length > 0 ? (
              <View>
                {main?.tradeDilivery.map((order, index) => {
                  return (
                    <View key={index}>
                      <OrderItem order={order} index={index} />
                    </View>
                  );
                })}

                <View className="status">没有更多了</View>
              </View>
            ) : null}
          </View>
        </ScrollView>
        {main?.deliveryStatus && main.type != '1' && orderType !== '1' && orderType !== '2' ? (
          <View className="top_2">
            <View className="wan_sh" onClick={() => action.commonChange('main.showConfirmMask', true)}>
              <Text className="text_img">确认收货</Text>
            </View>
          </View>
        ) : null}
        <ConfirmMask
          isOpened={main?.showConfirmMask}
          title="确认收货"
          content="确认已收到全部货品？"
          confirmText="确定"
          cancelText="取消"
          onConfirm={() => {
            action.onConfirm(getCurrentInstance().router.params.tid);
            action.commonChange('main.showConfirmMask', false);
          }}
          onCancel={() => {
            action.commonChange('main.showConfirmMask', false);
          }}
        />
      </View>
    );
  }
}
