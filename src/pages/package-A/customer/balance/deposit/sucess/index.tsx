import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from './types';
import './index.less';
type ISuccessProps = T.IProps & T.ISuccessProps;

export default class Index extends Component<Partial<ISuccessProps>, T.ISuccessState> {
  constructor(props: ISuccessProps) {
    super(props);
  }

  /**

*/
  render() {
    return (
      <View className="success">
        <View />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
