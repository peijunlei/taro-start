import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './sku-item.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import Price from '@/pages/common/goods/price';
import SpikeProgress from './progress';
import {_} from 'wmkit';

export default class SKUItem extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  /**
    sku列表
*/
  render() {
    let {flashSaleGoods, action, main} = this.props;
    return (
      <View className="flash-sale-spu-item">
        <View className="img-box">
          <Image
            src={
              flashSaleGoods.goodsInfo.goodsInfoImg
                ? flashSaleGoods.goodsInfo.goodsInfoImg
                : flashSaleGoods.goods.goodsImg
                ? flashSaleGoods.goods.goodsImg
                : noDataIcon
            }
            className="goods-img"
          />
        </View>
        <View
          className="right-content"
          onClick={() =>{
           if (flashSaleGoods.showFlag == 0){
             Taro.showToast({
               title: '商品不可售!',
               icon: 'none',
               duration: 2000,
             });
           } else {
             Taro.navigateTo({
               url: `/pages/package-B/goods/goods-details/index?skuId=${flashSaleGoods.goodsInfoId}`,
             })
           }
          }}
        >
          {/* 上半部分内容 */}
          <View className="up-content">
            {/* 商品标题 */}
            <View className="goods-title">
              <View className="title-view">
                <Text className="words">{flashSaleGoods.goodsInfo.goodsInfoName}</Text>
              </View>
            </View>

            {/* 商品规格 */}
            <View className="goods-spec">
              <Text className="spec-text">{flashSaleGoods.specText ? flashSaleGoods.specText : ''}</Text>
            </View>
          </View>

          {/* 下半部分内容 */}
          <View className="down-content">
            <Price price={_.addZero(flashSaleGoods.price)} />
            <Text className="old-price">￥{_.addZero(flashSaleGoods.goodsInfo.marketPrice)}</Text>
            <SpikeProgress main={main} action={action} flashSaleGoods={flashSaleGoods} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
