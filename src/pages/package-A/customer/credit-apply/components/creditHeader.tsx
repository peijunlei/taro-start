import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './CreditHeader.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type ICreditHeaderProps = T.IProps & T.ICreditHeaderProps;

@connect<Partial<ICreditHeaderProps>, T.ICreditHeaderState>(store2Props, actions)
export default class CreditHeader extends Component<Partial<ICreditHeaderProps>, T.ICreditHeaderState> {
  constructor(props: ICreditHeaderProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    let continuousDays = main?.userInfo.signContinuousDays;
    let date = new Date(Date.now());
    return (
      main && (
        <View className="CreditHeader">
          <View className="user-center-top-bg">
            <View className="collection-box">
              <View className="collection-tab"></View>
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
