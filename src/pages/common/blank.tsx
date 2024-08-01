import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View, Text, Image} from '@tarojs/components';
interface BlankProps {
  content?: string;
  img?: string;
  style?: any;
  imgStyle?: any;
  textStyle?: any;
}

export default class Blank extends Component<BlankProps, any> {
  constructor(props: BlankProps) {
    super(props);
  }
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    content: '',
    img: 'http://pic.qianmi.com/astore/d2c-wx/images/list-none.png',
    styles: {},
  };

  render() {
    const {content, img, style, imgStyle, textStyle} = this.props;

    return (
      <View className="wm-list-none" style={style}>
        <Image src={img} className="wm-none-img" style={imgStyle} />
        <Text className="wm-none-text" style={textStyle}>
          {content}
        </Text>
      </View>
    );
  }
}
