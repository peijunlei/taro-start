import { View, Button, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../../types';
import '../less/goods-info.less';
import actions from '../../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../../selectors';
//零售价格
import Price from '../goods-info/price';
//批发价格
import PriceWholesale from '../goods-info/price-wholesale';
//收藏
import Collect from '../goods-info/collect';
//标题
import Title from '../goods-info/title';
import { _ } from 'wmkit';
import { toFixed2 } from '@/utils/priceFormat';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
//拼团
import NowSpellGroup from '@/pages/common/goods/now-spell-group';
import { Price as WMprice } from '@wanmi/ui-taro';
import { isEmpty } from 'lodash';

type IGoodsInfoProps = T.IProps & T.IGoodsInfoProps;

@connect<Partial<IGoodsInfoProps>, T.IGoodsInfoState>(store2Props, actions)
export default class GoodsInfo extends Component<Partial<IGoodsInfoProps>, T.IGoodsInfoState> {
  constructor(props: IGoodsInfoProps) {
    super(props);
  }

  componentWillMount() {
    if (!getCurrentInstance().router.params) return;
    // 这里为什么要查一下商品详情？
    let { main } = this.props;
    // 先优化一下，当有数据的时候，就不查询了
    if (!isEmpty(main)) return
    let { skuId, pointsGoodsId } = getCurrentInstance().router.params;
    if (__TARO_ENV != 'h5') {
      let { main } = this.props;
      let SkuId = main && main.skuId ? main.skuId : skuId; // 解决商品详情页选择完规格之后切换到其他应用蒙层下的价格与所选规格价格不符
      let _pointsGoodsId = main && main.pointsGoodsId ? main.pointsGoodsId : pointsGoodsId;
      if (SkuId == undefined) {
        SkuId = '';
      }
      this.props.actions.publicAction.findSpuDetails(SkuId, _pointsGoodsId);
    } else {
      this.props.actions.publicAction.findSpuDetails(skuId, pointsGoodsId);
    }
  }

  /**
    价格 标题 副标题 收藏
*/
  render() {
    let {
      actions: { publicAction, otherAction },
      main: { goodsDetail, goodsInfo, isPointsGoods },
      main,
    } = this.props;
    let { flashsaleGoods, flashsaleGoodsFlag } = this.props;
    let stock: number = 0;
    let volume: number = 0;
    let total: number = 0;
    let num: number = 0;
    if (flashsaleGoodsFlag) {
      stock = flashsaleGoods.stock;
      volume = flashsaleGoods.salesVolume;
      total = _.add(stock, volume);
      num = _.div(volume, total);
    }
    const lineShowPrice = this._wholeSalePriceInfo(
      goodsDetail.goods && goodsDetail.goods.linePrice,
      goodsDetail.goodsInfos,
    );
    //全款预售商品，划线价为商品的市场价
    const linePriceForBookingSale = this._getLinePriceForBookingSale(goodsInfo);

    // 判断是否为预约
    const isAppointment = main.appointmentSaleVO && main.appointmentSaleVO.id;

    //判断是否为预售
    const isBooking = main.bookingSaleVO && main.bookingSaleVO.id && this.isPresaleStatus(main.bookingSaleVO);
    flashsaleGoodsFlag = flashsaleGoodsFlag && !isPointsGoods && !isBooking && !isAppointment;

    // 商品标签
    let goodsLabels = goodsDetail.goods && goodsDetail.goods.goodsLabelList ? goodsDetail.goods.goodsLabelList : [];
    goodsLabels = goodsLabels.filter((v) => v.labelVisible);
    goodsLabels = goodsLabels.sort((a, b) => {
      return a.labelSort - b.labelSort;
    });

    return (
      <View className="goodsInfo">
        {/* 价格  收藏*/}
        <View className="price-collect">
          {/* 0:批发的价格 1:零售的价格 */}
          {main?.isPointsGoods && !flashsaleGoodsFlag ? (
            // 积分商品-价格展示
            <WMprice
              buyPoint={main.pointsGoods?.points}
              priceSize="long"
              linePrice={Number(
                _.addZero(
                  main.pointsGoods && main.pointsGoods.goodsInfo && main.pointsGoods.goodsInfo.marketPrice
                    ? main.pointsGoods.goodsInfo.marketPrice
                    : 0,
                ),
              )}
            />
          ) : goodsDetail.goods && goodsDetail.goods.saleType == 0 ? (
            <View style={{ width: 'calc(100% - 66px)' }}>
              <PriceWholesale />
            </View>
          ) : (
                (!main.bookingSaleVO ||
                  JSON.stringify(main.bookingSaleVO) == '{}' ||
                  main.bookingSaleVO.bookingType == 1) &&
                (!main.appointmentSaleVO || JSON.stringify(main.appointmentSaleVO) == '{}') && (
                  <View style={{ width: 'calc(100% - 64px)' }}>
                    <Price flashsaleGoodsFlag={flashsaleGoodsFlag} />
                  </View>
                )
              )}
          {/* 预约 */}
          {main.appointmentSaleVO &&
            main.appointmentSaleVO.appointmentSaleGood &&
            !goodsInfo.buyPoint &&
            !isPointsGoods && (
              <View className="price1">
                <View className="no-goods-price">
                  <View className="up-price">
                    <Text className="unit1">￥</Text>
                    <Text className="price1">
                      {main.appointmentSaleVO && main.appointmentSaleVO.appointmentSaleGood.price >= 0
                        ? _.addZero(main.appointmentSaleVO.appointmentSaleGood.price)
                        : goodsInfo.marketPrice}
                    </Text>
                  </View>
                  {main.appointmentSaleVO && main.appointmentSaleVO.appointmentSaleGood.price >= 0 && (
                    <View className="old-price">￥{_.addZero(goodsInfo.marketPrice)}</View>
                  )}
                </View>
              </View>
            )}
          {/* 全款预售 */}
          {main.bookingSaleVO &&
            main.bookingSaleVO.bookingType == 0 &&
            this.isPresaleStatus(main.bookingSaleVO) &&
            !goodsInfo.buyPoint &&
            !isPointsGoods && (
              <View className="price1">
                <View className="no-goods-price">
                  <View className="up-price">
                    <Text className="unit1">￥</Text>
                    <Text className="price1">
                      {main.bookingSaleVO &&
                        main.bookingSaleVO.bookingSaleGoods &&
                        main.bookingSaleVO.bookingSaleGoods.bookingPrice >= 0
                        ? toFixed2(
                          main.bookingSaleVO.bookingSaleGoods.bookingPrice > 0
                            ? main.bookingSaleVO.bookingSaleGoods.bookingPrice
                            : 0,
                        )
                        : toFixed2(goodsInfo.marketPrice)}
                    </Text>
                  </View>
                  {linePriceForBookingSale ? (
                    <View className="old-price">￥{toFixed2(linePriceForBookingSale)}</View>
                  ) : (
                      lineShowPrice && <View className="old-price">￥{toFixed2(lineShowPrice)}</View>
                    )}
                </View>
              </View>
            )}
          <Collect />
        </View>

        {/* 预售定金 */}
        {main.bookingSaleVO &&
          main.bookingSaleVO.bookingType == 1 &&
          this.isPresaleStatus(main.bookingSaleVO) &&
          !goodsInfo.buyPoint &&
          !isPointsGoods && (
            <View className="price-presale">
              {main.bookingSaleVO.bookingSaleGoods.inflationPrice ? (
                <Text className="tit">
                  ￥<Text className="tit-blod">{toFixed2(main.bookingSaleVO.bookingSaleGoods.handSelPrice || 0)}</Text>
                  定金可抵￥
                  <Text className="tit-blod">{toFixed2(main.bookingSaleVO.bookingSaleGoods.inflationPrice || 0)}</Text>
                </Text>
              ) : (
                  <Text className="tit">￥{toFixed2(main.bookingSaleVO.bookingSaleGoods.handSelPrice || 0)}定金</Text>
                )}
            </View>
          )}

        <View className="goods-label-box">
          {goodsLabels &&
            goodsLabels.map((item, index) => {
              return (
                <View key={index} className="goods-label" id="item.goodsLabelId">
                  {item.labelName}
                </View>
              );
            })}

          {/* 阶梯价 折扣 */}
          {goodsDetail.goods && goodsDetail.goods.priceType == 1 && (
            <View className="vip-content">
              {/* {goodsDetail.goods.priceType == 1 && ( */}
              <View className="l-tag">
                <Text className="tag-text">阶梯价</Text>
              </View>{' '}
              {/* <View className="vip-info">
              //   <View className="svip">
              //     <Text className="svip-text">SVIP</Text>
              //   </View>
              //   <View className="dist">
              //     <Text className="dist-text">8.5折</Text>
              //   </View>
              // </View> */}
              {/* )} */}
              {/* {goodsDetail.goodsInfos[0].companyType == 0 && (
              <View className="marketing">
                <Text className="market-text">自营</Text>
              </View>
            )} */}
            </View>
          )}
        </View>

        {/* 秒杀 已抢 */}
        {JSON.stringify(main.bookingSaleVO) == '{}' &&
          !this.isPresaleStatus(main.bookingSaleVO) &&
          JSON.stringify(main.appointmentSaleVO) == '{}' &&
          flashsaleGoodsFlag &&
          (goodsInfo.buyPoint == null || goodsInfo.buyPoint == 0) && (
            <View className="seckill-item">
              <Text className="text">
                已抢<Text className="num">{_.mul(num, 100).toFixed(0)}%</Text>
              </Text>
              <View className="progress">
                <View className="high" style={{ width: 100 * num + '%' }}></View>
              </View>
            </View>
          )}

        <Title />

        {/* 积分+市场价不显示拼团 */}
        {!isPointsGoods && goodsDetail.goodsInfos && <NowSpellGroup goodsDetail={main.goodsDetail} skuId={main?.skuId} />}
      </View>
    );
  }

  //批发销售类型，计算划线价
  _wholeSalePriceInfo = (linePrice, goodsInfos) => {
    let token = Taro.getStorageSync('authInfo:token');
    // if (linePrice) {
    //   return linePrice;
    // } else {
    if (token) {
      // 已登录时,找出最高的市场价
      let maxMarketPrice = null;
      goodsInfos &&
        goodsInfos.forEach((info, index) => {
          if (index === 0) {
            maxMarketPrice = info.marketPrice;
          } else {
            maxMarketPrice = info.marketPrice > maxMarketPrice ? info.marketPrice : maxMarketPrice;
          }
        });
      return maxMarketPrice;
    } else {
      return null;
    }
    // }
  };

  //判断当前的预售状态
  isPresaleStatus = (item) => {
    if (item == null) return;
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

    return isBetween;
  };

  /**
   * 全款预售商品预售价不为空，划线价取市场价
   */
  _getLinePriceForBookingSale = (goodsInfo) => {
    let price = null;
    const { main } = this.props;
    if (!main) {
      return goodsInfo.marketPrice;
    }
    if (
      main.bookingSaleVO &&
      main.bookingSaleVO.bookingType == 0 &&
      this.isPresaleStatus(main.bookingSaleVO) &&
      !goodsInfo.buyPoint &&
      !main.isPointsGoods &&
      (main.bookingSaleVO.bookingSaleGoods.bookingPrice || main.bookingSaleVO.bookingSaleGoods.bookingPrice >= 0)
    ) {
      price = goodsInfo.marketPrice;
    }
    return price;
  };
}

//create by moon https://github.com/creasy2010/moon
