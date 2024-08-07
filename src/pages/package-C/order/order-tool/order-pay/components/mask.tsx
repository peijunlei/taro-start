import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './mask.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {AtModal} from 'taro-ui';

type IMaskProps = T.IProps & T.IMaskProps;

@connect<Partial<IMaskProps>, T.IMaskState>(store2Props, actions)
export default class Mask extends Component<Partial<IMaskProps>, T.IMaskState> {
  constructor(props: IMaskProps) {
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
      <View className="mask-order-tool">
        {main?.mask.isOpen ? (
          <AtModal
            className="orderToolModal"
            isOpened
            //没有标题不需要留title占位
            {...main?.mask.title && {title:main?.mask.title}}
            // title={main?.mask.title ? main?.mask.title : ' '}
            content={main?.mask.content}
            confirmText={main?.mask.confirmText}
            cancelText={main?.mask.cancelText}
            closeOnClickOverlay={true}
            onClose={() => {
              action.commonChange('main.mask.isOpen', false);
            }}
            onCancel={async () => {
              await main?.mask.onClose();
            }}
            onConfirm={async () => {
              await main?.mask.onConfirm();
            }}
          />
        ) : null}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
