import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import './index.less';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PayDetail extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let tid = getCurrentInstance().router.params.tid ? getCurrentInstance().router.params.tid : '';
    this.props.actions.init(tid);
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
    const {payDetail = {}} = main;
    return (
      <View style={{background: '#f5f5f5', height: '100vh'}}>
        <Info />
        {payDetail.payOrderStatus && payDetail.payOrderStatus == 1 && payDetail.flowState !== 'VOID' ? (
          <View className="order-button-wrap">
            <View
              className={'btn-warning'}
              onClick={() => {
                this._toPay(getCurrentInstance().router.params.tid, payDetail.payType);
              }}
            >
              {'去付款'}
            </View>
          </View>
        ) : null}
        {main?.isLoadingFlag && <WMLoading />}
      </View>
    );
  }
  /**
   * 去支付
   */
  _toPay = (tid: string, payType: string) => {
    const {payDetail = {}} = (this.props && this.props.main) || {};
    if (payDetail.totalPrice == '0.00') {
      //0元订单直接调默认支付接口
      this.props.actions.action.defaultPay(tid);
    }
    if (payType == '1') {
      Taro.navigateTo({url: `/pages/package-C/order/fill-payment/index?tid=${tid}`});
    } else if (payType == '0') {
      Taro.navigateTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`});
    }
  };
}
//create by moon https://github.com/creasy2010/moon
