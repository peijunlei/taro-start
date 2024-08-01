import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
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

  componentDidMount() {
    if (!getCurrentInstance().router.params) return;

    let {skuId} = getCurrentInstance().router.params;
    if (__TARO_ENV != 'h5') {
      let {main} = this.props;
      let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      if (SkuId == undefined) {
        SkuId = '';
      }
      this.props.actions.publicAction.initStoreInfo(SkuId);
    } else {
      this.props.actions.publicAction.initStoreInfo(skuId);
    }
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
      return <View></View>;
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
        <View
          className="info"
          onClick={() => {
            return;
            if (!storeInfo.storeId) {
              Taro.showToast({
                title: '店铺不存在或者店铺已关闭!',
                icon: 'none',
                duration: 2000,
              });
              return;
            }
            Taro.navigateTo({
              url: `/pages/package-A/store/store-main/index?storeId=${storeInfo.storeId}`,
            });
          }}
        >
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
          <View
            className="item"
            onClick={() => {
              return
              if (!storeInfo.storeId) {
                Taro.showToast({
                  title: '店铺不存在或者店铺已关闭!',
                  icon: 'none',
                  duration: 2000,
                });
                return;
              }
              Taro.navigateTo({
                url: `/pages/package-A/store/store-main/index?storeId=${storeInfo.storeId}`,
              });
            }}
          >
            <View className="up">
              <Image src={hert} className="icon" />
              <Text className="name">粉丝数</Text>
            </View>
            <View className="nums">
              {follow}
              {followSum > 10000 && <Text className="unit">万</Text>}
            </View>
          </View>
          {/* 商品数 */}
          <View
            className="item"
            onClick={() => {
              return
              if (!storeInfo.storeId) {
                Taro.showToast({
                  title: '店铺不存在或者店铺已关闭!',
                  icon: 'none',
                  duration: 2000,
                });
                return;
              }
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-list/index?storeId=${storeInfo.storeId}`,
              });
            }}
          >
            <View className="up">
              <Image src={product} className="icon" />
              <Text className="name">商品数</Text>
            </View>
            <View className="nums">100万+</View>
          </View>
          {/* 综合评分 */}
          <View
            className="item"
            onClick={() => {
              return
              if (!storeInfo.storeId) {
                Taro.showToast({
                  title: '店铺不存在或者店铺已关闭!',
                  icon: 'none',
                  duration: 2000,
                });
                return;
              }
              Taro.navigateTo({
                url: `/pages/package-A/store/store-profile/index?storeId=${storeInfo.storeId}`,
              });
            }}
          >
            <View className="up">
              <Image src={star} className="icon" />
              <Text className="name">综合评分</Text>
            </View>
            <View className="nums">{toFixed2(sumCompositeScore)}</View>
          </View>
        </View>
        {/* 商品质量 服务态度 发货速度*/}
        <View
          className="goods-eval"
          onClick={() => {
            if (!storeInfo.storeId) {
              Taro.showToast({
                title: '店铺不存在或者店铺已关闭!',
                icon: 'none',
                duration: 2000,
              });
              return;
            }
            Taro.navigateTo({
              url: `/pages/package-A/store/store-profile/index?storeId=${storeInfo.storeId}`,
            });
          }}
        >
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
