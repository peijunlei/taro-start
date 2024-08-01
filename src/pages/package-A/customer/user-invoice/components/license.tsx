import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './license.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IFormProps = T.IProps & T.IFormProps;

@connect<Partial<IFormProps>, T.IFormState>(store2Props, actions)
export default class InvoiceForm extends Component<Partial<IFormProps>, T.IFormState> {
  constructor(props: IFormProps) {
    super(props);
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
    } = this.props;
    return (
      <View className="license-warp" onClick={() => commonChange('main.isShowLicense', false)}>
        <Image
          className="license-mask"
          onClick={() => commonChange('main.isShowLicense', false)}
          src={require('@/assets/image/common/license.png')}
        />
      </View>
    );
  }
}
