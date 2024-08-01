import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import AnonymousEval from './components/anonymous-eval';
import FindAnonymousEval from './components/find-anonymous-eval';
import { PrivacyModal } from '@/pages/common';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerEvaluateDrying extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    const {storeId, orderId, goodsInfoId, evaluateType} = getCurrentInstance().router.params;
    const current = getCurrentInstance();
    const url = __TARO_ENV === 'h5' ? current?.page?.path : current?.router?.path;
    if (url.indexOf('/pages/package-A/customer/evaluate-drying/index') > -1) {
      //更新标题
      if (evaluateType == '2') {
        Taro.setNavigationBarTitle({
          title: '评价详情',
        });
      } else {
        Taro.setNavigationBarTitle({
          title: '评价/晒单',
        });
      }
    }
    this.props.actions.init({storeId, orderId, goodsInfoId, evaluateType});
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  render() {
    let { main } = this.props;
    const {evaluateType} = getCurrentInstance().router.params;
    return (
      main?.isReady && <View className="packageACustomerEvaluateDrying">
        {evaluateType == '2' ? <FindAnonymousEval /> : <AnonymousEval />}
        <PrivacyModal />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
