import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View} from '@tarojs/components';
import React, {Component} from 'react';
import {getHashParam} from '@/utils/common-functions';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMLoading from '@/pages/common/loading';

import BlessInfo from './components/bless-info';

import './index.less';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GiftCardBless extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    // 主题色
  }
  componentDidShow() {
    const current = getCurrentInstance();
    const param = current.router.params;
    let id = param.id ?? this.props.main?.id;
    const userGiftCardId = param.userGiftCardId??this.props.main?.userGiftCardId;
    this.props.actions.init(id,userGiftCardId);
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
          <>
            {main?.isReady ? <WMLoading /> : null}
            <BlessInfo />
          </>
        ) : null}
      </View>
    );
  }
}
