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
      actions: {action},
      main,
    } = this.props;
    // const {isOpen, title, content, confirmText, cancelText, onClose, onConfirm} = main?.mask || {};
    return (
      main &&
      main.mask &&
      main.mask.isOpen && (
        <View className="confirmMask">
          <AtModal
            isOpened={main?.mask.isOpen}
            title={main?.mask.title}
            content={main?.mask.content}
            confirmText={main?.mask.confirmText}
            cancelText={main?.mask.cancelText}
            onClose={async () => {
              if (!main?.mask.onClose) {
                return false;
              }
              await main?.mask.onClose();
            }}
            onCancel={async () => {
              await main?.mask.onCancel();
            }}
            onConfirm={async () => {
              await main?.mask.onConfirm();
            }}
          />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
