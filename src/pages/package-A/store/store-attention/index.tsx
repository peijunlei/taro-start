import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import List from './components/list';

import Bottom from './components/bottom';
import BuyStatus from './skeleton';
//@ts-ignore
// actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageAStoreStoreAttention extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.loadReducer();
  }
  componentDidMount() {
    this.props.actions.init();
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
      actions: {
        action: {commonChange},
      },
      main = {},
    } = this.props;
    const {ifModify, total} = main;
    let isReady = main && main.isReady;
    return main && isReady && !main.isLoading ? (
      <View className="store-attention">
        <View
          className="modify"
          onClick={() => {
            commonChange([
              {
                paths: 'main.ifModify',
                value: !ifModify,
              },
            ]);
          }}
        >
          {total !== 0 ? (ifModify ? '完成' : '编辑') : null}
        </View>

        <View style={{paddingBottom: 54}}>
          <List />
        </View>
        {ifModify && <Bottom />}
      </View>
    ) : (
      <BuyStatus />
    );
  }
}

//create by moon https://github.com/creasy2010/moon
