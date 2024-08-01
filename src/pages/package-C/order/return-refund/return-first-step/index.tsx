import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import '../index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from '../selectors';

// import ReturnSkusBox from './components/return-skus-box';
import ReturnSkusBox from '../skus-list';
import ReturnWay from './components/return-way';
import WMLoading from '@/pages/common/loading';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCReturnRefund extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let tid = getCurrentInstance().router.params.tid ? getCurrentInstance().router.params.tid : '';
    let skuId = getCurrentInstance().router.params.skuId ? getCurrentInstance().router.params.skuId : '';
    this.props.actions.init(tid, skuId);
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
  componentDidShow() {
    let tid;
    let skuId;
    if (__TARO_ENV === 'h5') {
      const href = window.location.href;
      const program = getHashParam<{id: string}>(href);
      tid = program.tid ? program.tid : '';
      skuId = program.skuId ? program.skuId : '';
    } else {
      tid = getCurrentInstance().router.params.tid ? getCurrentInstance().router.params.tid : '';
      skuId = getCurrentInstance().router.params.skuId ? getCurrentInstance().router.params.skuId : '';
    }

    this.props.actions.init(tid, skuId);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;

    return (
      <View className="packageCReturnRefund">
        <ReturnSkusBox main={main} action={action} ischeck={false} step="one" />
        <ReturnWay returnSkuSecond={action.returnSkuSecond} />
        {main.isLoading ? <WMLoading /> : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
