import React from 'react';
import Taro from '@tarojs/taro';
import {View, Swiper, SwiperItem} from '@tarojs/components';
// spu大图列表 - 组件
import SpuItem from './../spu-item';
// 指示点
import Dots from './../dots';
import './index.less';

// 走马灯列表
export default class ImgSlides extends React.PureComponent<any, any> {
  static defaultProps = {
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  render() {
    const {current} = this.state;
    const {dataSource, ...rest} = this.props || {};
    return (
      <View className="recommend_goods_list_scroll_imgSlides">
        <Swiper
          className="swiper-box"
          circular
          current={current}
          indicatorDots={false} //是否显示面板指示点
          autoplay={false} //是否自动播放
          onChange={(e) => {
            this.setState({current: e.detail.current});
          }}
          style={{height: process.env.TARO_ENV === 'h5' ? 'auto' : Taro.pxTransform(820)}}
        >
          {dataSource.map((item, index) => {
            return (
              <SwiperItem key={index}>
                <SpuItem list={item} {...rest} />
              </SwiperItem>
            );
          })}
        </Swiper>
        <Dots width={13} len={dataSource.length} num={current} />
      </View>
    );
  }
}
