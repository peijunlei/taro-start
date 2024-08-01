import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/seckill.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ISeckillProps = T.IProps & T.ISeckillProps;

@connect<Partial<ISeckillProps>, T.ISeckillState>(store2Props, actions)
export default class Seckill extends Component<Partial<ISeckillProps>, T.ISeckillState> {
  constructor(props: ISeckillProps) {
    super(props);
  }

  /**
    秒杀
*/
  render() {
    let {
      actions: {
        publicAction,

        otherAction,
      },
      main,
    } = this.props;

    return (
      <View className="seckill">
        <View />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
