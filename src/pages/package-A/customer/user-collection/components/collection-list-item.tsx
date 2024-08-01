import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '@/pages/package-B/goods/goods-list/components/spu-list.less';
import './collection-list-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
import Price from '@/pages/common/goods/price';
import {GoodsInfoVO} from 'api/GoodsFollowBaseController';
import MarketingLabel from '@/pages/common/goods/marketing-label';
import CartCount from '@/pages/common/goods/cart-count';
import {WMkit, _, immutable} from 'wmkit';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import {toFixed2} from '@/utils/priceFormat';
type ICollectionListItemProps = T.IProps & T.ICollectionListItemProps;

//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<ICollectionListItemProps>, T.ICollectionListItemState>(store2Props, actions)
export default class CollectionListItem extends Component<
  Partial<ICollectionListItemProps>,
  T.ICollectionListItemState
> {
  constructor(props: ICollectionListItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let goods: GoodsInfoVO = {};
    let {
      actions: {action},
      main: {ifEvalShow, ifModify, goodses},
      main,
    } = this.props;
    goods = this.props.goods;
    const {
      goodsInfoImg,
      specText,
      goodsSalesNum,
      goodsEvaluateNum,
      goodsFavorableCommentNum,
      goodsInfoId,
      goodsInfoName,
      goodsStatus,
      companyType,
      marketingLabels,
      couponLabels,
      buyPoint,
      grouponLabel,
      distributionGoodsAudit,
      buyCount,
      stock,
      marketPrice,
      priceType,
      intervalMinPrice,
      salePrice,
      enterPrisePrice,
      distributionCommission,
      goodsType
    } = this.props.goods;

    let social = distributionGoodsAudit === 2;
    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇评价相关数据处理⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
    //好评率
    let favorableRate = '100';
    if (goodsEvaluateNum && goodsEvaluateNum != 0) {
      favorableRate = _.mul(_.div(goodsFavorableCommentNum, goodsEvaluateNum), 100).toFixed(0);
    }

    //评论数
    let evaluateNum = '暂无';
    if (goodsEvaluateNum) {
      if (goodsEvaluateNum < 10000) {
        evaluateNum = goodsEvaluateNum;
      } else {
        const i = _.div(goodsEvaluateNum, 10000).toFixed(1);
        evaluateNum = i + '万+';
      }
    }

    //销量
    let salesNum = goodsSalesNum ? _.goodsSalesNum(goodsSalesNum) : '暂无';

    // 库存等于0或者起订量大于剩余库存
    const count = goods.count || 0;
    const invalid = stock <= 0 || (count > 0 && count > stock);
    //⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆评价相关数据处理⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

    //企业购商品的判断
    // @ts-ignore
    const {isIepAuth: iepSwitch, iepInfo: info = {}} = main.iepInfo;
    //企业价名称
    const {enterprisePriceName} = info||{};
    //企业购开关打开 + 已审核的企业购商品 + 有库存 + 非分销商品 + 非抢购
    let isFlashFlag = false;
    if (marketingLabels != null && marketingLabels.length > 0) {
      isFlashFlag = marketingLabels.filter((val) => val.marketingType === 5).length > 0;
    }
    const iepGoodsShowFlag = goods.enterPriseAuditState == 2 && !invalid && !social && !isFlashFlag;
    let price = iepGoodsShowFlag
      ? enterPrisePrice
      : isFlashFlag
      ? salePrice
      : social
      ? marketPrice
      : priceType == 1
      ? intervalMinPrice
      : salePrice;
    let linePrice = 0;
    let isbuyPoint = buyPoint != null && buyPoint > 0;
    //是否是拼团商品
    let isGrouponLabel = grouponLabel ? true : false;
    //预约
    let isShowAppointment = false;
    let appointmentItem = [];
    //预售
    let isShowBooking = false;
    // 非积分商品
    if (!isbuyPoint) {
      main.appointmentSaleVOList &&
        main.appointmentSaleVOList.map((index) => {
          if (goods.goodsInfoId == index.appointmentSaleGood.goodsInfoId) {
            price = index.appointmentSaleGood.price ? index.appointmentSaleGood.price : goods.marketPrice;
            isShowAppointment = true;
            appointmentItem = index;
            linePrice = goods.marketPrice;
          }
        });

      main.bookingSaleVOList &&
        main.bookingSaleVOList.map((index) => {
          if (goods.goodsInfoId == index.bookingSaleGoods.goodsInfoId) {
            // 全款预售支付尾款阶段不影响其他营销活动
            isShowBooking = true && this.isPresaleStatus(index) == '预售中';
            // 全款预售
            if (isShowBooking) {
              price =
                index.bookingSaleGoods.bookingPrice || index.bookingSaleGoods.bookingPrice == 0
                  ? toFixed2(index.bookingSaleGoods.bookingPrice)
                  : toFixed2(goods.marketPrice);
              //全款预售的划线价是市场价而不是参加活动前的划线价、定金预售不显示划线价
              if (index.bookingType == 0) {
                linePrice = goods.marketPrice;
              }
            }
          }
        });
      // 秒杀划线价处理
      isFlashFlag = isFlashFlag && !isbuyPoint && !isShowBooking && !isShowAppointment;
      if (isFlashFlag) {
        linePrice = goods.marketPrice;
      }
    } else {
      price = salePrice;
    }

    //是否展示满系活动标签
    let showFlag = true;
    if (isShowAppointment || isShowBooking || (buyPoint != null && buyPoint > 0)) {
      showFlag = false;
    }

    const goodsesItem = goodses && goodses.filter((v) => v.goodsId === goods.goodsId);

    return (
      <View
        className="spu-item user-collection-spu-item"
        onClick={() => {
          // 失效商品不做跳转
          if (goodsStatus !== 2) {
            Taro.navigateTo({
              url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfoId}`,
            });
          }
        }}
      >
        <View className="img-wrap">
          <Image src={goodsInfoImg ? goodsInfoImg : noDataIcon} className="goods-img" />
          {(goodsStatus === 1 || goodsStatus === 2) && (
            <View className="cover">
              {goodsStatus === 1 && <View className="status">缺货</View>}
              {goodsStatus === 2 && <View className="status">失效</View>}
            </View>
          )}

          {/* 预约 */}
          {!buyPoint &&
            main.appointmentSaleVOList &&
            main.appointmentSaleVOList.map((item, index) => {
              return (
                goods.goodsInfoId == item.appointmentSaleGood.goodsInfoId && (
                  <View key={index} className="preBuy">
                    {this.isBuyStatus(item)}
                  </View>
                )
              );
            })}

          {/* 预售 */}
          {!buyPoint &&
            main.bookingSaleVOList &&
            main.bookingSaleVOList.map((item, index) => {
              return (
                goods.goodsInfoId == item.bookingSaleGoods.goodsInfoId &&
                this.isPresaleStatus(item) == '预售中' && (
                  <View key={index} className="preBuy">
                    {this.isPresaleStatus(item)}
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
              {companyType === 0 && (
                <View className="marketing">
                  <Text className="market-text">自营</Text>
                </View>
              )}
              <View className="title-view">
                <Text className="words">
                  {companyType == 0 && <Text className="text">随便1</Text>}
                  {goodsInfoName}
                </Text>
              </View>
            </View>

            {/* 商品规格 */}
            <View className="goods-spec">
              <Text className="spec-text">{specText || ''}</Text>
            </View>

            {/* 促销活动 */}
            <View className="goods-active" style={{height: 'auto'}}>
              {/* {!social && (marketingLabels || couponLabels) && ( */}
              <MarketingLabel
                marketingLabels={
                  (isFlashFlag || !social) && showFlag ? immutable.fromJS(goods.marketingLabels) : immutable.fromJS([])
                }
                couponLabels={immutable.fromJS(goods.couponLabels)}
                grouponLabel={goods.grouponLabel ? immutable.fromJS(goods.grouponLabel) : immutable.fromJS([])}
                goodsLabel={immutable.fromJS(
                  goodsesItem && goodsesItem.length > 0 && goodsesItem[0].goodsLabelList
                    ? goodsesItem[0].goodsLabelList
                    : [],
                )}
                isCollect={true}
              />
              {/* )} */}
            </View>
          </View>

          {/* 下半部分内容 */}
          <View className="down-content">
            {/* 销量 评论数 好评率 */}
            <View className="goods-statics">
              <Text className="texts">
                {salesNum}
                销量
              </Text>
              {ifEvalShow && (
                <Text className="texts">
                  {evaluateNum}
                  评论
                </Text>
              )}
              {ifEvalShow && (
                <Text className="texts">
                  {favorableRate}
                  %好评
                </Text>
              )}
            </View>

            {/* 商品价格 步进器*/}
            <View className="goods-price">
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
              {social &&
              WMkit.isDistributorFlag() &&
              !buyPoint &&
              !isShowAppointment &&
              !isShowBooking &&
              !iepGoodsShowFlag &&
              !isFlashFlag &&
              !ifModify ? (
                <View className="user-collection-right-tools">
                  <View
                    className="mater-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.getDistributor(goods);
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
                        action.shareModal(goods);
                      }
                    }}
                  >
                    <Text className="share-text">分享赚 {_.addZero(distributionCommission)}</Text>
                  </View>
                </View>
              ) : (
                !WMkit.isVirtualGoods(goodsType) && !ifModify && (
                  <CartCount
                    count={goodsStatus === 1 ? 0 : buyCount || 0}
                    inventory={stock>0?stock:0}
                    getNum={async (index) => {
                      if (index) {
                        await this.props.actions._changeSkuNum(goodsInfoId, Number(index));
                      }
                    }}
                  />
                )
              )}
            </View>
          </View>
        </View>
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
    const {bookingStartTime, bookingEndTime, bookingType, handSelStartTime, handSelEndTime} = item;
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
}

//create by moon https://github.com/creasy2010/moon
