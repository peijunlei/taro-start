import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import '../css/confirm-mask.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { AtModal } from 'taro-ui';

type IConfirmMaskProps = T.IProps & T.IConfirmMaskProps;

@connect<Partial<IConfirmMaskProps>, T.IConfirmMaskState>(store2Props, actions)
export default class ConfirmMask extends Component<Partial<IConfirmMaskProps>, T.IConfirmMaskState> {
  constructor(props: IConfirmMaskProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main = {},
    } = this.props;
    const { isOpen, title, content, confirmText, cancelText, onClose, onConfirm } = main.mask || {};
    if(!isOpen) return null;
    return (
      <View className="confirmMask">
        <AtModal
          isOpened={isOpen}
          title={title}
          content={content}
          confirmText={confirmText}
          cancelText={cancelText}
          onClose={async () => {
            (await typeof onClose) === 'function' && onClose();
          }}
          onConfirm={async () => {
            (await typeof onConfirm) === 'function' && onConfirm();
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
