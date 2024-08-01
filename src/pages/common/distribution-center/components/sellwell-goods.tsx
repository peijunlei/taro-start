import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './sellwell-goods.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import Price from '@/pages/common/goods/price';
import { _, immutable } from 'wmkit';
import Blank from '@/pages/common/blank';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import CartCount from '@/pages/common/goods/cart-count';
import { Const } from 'config';
const emptyImage = require('@/assets/image/groupon/empty.png');
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';

const linkGoods = require('@/assets/image/distribution/link-goods.png');
const defaultImg = require('@/assets/image/common/default-img.png');
type ISellwellGoodsProps = T.IProps & T.ISellwellGoodsProps;

@connect<Partial<ISellwellGoodsProps>, T.ISellwellGoodsState>(store2Props, actions)
export default class SellwellGoods extends Component<Partial<ISellwellGoodsProps>, T.ISellwellGoodsState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISellwellGoodsProps) {
    super(props);
  }

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {
        action: { commonChange },
      },
      main: { hotGoodsList, distributor, isLoadingList },
    } = this.props;
    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor?.forbiddenFlag;
    // FIXME 销量、评价、好评展示与否，后期读取后台配置开关
    // 此版本默认都展示
    const isShow = true;
    return (
      <View className="sellwellGoods">
        <View className="sellwell-title">热销商品</View>
        <View>
          {hotGoodsList && hotGoodsList.length > 0
            ? hotGoodsList.map((goods) => {
              // sku信息
              const goodsInfo = goods.goodsInfo;
              // 库存
              const stock = goodsInfo.stock;
              // 商品是否要设置成无效状态
              // 起订量
              const count = goodsInfo.count || 0;
              // 库存等于0或者起订量大于剩余库存
              const invalid = stock <= 0 || (count > 0 && count > stock);
              const buyCount = invalid ? 0 : goodsInfo.buyCount || 0;

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
              const buyPointFlag = goodsInfo.buyPoint == null || goodsInfo.buyPoint == 0;
              // 营销标签
              const marketingLabels = goodsInfo.marketingLabels;
              // 优惠券标签
              const couponLabels = goodsInfo.couponLabels;
              return (
                <View
                  className="sellwell-goods-spu-item"
                  key={goods.id}
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${goods.id}`,
                    })
                  }
                >
                  <View className="img-box">
                    <Image src={goodsInfo.goodsInfoImg || defaultImg} className="goods-img" />
                    {invalid && (
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
                        {goodsInfo.companyType == 0 && (
                          <View className="marketing" style={{ marginRight: 10 }}>
                            <Text className="market-text">自营</Text>
                          </View>
                        )}
                        {goodsInfo.thirdPlatformType != null && (
                          <View className="marketing">
                            <Text className='market-text'>{Const.thirdPlatformTypeList[goodsInfo.thirdPlatformType]}</Text>
                          </View>)}
                        <View className="title-view">
                          <Text className="words" style={goodsInfo.companyType == 0 ? { textIndent: '34px' } : {}}>
                            {goodsInfo.goodsInfoName}
                          </Text>
                        </View>
                      </View>
                      {/* 商品规格 */}
                      {goodsInfo.specText && (
                        <View className="goods-spec">
                          <Text className="spec-text">{goodsInfo.specText ? goodsInfo.specText : ''}</Text>
                        </View>
                      )}

                      {/* 商品标签 */}
                      <MarketingLabel
                        marketingLabels={fromJS(marketingLabels || [])}
                        couponLabels={fromJS(couponLabels)}
                        goodsLabel={fromJS(goods.goodsLabelList)}
                        isDistribution
                      />
                    </View>

                    {/* 下半部分内容 */}
                    <View className="down-content">
                      {/* 销量 评论数 好评率 */}
                      {isShow ? (
                        <View className="goods-statics">
                          <Text className="texts">{salesNum}销量</Text>
                          <Text className="texts">{evaluateNum}评论</Text>
                          <Text className="texts">{favorableRate}%好评</Text>
                        </View>
                      ) : (
                          <View className="goods-statics">
                            <Text className="texts">{salesNum}销量</Text>
                          </View>
                        )}
                      {/* 商品价格*/}
                      <View className="sellwell-goods-price">
                        <Price price={_.addZero(goodsInfo.marketPrice)} />

                        {/* 发圈素材 分享赚 */}
                        {!invalid && buyPointFlag ? (
                          !forbidFlag ? (
                            <View className="right-tools">
                              <View
                                className="mater-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  Taro.navigateTo({
                                    url: `/pages/package-B/goods/material-circle/index?goodsInfoId=${goods.goodsInfo.goodsInfoId}`,
                                  });
                                }}
                              >
                                <Text className="mater-text">发圈</Text>
                              </View>
                              <View
                                className="share-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isH5) {
                                    Taro.showToast({
                                      title: '请到小程序端操作',
                                      icon: 'none',
                                      duration: 2000,
                                    });
                                  } else {
                                    commonChange([
                                      { paths: 'main.goodsInfo', value: goods.goodsInfo },
                                      { paths: 'main.goodsShareVisible', value: true },
                                    ]);
                                  }
                                }}
                              >
                                <Text className="share-text">
                                  分享赚{' '}
                                  {_.parseNumber(goodsInfo.distributionCommission).length >= 3
                                    ? _.parseNumber(goodsInfo.distributionCommission).substring(0, 3) + '...'
                                    : _.addZero(goodsInfo.distributionCommission)}
                                </Text>
                              </View>
                            </View>
                          ) : (
                              <CartCount
                                count={buyCount}
                                inventory={stock || 0}
                                getNum={(count) => {
                                  console.log(count);
                                  // goodsAction.skuAddShopCart(goods.goodsInfo.goodsInfoId, count);
                                }}
                              />
                            )
                        ) : null}

                        {/* {invalid && <Text className="out-stock">缺货</Text>} */}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
            : !isLoadingList && (
              <Blank img={emptyImage} content="没有搜索到任何商品" style={{ paddingTop: 0, marginBottom: 30 }} />
            )}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
