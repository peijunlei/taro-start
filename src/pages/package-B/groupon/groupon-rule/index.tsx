import {RichText, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {_} from 'wmkit';
import {store2Props} from './selectors';

import WMGrouponFooter from '@/pages/common/groupon-bar';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBGrouponGrouponRule extends Component<Partial<T.IProps>, any> {
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
    this.props.actions.init();
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
        <View className="packageBGrouponGrouponRule">
          {main.isLoadingFlag && <WMLoading />}
          <RichText
            style={{whiteSpace: 'break-spaces'}}
            nodes={_.formatRichText(main?.context)}
            space="nbsp"
          ></RichText>
          <WMGrouponFooter currTab="玩法介绍" />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
