import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Info from './components/info';
import {getHashParam} from '@/utils/common-functions';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderFinanceRefundRecord extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let {rid, returnFlowState} = getCurrentInstance().router.params;
    const current = getCurrentInstance();
    const {onShow} = current.router;
    const param = getHashParam<{rid: string; returnFlowState: string}>(onShow.split('.')[0]);
    this.props.actions.init(rid || param.rid, returnFlowState || param.returnFlowState);
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
      <View className="packageCOrderFinanceRefundRecord">
        <Info />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
