import React from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';

// 指示点
export default class Dots extends React.Component<any, any> {
  static defaultProps = {
    width: 13,
    len: 1,
    num: 0,
  };

  render() {
    const {width, len, num} = this.props;

    return (
      <View className="recommend_goods_list_scroll_imgSlides__dots" style={{width: `${width * len}px`}}>
        <View
          className="recommend_goods_list_scroll_imgSlides__dots--sub"
          style={{
            width: `${width}px`,
            left: `${width * num}px`,
          }}
        />
      </View>
    );
  }
}
