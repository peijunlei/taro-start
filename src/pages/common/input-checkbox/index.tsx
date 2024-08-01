import { View, Image, Text, CoverView, CoverImage } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './index.less';
import checkImg from '@/assets/image/shop-cart/check.png';
import uncheckImg from '@/assets/image/shop-cart/uncheck.png';

interface IWMCheckboxProps {
  onClick?: Function;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  style?: Object;
}

interface IWMCheckboxState { }

export default class WMCheckbox extends Component<IWMCheckboxProps, IWMCheckboxState> {
  constructor(props: IWMCheckboxProps) {
    super(props);
  }

  static defaultProps = {
    disabled: false,
    checked: false,
    checkedList: [],
  };

  render() {
    const { label, checked, style } = this.props;
    return (
      <View className='check-content'>
        {//匿名评价页面H5与小程序端均使用View作为父级标签
          label == '匿名评价' ? (
            <View
              className="check"
              onClick={(e) => {
                e.stopPropagation();
                this.handleClick();
              }}
              style={style}
            >
              <Image className="check-img" src={checked ? checkImg : uncheckImg} />
              {label && <Text className="check-label">{label}</Text>}
            </View>
          ) : __TARO_ENV !== 'h5' ? (
            <CoverView
              className="check"
              onClick={(e) => {
                e.stopPropagation();
                this.handleClick();
              }}
              style={style}
            >
              <CoverImage className="check-img" src={checked ? checkImg : uncheckImg} />
              {label && <Text className="check-label">{label}</Text>}
            </CoverView>
          ) : (
            <View
              className="check"
              onClick={(e) => {
                e.stopPropagation();
                this.handleClick();
              }}
              style={style}
            >
              <Image className="check-img" src={checked ? checkImg : uncheckImg} />
              {label && <Text className="check-label">{label}</Text>}
            </View>
          )}
      </View>
    );
  }

  handleClick = () => {
    const { onClick, disabled } = this.props;
    if (disabled || !onClick) {
      return;
    }
    onClick();
  };
}

//create by moon https://github.com/creasy2010/moon
