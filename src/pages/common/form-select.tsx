import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { Image, Input, Text, View } from '@tarojs/components';
import './form-select.less';
import className from 'classnames';

import clearIcon from '@/assets/image/common/arrow.png';
import address from '@/assets/image/shop-cart/address.png';

const noop = () => { };

export interface IFormSelectProps {
  //项目名
  labelName?: string;
  onClick?: Function;
  // 选中后的值
  value?: any;
  placeholder?: any;
  textStyle?: Object;
  //icon 是否显示
  iconVisible?: boolean;
  leftStyle?: Object;
  selectRight?: Object;
  formStyle?: Object;
  inputStyle?: any;
  selected?: any;
  // 是否显示底边线
  underline?: boolean;
}

//选终值
export interface ISelected {
  key: any;
  value: any;
}

/**
 * form中选中
 */
export default class FormSelect extends Component<IFormSelectProps, any> {
  static defaultProps = {
    onClick: noop,
    iconVisible: true,
    needComplete: false,
  };
  constructor(props: IFormSelectProps) {
    super(props);
  }

  render() {
    const {
      labelName,
      onClick,
      formStyle,
      value,
      placeholder,
      textStyle,
      iconVisible,
      leftStyle,
      selectRight,
      inputStyle,
      underline,
      needComplete
    } = this.props;
    return (
      <View
        className={className(`wm-form-item`, { form__underline: underline })}
        style={formStyle}
        onClick={() => onClick()}
      >
        <Text className="form-label" style={leftStyle}>
          {labelName}
        </Text>
        <View className="select-right" style={selectRight}>
          {
            needComplete ? (
              <View className="form_needComplete" style={inputStyle}>
                {value.split(' ')[0]}
                <Text className='needComplete'>点此完善</Text>
              </View>
            ) : (
                <Input
                  type="text"
                  value={value}
                  placeholder={placeholder}
                  className="form__input"
                  disabled
                  style={inputStyle}
                />
              )
          }

          {iconVisible ? <Image src={needComplete?address:clearIcon} className="jiantou" /> : null}
        </View>
      </View>
    );
  }
}
