import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/wait-group-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IWaitGroupModalProps = T.IProps & T.IWaitGroupModalProps;

@connect<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState>(store2Props, actions)
export default class WaitGroupModal extends Component<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState> {
  constructor(props: IWaitGroupModalProps) {
    super(props);
  }

  /**
    等待成团弹窗
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
      <View className="waitGroupModal">
        <View />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
