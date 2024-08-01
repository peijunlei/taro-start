import React from 'react';
import {Image, Text, View} from '@tarojs/components';
import './index.less';
import propsCloseIcon from '@/assets/image/goods/goods-list/spec-close.png';

const BottomBox = (props) => {
  const {title, onClose, isShow} = props;
  return isShow ? (
    <View className="box-page">
      <View
        style={{width: '100%', height: '100%'}}
        onClick={() => {
          onClose(false);
        }}
      ></View>
      <View className="box-container">
        <View className="box-top">
          <Text className="box-title">{title}</Text>
          <Image
            src={propsCloseIcon}
            className="icon-close"
            onClick={() => {
              onClose(false);
            }}
          />
        </View>
        <View className="box-body">{props.children}</View>
      </View>
    </View>
  ) : null;
};

export default BottomBox;
