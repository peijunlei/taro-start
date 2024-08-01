import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './carousel-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ZhiboStatus from './zhibo-status';
const carousel = require('@/assets/image/live/carousel.png'); //默认轮播图片
const play = require('@/assets/image/live/play_back.png'); //回看播放

type ICarouselItemProps = T.IProps & T.ICarouselItemProps;

@connect<Partial<ICarouselItemProps>, T.ICarouselItemState>(store2Props, actions)
export default class CarouselItem extends Component<Partial<ICarouselItemProps>, T.ICarouselItemState> {
  constructor(props: ICarouselItemProps) {
    super(props);
  }

  static defaultProps = {
    data: {},
  };

  /**

*/
  render() {
    let {
      actions: {action},
      main,
      index,
      current,
      data,
    } = this.props;
    let url = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + data.roomId;
    return (
      <View
        className={current == index ? 'currentCarouselItem' : 'carouselItem'}
        style={{
          backgroundColor: '#fff',
          background: 'url(' + (data && data.shareImg ? data.shareImg : carousel) + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
        onClick={() => this.handleListItem(url)}
      >
        <View className="statusBox">
          <ZhiboStatus status={data.liveStatus} startTimeSting={data.startTimeSting} />
        </View>
        {data.liveStatus == 4 && <Image src={play} className="itemPlay" />}
        <View className={current == index ? 'carouselItemCurrentTitle' : 'carouselItemTitle'}>{data.name}</View>
      </View>
    );
  }

  //点击直播间
  handleListItem = async (url) => {
    let {
      actions: {action},
      main,
    } = this.props;

    const getOpenStatus = await action.isOpen();

    if (getOpenStatus > 0) {
      Taro.navigateTo({url: url});
    }
  };
}

//create by moon https://github.com/creasy2010/moon
