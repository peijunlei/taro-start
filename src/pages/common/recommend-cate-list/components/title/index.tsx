import React from 'react';
import {View, Text} from '@tarojs/components';

// 标题
export default class Title extends React.Component<any, any> {
  static defaultProps = {
    title: '猜你喜欢',
  };

  render() {
    const {title} = this.props;
    return (
      <View>
        <Text className="title">{title}</Text>
      </View>
    );
  }
}
