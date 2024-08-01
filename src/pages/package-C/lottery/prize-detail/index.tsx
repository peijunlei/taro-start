import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import PrizeStatus from './components/prize-status';
import PrizeBuyerInfo from './components/prize-buyer-detail-info';
import PrizeGoods from './components/prize-goods';
import PrizeInfo from './components/prize-info';
import WMLoading from '@/pages/common/loading';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MyPrize extends Component<Partial<T.IProps>, any> {
  componentDidShow() {
    const current = getCurrentInstance().router;
    const onShow = __TARO_ENV == 'h5' ? (current.onShow as any) : current.params;
    const params =
      __TARO_ENV == 'h5' ? getHashParam<{id: string; }>(onShow && onShow.split('.')[0]) : onShow;
    const id = params.id;
    this.props.actions.init(id);
  }
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  componentWillUnmount() {
    this.props.actions.clean();
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

  render() {
    const {main = {} as any} = this.props;
    const {isReady} = main;
    return main && isReady ? (
      <ScrollView scrollY className="packageAPrizeDetailMain">
        <PrizeStatus />
        {/*收货人信息*/}
        <PrizeBuyerInfo />
        <PrizeGoods />
        <PrizeInfo />
      </ScrollView>
    ) : (
      <WMLoading />
    );
  }
}
