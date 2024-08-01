import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import SearchBar from './components/search-bar';

import History from './components/history';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class StoreSearch extends Component<Partial<T.IProps>, any> {
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
  componentDidShow() {
    let {storeId} = getCurrentInstance().router.params;
    this.props.actions.init(storeId);
    /**店铺pv/uv埋点*/
    this.props.actions.pvUvStaticsMyPvUvStatis(storeId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="StoreSearch">
        <SearchBar />
        <History />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
