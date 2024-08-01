import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Image, Text, View} from '@tarojs/components';
import defaultImg from '@/assets/image/common/default-img.png';
import '../../css/picture-com.less';

interface PictureComType {
  type: 0 | 1 | 2;
  url: string;
}

export default class PictureCom extends Component<PictureComType, any> {
  constructor(props: PictureComType) {
    super(props);
  }

  render(): any {
    const {type, url} = this.props;
    return !type ? (
      <View className="goods-picture">
        <Image src={url ? url : defaultImg} />
      </View>
    ) : (
      <View className="no-goods-picture">
        <Image src={url ? url : defaultImg} className="goods-picture pic-disabled" />
        <View className="no-goods-con">
          <Text className="no-goods-con-text">{type === 2 ? '失效' : '缺货'}</Text>
        </View>
      </View>
    );
  }
}
