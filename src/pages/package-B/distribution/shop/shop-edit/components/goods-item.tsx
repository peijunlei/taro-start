import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './goods-item.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { _ } from 'wmkit';
import Price from '@/pages/common/goods/price';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import { Const } from 'config';
const defaultImg = require('@/assets/image/common/default-img.png');

type IInfoProps = T.IProps & T.IInfoProps;
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class GoodsItem extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      main: { goodsList, isShow },
      actions: { action },
      goods,
    } = this.props;

    // sku信息
    const goodsInfo = goods.goodsInfo;
    // 库存
    const stock = goodsInfo.stock;
    // 商品是否要设置成无效状态
    // 起订量
    const count = goodsInfo.count || 0;
    // 库存等于0或者起订量大于剩余库存
    const invalid = stock <= 0 || (count > 0 && count > stock);

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
    let isH5 = __TARO_ENV === 'h5';
    return (
      <View>
        <View className="shop-edit-spu-item" key={goods.id}>
          <View className="img-box">
            <Image src={goodsInfo.goodsInfoImg || defaultImg} className="goods-img" />
            {/*{invalid && <View className="not-goods">*/}
            {/*<View className="not-goods-text">缺货</View>*/}
            {/*</View>}*/}
          </View>
          <View
            className="right-content"
            onClick={() => {
              //从店铺精选点击进入的商品详情（都是分销商品）
              // Taro.navigateTo({
              //   url: `/shop-index/goods-detail/0/${goodsId}/${goodsInfoId}`,
              // })
            }}
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
                  <Text className="words" style={goodsInfo.companyType == 0 ? { textIndent: '34px' } : { textIndent: 0 }}>
                    {goodsInfo.goodsInfoName}
                  </Text>
                </View>
              </View>
              {/* 商品规格 */}
              {goodsInfo.specText && (
                <View className="goods-spec">
                  <Text className={isH5 ? 'spec-text-h5' : 'spec-text'}>{goodsInfo.specText ? goodsInfo.specText : ''}</Text>
                </View>
              )}
            </View>

            {/* 下半部分内容 */}
            <View className="down-content">
              {/* 商品价格*/}
              <View className="goods-price">
                <View style={{ flexDirection: 'row' }}>
                  <Price price={goodsInfo.marketPrice} />
                  {/* 分享赚 */}
                  {/*{!invalid ? (*/}
                  <View className="right-tools">
                    <View className="shop-edit-share-btn">
                      <Text className="share-text">分享赚{_.addZero(goodsInfo.distributionCommission)}</Text>
                    </View>
                  </View>
                  {/*) : null}*/}
                </View>
                {
                  // !invalid &&
                  <View
                    className="delete"
                    onClick={() => {
                      action.delete(goodsInfo.goodsInfoId);
                    }}
                  >
                    删除
                  </View>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
