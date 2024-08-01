import {View, Button, Text, Image, Swiper, SwiperItem} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './big-picture.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Star from '@/pages/common/goods/star';
import lArrow from '@/assets/image/goods/evaluate/l-arrow.png';
import upArrow from '@/assets/image/goods/evaluate/up-arrow.png';
import good from '@/assets/image/goods/evaluate/good.png';
import veryGood from '@/assets/image/goods/evaluate/very-good.png';

type IBigPictureProps = T.IProps & T.IBigPictureProps;

@connect<Partial<IBigPictureProps>, Partial<T.ActionType>>(store2Props, actions)
export default class BigPicture extends Component<Partial<IBigPictureProps>, T.IBigPictureState> {
  constructor(props: IBigPictureProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    const num = main.currentImg;
    return (
      <View
        className="bigPicture"
        onClick={(e) => {
          e.preventDefault();
          action.commonChange('main.isBigImgShow', false);
        }}
      >
        <View className="up">
          {/* <Image className="arrow" src={lArrow} onClick={() => action.commonChange('main.isBigImgShow', false)} /> */}
          <Text className="title">
            <Text className="num">{num + 1}</Text>/{main.bigEvalItem.evaluateImageList.length}
          </Text>
        </View>
        {/* 轮播图 */}
        <Swiper
          className="swiper-box"
          circular
          current={num}
          indicatorDots={false} //是否显示面板指示点
          autoplay={false} //是否自动播放
          onChange={(e) => {
            e.stopPropagation();
            this._changePicture(e);
          }}
        >
          {main.bigEvalItem.evaluateImageList.map((item, index) => {
            return (
              <SwiperItem id={index} key={index}>
                <Image
                  className="img"
                  src={item.artworkUrl}
                  mode="aspectFit"
                  onClick={() => action.commonChange('main.isBigImgShow', false)}
                />
              </SwiperItem>
            );
          })}
        </Swiper>
        {/*评价  */}
        <View
          className="eval-details"
          onClick={(e) => {
            e.stopPropagation();
            this.setState({show: !this.state.show});
          }}
        >
          {/* 展开 */}
          {!this.state.show ? (
            <View className="open">
              <Text className="text">{main.bigEvalItem.evaluateContent}</Text>
              <View
                className="r-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({show: !this.state.show});
                }}
              >
                <Text className="open-text">展开</Text>
                <Image className="up-arrow" src={upArrow} />
              </View>
            </View>
          ) : (
            //收起
            <View className="down">
              <View className="star">
                {/* 星级评价 */}
                <Star num={main.bigEvalItem.evaluateScore} />
                <Text className="mess">{main.bigEvalItem.specDetails ? main.bigEvalItem.specDetails : ''}</Text>
              </View>
              <View className="content">{main.bigEvalItem.evaluateContent}</View>
              <View className="bottom-btn">
                <View className="l-btn">
                  <Image
                    src={main.bigEvalItem.isPraise ? veryGood : good}
                    className="zan"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.addCustomerGoodsEvaluatePraise(main.bigEvalItem.evaluateId, main.currentEvalKey);
                    }}
                  />
                  <Text className="num">{main.bigEvalItem.goodNum}</Text>
                </View>
                <View
                  className="r-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({show: !this.state.show});
                  }}
                >
                  <Text className="open-text">收起</Text>
                  <Image className="down-arrow" src={upArrow} />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
  //切换轮播图
  _changePicture = (e) => {
    let {actions} = this.props;
    actions.action.commonChange('main.currentImg', e.detail.current);
  };
}

//create by moon https://github.com/creasy2010/moon
