import React from 'react';
import {View, Text, Image} from '@tarojs/components';

// 标题
export default class Title extends React.Component<any, any> {
  static options = {addGlobalClass: true};

  static defaultProps = {
    title: '猜你喜欢',
  };

  render() {
    const {title} = this.props;
    return (
      <View className="recommend_goods_list__title">
        <Image style={{width: '16px', height: '16px'}} src={require('@/assets/image/common/like@2x.png')} />
        <Text className="recommend_goods_list__title--text">{title}</Text>
        <Image style={{width: '16px', height: '16px'}} src={require('@/assets/image/common/like02@2x.png')} />
      </View>
    );
  }
}
