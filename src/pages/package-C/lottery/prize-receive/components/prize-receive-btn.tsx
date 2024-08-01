import {View} from '@tarojs/components';
import React, {Component} from 'react';
import * as T from '../types';
import './prize-receive-btn.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {debounce} from 'lodash';

type IPrizeReceiveBtnProps = T.IProps & T.IPrizeReceiveBtnProps;

@connect<Partial<IPrizeReceiveBtnProps>, T.IPrizeReceiveBtnState>(store2Props, actions)
export default class PrizeReceiveBtn extends Component<Partial<IPrizeReceiveBtnProps>, T.IPrizeReceiveBtnState> {
  constructor(props: IPrizeReceiveBtnProps) {
    super(props);
  }
  render() {
    let {
      actions: {action},
      main: {prizeInfo},
    } = this.props;
    return (
      prizeInfo.redeemPrizeStatus === 0 && (
        <View className="prize-recevie-btn-box">
          <View className="prize-recevie-button">
            <View className="btn" onClick={debounce(() => action.submit(), 600)}>
              确认领取
            </View>
          </View>
        </View>
      )
    );
  }
}
