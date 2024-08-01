import {Image, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Nav from './components/nav';
import TobeEvalute from './components/tobe-evalute';
import ServiceEvalute from './components/service-evalute';
import Evalute from './components/evalute';
import notEval from '@/assets/image/goods/goods-detail/not-eval.png';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerEvaluateCenter extends Component<Partial<T.IProps>, any> {
  async componentDidShow() {
    const {main} = this.props;
    let {refresh} = getCurrentInstance().router.params;
    if (refresh) {
      this.props.actions.action.commonChange('main.refresh', !this.props.main.refresh);
    }
    await this.props.actions.init();
    this.props.actions.action.commonChange('main.isId', main?.preId || 0);
  }

  componentDidHide() {
    // 离开页面
    const {
      main: {isId},
    } = this.props;
    this.props.actions.action.commonChange([
      {
        paths: 'main.isId',
        value: 99,
      },
      {
        paths: 'main.preId',
        value: isId,
      },
    ]);
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
    let {actions, main} = this.props;
    return (
      <View className="evaluate-center">
        <Nav />
        {/*  待评价  */}
        {main?.isId == 0 && <TobeEvalute />}
        {/*  服务评价  */}
        {main?.isId == 1 && <ServiceEvalute />}
        {/*  已评价  */}
        {main?.isId == 2 && <Evalute />}
      </View>
    );
  }
}
