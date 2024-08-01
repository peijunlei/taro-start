import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './now-spell-group.less';
import iconRight from '@/assets/image/goods/goods-detail/icon_right.png';

export default class NowSpellGroup extends Component<any> {
  /**
   *拼团
   */
  render() {
    let {goodsDetail, skuId, } = this.props;
    let isShow = false;
    let goodsInfo;
    goodsDetail &&
      goodsDetail.goodsInfos.map((item) => {
        if (item.grouponLabel && skuId === item?.goodsInfoId) {
          isShow = true;
          goodsInfo = item;
        }
      });

    return (
      isShow && (
        <View
          className="group-box"
          onClick={() => {
            const url = `/pages/package-B/goods/group-details/index?skuId=${goodsInfo.goodsInfoId}`;
            Taro.navigateTo({
              url: url,
            });
          }}
        >
          <View className="group-content">
            <Text className="group-left">
              该商品正在进行<Text className="group-right-flag">拼团</Text>
            </Text>
            <View className="group-right">
              <Text className="group-right-text">点击查看</Text>
              <Image className="group-right-img" src={iconRight} />
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
