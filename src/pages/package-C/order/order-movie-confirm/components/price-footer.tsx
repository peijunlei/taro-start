import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import Price from '@/pages/common/goods/price';
import * as T from '../types';
import '../css/price-footer.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { _ } from 'wmkit';
import { Const } from 'config';
import { debounce } from 'lodash';

type IPriceFooterProps = T.IProps & T.IPriceFooterProps;

@connect<Partial<IPriceFooterProps>, T.IPriceFooterState>(store2Props, actions)
export default class PriceFooter extends Component<Partial<IPriceFooterProps>, T.IPriceFooterState> {
  constructor(props: IPriceFooterProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions,
      actions: { action },
      main = {},
    } = this.props;
    const { points = {}, localData = {}, price = {}, isBookingSaleGoods, isCommit, isExpired } = main;
    const { usePoint } = points;
    const { confirmCoupon = {} } = localData;
    const couponTotalPrice = confirmCoupon.couponTotalPrice ? confirmCoupon.couponTotalPrice : 0;

    let html = null;

    //定金预售
    return isBookingSaleGoods ? (
      <View className="priceFooter">
        <View className="price-left" />
        <View
          className={isCommit ? 'confirm-btn' : 'confirm-btn confirm-btn-disable'}
          onClick={async () => {
            if (isCommit) {
              await action._submit(false);
            }
          }}
        >
          <Text className="confirm-text">支付定金</Text>
        </View>
      </View>
    ) : isExpired ? (
      <View className="priceFooter">
        <View className="price-left">
          <Text className="price-key">合计：</Text>
          <Price price={this._calcOrderTotalAmount(price.totalPrice, couponTotalPrice, usePoint)} />
          {/*<Price price={_.sub(_.sub(price.totalPrice, couponTotalPrice), actions._pointToMoney(usePoint)).toFixed(2)} />*/}
        </View>
        <View className="confirm-btn" onClick={() => this._submit()}>
          <Text className="confirm-text">提交订单</Text>
        </View>
      </View>
    ) : (
          <View className="priceFooter">
            <View className="price-left">
              <Text className="price-key">合计：</Text>
              <Price price={this._calcOrderTotalAmount(price.totalPrice, couponTotalPrice, usePoint)} />
              {/*<Price price={_.sub(_.sub(price.totalPrice, couponTotalPrice), actions._pointToMoney(usePoint)).toFixed(2)} />*/}
            </View>
            <View className="confirm-btn confirm-btn-disable">
              <Text className="confirm-text">提交订单</Text>
            </View>
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

  _submit = debounce(
    () => {
      let {
        actions: { action },
      } = this.props;
      action._submit(false);
    },
    500,
    { leading: true },
  );
}

//create by moon https://github.com/creasy2010/moon
