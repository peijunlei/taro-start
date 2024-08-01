import {View, Text, Input, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import clearIcon from '@/assets/image/common/clear_2.png';
import './form-input.less';
import ValidConst from './validate';
import {CSSProperties} from 'react';
import {ReactNode} from 'react';
import className from 'classnames';

interface IWMFormInputProps {
  // input 的类型
  type?: 'text' | 'number' | 'idcard' | 'digit';
  validReg?: RegExp;
  // 是否必填
  require?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否显示清除按钮
  clear?: boolean;
  // 是否显示底边线
  underline?: boolean;
  // 输入框尺寸
  size?: 'default' | 'small';
  // 图标
  icon?: string;
  // 标签
  label?: string;
  // 输入框的初始内容
  value?: string;
  // 输入框为空时占位内容
  placeholder?: string;
  // 值变化回调
  onChange?: Function;
  maxlength?: number;
  //其它节点
  other?: ReactNode;
  autoFocus?: boolean;
  password?: boolean; //是否是密码类型

  inputStyle?: CSSProperties;
  textStyle?: CSSProperties;
  style?: CSSProperties;
}

interface IWMFormInputState {}

export default class WMFormInput extends Component<IWMFormInputProps, IWMFormInputState> {
  static defaultProps = {
    type: 'number',
    require: false,
    disabled: false,
    clear: false,
    underline: true,
    inputTextAlign: 'left',
    inputFontWeight: false,
    size: 'default',
    password: false,
    autoFocus: false,
    maxlength: 140,
    onChange: () => {},
    inputTextColor: 'rgba(0,0,0,0.8)',
  };

  constructor(props: IWMFormInputProps) {
    super(props);
  }

  render() {
    const smallClassName = this.props.size === 'small' ? 'wm-form-input-small' : '';
    const {style, inputStyle, textStyle, label} = this.props;

    return (
      <View
        className={className(`wm-form-input ${smallClassName}`, {form__underline: this.props.underline})}
        style={style}
      >
        {this.props.require && <Text className="require">*</Text>}
        {this.props.icon && <Image className="icon" src={this.props.icon} />}
        {label && (
          <Text className="label" style={textStyle}>
            {this.props.label}
          </Text>
        )}
        <Input
          className="input"
          type={this.props.type ? this.props.type : 'number'}
          disabled={this.props.disabled}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onInput={this._onInput}
          style={inputStyle}
          placeholderStyle="color:#999"
          maxlength={this.props.maxlength}
          autoFocus={this.props.autoFocus}
          password={this.props.password}
        />
        {this.props.clear && <Image onClick={this._onClear} className="clear" src={clearIcon} />}
        {this.props.other}
      </View>
    );
  }

  _onInput = (e) => {
    const val = e.detail.value;
    let {validReg, onChange, type} = this.props;
    if (type === 'number') validReg = ValidConst.number;
    if (validReg && !validReg.test(val)) {
      return;
    }
    onChange && onChange(val);
  };

  _onClear = () => {
    const onChange = this.props.onChange;
    onChange && onChange('');
  };
}
