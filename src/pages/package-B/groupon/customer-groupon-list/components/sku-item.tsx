import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '@/pages/package-B/goods/goods-list/components/spu-list.less';
import './index.less';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import Price from '@/pages/common/goods/price';

export default class SKUItem extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  /**
   sku列表
   */
  render() {
    let {
      goodsInfo: {skuName, num, pic, specDetails},
      totalPrice,
    } = this.props;

    return (
      <View className="spu-item customer-groupon-list-spu-item">
        <View className="img-box">
          <Image src={pic || noDataIcon} className="goods-img" style={{width: '160rpx', height: '160rpx'}} />
        </View>
        <View className="right-content">
          {/* 上半部分内容 */}
          <View className="up-content">
            {/* 商品标题 */}
            <View className="goods-title">
              <View className="title-view">
                <Text className="words">{skuName}</Text>
              </View>
            </View>

            {/* 商品规格 */}
            <View className="goods-spec">
              <Text className="spec-text">{specDetails || ''}</Text>
            </View>
          </View>

          {/* 下半部分内容 */}
          <View className="down-content">
            实际付款：
            <Price price={totalPrice}></Price>
            <View className="num">x{num}</View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
