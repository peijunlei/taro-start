import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './hot.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Hot extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    return (
      <View className="pointsMall__hot_wrapper">
        <View className="pointsMall__hot">
          <View className="hot-text2">热门兑换</View>
        </View>
        <View className="scrollSviper">
          <ScrollView scrollX className="scrollHot">
            <View className="swiper" style={{width: `${122 * main?.hotExchange?.length}rpx`}}>
              <View className="first-swiper-item"></View>
              {main?.hotExchange?.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="swiper-item"
                    onClick={() => {
                      action.nativeTo(item.goodsInfo.goodsInfoId, item.pointsGoodsId);
                    }}
                  >
                    <Image
                      src={
                        item.goodsInfo.goodsInfoImg || item.goods.goodsImg
                          ? item.goodsInfo.goodsInfoImg || item.goods.goodsImg
                          : noDataIcon
                      }
                      className="swiper-img"
                    />
                    <View className="swiper-box">
                      <View className="text1">{item.goodsInfo.goodsInfoName}</View>
                      <View className="text2">
                        <Text className="text3">{item.points}</Text>
                        积分
                      </View>
                    </View>
                    <View className="top-left">
                      <Image src={require('../img/ranking.png')} className="top-left-img" />
                      <Text className="top-left-hot">热</Text>
                    </View>
                  </View>
                );
              })}
              <View className="last-swiper-item"></View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
