import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './button.less';
import classNames from 'classnames';

interface IWMButtonProps {
  onClick?: Function;
  disabled?: boolean;
  theme?: 'primary' | 'sec-primary' | 'goast' | 'default';
  size?: 'large' | 'medium' | 'small' | 'mini';
  style?: Object;
  width?: string;
  checked?: boolean;
  disableFull: boolean;
}

interface IWMButtonState {
  processing: boolean;
}

export default class WMButton extends Component<IWMButtonProps, IWMButtonState> {
  constructor(props: IWMButtonProps) {
    super(props);
    this.state = {
      processing: false,
    };
  }

  static defaultProps = {
    disabled: false,
    checked: false,
    theme: 'default',
    size: 'small',
    disableFull: true,
  };

  render() {
    const {disabled, theme, size, style, width, checked, disableFull} = this.props;
    let sty = {};
    if (style) {
      sty = {...sty, ...style};
    }
    if (width) {
      sty = {width, ...sty};
    }
    const optionCls = classNames(`wm-btn wm-btn-${theme} wm-btn-${size}`, {
      'wm-btn-disabled': disableFull && disabled,
      'wm-btn-checked': checked,
      'wm-btn-disable-full': !disableFull && disabled,
    });
    return (
      <View className={size === 'large' || size === 'medium' ? 'wm-btn-wrap' : 'wm-wrap-small'}>
        <View className={optionCls} onClick={this.handleClick} style={sty}>
          {this.props.children}
        </View>
      </View>
    );
  }

  handleClick = () => {
    const {onClick, disabled} = this.props;
    if (disabled || this.state.processing || !onClick) {
      return;
    }

    if (onClick instanceof Promise) {
      this.setState(
        {
          processing: true,
        },
        () => {
          onClick()
            .then((res) => {
              this.setState({
                processing: false,
              });
              return res;
            })
            .catch((reason) => {
              this.setState({
                processing: false,
              });
              return reason;
            });
        },
      );
    } else {
      this.setState({processing: false});
      onClick();
    }
  };
}

//create by moon https://github.com/creasy2010/moon
