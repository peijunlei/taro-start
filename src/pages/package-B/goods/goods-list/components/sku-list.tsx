import { View, Button, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './spu-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';

import Price from '@/pages/common/goods/price';
import { toFixed2 } from '@/utils/priceFormat';
import { immutable, WMkit, _ } from 'wmkit';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import moment from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
moment.extend(isBetween);
import CartCount from '@/pages/common/goods/cart-count';
import { Label } from '@wanmi/ui-taro';
import { Const } from 'config';
type ISkuListProps = T.IProps & T.ISkuListProps;
moment.extend(isBetween);

//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
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
      actions: { goodsAction, activityAction },
      main,
    } = this.props;

    return (
      <ScrollView>
        <View className="spuList skuList">
          {main &&
            main.goods.length > 0 &&
            main.goods.map((item, index) => {
              // 社交电商相关内容显示与否
              let social = item.goodsInfo.distributionGoodsAudit == 2 ? true : false;

              const distributionCommission = item.goodsInfo.distributionCommission;
              const goodsInfo = item.goodsInfo;
              const stock = item.goodsInfo.stock>0?item.goodsInfo.stock:0;
              const isAppointmentArry =
                (main.appointmentSaleVOList &&
                  main.appointmentSaleVOList.filter(
                    (index) => index && index.appointmentSaleGood && item.id == index.appointmentSaleGood.goodsInfoId,
                  )) ||
                [];
              // 商品是否要设置成无效状态
              // 起订量
              const count = item.goodsInfo.count || 0;
              // 库存等于0或者起订量大于剩余库存
              const invalid = stock <= 0 || (count > 0 && count > stock);

              //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
              //好评率
              let favorableRate = '100';
              if (item.goodsInfo.goodsEvaluateNum && item.goodsInfo.goodsEvaluateNum != 0) {
                favorableRate = _.mul(
                  _.div(item.goodsInfo.goodsFavorableCommentNum, item.goodsInfo.goodsEvaluateNum),
                  100,
                ).toFixed(0);
              }

              //评论数
              let evaluateNum = '暂无';
              const goodsEvaluateNum = item.goodsInfo.goodsEvaluateNum;
              if (goodsEvaluateNum) {
                if (goodsEvaluateNum < 10000) {
                  evaluateNum = goodsEvaluateNum;
                } else {
                  const i = _.div(goodsEvaluateNum, 10000).toFixed(1);
                  evaluateNum = i + '万+';
                }
              }

              //销量
              const goodsSalesNum = item.goodsInfo.goodsSalesNum;
              let salesNum = goodsSalesNum ? _.goodsSalesNum(goodsSalesNum) : '暂无';

              //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

              //企业购商品的判断
              // @ts-ignore
              const { isIepAuth: iepSwitch, iepInfo: info = {} } = main.iepInfo;
              //企业价
              const iepPrice = goodsInfo.enterPrisePrice;
              //企业价名称
              const { enterprisePriceName } = info || {};
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

              //购买数量
              const { buyCount } = goodsInfo;
              let buyPoint = goodsInfo.buyPoint;
              let isbuyPoint = buyPoint != null && buyPoint > 0;
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
              //是否是拼团商品
              let isGrouponLabel = item.goodsInfo.grouponLabel ? true : false;
              //预约
              let isShowAppointment = false;
              let appointmentItem = [];
              //预售
              let isShowBooking = false;
              // 非积分商品
              if (!isbuyPoint) {
                main.appointmentSaleVOList &&
                  main.appointmentSaleVOList.map((index) => {
                    if (
                      index &&
                      index.appointmentSaleGood &&
                      item.goodsInfo.goodsInfoId == index.appointmentSaleGood.goodsInfoId
                    ) {
                      price =
                        index && index.appointmentSaleGood && index.appointmentSaleGood.price >= 0
                          ? index.appointmentSaleGood.price
                          : goodsInfo.marketPrice;
                      isShowAppointment = true;
                      appointmentItem = index;
                      linePrice = goodsInfo.marketPrice;
                    }
                  });
                main.bookingSaleVOList &&
                  main.bookingSaleVOList.map((index) => {
                    if (
                      index &&
                      index.bookingSaleGoods &&
                      item.goodsInfo.goodsInfoId == index.bookingSaleGoods.goodsInfoId
                    ) {
                      // 全款预售支付尾款阶段不影响其他营销活动
                      isShowBooking = this.isPresaleStatus(index) == '预售中';
                      // 全款预售
                      if (isShowBooking) {
                        price =
                          index.bookingSaleGoods.bookingPrice || index.bookingSaleGoods.bookingPrice == 0
                            ? toFixed2(index.bookingSaleGoods.bookingPrice)
                            : toFixed2(goodsInfo.marketPrice);
                        //全款预售的划线价是市场价而不是参加活动前的划线价、定金预售不显示划线价
                        if (index.bookingType == 0) {
                          linePrice = goodsInfo.marketPrice;
                        }
                      }
                    }
                  });
                // 秒杀划线价处理
                isFlashFlag = isFlashFlag && !isbuyPoint && !isShowBooking && !isShowAppointment;
                if (isFlashFlag) {
                  linePrice = goodsInfo.marketPrice;
                }
              }
              //是否展示拼团活动标签
              let showFlag = true;
              if (isShowAppointment || isShowBooking || (buyPoint != null && buyPoint > 0)) {
                showFlag = false;
              }
              //步进器展示逻辑判断
              let iscartCountFlag =
                buyPoint > 0 ||
                isAppointmentArry.length > 0 ||
                isShowBooking ||
                isFlashFlag ||
                !main.isDistributor ||
                !social;
              // 商品类型
              const goodsType = item.goodsType || goodsInfo?.goodsType || 0;
              return (
                <View
                  key={item.id}
                  className="spu-item"
                  onClick={() => activityAction.loadPages(item.goodsInfo, isAppointmentArry, isShowBooking, goodsType)}
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

                    {/* 预约 */}
                    {!buyPoint &&
                      main.appointmentSaleVOList &&
                      main.appointmentSaleVOList.map((index, i) => {
                        return (
                          index &&
                          index.appointmentSaleGood &&
                          item.id == index.appointmentSaleGood.goodsInfoId && (
                            <View key={i} className="preBuy">
                              {this.isBuyStatus(index)}
                            </View>
                          )
                        );
                      })}

                    {/* 预售 */}
                    {!buyPoint &&
                      main.bookingSaleVOList &&
                      main.bookingSaleVOList.map((index, i) => {
                        return (
                          index &&
                          index.bookingSaleGoods &&
                          item.id == index.bookingSaleGoods.goodsInfoId &&
                          this.isPresaleStatus(index) == '预售中' && (
                            <View key={i} className="preBuy">
                              {this.isPresaleStatus(index)}
                            </View>
                          )
                        );
                      })}
                  </View>
                  <View className="right-content">
                    {/* 上半部分内容 */}
                    <View className="up-content">
                      {/* 商品标题 */}
                      <View className="goods-title">
                        {item.goodsInfo.companyType == 0 && !main.request.storeId && (
                          <View className="marketing" style={{ marginRight: 10 }}>
                            <Label name="自营" type="gold" />
                          </View>
                        )}
                        {item.goodsInfo.thirdPlatformType != null && (
                          <View className="marketing">
                            <Label name={Const.thirdPlatformTypeList[item.goodsInfo.thirdPlatformType]} type="gold" />
                          </View>
                        )}
                        <View className="title-view">
                          <Text
                            className="words"
                            style={item.goodsInfo.companyType == 0 && !main.request.storeId && { textIndent: '30px' }}
                          >
                            {goodsInfo.goodsInfoName}
                          </Text>
                        </View>
                      </View>

                      {/* 商品规格 */}
                      {item.goodsInfo.specText && (
                        <View className="goods-spec">
                          <Text className="spec-text">{item.goodsInfo.specText ? item.goodsInfo.specText : ''}</Text>
                        </View>
                      )}
                    </View>

                    {/* {isAppointmentArry == 0 && !isShowBooking && ( */}
                    <MarketingLabel
                      marketingLabels={
                        !social && showFlag ? immutable.fromJS(item.goodsInfo.marketingLabels) : immutable.fromJS([])
                      }
                      couponLabels={immutable.fromJS(item.goodsInfo.couponLabels)}
                      grouponLabel={immutable.fromJS(item.goodsInfo.grouponLabel)}
                      goodsLabel={immutable.fromJS(item.goodsLabelList)}
                    />
                    {/* )} */}
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
                        <Text className="texts">{favorableRate}%好评</Text>
                      </View>

                      {/* 商品价格 步进器*/}
                      <View className="goods-price">
                        <View className="goods-price-box">
                          <Price price={price} buyPoint={buyPoint} linePrice={!iepGoodsShowFlag ? linePrice : null} />
                          {iepGoodsShowFlag &&
                            (buyPoint == null || buyPoint == 0) &&
                            isShowAppointment == false &&
                            isShowBooking == false && (
                              <View className="marketing">
                                <Text className="market-text">{enterprisePriceName}</Text>
                              </View>
                            )}
                        </View>
                        {/* 步进器 */}
                        {!WMkit.isVirtualGoods(goodsType) && !main.spreadFlag && iscartCountFlag && (
                          <CartCount
                            count={buyCount ? buyCount : 0}
                            inventory={stock}
                            getNum={(count, flag) => {
                              goodsAction.skuAddShopCart(item.goodsInfo.goodsInfoId, count, flag);
                            }}
                          />
                        )}

                        {/* 发圈素材 分享赚 */}
                        {social && main.isDistributor && !buyPoint
                          ? !invalid &&
                          ![6, 7].includes(item.goodsInfo.goodsType) &&
                          isAppointmentArry.length < 1 &&
                          !isShowAppointment &&
                          !isShowBooking &&
                          !isFlashFlag &&
                          !main.spreadFlag && (
                            <View className="right-tools">
                              <View
                                className="mater-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  activityAction.getDistributor(item.goodsInfo);
                                }}
                              >
                                <Text className="mater-text">发圈</Text>
                              </View>
                              <View
                                className="share-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isH5) {
                                    Taro.navigateTo({
                                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfo.goodsInfoId}`,
                                    });
                                  } else {
                                    activityAction.shareModal(item.goodsInfo);
                                  }
                                }}
                              >
                                <Text className="share-text">
                                  分享赚{' '}
                                  {_.parseNumber(distributionCommission).length >= 3
                                    ? _.parseNumber(distributionCommission).substring(0, 3) + '...'
                                    : _.addZero(distributionCommission)}
                                </Text>
                              </View>
                            </View>
                          )
                          : null}

                        {/* 推广商品列表 */}
                        {main.isDistributor && !invalid && main.spreadFlag && (
                          <View className="right-tools">
                            <View
                              className="mater-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                activityAction.getDistributor(item.goodsInfo);
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
                                  activityAction.shareModal(item.goodsInfo);
                                }
                              }}
                            >
                              <Text className="share-text">
                                分享赚{' '}
                                {_.parseNumber(distributionCommission).length >= 3
                                  ? _.parseNumber(distributionCommission).substring(0, 3) + '...'
                                  : _.addZero(distributionCommission)}
                              </Text>
                            </View>
                          </View>
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
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }

    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }

    if (isBetween) return '预售中';
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
