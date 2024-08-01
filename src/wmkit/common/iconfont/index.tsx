import React, {CSSProperties, PureComponent} from 'react';
import Taro from '@tarojs/taro';
import {Text} from '@tarojs/components';
import './index.less';

interface IIconProps {
  value: string;
  onClick?: () => void;
  className?: string;
  color?: string;
  prefixClass?: string;
  size?: number;
  style?: CSSProperties;
}

export default class IconFont extends PureComponent<IIconProps> {
  render() {
    const {className, prefixClass = 'iconfont1', value, size = 16, color, onClick, style} = this.props;
    const rootStyle = {
      ...style,
      fontSize: `${Taro.pxTransform(parseInt(String(size)) * 2, 750)}`,
      color,
    };
    const iconName = value ? `icon-${value}` : '';
    return (
      <Text
        className={`${prefixClass} ${iconName} ${className || ''}`}
        style={rootStyle}
        onClick={
          onClick
            ? (e) => {
                e.stopPropagation();
                onClick?.();
              }
            : undefined
        }
      />
    );
  }
}
