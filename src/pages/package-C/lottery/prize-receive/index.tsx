import {View, Text, Image, RichText} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import PrizeReceiveAddress from './components/prize-receive-address';
import PrizeReceiveGoods from './components/prize-receive-goods';
import PrizeReceiveBtn from './components/prize-receive-btn';
import WMLoading from '@/pages/common/loading';

import ruleEmpty from '@/assets/image/prize-draw/rule-empty.png';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MyPrize extends Component<Partial<T.IProps>, any> {
  async componentDidShow() {
    const current = getCurrentInstance().router;
    const onShow = __TARO_ENV == 'h5' ? (current.onShow as any) : current.params;
    const params =
      __TARO_ENV == 'h5' ? getHashParam<{id: string; }>(onShow && onShow.split('.')[0]) : onShow;
    const id = params.id;
    await this.props.actions.init(id);
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
    return (
      <View className="_page">
        {main && isReady ? (
          <View className="packageAPrizeReceiveMain">
            <View className="confirm-con">
              <PrizeReceiveAddress />
              <PrizeReceiveGoods />
              <PrizeReceiveBtn />
            </View>
          </View>
        ) : (
          <WMLoading />
        )}
      </View>
    );
  }
}
