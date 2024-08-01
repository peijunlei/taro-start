import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './big-spu-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import noDataIcon from '@/assets/image/goods/goods-list/no-data-bgi.png';
import Price from '@/pages/common/goods/price';
import { mul, div, toFixed2 } from '@/utils/priceFormat';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import { _, immutable, WMkit } from 'wmkit';
import moment from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
moment.extend(isBetween);
import CartCount from '@/pages/common/goods/cart-count';
import { Label } from '@wanmi/ui-taro';
import { Const } from 'config';

type IBigSkuListProps = T.IProps & T.IBigSkuListProps;

//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IBigSkuListProps>, T.IBigSkuListState>(store2Props, actions)
export default class BigSkuList extends Component<Partial<IBigSkuListProps>, T.IBigSkuListState> {
  constructor(props: IBigSkuListProps) {
    super(props);
  }

  /**
    sku大图列表
*/
  render() {
    let {
      actions: { goodsAction, activityAction },
      main,
    } = this.props;

    return (
      <View className="bigSpuList">
        {main &&
          main.goods.length > 0 &&
          main.goods.map((item, index) => {
            // 社交电商相关内容显示与否
            let social = item.goodsInfo.distributionGoodsAudit == 2 ? true : false;
            const distributionCommission = item.goodsInfo.distributionCommission;
            const stock = item.goodsInfo.stock>0?item.goodsInfo.stock:0;
            const goodsInfo = item.goodsInfo;
            const isAppointmentArry =
              (main.appointmentSaleVOList &&
                main.appointmentSaleVOList.filter((index) => item.id == index.appointmentSaleGood.goodsInfoId)) ||
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
            let buyPoint = goodsInfo.buyPoint;

            //购买数量
            const { buyCount } = goodsInfo;

            let linePrice = social ? '' : item.linePrice;

            //销量
            const goodsSalesNum = item.goodsInfo.goodsSalesNum;
            let salesNum = goodsSalesNum ? _.goodsSalesNum(goodsSalesNum) : '暂无';

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

            //预约
            let isShowAppointment = false;
            let appointmentItem = [];
            //预售
            let isShowBooking = false;
            // 非积分商品
            if (!isbuyPoint) {
              main.appointmentSaleVOList &&
                main.appointmentSaleVOList.map((index) => {
                  if (item.goodsInfo.goodsInfoId == index.appointmentSaleGood.goodsInfoId) {
                    price = index.appointmentSaleGood.price ? index.appointmentSaleGood.price : goodsInfo.marketPrice;
                    isShowAppointment = true;
                    appointmentItem = index;
                    linePrice = goodsInfo.marketPrice;
                  }
                });

              main.bookingSaleVOList &&
                main.bookingSaleVOList.map((index) => {
                  if (item.goodsInfo.goodsInfoId == index.bookingSaleGoods.goodsInfoId) {
                    isShowBooking = true;
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
            //是否展示拼团、秒杀等活动标签
            // let showFlag = true;
            // if (
            //   isShowAppointment ||
            //   isShowBooking ||
            //   (item.goodsInfo.buyPoint != null && item.goodsInfo.buyPoint > 0)
            // ) {
            //   showFlag = false;
            // }
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

            //是否为拼团
            let isGrouponFlag = false;
            if (immutable.fromJS(goodsInfo.grouponLabel)) {
              isGrouponFlag = true;
            }
            const goodsType = item.goodsType || goodsInfo?.goodsType || 0;
            return (
              <View
                key={index}
                className="big-spu-item"
                onClick={() => activityAction.loadPages(item.goodsInfo, isAppointmentArry, isShowBooking, goodsType)}
              >
                <View className="img-box">
                  <Image
                    src={item.goodsInfo.goodsInfoImg ? item.goodsInfo.goodsInfoImg : noDataIcon}
                    className="big-goods-img"
                  />
                  {/* 判断是否缺货 */}
                  {this.isInvalid(item.goodsInfo) && (
                    <View className="big-not-goods">
                      <View className="big-not-goods-text">缺货</View>
                    </View>
                  )}
                  {!buyPoint &&
                    main.appointmentSaleVOList &&
                    main.appointmentSaleVOList.map((index, i) => {
                      return (
                        item.id == index.appointmentSaleGood.goodsInfoId && (
                          <View key={i} className="preBuy">
                            {this.isBuyStatus(index)}
                          </View>
                        )
                      );
                    })}
                  {!buyPoint &&
                    main.bookingSaleVOList &&
                    main.bookingSaleVOList.map((index, i) => {
                      return (
                        item.id == index.bookingSaleGoods.goodsInfoId &&
                        this.isPresaleStatus(index) && (
                          <View key={i} className="preBuy">
                            {this.isPresaleStatus(index)}
                          </View>
                        )
                      );
                    })}
                </View>

                {/* 图片下面的内容 */}
                <View className="big-spu-content">
                  {/* 上半部分内容 */}
                  <View className="big-up-content">
                    {/* 商品标题 */}
                    <View className="big-goods-title">
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
                      <Text
                        className="title-view"
                        style={item.goodsInfo.companyType == 0 && !main.request.storeId && { textIndent: '4px' }}
                      >
                        <Text className="words">{goodsInfo.goodsInfoName}</Text>
                      </Text>
                    </View>

                    {/* 商品规格 */}
                    {goodsInfo.specText && (
                      <View className="big-goods-spec">
                        <Text className="spec-text">{item.goodsInfo.specText ? item.goodsInfo.specText : ''}</Text>
                      </View>
                    )}
                    <MarketingLabel
                      marketingLabels={
                        !social && showFlag ? immutable.fromJS(item.goodsInfo.marketingLabels) : immutable.fromJS([])
                      }
                      couponLabels={immutable.fromJS(item.goodsInfo.couponLabels)}
                      grouponLabel={immutable.fromJS(item.goodsInfo.grouponLabel)}
                      goodsLabel={immutable.fromJS(item.goodsLabelList)}
                    />

                    {/**无商品规格时占位 */}
                    {!goodsInfo?.specText && (
                      <View className="big-goods-spec">
                        <Text className="spec-text" />
                      </View>
                    )}
                  </View>

                  {/* 下半部分内容 */}
                  <View className="big-down-content">
                    {/* 价格 */}
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
                    <View className="cart-count" style={{ marginTop: '10px' }}>
                      {!WMkit.isVirtualGoods(goodsType) && iscartCountFlag && (
                        <CartCount
                          count={buyCount ? buyCount : 0}
                          inventory={stock}
                          getNum={(count, flag) => {
                            goodsAction.skuAddShopCart(item.goodsInfo.goodsInfoId, count, flag);
                          }}
                        />
                      )}
                    </View>
                    {/* 发圈素材 分享赚 */}
                    {social && main.isDistributor && !buyPoint
                      ? !invalid &&
                      ![6, 7].includes(item.goodsInfo.goodsType) &&
                      !isShowAppointment &&
                      !isShowBooking &&
                      !isFlashFlag &&
                      !main.spreadFlag && (
                        <View className="big-right-tools">
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
                    {main.isDistributor && ![6, 7].includes(item.goodsInfo.goodsType) && !invalid && main.spreadFlag && (
                      <View className="big-right-tools">
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
      isBetween = moment(new Date()).isBetween(bookingStartTime, bookingEndTime);
    }
    //定金支付起止时间内
    if (bookingType == 1) {
      isBetween = moment(new Date()).isBetween(handSelStartTime, handSelEndTime);
    }

    if (isBetween) {
      return '预售中';
    } else {
      return null;
    }
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
