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
import MarketingLabel from '@/pages/common/goods/marketing-label';
import {mul, div} from '@/utils/priceFormat';
import CartCount from '@/pages/common/goods/cart-count';
import {_, immutable, WMkit} from 'wmkit';
type ISkuListProps = T.IProps & T.ISkuListProps;

@connect<Partial<ISkuListProps>, Partial<T.ActionType>>(store2Props, actions)
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
      <ScrollView>
        <View className="spuList skuList">
          {main &&
            main.goods.length > 0 &&
            main.goods.map((item, index) => {
              // sku信息
              const goodsInfo = item.goodsInfo;
              const stock = goodsInfo.stock>0?goodsInfo.stock:0;
              // 商品是否要设置成无效状态
              // 起订量
              const count = goodsInfo.count || 0;
              // 库存等于0或者起订量大于剩余库存
              const invalid = stock <= 0 || (count > 0 && count > stock);
              // const buyCount =
              //   invalid || (main.goodsMarketing && main.goodsMarketing.marketingId !== main.request.marketingId)
              //     ? 0
              //     : goodsInfo.buyCount || 0;
              const buyCount = goodsInfo.buyCount || 0;

              //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
              //好评率
              let favorableRate = '100';
              if (goodsInfo.goodsEvaluateNum && goodsInfo.goodsEvaluateNum != 0) {
                favorableRate = _.mul(
                  _.div(goodsInfo.goodsFavorableCommentNum, goodsInfo.goodsEvaluateNum),
                  100,
                ).toFixed(0);
              }

              //评论数
              let evaluateNum = '暂无';
              const goodsEvaluateNum = goodsInfo.goodsEvaluateNum;
              if (goodsEvaluateNum) {
                if (goodsEvaluateNum < 10000) {
                  evaluateNum = goodsEvaluateNum;
                } else {
                  const i = _.div(goodsEvaluateNum, 10000).toFixed(1);
                  evaluateNum = i + '万+';
                }
              }
              // 商品类型
              const goodsType = item.goodsType || goodsInfo?.goodsType || 0;
              //销量
              let salesNum = '暂无';
              const goodsSalesNum = goodsInfo.goodsSalesNum;
              if (goodsSalesNum) {
                if (goodsSalesNum < 10000) {
                  salesNum = goodsSalesNum;
                } else {
                  const i = _.div(goodsSalesNum, 10000).toFixed(1);
                  salesNum = i + '万+';
                }
              }
              //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

              return (
                <View className="spu-item goods-list-promotion-spu-item">
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
                  <View
                    className="right-content"
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}`,
                      });
                    }}
                  >
                    {/* 上半部分内容 */}
                    <View className="up-content">
                      {/* 商品标题 */}
                      <View className="goods-title">
                        {!WMkit.isMall() && (
                          <View className="marketing">
                            <Text className="market-text">自营</Text>
                          </View>
                        )}
                        <View className="title-view">
                          <Text className="words">
                            {!WMkit.isMall() && <Text className="text">随便写</Text>}
                            {item.lowGoodsName}
                          </Text>
                        </View>
                      </View>

                      {/* 商品规格 */}
                      {item.goodsInfo.specText && (
                        <View className="goods-spec">
                          <Text className="spec-text">{item.goodsInfo.specText ? item.goodsInfo.specText : ''}</Text>
                        </View>
                      )}

                      {/* 促销活动 */}
                      <MarketingLabel
                        marketingLabels={immutable.fromJS(item.goodsInfo.marketingLabels)}
                        couponLabels={immutable.fromJS(item.goodsInfo.couponLabels)}
                        grouponLabel={immutable.fromJS(item.goodsInfo.grouponLabel)}
                      />
                    </View>

                    {/* 下半部分内容 */}
                    <View className="down-content">
                      {/* 销量 评论数 好评率 */}
                      <View className="goods-statics">
                        <Text className="texts">
                          {salesNum}
                          销量
                        </Text>
                        <Text className="texts">
                          {evaluateNum}
                          评论
                        </Text>
                        <Text className="texts">
                          {favorableRate}
                          %好评
                        </Text>
                      </View>

                      {/* 商品价格 步进器*/}
                      <View className="goods-price">
                        <Price price={this._calShowPrice(item, buyCount)} />
                        {/* 步进器 */}
                        {!WMkit.isVirtualGoods(goodsType) && (
                          <CartCount
                            count={buyCount}
                            inventory={stock}
                            getNum={(count) => {
                              goodsAction.skuAddShopCart(item.goodsInfo.goodsInfoId, count);
                              activityAction.changeGoodsNum(
                                item.goodsInfo.goodsInfoId,
                                main.marketing.marketingId,
                                buyCount,
                                count,
                              );
                              this.props.actions.init(main.marketingId, false);
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
      </ScrollView>
    );
  }

  /**
   * 根据设价方式,计算显示的价格
   * @returns 显示的价格
   * @private
   */
  _calShowPrice = (goodsItem, buyCount) => {
    const {main} = this.props;
    const goodsIntervalPrices = immutable.fromJS(main.goodsIntervalPrices);
    goodsItem = immutable.fromJS(goodsItem);
    const goodsInfo = goodsItem.get('goodsInfo');
    let showPrice;
    // 阶梯价,根据购买数量显示对应的价格
    if (goodsInfo.get('priceType') === 1 && goodsInfo.get('intervalPriceIds')) {
      const intervalPriceArr = goodsInfo
        .get('intervalPriceIds')
        .map((id) => goodsIntervalPrices.find((pri) => pri.get('intervalPriceId') === id))
        .sort((a, b) => b.get('count') - a.get('count'));
      if (buyCount > 0) {
        // 找到sku的阶梯价,并按count倒序排列从而找到匹配的价格
        showPrice = intervalPriceArr.find((pri) => buyCount >= pri.get('count')).get('price');
      } else {
        showPrice = goodsInfo.get('intervalMinPrice') || 0;
      }
    } else {
      //企业标识
      let buyPoint = goodsInfo.get('buyPoint');
      let isbuyPoint = buyPoint != null && buyPoint > 0;
      let social = goodsInfo.get('distributionGoodsAudit') == 2;
      let iepShowFlag = main.iepSwitch && !social && goodsInfo.get('enterPriseAuditState') == 2 && !isbuyPoint;
      if (iepShowFlag) {
        showPrice = goodsInfo.get('enterPrisePrice') || 0;
      } else {
        showPrice = goodsInfo.get('salePrice') || 0;
      }
    }
    return _.addZero(showPrice);
  };

  // 判断是否缺货
  isInvalid = (goodsInfo) => {
    const stock = goodsInfo.stock; // 库存
    const count = goodsInfo.count || 0; // 起订量
    const invalid = stock <= 0 || (count > 0 && count > stock);
    return invalid;
  };
}

//create by moon https://github.com/creasy2010/moon
