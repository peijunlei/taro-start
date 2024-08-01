import {View, Button, Text, Image, Swiper, SwiperItem} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {msg} from 'wmkit';

import * as T from '../types';
import './card-carousel.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CarouselItem from './carousel-item';

type ICardCarouselProps = T.IProps & T.ICardCarouselProps;

@connect<Partial<ICardCarouselProps>, T.ICardCarouselState>(store2Props, actions)
export default class CardCarousel extends Component<Partial<ICardCarouselProps>, T.ICardCarouselState> {
  constructor(props: ICardCarouselProps) {
    super(props);
    msg.on({
      'start-circular': () => {
        this.props.actions.action.changeAutoPlay(true);
      },
      'stop-circular': () => {
        this.props.actions.action.changeAutoPlay(false);
      },
    });
  }

  /**
   轮播图
   */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!(main && main.carouselList.length > 0)) {
      return <View />;
    }

    let carouselList = main.carouselList;

    return (
      <View className="cardCarousel">
        <Swiper
          className="swiper"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          previousMargin="10px"
          interval={2000}
          onChange={(e) => action.changeCurrentItem(e)}
          displayMultipleItems={carouselList.length > 1 ? 3 : 1}
          easingFunction="linear"
          autoplay={main.autoPlay}
        >
          {carouselList.map((item, index) => {
            return (
              <SwiperItem
                className={
                  carouselList.length - (main.currentSwiperIndex + 1) < 2
                    ? carouselList.length - main.currentSwiperIndex - 1 == 1
                      ? index == 0
                        ? 'swiperItem'
                        : ''
                      : carouselList.length - main.currentSwiperIndex - 1 == 0
                      ? index == 1
                        ? 'swiperItem'
                        : ''
                      : ''
                    : main.currentSwiperIndex + 2 == index
                    ? 'swiperItem'
                    : ''
                }
                key={index}
              >
                <CarouselItem index={index} current={main.currentSwiperIndex} data={item} />
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
