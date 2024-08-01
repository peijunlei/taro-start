import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { noop, WMkit } from 'wmkit';
import { Price } from '@/pages/common';
import './index.less';

import noDataIcon from '@/assets/image/goods/goods-list/no-data-bgi.png';
//@ts-ignore
import addIcon from '@/assets/image/goods/goods-list/add.png';
import { Const } from 'config';

export default class List extends React.Component<any, any> {
  static options = { addGlobalClass: true };

  static defaultProps = {
    dataSource: [],
    _goGoodsDetails: noop,
    _spuAddCartFunc: noop,
    recommendGoodsListSpuStyle: {},
  };

  render() {
    const { dataSource = [], _spuAddCartFunc, _goGoodsDetails, recommendGoodsListSpuStyle } = this.props || {};
    return (
      <View className="recommend_goods_list_spu" style={recommendGoodsListSpuStyle}>
        {dataSource.map((item, index) => {
          if (!Array.isArray(item.goodsInfoList)) return null;
          const goodsInfo = item.goodsInfoList[0] || {};
          const goodsType = item.goodsType || goodsInfo.goodsType || 0;
          return (
            <View className="big-spu-item" key={index}>
              <View className="img-box" onClick={() => _goGoodsDetails(goodsInfo || {})}>
                <Image src={item.goodsImg || goodsInfo.goodsInfoImg || noDataIcon} className="big-goods-img" />
              </View>

              <View className="big-spu-content">
                {/* 标题 */}
                <View className="big-up-content" onClick={() => _goGoodsDetails(goodsInfo || {})}>
                  <View className="title-view">
                    <View className="words">
                      {goodsInfo.companyType == 0 && (
                        <View className="marketing" style={{ marginRight: 10 }}>
                          <Text className="market-text">自营</Text>
                        </View>
                      )}
                      {goodsInfo.thirdPlatformType != null && (
                        <View className="marketing">
                          <Text className="market-text">{Const.thirdPlatformTypeList[goodsInfo.thirdPlatformType]}</Text>
                        </View>
                      )}
                      {goodsInfo.goodsInfoName || '-'}
                    </View>
                  </View>
                </View>

                {/* 价格 */}
                <View className="big-down-content">
                  <View className="goods-price-box">
                    <Price
                      price={goodsInfo.marketPrice || 0}
                      buyPoint={goodsInfo.buyPoint || 0}
                      priceStyle={{
                        color: '#333',
                      }}
                    />
                  </View>

                  {/* 步进器 */}
                  {!WMkit.isVirtualGoods(goodsType) && (
                    <View
                      className="cart-count"
                      onClick={(e) => {
                        e.stopPropagation();
                        _spuAddCartFunc(goodsInfo.goodsInfoId);
                      }}
                    >
                      <Image src={addIcon} className="goods-add-cart" />
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
