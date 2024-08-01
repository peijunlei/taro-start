import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './hot.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IHotProps = T.IProps & T.IHotProps;

@connect<Partial<IHotProps>, T.IHotState>(store2Props, actions)
export default class Hot extends Component<Partial<IHotProps>, T.IHotState> {
  constructor(props: IHotProps) {
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
      <View className="hot">
        <View />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
