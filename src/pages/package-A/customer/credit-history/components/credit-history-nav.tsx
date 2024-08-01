import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './credit-history-nav.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type ICreditHistoryNavProps = T.IProps & T.ICreditHistoryNavProps;

@connect<Partial<ICreditHistoryNavProps>, T.ICreditHistoryNavState>(store2Props, actions)
export default class CreditHistoryNav extends Component<Partial<ICreditHistoryNavProps>, T.ICreditHistoryNavState> {
  constructor(props: ICreditHistoryNavProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {key} = main;
    const {change} = action;
    return (
      main && (
        <View className="CreditHistoryNav">
          <View className="credit-history-nav-box" onClick={() => change(0)}>
            <Text className={key == 0 ? 'text-active' : 'text'}>额度恢复记录</Text>
            <View className={key == 0 ? 'bottom-line-active' : 'bottom-line'}></View>
          </View>
          <View className="credit-history-nav-box" onClick={() => change(1)}>
            <Text className={key == 1 ? 'text-active' : 'text'}>还款记录</Text>
            <View className={key == 1 ? 'bottom-line-active' : 'bottom-line'}></View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
