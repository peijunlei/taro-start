import { View, Button, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './big-spu-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import noDataIcon from '@/assets/image/goods/goods-list/no-data-bgi.png';
import Price from '@/pages/common/goods/price';
import addIcon from '@/assets/image/goods/goods-list/add.png';
import { mul, div, toFixed2 } from '@/utils/priceFormat';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import { _, immutable, WMkit } from 'wmkit';
import moment from 'moment';
import { Const } from 'config';
type IBigSpuListProps = T.IProps & T.IBigSpuListProps;
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IBigSpuListProps>, T.IBigSpuListState>(store2Props, actions)
export default class BigSpuList extends Component<Partial<IBigSpuListProps>, T.IBigSpuListState> {
  constructor(props: IBigSpuListProps) {
    super(props);
  }

  /**
    spu大图列表
*/
  render() {
    let {
      actions: { goodsAction, activityAction },
      main = {},
    } = this.props;
    const scrollTop = 0;
    const Threshold = 20;
    const { appointmentSaleVOList = [] } = main;
    return (
      <View className="bigSpuList">
        {main &&
          main.goods.length > 0 &&
          main.goods.map((item, index) => {
            const { goodsInfos = [] } = item || {};
            // spu下最低价格sku(价格倒序时取最高价，其他最低价)
            let goodsInfo = null;
            if (main.request.sortFlag === 2) {
              goodsInfo = item.goodsInfos
                .filter((skuInfo) => skuInfo.addedFlag === 1)
                .sort((a, b) => {
                  if (a.marketPrice < b.marketPrice) {
                    return -1;
                  }
                  if (a.marketPrice > b.marketPrice) {
                    return 1;
                  }
                  if (a.marketPrice === b.marketPrice) {
                    return 0;
                  }
                })
                .pop();
            } else {
              goodsInfo = item.goodsInfos
                .filter((skuInfo) => skuInfo.addedFlag === 1)
                .sort((a, b) => {
                  if (a.marketPrice < b.marketPrice) {
                    return -1;
                  }
                  if (a.marketPrice > b.marketPrice) {
                    return 1;
                  }
                  if (a.marketPrice === b.marketPrice) {
                    return 0;
                  }
                })
                .shift();
            }
            let social = goodsInfo.distributionGoodsAudit == 2 ? true : false;
            const distributionCommission = goodsInfo.distributionCommission;
            const isAppointmentArry =
              (Array.isArray(appointmentSaleVOList) &&
                appointmentSaleVOList.filter(
                  (index) => goodsInfo.goodsInfoId == index.appointmentSaleGood.goodsInfoId,
                )) ||
              [];
            // 库存等于0或者起订量大于剩余库存
            // 商品是否要设置成无效状态(spu下所有sku的库存等于0 或者 起订量大于剩余库存)
            const invalid = goodsInfos.every((sku) => {
              const stock = sku.stock; // 库存
              const count = sku.count || 0; // 起订量
              return stock <= 0 || (count > 0 && count > stock);
            });

            //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
            //好评率
            let favorableRate = '100';
            if (goodsInfo.goodsEvaluateNum && goodsInfo.goodsEvaluateNum != 0) {
              favorableRate = _.mul(_.div(goodsInfo.goodsFavorableCommentNum, goodsInfo.goodsEvaluateNum), 100).toFixed(
                0,
              );
            }
            let buyPoint = goodsInfo.buyPoint;
            let isbuyPoint = buyPoint != null && buyPoint > 0;
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

            //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

            //企业购商品的判断
            // @ts-ignore
            const { isIepAuth: iepSwitch, iepInfo: info = {} } = main.iepInfo;
            //企业价
            const iepPrice = goodsInfo.enterPrisePrice;
            //企业价名称
            const {enterprisePriceName} = info || {};
            //企业购开关打开 + 已审核的企业购商品 + 有库存 + 非分销商品 + 非抢购
            let isFlashFlag = false;
            const marketingLabels = goodsInfo.marketingLabels;
            if (marketingLabels != null && marketingLabels.length > 0) {
              isFlashFlag = marketingLabels.filter((val) => val.marketingType === 5).length > 0;
            }
            // 秒杀＞分销价
            social = social && !isFlashFlag;
            const iepGoodsShowFlag =
              iepSwitch && goodsInfo.enterPriseAuditStatus == 2 && !invalid && !social && !isFlashFlag;

            let price = isbuyPoint
              ? goodsInfo.salePrice
              : social
                ? goodsInfo.marketPrice
                : iepGoodsShowFlag
                  ? iepPrice
                  : goodsInfo.priceType == 1
                    ? goodsInfo.intervalMinPrice
                    : goodsInfo.salePrice;

            let linePrice = social ? '' : item.linePrice;
            const goodsType = item.goodsType || goodsInfo?.goodsType || 0;
            //预约
            let isShowAppointment = false;
            let appointmentItem = [];
            let bookingItem = [];
            //预售
            let isShowBooking = false;
            // 非积分商品
            if (!isbuyPoint) {
              main.appointmentSaleVOList &&
                main.appointmentSaleVOList.map((index) => {
                  if (goodsInfo.goodsInfoId == index.appointmentSaleGood.goodsInfoId) {
                    price = index.appointmentSaleGood.price ? index.appointmentSaleGood.price : goodsInfo.marketPrice;
                    isShowAppointment = true;
                    appointmentItem = index;
                    linePrice = goodsInfo.marketPrice;
                  }
                });

              main.bookingSaleVOList &&
                main.bookingSaleVOList.map((index) => {
                  if (goodsInfo.goodsInfoId == index.bookingSaleGoods.goodsInfoId && this.isPresaleStatus(index)) {
                    isShowBooking = true;
                    bookingItem = index;
                    // 全款预售
                    price =
                      index.bookingSaleGoods.bookingPrice || index.bookingSaleGoods.bookingPrice == 0
                        ? toFixed2(index.bookingSaleGoods.bookingPrice)
                        : toFixed2(goodsInfo.marketPrice);
                    //全款预售的划线价是市场价而不是参加活动前的划线价、定金预售不显示划线价
                    if (index.bookingType == 0) {
                      linePrice = goodsInfo.marketPrice;
                    }
                  }
                });
              // 秒杀划线价处理
              isFlashFlag = isFlashFlag && !isbuyPoint && !isShowBooking && !isShowAppointment;
              if (isFlashFlag) {
                linePrice = goodsInfo.marketPrice;
              }
            }
            // 秒杀＞分销价
            social = social && !isFlashFlag && !isbuyPoint && !isShowBooking && !isShowAppointment;
            //是否是拼团商品
            let isGrouponLabel = goodsInfo.grouponLabel ? true : false;

            //是否展示拼团、秒杀等活动标签
            let showFlag = true;
            if (isShowAppointment || isShowBooking || (goodsInfo.buyPoint != null && goodsInfo.buyPoint > 0)) {
              showFlag = false;
            }

            //是否为拼团
            let isGrouponFlag = false;
            if (immutable.fromJS(goodsInfo.grouponLabel)) {
              isGrouponFlag = true;
            }

            return (
              <View
                key={index}
                className="big-spu-item"
                onClick={() => activityAction.loadPages(goodsInfo, isAppointmentArry, isShowBooking)}
              >
                <View className="img-box">
                  <Image src={goodsInfo.goodsInfoImg ? goodsInfo.goodsInfoImg : noDataIcon} className="big-goods-img" />
                  {/* 判断是否缺货 */}
                  {this.isInvalid(item.goodsInfos) && (
                    <View className="big-not-goods">
                      <View className="big-not-goods-text">缺货</View>
                    </View>
                  )}
                  {/* 预约 */}
                  {!buyPoint && isShowAppointment && (
                    <View className="preBuy">{this.isBuyStatus(appointmentItem)}</View>
                  )}
                  {/* 预售 */}
                  {!buyPoint && isShowBooking && <View className="preBuy">{this.isPresaleStatus(bookingItem)}</View>}
                </View>
                {/* 图片下面的内容 */}
                <View className="big-spu-content">
                  {/* 上半部分内容 */}
                  <View className="big-up-content">
                    {/* 商品标题 */}
                    <View className="big-goods-title">
                      {goodsInfo.companyType == 0 && !main.request.storeId && (
                        <View className="marketing" style={{ marginRight: 10 }}>
                          <Text className="market-text">自营</Text>
                        </View>
                      )}
                      {goodsInfo.thirdPlatformType != null && (
                        <View className="marketing">
                          <Text className="market-text">{Const.thirdPlatformTypeList[goodsInfo.thirdPlatformType]}</Text>
                        </View>
                      )}
                      <Text
                        className="title-view"
                        style={goodsInfo.companyType == 0 && !main.request.storeId && { textIndent: '4px' }}
                      >
                        <Text className="words">
                          {/* {goodsInfo.companyType == 0 && <Text className="text">00000</Text>} */}
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
                    <MarketingLabel
                      marketingLabels={
                        !social && showFlag ? immutable.fromJS(goodsInfo.marketingLabels) : immutable.fromJS([])
                      }
                      couponLabels={immutable.fromJS(goodsInfo.couponLabels)}
                      grouponLabel={immutable.fromJS(goodsInfo.grouponLabel)}
                      goodsLabel={immutable.fromJS(item.goodsLabelList)}
                    />
                  </View>

                  {/* 下半部分内容 */}
                  <View className="big-down-content">
                    <View className="goods-price-box">
                      <Price price={price} buyPoint={buyPoint} linePrice={linePrice} />
                      {iepGoodsShowFlag &&
                        (buyPoint == null || buyPoint == 0) &&
                        isShowAppointment == false &&
                        isShowBooking == false && (
                          <View className="marketing">
                            <Text className="market-text">{enterprisePriceName}</Text>
                          </View>
                        )}
                    </View>

                    {/* 销量 评论数 好评率 */}
                    <View className="big-goods-statics">
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

                    {/* 步进器 */}
                    {!WMkit.isVirtualGoods(goodsType) && (
                      <View className="cart-count">
                        {(social && !main.isDistributor) || !social ? (
                          <Image
                            src={addIcon}
                            className="goods-add-cart"
                            onClick={(e) => {
                              e.stopPropagation();
                              // //判断是否缺货
                              // if (this.isInvalid(item.goodsInfos)) {
                              //   return;
                              // }
                              goodsAction.findSpuSpecData(item.goodsInfos[0].goodsInfoId);
                              if (isFlashFlag) {
                                activityAction._initFlashSaleGoods(goodsInfo.goodsId);
                              }
                            }}
                          />
                        ) : social && main.isDistributor ? (
                          !invalid && <View />
                        ) : (
                              <View className="goods-add-cart" />
                            )}
                      </View>
                    )}

                    {/* 发圈素材 分享赚 */}
                    {social && main.isDistributor && !buyPoint
                      ? !invalid &&
                      !isShowAppointment &&
                      !isShowBooking &&
                      !isFlashFlag &&
                      !main.spreadFlag && (
                        <View className="big-right-tools">
                          <View
                            className="mater-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              activityAction.getDistributor(item.goodsInfos[0]);
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
                                activityAction.shareModal(item.goodsInfos[0]);
                              }
                            }}
                          >
                            <Text className="share-text">分享赚 {_.addZero(distributionCommission)}</Text>
                          </View>
                        </View>
                      )
                      : null}

                    {/* 推广商品列表 */}
                    {main.isDistributor && !invalid && main.spreadFlag && (
                      <View className="big-right-tools">
                        <View
                          className="mater-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            activityAction.getDistributor(item.goodsInfos[0]);
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
                              activityAction.shareModal(item.goodsInfos[0]);
                            }
                          }}
                        >
                          <Text className="share-text">分享赚 {_.addZero(distributionCommission)}</Text>
                        </View>
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
  //判断当前的预约状态
  isBuyStatus = (status) => {
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;
    //如果预约开始时间在当前时间之前则代表预约中
    let isAppointmentStart = moment(appointmentStartTime).isBefore(new Date());
    let isAppointmentEnd = moment(new Date()).isBefore(appointmentEndTime);

    let isSnapUpStartTime = moment(snapUpStartTime).isBefore(new Date());
    let isSnapUpEndTime = moment(new Date()).isBefore(snapUpEndTime);

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    return result;
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    const { bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime } = item;
    let isBetween = false;

    //预售起止时间内 0:全款 1:定金
    if (bookingType == 0) {
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime); // true
    }
    console.log('isBetween', isBetween);

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime); // true
    }

    if (isBetween) return '预售中';
  };

  // 判断是否缺货
  isInvalid = (goodsInfos = []) => {
    const invalid = goodsInfos.every((item) => {
      const stock = item.stock; // 库存
      const count = item.count || 0; // 起订量
      return stock <= 0 || (count > 0 && count > stock);
    });
    return invalid;
  };
}

//create by moon https://github.com/creasy2010/moon
