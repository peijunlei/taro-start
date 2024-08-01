import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './hot.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import backgroundImage from "@/assets/image/customer/sign/hot.png";
type ISignHeaderProps = T.IProps & T.ISignHeaderProps;

@connect<Partial<ISignHeaderProps>, T.ISignHeaderProps>(store2Props, actions)
export default class Hot extends Component<Partial<ISignHeaderProps>, T.ISignHeaderProps> {
  constructor(props: ISignHeaderProps) {
    super(props);
  }
  render() {
    let {
      // main: { hotExchange },
      main,
    } = this.props;
    return (
      main && (
        <View className="pointsMall__hot_wrapper-sign">
          <View className="pointsMall__hot">
            <View className="hot-text2">热门兑换</View>
            <View
              className="hot-text3"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user/points-mall/index`,
                });
              }}
            >
              积分商城
            </View>
          </View>
          <View className="scrollSviper">
            <ScrollView scrollX className="scrollHot">
              <View className="swiper" style={{width: `${122 * main.hotExchange.length}px`}}>
                <View className="first-swiper-item"></View>
                {main.hotExchange.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="swiper-list"
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}&pointsGoodsId=${item.pointsGoodsId}`,
                        })
                      }
                    >
                      <Image
                        src={item.goodsInfo.goodsInfoImg || item.goods.goodsImg || noDataIcon}
                        className="swiper-img"
                      />
                      <View className="swiper-box">
                        <View className="text1">{item.goodsInfo.goodsInfoName}</View>
                        <View className="text2">
                          <Text className="text3">{item.points}</Text>
                          积分
                        </View>
                      </View>
                      <View
                        className="top-left"
                        style={{backgroundImage: `url(${backgroundImage})`}}
                      >
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
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
