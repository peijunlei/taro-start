import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './signHeader.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import icon from '@/assets/image/common/point-1.png';
import Complete from '../complete/index';
type ISignHeaderProps = T.IProps & T.ISignHeaderProps;

@connect<Partial<ISignHeaderProps>, T.ISignHeaderState>(store2Props, actions)
export default class SignHeader extends Component<Partial<ISignHeaderProps>, T.ISignHeaderState> {
  constructor(props: ISignHeaderProps) {
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
        <View className="signHeader">
          <View className="rule">
            <View className="item-next">
              <Text className="left">
                {date.getMonth() + 1}
                <Text>月</Text>
                {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
                <Text>日</Text>
              </Text>
              <Text className="right">
                已连续签到<Text className="right right-big">{continuousDays}</Text>天
              </Text>
            </View>
            <View className="body_bt" onClick={() => action.commonChange('main.flag', !main.flag)}>
              积分规则
            </View>
          </View>
          <Complete />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
