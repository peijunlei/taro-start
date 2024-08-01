import {View, Image, Text, CoverView, CoverImage} from '@tarojs/components';
import React, {Component} from 'react';
import './collection-checkbox.less';
import checkImg from '@/assets/image/shop-cart/check.png';
import uncheckImg from '@/assets/image/shop-cart/uncheck.png';

interface IWMCheckboxProps {
  onClick?: Function;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  style?: Object;
}

interface IWMCheckboxState {}

export default class CollectionCheckbox extends Component<IWMCheckboxProps, IWMCheckboxState> {
  constructor(props: IWMCheckboxProps) {
    super(props);
  }

  static defaultProps = {
    disabled: false,
    checked: false,
    checkedList: [],
  };

  render() {
    const {label, checked, style} = this.props;
    return (
      <View>
        {__TARO_ENV !== 'h5' ? (
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
    const {onClick, disabled} = this.props;
    if (disabled || !onClick) {
      return;
    }
    onClick();
  };
}

//create by moon https://github.com/creasy2010/moon
