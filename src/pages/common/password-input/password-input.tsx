import {View, Image, Text, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './password-input.less';
import {add} from '@/actions/counter';
import {getGlobalData} from '@/service/config';
const isIOS = getGlobalData('isIOS');

export interface IPasswordInputProps {
  // input是否聚焦
  focus?: boolean;
  autoFocus: boolean;
  style?: {};
  // 获取input value 的方法
  getValue?: Function;
  // 输入完6位密码后调用的方法
  toPay?: Function;
  // 密码框的标题
  title?: string;
  disabled?: boolean;
  onfocus?: Function;
  onBlur?: Function;
  holdKeyboard?: boolean;
}

export interface IPasswordInputState {
  // sku商品库存
  value?: string;
}

export default class PasswordInput extends Component<Partial<IPasswordInputProps>, IPasswordInputState> {
  constructor(props: IPasswordInputProps) {
    super(props);
    this.state = {
      value: null,
    };
  }
  static defaultProps = {
    onfocus: () => {},
    onBlur: () => {},
  };

  render() {
    let {value} = this.state;
    let {style, focus, getValue, title, toPay, disabled, onfocus, onBlur, autoFocus, holdKeyboard} = this.props;
    return (
      <View style={style}>
        {title && <Text className="password-title">{title}</Text>}
        <View className="password-input">
          {/*固定box层*/}
          <View className="number-box">
            {[1, 2, 3, 4, 5, 6].map((v, k) => {
              return <View key={k} className="item-box"></View>;
            })}
          </View>
          {/*真实密码层*/}
          <View className="number-box real-box">
            {this.state.value &&
              this.state.value.split('').map((v, k) => {
                return (
                  <View key={k} className="item-box">
                    {/*{v}*/}●
                  </View>
                );
              })}
          </View>
          {/* <Input style={{visibility:'hidden'}} password/> */}
          {/*input层*/}
          <Input
            className="input-hidden"
            value={value}
            disabled={disabled}
            onInput={(e) => {
              //修复ios第三方键盘 number 类型 可输入的字符不确定的问题  ios的数字键盘类型改为 idcard
              const vla = e.detail.value.replace(/[^\d]/g, '');
              if (!disabled) {
                this.setState({value: vla});
                // 输入6位数字后传出props
                // console.log(e.detail, 111111111111111111111111);
                if (e.detail.value.length === 6) {
                  getValue(vla);
                  toPay(vla);
                } else {
                  getValue(vla);
                }
              }
            }}
            maxlength={6}
            //修复ios第三方键盘 number 类型 可输入的字符不确定的问题  ios的数字键盘类型改为 idcard
            type={isIOS ? 'idcard' : 'number'}
            focus={focus}
            autoFocus={autoFocus}
            // confirmType={'go'}
            confirmHold
            holdKeyboard={holdKeyboard}
            onFocus={() => onfocus()}
            onBlur={() => onBlur()}
          />
        </View>
      </View>
    );
  }
}
