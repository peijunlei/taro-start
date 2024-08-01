import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components';
import React, { Component, Fragment } from 'react';
import { getHashParam } from '@/utils/common-functions';
import { connect } from 'react-redux';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import  WMLoading  from '@/pages/common/loading';

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
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.action.cleanTimer();
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: { action },
    } = this.props;
    return (
      <View className='gift-card-detail _page'>
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
