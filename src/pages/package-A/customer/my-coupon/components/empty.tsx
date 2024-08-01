import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {Config} from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './empty.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IEmptyProps = T.IProps & T.IEmptyProps;
import emptyImg from '@/assets/image/coupon/empty.png';

@connect<Partial<IEmptyProps>, T.IEmptyState>(store2Props, actions)
export default class Empty extends Component<Partial<IEmptyProps>, T.IEmptyState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IEmptyProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {},
      },
      main: {},
    } = this.props;

    return (
      <View className="empty">
        <Image src={emptyImg} className="empty-img" />
        <Text>啊哦，什么券都没有</Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
