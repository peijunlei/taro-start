import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { noop, WMkit } from 'wmkit';
import Price from './../price';
//@ts-ignore
import './index.less';

import noDataIcon from '@/assets/image/goods/goods-list/no-data-bgi.png';
import addIcon from '@/assets/image/goods/goods-list/add.png';
import { Const } from 'config';

export default class SpuItem extends React.Component<any, any> {
  static options = { addGlobalClass: true };

  static defaultProps = {
    list: [],
    _goGoodsDetails: noop,
    _spuAddCartFunc: noop,
    recommendGoodsListSpuStyle: {},
  };

  render() {
    const { list = [], _spuAddCartFunc, _goGoodsDetails, recommendGoodsListSpuStyle } = this.props || {};
    return (
      <View className="recommend_goods_list_scroll_spu" style={recommendGoodsListSpuStyle}>
        {list.map((item, index) => {
          if (!Array.isArray(item.goodsInfoList)) return null;
          const goodsInfo = item.goodsInfoList[0] || {};
          const goodsType = item.goodsType || goodsInfo.goodsType || 0;
          return (
            <View className="big-spu-item" key={goodsInfo.goodsId} onClick={() => _goGoodsDetails(goodsInfo || {})}>
              <View className="img-box">
                <Image src={item.goodsImg || goodsInfo.goodsInfoImg || noDataIcon} className="big-goods-img" />
              </View>

              <View className="big-spu-content">
                {/* 标题 */}
                <View className="big-up-content">
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
                  <Price
                    price={goodsInfo.marketPrice || 0}
                    buyPoint={goodsInfo.buyPoint || 0}
                    priceStyle={{
                      color: '#333',
                      textOverflow: 'ellipsis',
                      width: '81px',
                      height: '20px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      flexWrap: 'nowrap',
                      wordBreak: 'break-all',
                    }}
                  />

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
