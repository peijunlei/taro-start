import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import Blank from '@/pages/common/blank';
import { store2Props } from '../selectors';
import { _, immutable } from 'wmkit';
import Price from '@/pages/common/goods/price';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import WMLoading from '@/pages/common/loading';
import { Const } from 'config';
const defaultImg = require('@/assets/image/common/default-img.png');

type IInfoProps = T.IProps & T.IInfoProps;
@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class InfoList extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }

  render() {
    let {
      main: { goodsList, form, totalPages, isShow, isLoadingList },
      actions: { action },
    } = this.props;

    return (
      <View className="shop-index-shop-info">
        <ScrollView scrollY onScrollToLower={this._onScrollToLower} className="goods-list-scroll-view ">
          {goodsList.length > 0 ? (
            <View style={{ overflowY: 'auto' }} className="shop-index-shop-body">
              {goodsList.map((goods, index) => {
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
                //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
                return (
                  <View
                    className="spu-item"
                    key={index}
                    onClick={() => {
                      //从店铺精选点击进入的商品详情（都是分销商品）
                      Taro.navigateTo({
                        url: `/pages/package-B/distribution/shop/socia-details/index?id=0&goodsId=${goodsInfo.goodsId}&skuId=${goodsInfo.goodsInfoId}`,
                      });
                    }}
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
                              <Text className="market-text">{Const.thirdPlatformTypeList[goodsInfo.thirdPlatformType]}</Text>
                            </View>
                          )}
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
                        <MarketingLabel goodsLabel={immutable.fromJS(goods.goodsLabelList)} />
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
                        <View className="goods-price distribution-goods-price-setting">
                          <Price price={goodsInfo.marketPrice} />

                          {/* 发圈素材 分享赚 */}
                          {!invalid ? (
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
                                className="share-btns"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (Taro.getEnv() == 'WEAPP') {
                                    action.commonChange([
                                      { paths: 'main.goodsInfo', value: goods.goodsInfo },
                                      { paths: 'main.goodsShareVisible', value: true },
                                    ]);
                                  } else {
                                    //从店铺精选点击进入的商品详情（都是分销商品）
                                    Taro.navigateTo({
                                      url: `/pages/package-B/distribution/shop/socia-details/index?id=0&goodsId=${goodsInfo.goodsId}&skuId=${goodsInfo.goodsInfoId}`,
                                    });
                                  }
                                }}
                              >
                                <Text className="share-text">分享赚{_.addZero(goodsInfo.distributionCommission)}</Text>
                              </View>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
              {goodsList.length != 0 && form.pageNum + 1 != totalPages && <View className="status">加载中</View>}
              {!isLoadingList && goodsList.length !== 0 && form.pageNum + 1 === totalPages && (
                <View className="status">没有更多了</View>
              )}
              {/*<View className="status">{form.pageNum + 1 < totalPages ?'加载中':'没有更多了'}</View>*/}
            </View>
          ) : (
              !isLoadingList && (
                <View>
                  <Blank
                    content="店主比较懒，还没有添加商品哦~"
                    img={require('../img/empty.png')}
                    imgStyle={{ width: '208rpx', height: '208rpx' }}
                  />
                </View>
              )
            )}
        </ScrollView>
        {isLoadingList && <WMLoading />}
      </View>
    );
  }
  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}

//create by moon https://github.com/creasy2010/moon
