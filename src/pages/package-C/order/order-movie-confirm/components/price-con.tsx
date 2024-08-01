import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import '../css/price-con.less';
import '../css/index.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { _, WMkit } from 'wmkit';
import Price from '@/pages/common/goods/price';
import moment from 'dayjs';
import FormSwitch from '@/pages/common/form/form-switch';
import { Const } from 'config';

type IPriceConProps = T.IProps & T.IPriceConProps;

@connect<Partial<IPriceConProps>, T.IPriceConState>(store2Props, actions)
export default class PriceCon extends Component<Partial<IPriceConProps>, T.IPriceConState> {
  constructor(props: IPriceConProps) {
    super(props);
  }

  /**

   */
  render() {
    let { actions, main = {} } = this.props;
    const { price = {}, points = {}, localData = {}, isBookingSaleGoods, stores = [], orderList } = main;
    const { usePoint, showPointInput } = points;
    const { confirmCoupon = {} } = localData;
    const couponTotalPrice = confirmCoupon.couponTotalPrice ? confirmCoupon.couponTotalPrice : 0;
    let earnestPrice = 0,
      swellPrice = 0,
      tailStartTime;
    // 是否设置膨胀金
    let hasSwellPrice = false;
    if (stores.length != 0) {
      const { tradeItems } = stores[0];
      earnestPrice = tradeItems[0].earnestPrice; //定金
      swellPrice = tradeItems[0].swellPrice; //膨胀
      hasSwellPrice = _.sub(swellPrice, earnestPrice) == 0 ? false : true;
      tailStartTime = tradeItems[0].tailStartTime; //尾款时间
    }
    //尾款，膨胀金可能大于商品价格，导致尾款为负数
    let tailPrice = _.sub(price.goodsTotalPrice, swellPrice) < 0 ? 0 : _.sub(price.goodsTotalPrice, swellPrice);
    tailPrice = _.add(tailPrice, price.totalDeliveryPrice);
    return (
      <View className="priceCon">
        <View className="order-confirm-store-item">
          <Text className="order-item-label">订单总额</Text>
          <View className="store-item-right">
            <Text className="item-input-price">
              ¥{this._calcOrderTotalAmount(price.totalPrice, couponTotalPrice, usePoint)}
              {/*¥{_.sub(_.sub(price.totalPrice, couponTotalPrice), actions._pointToMoney(usePoint)).toFixed(2)}*/}
            </Text>
          </View>
        </View>
        {price.totalBuyPoint > 0 && !isBookingSaleGoods && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">使用积分</Text>
            <View className="store-item-right">
              <Text className="item-input-price">{price.totalBuyPoint}</Text>
            </View>
          </View>
        )}

        {!isBookingSaleGoods && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">商品金额</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{price.goodsTotalPrice.toFixed(2)}</Text>
            </View>
          </View>
        )}
        {/*
        {!isBookingSaleGoods && (price.discountsTotalPrice as any) != 0 && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">优惠总额</Text>
            <View className="store-item-right">
              <Text className="item-text">-¥{price.discountsTotalPrice.toFixed(2)}</Text>
            </View>
          </View>
        )} */}

        {!price.totalBuyPoint && !isBookingSaleGoods && usePoint != 0 && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">积分抵扣</Text>
            <View className="store-item-right">
              <Text className="item-text">
                -¥{showPointInput ? actions._pointToMoney(usePoint).toFixed(2) : '0.00'}
              </Text>
            </View>
          </View>
        )}
        {
          !orderList?.isVirtualGoods && <View className="order-confirm-store-item">
            <Text className="order-item-label">配送费用</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{price.totalDeliveryPrice.toFixed(2)}</Text>
            </View>
          </View>
        }

        {price.totalCommission > 0 && !isBookingSaleGoods && WMkit.isDistributor() && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">预计返利</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{price.totalCommission.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {isBookingSaleGoods && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">定金</Text>
            <View className="swellPrice-right">
              <View className="rights-align">
                <Text className="item-text">-¥{earnestPrice ? earnestPrice.toFixed(2) : '0'}</Text>
              </View>
              {isBookingSaleGoods && hasSwellPrice && (
                <View className="rights-align rights-bottom">
                  <Text className="item-text swellPrice">定金膨胀 ¥{swellPrice ? swellPrice.toFixed(2) : '0'}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {/* {isBookingSaleGoods && hasSwellPrice && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label"></Text>
            <View className="store-item-right"></View>
          </View>
        )} */}
        {isBookingSaleGoods && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">尾款</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{tailPrice}</Text>
            </View>
          </View>
        )}
        {isBookingSaleGoods && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label"></Text>
            <View className="store-item-right">
              <Text className="tailStartTime">{moment(tailStartTime).format('M月DD日 HH:mm')}开始支付尾款</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  /**
   * 实时计算扣减积分、优惠券后订单总金额，
   * @returns {Promise<void>}
   * @private
   */
  _calcOrderTotalAmount(totalPrice, couponPrice, usePoint) {
    let newTotalPrice = totalPrice;

    // 积分抵扣金额
    let pointPrice = _.div(usePoint, Const.pointRatio);
    // 去掉优惠券抵扣的金额
    let amountWithoutCoupon = totalPrice;

    if (!totalPrice || totalPrice <= 0) {
      newTotalPrice = 0;
    } else {
      if (couponPrice && couponPrice > 0) {
        amountWithoutCoupon = _.sub(totalPrice, couponPrice);
        if (amountWithoutCoupon <= 0) {
          newTotalPrice = 0;
        } else {
          newTotalPrice = amountWithoutCoupon;
        }
      }

      if (pointPrice && pointPrice > 0) {
        let amountWithoutPoint = _.sub(newTotalPrice, pointPrice);
        if (amountWithoutPoint <= 0) {
          newTotalPrice = 0;
        } else {
          newTotalPrice = amountWithoutPoint;
        }
      }
    }

    return newTotalPrice.toFixed(2);
  }
}

//create by moon https://github.com/creasy2010/moon
