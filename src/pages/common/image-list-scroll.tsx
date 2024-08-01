import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from '@tarojs/components';
import './image-list-scroll.less';
import {CSSProperties} from 'react';
import ImagesViewer from './images-viewer';
import FormItem from '@/pages/common/form-item';

/**
 * 图片列表，可左右滑动查看全部
 */
export default class ImageListScroll extends Component<any, any> {
  props: {
    imageList: Array<any>; // 图片列表
    size?: number; // 图片尺寸大小
    labelName?: string; // 列表名称
    style?: object; // 样式
  };

  static defaultProps = {
    size: 55,
    imageList: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      showImages: {images: [], idx: 0},
    };
  }

  render() {
    if (!this.props) {
      return false;
    }
    const {imageList, size, labelName} = this.props;
    const attachmentInner = {
      ...styles.picInner,
      ...{width: imageList.length * (size + 10) + 'px'},
    };
    return imageList.length > 0 ? (
      <View className="pic-box">
        {labelName ? <Text className="text1">{labelName}</Text> : null}
        <ScrollView scrollX className="pic-outer">
          <View style={attachmentInner}>
            {imageList.length > 0 ? (
              imageList.map((v, index) => {
                return (
                  <Image
                    key={index}
                    src={v.image}
                    className="pic-img"
                    onClick={() => this._changeShowImages(imageList, index)}
                  />
                );
              })
            ) : (
              <Text className="text1">无</Text>
            )}
          </View>
        </ScrollView>

        {this.state.showImages.images.length > 0 && (
          <ImagesViewer
            images={this.state.showImages.images}
            current={this.state.showImages.idx}
            onCancel={() => {
              this._clearShowImages();
            }}
          />
        )}
      </View>
    ) : (
      <FormItem
        labelName={labelName}
        placeholder={'无'}
        textStyle={{textAlign: 'right', fontWeight: 500, color: '#333333'}}
      />
    );
  }

  _changeShowImages = (images, idx = 0) => {
    this.setState({
      showImages: {images, idx},
    });
  };

  _clearShowImages = () => {
    this.setState({
      showImages: {images: [], idx: 0},
    });
  };
}

const styles = {
  picInner: {
    flexDirection: 'row',
    width: '100%',
  } as CSSProperties,
};
