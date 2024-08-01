import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './no-mask.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {AtModal} from 'taro-ui';

type INoMaskProps = T.IProps & T.INoMaskProps;

@connect<Partial<INoMaskProps>, T.INoMaskState>(store2Props, actions)
export default class NoMask extends Component<Partial<INoMaskProps>, T.INoMaskState> {
  constructor(props: INoMaskProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main: {isOpen},
    } = this.props;

    return (
      <View className="noMask">
        <AtModal
          isOpened={isOpen}
          content={'该店铺已不支持开票'}
          closeOnClickOverlay={false}
          confirmText={'返回'}
          onConfirm={async () => {
            await Taro.navigateBack();
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
