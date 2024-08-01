import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import './index.less';
import { connect } from 'react-redux';
import Price from '@/pages/common/goods/price';
import { _, immutable, WMkit } from 'wmkit';
import Blank from '@/pages/common/blank';
import purchaseBaseController from 'api/PurchaseBaseController';
import CartCount from '@/pages/common/goods/cart-count';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import { getGlobalData } from '@/service/config';
import { Const } from 'config';
//加入购物车的商品数量
let cartNum = 0;
const defaultImg = require('@/assets/image/common/default-img.png');

interface SellwellGoodsProps {
  distributor: Object;
  hotGoodsList: Object;
}

export default class SellwellGoods extends Component<any, SellwellGoodsProps> {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    distributor: {},
  };

  constructor(props: SellwellGoodsProps) {
    super(props);
  }

  render() {
    const isIphoneX = getGlobalData('isIphoneX');
    let { hotGoodsList, distributor, isLoadingFlag } = this.props;
    // 分销员是否禁用 0: 启用中  1：禁用中
    let forbidFlag = distributor.forbiddenFlag;
    // 此版本默认都展示
    const isShow = true;
    return (
      <View className={isIphoneX ? 'sellwellGoods goodsFit' : 'sellwellGoods'}>
        <View className="sellwell-title">热销商品</View>
        <View>
          {hotGoodsList && hotGoodsList.length > 0 ? (
            hotGoodsList.map((goods) => {
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
              // 商品类型
              const goodsType = goods.goodsType || goodsInfo?.goodsType || 0;
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
              const goodsSalesNum = goodsInfo.goodsSalesNum;
              let salesNum = goodsSalesNum ? _.goodsSalesNum(goodsSalesNum) : '暂无';

              // 营销标签
              const marketingLabels = goodsInfo.marketingLabels;
              // 优惠券标签
              const couponLabels = goodsInfo.couponLabels;

              return (
                <View className="spu-item" key={goods.id}>
                  <View className="img-box">
                    <Image src={goodsInfo.goodsInfoImg || defaultImg} className="goods-img" />
                    {invalid && (
                      <View className="not-goods">
                        <View className="not-goods-text">缺货</View>
                      </View>
                    )}
                  </View>
                  <View
                    className="right-content"
                    onClick={() =>
                      Taro.navigateTo({
                        url: `/pages/package-B/goods/goods-details/index?skuId=${goods.id}`,
                      })
                    }
                  >
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
                            <Text className="market-text">{Const.thirdPlatformTypeList[goodsInfo.thirdPlatformType]}</Text>
                          </View>
                        )}
                        <View className="title-view">
                          <Text className={goodsInfo.companyType == 0 ? 'words indent-words' : 'words'}>
                            {goodsInfo.goodsInfoName ? goodsInfo.goodsInfoName : ''}
                          </Text>
                        </View>
                      </View>
                      {/* 商品规格 */}
                      {goodsInfo.specText && (
                        <View className="goods-spec">
                          <Text className="spec-text">{goodsInfo.specText}</Text>
                        </View>
                      )}

                      {/* 商品标签 */}
                      <MarketingLabel
                        marketingLabels={immutable.fromJS(marketingLabels || [])}
                        couponLabels={immutable.fromJS(couponLabels)}
                        goodsLabel={immutable.fromJS(goods.goodsLabelList)}
                      />
                    </View>

                    {/* 下半部分内容 */}
                    <View>
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
                      <View className="goods-price">
                        <Price price={_.addZero(goodsInfo.marketPrice)} />
                        {/* 步进器 */}
                        {!WMkit.isVirtualGoods(goodsType) && !invalid && (
                          <CartCount
                            inventory={stock}
                            count={buyCount}
                            getNum={(count) => {
                              this.skuAddShopCart(goodsInfo.goodsInfoId, count);
                            }}
                          />
                        )}

                        {/* {invalid && <Text className="out-stock">缺货</Text>} */}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
              <Blank content="没有搜索到任何商品" style={{ paddingTop: 0, marginBottom: 30 }} />
            )}
        </View>
      </View>
    );
  }
  async skuAddShopCart(goodsInfoId, count) {
    let token = Taro.getStorageSync('authInfo:token');
    //获取缓存到本地的购物车数据
    let purchaseData = Taro.getStorageSync('mini::shopCartSku') ? Taro.getStorageSync('mini::shopCartSku') : [];
    if (token) {
      if (count == 0) {
        // 为0的时候，调用删除接口,接口限制goodsNum最小为1，手动传1
        try {
          await purchaseBaseController.delete_({ goodsInfoIds: goodsInfoId.split() });
          cartNum = cartNum + 1;
        } catch (error) {
          Taro.showToast({
            title: error,
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        try {
          await purchaseBaseController.edit({ goodsInfoId, goodsNum: count });
          cartNum = cartNum + 1;
        } catch (error) {
          Taro.showToast({
            title: error,
            icon: 'none',
            duration: 2000,
          });
        }
      }
    } else {
      //判断之前当前购买过的商品在购物车中有没有存在，如果存在购买的数量相加 如果不存在 重新增加一条数据
      let index = purchaseData.findIndex((item) => item.goodsInfoId == goodsInfoId);
      if (index > -1) {
        if (count == 0) {
          purchaseData.splice(index, 1);
        } else {
          purchaseData[index].goodsNum = count;
        }
      } else {
        purchaseData.push({ goodsInfoId, goodsNum: count });
      }
      cartNum = purchaseData.length;
      //存到本地缓存
      await Taro.setStorage({
        key: 'mini::shopCartSku',
        data: purchaseData,
      });
    }
  }
}
