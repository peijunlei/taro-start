import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './sku-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

import Price from '@/pages/common/goods/price';

import {mul, div} from '@/utils/priceFormat';
import CartCount from '@/pages/common/goods/cart-count';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import {_, immutable, WMkit} from 'wmkit';
type ISkuListProps = T.IProps & T.ISkuListProps;

@connect<Partial<ISkuListProps>, T.ISkuListState>(store2Props, actions)
export default class SkuList extends Component<Partial<ISkuListProps>, T.ISkuListState> {
  constructor(props: ISkuListProps) {
    super(props);
  }

  /**
    sku列表
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;

    return (
      // <ScrollView>
      <View className="coupon-list-promotion-spuList">
        <View className="spuList skuList">
          {main &&
            main.goods.length > 0 &&
            main.goods.map((item, index) => {
              // 商品类型
              const goodsType = item.goodsType || item?.goodsInfo?.goodsType || 0;
              return (
                <View
                  className="spu-item"
                  key={index}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}`,
                    });
                  }}
                >
                  <View className="img-box">
                    <Image
                      src={item.goodsInfo.goodsInfoImg ? item.goodsInfo.goodsInfoImg : noDataIcon}
                      className="goods-img"
                    />
                    {/* 判断是否缺货 */}
                    {this.isInvalid(item.goodsInfo) && (
                      <View className="not-goods">
                        <View className="not-goods-text">缺货</View>
                      </View>
                    )}
                  </View>
                  <View className="right-content">
                    {/* 上半部分内容 */}
                    <View className="up-content">
                      {/* 商品标题 */}
                      <View className="goods-title">
                        <View className="marketing">
                          <Text className="market-text">自营</Text>
                        </View>
                        <View className="title-view">
                          <Text className="words">
                            <Text className="text">随便写</Text>
                            {item.lowGoodsName}
                          </Text>
                        </View>
                      </View>

                      {/* 商品规格 */}
                      <View className="goods-spec">
                        <Text className="spec-text">{item.goodsInfo.specText ? item.goodsInfo.specText : ''}</Text>
                      </View>

                      {/* 促销活动 */}
                      <MarketingLabel
                        marketingLabels={immutable.fromJS(item.goodsInfo.marketingLabels)}
                        couponLabels={immutable.fromJS(item.goodsInfo.couponLabels)}
                      />
                    </View>

                    {/* 下半部分内容 */}
                    <View className="down-content">
                      {/* 销量 评论数 好评率 */}
                      <View className="goods-statics">
                        <Text className="texts">
                          {item.goodsInfo.goodsSalesNum ? _.goodsSalesNum(item.goodsInfo.goodsSalesNum) : '暂无'}
                          销量
                        </Text>
                        <Text className="texts">
                          {item.goodsInfo.goodsEvaluateNum < 10000
                            ? item.goodsInfo.goodsEvaluateNum
                            : div(item.goodsInfo.goodsEvaluateNum, 10000).toFixed(1) + '万+'}
                          评论
                        </Text>
                        <Text className="texts">
                          {item.goodsInfo.goodsFavorableCommentNum == 0 || item.goodsInfo.goodsEvaluateNum == 0
                            ? 0
                            : mul(
                                div(item.goodsInfo.goodsFavorableCommentNum, item.goodsInfo.goodsEvaluateNum).toFixed(
                                  0,
                                ),
                                100,
                              )}
                          %好评
                        </Text>
                      </View>

                      {/* 商品价格 步进器*/}
                      <View className="goods-price">
                        <Price price={item.goodsInfo.marketPrice} />
                        {/* 步进器 */}
                        {!WMkit.isVirtualGoods(goodsType) && (
                          <CartCount
                            count={item.goodsInfo.buyCount}
                            inventory={this.isInvalid(item.goodsInfo) ? 0 : item.goodsInfo.stock}
                            getNum={(count) => {
                              if (count == 0) {
                                return false;
                              }
                              goodsAction.skuAddShopCart(item.goodsInfo.goodsInfoId, count);
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      // </ScrollView>
    );
  }
  // 判断是否缺货
  isInvalid = (goodsInfo) => {
    const stock = goodsInfo.stock; // 库存
    const count = goodsInfo.count || 0; // 起订量
    const invalid = stock <= 0 || (count > 0 && count > stock);
    return invalid;
  };
}

//create by moon https://github.com/creasy2010/moon
