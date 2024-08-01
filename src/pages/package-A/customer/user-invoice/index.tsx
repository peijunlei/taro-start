import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import InvoiceForm from './components/form';

import TopStatus from './components/top-status';

import Bottom from './components/bottom';

import License from './components/license';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class UserInvoice extends Component<Partial<T.IProps>, any> {
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

  componentDidShow() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  componentDidMount() {
    this.props.actions.init();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="userInvoice">
        {main && main.isLoadingList && <WMLoading />}
        <TopStatus />
        <InvoiceForm />
        <Bottom />
        {main?.isShowLicense ? <License /> : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
