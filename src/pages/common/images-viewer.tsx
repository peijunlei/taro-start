import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './images-viewer.less';

interface IImagesViewerProps {
  // 图片列表
  images: any[];
  // 取消事件
  onCancel: Function;
  // 当前所在滑块的 index
  current: number;
}

interface IImagesViewerState {}

export default class ImagesViewer extends Component<IImagesViewerProps, IImagesViewerState> {
  static defaultProps = {
    current: 0,
  };

  render() {
    const {images, current} = this.props;
    return (
      <View className="images-viewer" onClick={() => this.props.onCancel()}>
        <Swiper className="images" circular current={current}>
          {images.map((image, index) => (
            <SwiperItem className="item" key={index}>
              <Image className="img" mode="aspectFit" src={image.image ? image.image : image} />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}
