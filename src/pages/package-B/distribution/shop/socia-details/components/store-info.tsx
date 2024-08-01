import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/store-info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import storeLogo from '@/assets/image/goods/goods-detail/store-logo.png';
import hert from '@/assets/image/goods/goods-detail/hert.png';
import product from '@/assets/image/goods/goods-detail/product.png';
import star from '@/assets/image/goods/goods-detail/star.png';
import {div, toFixed2} from '@/utils/priceFormat';
type IStoreInfoProps = T.IProps & T.IStoreInfoProps;

@connect<Partial<IStoreInfoProps>, T.IStoreInfoState>(store2Props, actions)
export default class StoreInfo extends Component<Partial<IStoreInfoProps>, T.IStoreInfoState> {
  constructor(props: IStoreInfoProps) {
    super(props);
  }

  /**
    店铺信息
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {storeInfo},
    } = this.props;
    if (JSON.stringify(storeInfo) == '{}') {
      return;
    }

    let follow; //粉丝数
    const followSum = storeInfo.followSum;
    if (followSum > 10000) {
      follow = div(followSum, 10000).toFixed(1);
    } else {
      follow = followSum;
    }

    let sumCompositeScore = 5, //综合评分
      sumGoodsScore = 5, //商品质量
      sumServerScore = 5, //服务态度
      sumLogisticsScoreScore = 5; //发货速度
    if (storeInfo.storeEvaluateSumVO) {
      sumCompositeScore = storeInfo.storeEvaluateSumVO.sumCompositeScore;
      sumGoodsScore = storeInfo.storeEvaluateSumVO.sumGoodsScore;
      sumServerScore = storeInfo.storeEvaluateSumVO.sumServerScore;
      sumLogisticsScoreScore = storeInfo.storeEvaluateSumVO.sumLogisticsScoreScore;
    }

    return (
      <View className="storeInfo">
        {/* 店铺信息 */}
        <View className="info">
          <Image src={storeInfo.storeLogo ? storeInfo.storeLogo : storeLogo} className="store-logo" />
          {storeInfo.companyType === 0 && (
            <View className="self-sales">
              <Text className="text">自营</Text>
            </View>
          )}
          <View className="store-name">{storeInfo.storeName}</View>
        </View>

        {/* 粉丝数 商品数 综合评分 */}
        <View className="contents">
          {/* 粉丝数 */}
          <View className="item">
            <View className="up">
              <Image src={hert} className="icon" />
              <Text className="name">粉丝数</Text>
            </View>
            <View className="nums">
              {follow}
              <Text className="unit">万</Text>
            </View>
          </View>
          {/* 商品数 */}
          <View className="item">
            <View className="up">
              <Image src={product} className="icon" />
              <Text className="name">商品数</Text>
            </View>
            <View className="nums">{storeInfo.goodsSum}</View>
          </View>
          {/* 综合评分 */}
          <View className="item">
            <View className="up">
              <Image src={star} className="icon" />
              <Text className="name">综合评分</Text>
            </View>
            <View className="nums">{toFixed2(sumCompositeScore)}</View>
          </View>
        </View>

        {/* 商品质量 服务态度 发货速度*/}
        <View className="goods-eval">
          <View className="eval-item">
            <Text className="title">商品质量</Text>
            <Text className="num">{toFixed2(sumGoodsScore)}</Text>
          </View>
          <View className="eval-item">
            <Text className="title">服务态度</Text>
            <Text className="num">{toFixed2(sumServerScore)}</Text>
          </View>
          <View className="eval-item">
            <Text className="title">发货速度</Text>
            <Text className="num">{toFixed2(sumLogisticsScoreScore)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
