import {View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import notData from '@/assets/image/goods/goods-detail/desc-img.png';
import './index.less';

export default class Index extends React.Component {
  render() {
    return (
      <View className="socia_details_goods_tip">
        <View className="socia_details_goods_tip__info">
          <Image src={notData} className="socia_details_goods_tip__info--img" />
          <View className="socia_details_goods_tip__info--status">商品不存在！</View>
          <View
            className="socia_details_goods_tip__info--goHome"
            onClick={() =>
              Taro.switchTab({
                url: '/pages/index/index',
              })
            }
          >
            去首页
          </View>
        </View>
      </View>
    );
  }
}
