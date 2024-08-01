import {Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import Price from '@/pages/common/goods/price';
import * as T from '../types';
import '@/pages/package-C/order/flash-sale-order-confirm/css/price-footer.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

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
      actions: {action},
      main,
    } = this.props;
    const couponTotalPrice = main?.localData.confirmCoupon.couponTotalPrice
      ? main?.localData.confirmCoupon.couponTotalPrice
      : 0;

    return (
      <View className="priceFooter">
        <View className="price-left">
          <Text className="price-key">合计：</Text>
          <Price
            price={_.sub(
              _.sub(main?.price.totalPrice, couponTotalPrice),
              actions._pointToMoney(main?.points.usePoint),
            ).toFixed(2)}
          />
        </View>

        <View
          className="confirm-btn"
          onClick={async () => {
            await action._submit(false);
          }}
        >
          <Text className="confirm-text">提交订单</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
