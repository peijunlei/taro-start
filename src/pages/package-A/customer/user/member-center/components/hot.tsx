import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './hot.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_, WMkit} from 'wmkit';

const triangle = require('../img/cai3.png');

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Hot extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  render() {
    let {
      main: {hotExchange, buyList, isShow},
      actions: {action},
      main,
    } = this.props;
    const isLogin = WMkit.isLogin();

    return (
      <View className="memberCenter__hot" style={!isLogin && {marginTop: 0}}>
        {main.pointsIsOpen && (
          <View style={{backgroundColor: '#ffffff'}}>
            <View className="hot">
              <View className="hot-text2">热门兑换</View>
              <View
                className="hot-city"
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/package-A/customer/user/points-mall/index',
                  });
                }}
              >
                积分商城
                <Image className="img" src={require('../img/arrow_right.png')} />
              </View>
            </View>
            <ScrollView scrollX className="scrollHot">
              <View className="wm-swiper">
                {hotExchange.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="wm-swiper-list"
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}&pointsGoodsId=${item.pointsGoodsId}`,
                        })
                      }
                    >
                      <Image src={item.goodsInfo.goodsInfoImg || item.goods.goodsImg} className="swiper-img" />
                      <View className="swiper-box">
                        <View className="text1">{item.goodsInfo.goodsInfoName}</View>
                        <View className="text2">
                          <Text className="text3">{item.points}</Text>
                          积分
                        </View>
                      </View>
                      <View className="top-left">
                        <Image src={triangle} className="triangle"></Image>
                        <Text
                          className="top-left-hot"
                          style={process.env.TARO_ENV === 'h5' && {top: 0, left: '2px', transform: 'scale(0.7)'}}
                        >
                          热
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  /**
   * 根据设价方式,计算显示的价格
   * @returns 显示的价格
   * @private
   */
  _calShowPrice = (goodsItem, buyCount) => {
    const goodsInfo = goodsItem.goodsInfo;
    let showPrice;
    // 阶梯价,根据购买数量显示对应的价格
    if (goodsInfo.priceType === 1 && goodsInfo.intervalPriceIds && goodsItem._otherProps.goodsIntervalPrices) {
      const intervalPriceArr = goodsInfo.intervalPriceIds
        .map((id) => goodsItem._otherProps.goodsIntervalPrices.find((pri) => pri.intervalPriceId === id))
        .sort((a, b) => b.get('count') - a.get('count'));
      if (buyCount > 0) {
        // 找到sku的阶梯价,并按count倒序排列从而找到匹配的价格
        showPrice = intervalPriceArr.find((pri) => buyCount >= pri.count).price;
      } else {
        showPrice = goodsInfo.intervalMinPrice || 0;
      }
    } else {
      showPrice = goodsInfo.salePrice || 0;
    }
    return _.addZero(showPrice);
  };
}

//create by moon https://github.com/creasy2010/moon
