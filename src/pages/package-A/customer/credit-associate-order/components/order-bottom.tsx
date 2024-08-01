import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button} from '@wanmi/ui-taro';
import * as T from '../types';
import './order-bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {_} from 'wmkit';
import {store2Props} from '../selectors';
import {getGlobalData} from '@/service/config';

type IOrderBottomProps = T.IProps & T.IOrderBottomProps;
const isIphoneX = getGlobalData('isIphoneX');
@connect<Partial<IOrderBottomProps>, T.IOrderBottomState>(store2Props, actions)
export default class OrderBottom extends Component<Partial<IOrderBottomProps>, T.IOrderBottomState> {
  constructor(props: IOrderBottomProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="OrderBottom" style={isIphoneX ? {paddingTop: '21px'} : {}}>
        <View className="OrderBottomName">还款金额：</View>
        <View className="OrderBottomAmount">￥{_.addZero(main?.totalPrice)}</View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
