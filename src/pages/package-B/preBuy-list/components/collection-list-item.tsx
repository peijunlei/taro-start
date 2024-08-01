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
import CountDown from '@/pages/common/count-down';
import {_, immutable} from 'wmkit';
import moment from 'dayjs';
import CartCount from '@/pages/common/goods/cart-count';
type ICollectionListItemProps = T.IProps & T.ICollectionListItemProps;

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
    const {main} = this.props;
    if (!main || !this.props.goods.goodsInfo) {
      return;
    }
    const {ifEvalShow} = main;
    goods = this.props.goods;
    // console.log('goods', goods);
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
      distributionGoodsAudit,
      buyCount,
      stock,
      buyPoint,
      marketPrice,
      priceType,
      intervalMinPrice,
      salePrice,
    } = this.props.goods.goodsInfo;
    // console.log('this.props.goods.appointmentSaleInfo', this.props.goods.appointmentSaleGoodsInfo);
    let social = distributionGoodsAudit === 2;
    let price = this.props.goods.appointmentSaleGoodsInfo.price
      ? this.props.goods.appointmentSaleGoodsInfo.price
      : marketPrice;
    // let price = social ? marketPrice : priceType == 1 ? intervalMinPrice : salePrice;

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
    let salesNum = '暂无';
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
        className="spu-item prebuy-list-spu-item"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfoId}`,
          })
        }
      >
        <View className="img-wrap">
          <Image src={goodsInfoImg ? goodsInfoImg : noDataIcon} className="goods-img" />
          {(goodsStatus === 1 || goodsStatus === 2) && (
            <View className="cover">
              {goodsStatus === 1 && <View className="status">缺货</View>}
              {goodsStatus === 2 && <View className="status">失效</View>}
            </View>
          )}
          <View
            className={`preBuylist ${
              this.isBuyStatus(this.props.goods.appointmentSaleInfo) == '活动已结束' ? 'preBuylistGray' : ''
            }`}
          >
            {this.isBuyStatus(this.props.goods.appointmentSaleInfo)}
          </View>
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
            {!social && (marketingLabels.length > 0 || couponLabels.length > 0) && (
              <View className="goods-active">
                <MarketingLabel
                  marketingLabels={immutable.fromJS(marketingLabels)}
                  couponLabels={immutable.fromJS(couponLabels)}
                />
              </View>
            )}
          </View>
          <View className="preBuystatus">
            {this.isBuyStatus(this.props.goods.appointmentSaleInfo) != '活动已结束' &&
              this.isBuyStatus(this.props.goods.appointmentSaleInfo) != '抢购中' && (
                <View className="timeFlex">
                  <View className="saleType">距开售</View>
                  <View>
                    <CountDown
                      allowFontScaling={false}
                      numberOfLines={1}
                      groupFlag={false}
                      prelistFlag={true}
                      showTimeDays={true}
                      serverTime={main.serverTime}
                      endTime={moment(this.props.goods.appointmentSaleInfo.snapUpStartTime)}
                      timeOffset={moment(this.props.goods.appointmentSaleInfo.snapUpStartTime)
                        .diff(moment(main.serverTime), 's')
                        .toFixed(0)}
                    />
                  </View>
                </View>
              )}
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
              <Price buyPoint={buyPoint} price={price} />
            </View>
          </View>
        </View>
      </View>
    );
  }
  //判断当前的预约状态
  isBuyStatus = (status) => {
    if (!status) return;
    let appointmentStartTime = status.appointmentStartTime;
    let appointmentEndTime = status.appointmentEndTime;
    let snapUpStartTime = status.snapUpStartTime;
    let snapUpEndTime = status.snapUpEndTime;

    let isAppointmentStart = appointmentStartTime ? moment(appointmentStartTime).isBefore(new Date()) : null;
    let isAppointmentEnd = appointmentEndTime ? moment(new Date()).isBefore(appointmentEndTime) : null;

    let isSnapUpStartTime = snapUpStartTime ? moment(snapUpStartTime).isBefore(new Date()) : null;
    let isSnapUpEndTime = snapUpEndTime ? moment(new Date()).isBefore(snapUpEndTime) : null;

    let result = '';
    if (isAppointmentStart && isAppointmentEnd) result = '预约中';
    if (!isAppointmentEnd && !isSnapUpStartTime) result = '预约结束';
    if (isSnapUpStartTime && isSnapUpEndTime) result = '抢购中';
    if (!isSnapUpEndTime) result = '活动已结束';
    return result;
  };
}

//create by moon https://github.com/creasy2010/moon
