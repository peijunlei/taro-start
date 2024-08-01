import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import {getHashParam} from '@/utils/common-functions';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {WMLoading} from '@/pages/common';

import LoginInfo from './components/login-info';

import './index.less';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GiftCardLogin extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    // 主题色
  }
  componentDidShow() {
    if (Taro.getEnv() === 'WEAPP') {
      Taro.hideHomeButton();
    }
    const current = getCurrentInstance();
    const {onShow} = current.router;
    // 解决taro h5中 didshow偶发的无法获取路由传参的问题
    // 解决首页进入商品详情-点击商品数-点击商品进入详情-回退两次 页面一直加载；
    const param = getHashParam<{id: string}>(onShow.split('.')[0]);
    let id = param.id ?? this.props.main?.id;
    this.props.actions.init(id);
  }

  componentWillUnmount() {
    this.props.actions.action.cleanTimer();
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;
    return (
      <View className="gift-card-detail _page">
        {main ? (
          <Fragment>
            {main?.isReady ? <WMLoading /> : null}
            <LoginInfo />
          </Fragment>
        ) : null}
      </View>
    );
  }
}
