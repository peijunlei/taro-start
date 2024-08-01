import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _, immutable, WMkit } from 'wmkit';
import Price from '@/pages/common/goods/price';
import CartCount from '@/pages/common/goods/cart-count';
import * as T from '../types';
import './goods-item.less';
import actions from '../actions/index';
import { store2Props } from '../selectors';
import MarketingLabel from './marketing-label';
import { Const } from 'config';

type IInfoProps = T.IProps & T.IInfoProps;
const defaultImg = require('@/assets/image/common/default-img.png');

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class GoodsItem extends Component<Partial<IInfoProps>, T.IInfoState> {
  // constructor(props: IInfoProps) {
  //   super(props);
  // }
  static options = { addGlobalClass: true };

  render() {
    const item = this.props.item;
    const action = this.props.actions.action;
    const isShow = this.props.main.isShow;
    // skuId
    const id = item.id;
    // sku信息
    const goodsInfo = item.goodsInfo;
    const stock = goodsInfo.stock;
    // 商品是否要设置成无效状态
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const invalid = stock <= 0 || (count > 0 && count > stock);
    const buyCount = invalid ? 0 : goodsInfo.buyCount || 0;
    // 营销标签
    const marketingLabels = goodsInfo.marketingLabels;
    // 优惠券标签
    const couponLabels = goodsInfo.couponLabels;
    const goodsType = item.goodsType || goodsInfo.goodsType || 0;
    // 社交电商相关内容显示与否
    const social = goodsInfo.distributionGoodsAudit == 2;
    // const distributionCommission = goodsInfo.distributionCommission;
    // const marketPrice = goodsInfo.marketPrice;
    // //禁用分享赚
    // const socialDisabled = false;

    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
    //好评率
    let favorableRate = '100';
    if (goodsInfo.goodsEvaluateNum && goodsInfo.goodsEvaluateNum != 0) {
      favorableRate = _.mul(_.div(goodsInfo.goodsFavorableCommentNum, goodsInfo.goodsEvaluateNum), 100).toFixed(0);
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

    return (
      <View className="memberCenter__goodsItem">
        <View
          key={id}
          className="member__big-spu-item"
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/package-B/goods/goods-details/index?skuId=${id}`,
            })
          }
        >
          <View className="img-boxs">
            <Image className="big-goods-img" src={goodsInfo.goodsInfoImg || defaultImg} />
          </View>

          {/* 图片下面的内容 */}
          <View className="big-spu-content">
            {/* 上半部分内容 */}
            <View className="big-up-content">
              {/* 商品标题 */}
              <View className="big-goods-title">
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
                <Text className="title-view" style={process.env.TARO_ENV === 'h5' && { lineHeight: 0 }}>
                  <Text className="words">
                    {goodsInfo.companyType == 0 && <Text className="text">随便写</Text>}
                    {goodsInfo.goodsInfoName}
                  </Text>
                </Text>
              </View>

              {/* 商品规格 */}
              {goodsInfo.specText && (
                <View className="big-goods-spec">
                  <Text className="spec-text">{goodsInfo.specText ? goodsInfo.specText : ''}</Text>
                </View>
              )}

              {/* 规格 - 占位 */}
              {!goodsInfo.specText && (
                <View className="big-goods-spec">
                  <Text className="spec-text" style={{ color: 'transparent' }}>
                    占位
                  </Text>
                </View>
              )}

              {/* 促销活动 */}
              {(marketingLabels || couponLabels || item.goodsLabelList) && (
                <MarketingLabel
                  marketingLabels={immutable.fromJS(!social ? marketingLabels : [])}
                  couponLabels={immutable.fromJS(!social ? couponLabels : [])}
                  goodsLabel={immutable.fromJS(item.goodsLabelList)}
                  isSeat //占位
                />
              )}
            </View>

            {/* 下半部分内容 */}
            <View className="big-down-content">
              {/* 价格 */}
              <Price price={goodsInfo.priceType == 1 ? goodsInfo.intervalMinPrice : goodsInfo.salePrice} />

              {/* 销量 评论数 好评率 */}
              {isShow ? (
                <View className="big-goods-statics">
                  <Text className="texts">{salesNum}销量</Text>
                  <Text className="texts">{evaluateNum}评论</Text>
                  <Text className="texts">{favorableRate}%好评</Text>
                </View>
              ) : (
                  <View className="big-goods-statics">
                    <Text className="texts">{salesNum}销量</Text>
                  </View>
                )}

              {/* 步进器 */}
              {!WMkit.isVirtualGoods(goodsType) && (
                <View className="cart-count-con">
                  <CartCount
                    min={0}
                    count={buyCount}
                    inventory={stock}
                    getNum={async (index) => {
                      if (index) {
                        await action._changeSkuNum(goodsInfo.goodsInfoId, Number(index));
                      }
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
