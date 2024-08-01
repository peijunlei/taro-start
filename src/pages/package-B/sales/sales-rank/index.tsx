import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import SalesRankList from './components/sales-rank-list';

import SalesRankMyRank from './components/sales-rank-my-rank';

import Tab from './components/tab';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBSalesSalesRank extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
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
      actions: {action},
      main,
    } = this.props;

    return (
      main && (
        <View className="packageBSalesSalesRank">
          {main?.isLoadingList && <WMLoading />}
          <Tab />
          <SalesRankMyRank />
          <SalesRankList />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
