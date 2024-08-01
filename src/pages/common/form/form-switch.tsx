import 'taro-ui/dist/style/components/switch.scss';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {AtSwitch} from 'taro-ui';
import {AtSwitchProps} from 'taro-ui/@types/switch';
export default class FormSwitch extends Component<AtSwitchProps, any> {
  constructor(props: AtSwitchProps) {
    super(props);
  }
  render() {
    //不支持解构
    const {title, color, checked, border, disabled, onChange, style} = this.props;
    return (
      <AtSwitch
        title={title}
        border={false}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        color={'#FF6600'}
        customStyle={{...style, zoom: '100%', paddingRight: '0'}}
      />
    );
  }
}
