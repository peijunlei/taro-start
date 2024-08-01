import {Image, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import BuyList from './components/buy-list';
import gif from '@/assets/image/goods/rushing.gif';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsBuyIn extends Component<Partial<T.IProps>, any> {
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
    let {flashSaleGoodsId, flashSaleGoodsNum} = getCurrentInstance().router.params;
    this.props.actions.init(flashSaleGoodsId, flashSaleGoodsNum);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="goodsBuyIn">
        <BuyList />
        {/* gif */}
        {/* <Image src={gif} className="gif" /> */}
        <View
          style={{
            background: 'url(' + gif + ')',
            backgroundSize: 'cover',
          }}
          className="gif"
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
