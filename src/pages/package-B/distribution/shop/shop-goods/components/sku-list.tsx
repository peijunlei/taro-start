import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './spu-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

import Price from '@/pages/common/goods/price';
import { _, immutable } from 'wmkit';
import { mul, div } from '@/utils/priceFormat';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import { getClassNameInfoMap, } from '@/utils/common-functions';
import lodash from 'lodash';
import { Const } from 'config';

type ISkuListProps = T.IProps & T.ISkuListProps;

@connect<Partial<ISkuListProps>, T.ISkuListState>(store2Props, actions)
export default class SkuList extends Component<Partial<ISkuListProps>, T.ISkuListState> {
  constructor(props: ISkuListProps) {
    super(props);
    this.state = {
      socialBtnBox2023WidthList: [],
    }
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.getSocialBtnBox2023WidthListFn();
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Partial<ISkuListProps>>, prevState: Readonly<T.ISkuListState>, snapshot?: any): void {
    setTimeout(() => {
      this.getSocialBtnBox2023WidthListFn();
    }, 1000);
  }

  /**
    sku列表
*/
  render() {
    const {
      actions: { goodsAction, activityAction },
    } = this.props;
    const { goods = [], isDistributor } = this.props?.main || {};
    const { socialBtnBox2023WidthList, } = this.state;

    return (
      <ScrollView>
        <View className="spuList skuList">
          {goods.length > 0 &&
            goods.map((item, index) => {
              // 社交电商相关内容显示与否
              const social = item.goodsInfo.distributionGoodsAudit == 2;
              const stock = item.goodsInfo.stock;
              // 商品是否要设置成无效状态
              // 起订量
              const count = item.goodsInfo.count || 0;
              // 库存等于0或者起订量大于剩余库存
              const invalid = stock <= 0 || (count > 0 && count > stock);
              return (
                <View
                  className="distribution-shop-spu-item"
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
                        {item.goodsInfo.companyType == 0 && (
                          <View className="marketing" style={{ marginRight: 10 }}>
                            <Text className="market-text">自营</Text>
                          </View>
                        )}
                        {item.goodsInfo.thirdPlatformType != null && (
                          <View className="marketing">
                            <Text className="market-text">{Const.thirdPlatformTypeList[item.goodsInfo.thirdPlatformType]}</Text>
                          </View>
                        )}
                        <View className="title-view">
                          <Text className="words">
                            {item.goodsInfo.companyType == 0 && <Text className="text">当当当</Text>}
                            {item.goodsInfo.goodsInfoName}
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
                        marketingLabels={immutable.fromJS(!social ? item.goodsInfo.marketingLabels : [])}
                        couponLabels={immutable.fromJS(!social ? item.goodsInfo.couponLabels : [])}
                        goodsLabel={immutable.fromJS(item.goodsLabelList)}
                      />
                    </View>

                    {/* 下半部分内容 */}
                    <View className="down-content">
                      {/* 销量 评论数 好评率 */}
                      <View className="goods-statics">
                        <Text className="texts">
                          {item.goodsInfo.goodsSalesNum < 10000
                            ? item.goodsInfo.goodsSalesNum == 0
                              ? '暂无'
                              : item.goodsInfo.goodsSalesNum
                            : div(item.goodsInfo.goodsSalesNum, 10000).toFixed(1) + '万+'}
                          销量
                        </Text>
                        <Text className="texts">
                          {item.goodsInfo.goodsEvaluateNum < 10000
                            ? item.goodsInfo.goodsEvaluateNum == 0
                              ? '暂无'
                              : item.goodsInfo.goodsEvaluateNum
                            : div(item.goodsInfo.goodsEvaluateNum, 10000).toFixed(1) + '万+'}
                          评论
                        </Text>
                        <Text className="texts">
                          {item.goodsInfo.goodsFavorableCommentNum == 0 || item.goodsInfo.goodsEvaluateNum == 0
                            ? 100
                            : mul(
                              div(item.goodsInfo.goodsFavorableCommentNum, item.goodsInfo.goodsEvaluateNum).toFixed(
                                0,
                              ),
                              100,
                            )}
                          %好评
                        </Text>
                      </View>

                      {/* 商品价格*/}
                      <View className="goods-price">
                        <View className="goods-price2"
                          style={{ width: `calc(100% - ${socialBtnBox2023WidthList?.[index] ?? 0}px)`, }}
                        >
                          <Price price={item.goodsInfo.marketPrice} />
                          {/*分享赚 */}
                          {social && isDistributor
                            ? !invalid && (
                              <View className="right-tools">
                                <View className="share-btn">
                                  <Text className="share-text">
                                    分享赚{_.addZero(item.goodsInfo.distributionCommission)}
                                  </Text>
                                </View>
                              </View>
                            )
                            : null}
                        </View>

                        <View className={`social-btn-box social_btn_box_2023_${item?.id}`}>
                          {item.goodsInfo.joinDistributior == 1 ? (
                            <View
                              className="social-btn social-btn-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                goodsAction.delCommodityDistribution(item.goodsInfo.goodsInfoId, index);
                              }}
                            >
                              删除
                            </View>
                          ) : (
                              <View
                                className="social-btn social-btn-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (goodsAction.getCountsByCustomerId(item.goodsInfo.goodsId)) {
                                    goodsAction.addCommodityDistribution(
                                      item.goodsInfo.goodsId,
                                      item.goodsInfo.goodsInfoId,
                                      item.goodsInfo.storeId,
                                      index,
                                    );
                                  }
                                }}
                              >
                                加入店铺
                              </View>
                            )}
                        </View>
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
   * 获取.social_btn_box_2023元素宽度 - 集合 - 操作
   */
  getSocialBtnBox2023WidthListFn = async () => {
    const { goods, } = this.props?.main || {};
    const { socialBtnBox2023WidthList, } = this.state;
    const promiseList = [];

    if (Array.isArray(goods) && goods.length) {
      goods.forEach(item => {
        if (item?.id) {
          promiseList.push(getClassNameInfoMap(`.social_btn_box_2023_${item?.id}`));
        }
      })
    }

    if (Array.isArray(promiseList) && promiseList.length) {
      const result = await Promise.all(promiseList);
      const widthList = result?.map?.(item => item?.width) || [];
      if (!lodash.isEqual(socialBtnBox2023WidthList, widthList)) {
        this.setState({ socialBtnBox2023WidthList: widthList, });
      }
    }
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
