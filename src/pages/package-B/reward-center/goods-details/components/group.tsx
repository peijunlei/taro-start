import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/group.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IGroupProps = T.IProps & T.IGroupProps;

@connect<Partial<IGroupProps>, T.IGroupState>(store2Props, actions)
export default class Group extends Component<Partial<IGroupProps>, T.IGroupState> {
  constructor(props: IGroupProps) {
    super(props);
  }

  /**
    拼团
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    return (
      <View className="group">
        <View />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
