/*
 * @Author: 
 * @Date: 2022-07-04 10:04:50
 * @Description: 
 */
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import './banner-list.less';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { handleUrl } from 'wmkit';
type IBannerListProps = T.IProps & T.IBannerListProps;

import banner from '@/assets/image/flashsale/banner.png';

@connect<Partial<IBannerListProps>, T.IBannerListState>(store2Props, actions)
export default class BannerList extends Component<Partial<IBannerListProps>, T.IBannerListState> {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      main: { flashBanner },
      main,
      actions: { action },
    } = this.props;
    return (
      <View className="banner-list">
        {flashBanner && flashBanner.length > 0 ? (
          <Swiper
            key={1}
            className={`imgSlides ${flashBanner.length === 1 ? 'imgSlidesOne' : ''}`}
            autoplay={true} //是否自动播放
            indicatorDots={true} //是否显示面板指示点
            style={process.env.TARO_ENV === 'h5' && { height: 'auto' }}
          >
            <View />
            {flashBanner.map((v, k) => {
              return (
                <SwiperItem key={k} onClick={() => handleUrl(v.link)}>
                  <Image src={v.src} className="banner" />
                </SwiperItem>
              );
            })}
          </Swiper>
        ) : (
          <Swiper key={2} style={process.env.TARO_ENV === 'h5' && { height: 'auto' }}>
            <SwiperItem>
              <Image src={banner} className="banner" />
            </SwiperItem>
          </Swiper>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
