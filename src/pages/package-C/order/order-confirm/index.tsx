import 'taro-ui/dist/style/components/modal.scss';
import { View, Image, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { getHashParam } from '@/utils/common-functions';
import { msg, _ } from 'wmkit';

import { connect } from 'react-redux';
import './css/index.less';
import * as T from './types';
import actions from './actions';
import { cache, Const } from 'config';
import { store2Props } from './selectors';
import Address from './components/address';
import Store from './components/store';
import PayCon from './components/pay-con';
import PriceFooter from './components/price-footer';
import PriceCon from './components/price-con';
import ConfirmMask from '@/pages/package-C/order/order-confirm/components/confirm-mask';
import Presale from './components/presale';
import Deposit from './components/deposit';
import Gifts from './components/gift/gift-list';
import tip from './img/presale.png';
import WMLoading from '@/pages/common/loading';
import { PrivacyModal } from '@/pages/common';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderConfirm extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    const current = getCurrentInstance().router;
    const onShow = __TARO_ENV == 'h5' ? (current.onShow as any) : current.params;
    const param =
      __TARO_ENV == 'h5'
        ? getHashParam<{ type: string; storeType: string; activityId: string; leaderId: string }>(
          onShow && onShow.split('.')[0],
        )
        : onShow;
    await this.props.actions.action.commonChange('main.mask',{});
    await this.props.actions.action._clearLocal();
    await this.props.actions.init(param);
    //只有立即购买库存初始化
    let { type } = getCurrentInstance().router.params || {};
    if (type) {
      await this.props.actions.action._stockInit();
    }
  }
  async componentDidHide() {
    const dangaoPhone = this.props.main.orderList.dangaoPhone
    Taro.setStorageSync(cache.DANGAO_PHONE,dangaoPhone)
  }

  async componentDidShow() {
    const flag = Taro.getStorageSync(cache.MINI_CHOOSE_ADDRESS)
    Taro.removeStorageSync(cache.MINI_CHOOSE_ADDRESS)
    if (flag) {
      Taro.showLoading()
      const current = getCurrentInstance().router;
      const param =  current.params;
      const address = await this.props.actions.action._addressInit();
      await this.props.actions.initConfirm(address)
      await this.props.actions.init(param);
      const dangaoPhone = Taro.getStorageSync(cache.DANGAO_PHONE)||{}
      this.props.actions.action.commonChange('main.orderList.dangaoPhone', dangaoPhone)
      Taro.hideLoading()
    }
    await this.props.actions.action._switchInit();

    await this.props.actions.action._getLoacl();
    //算运费
    await this.props.actions.action._calcFreight();
    //积分初始化
    await this.props.actions.action._pointInit();

    await this.props.actions.action.calcSplitInfo();
  }

  async componentWillUnmount() {
    Taro.removeStorage({ key: 'mini::confirmAddress' });
    Taro.removeStorageSync('confirm:split:info');
    Taro.removeStorageSync(cache.DANGAO_PHONE);
    await this.props.actions.clean();
  }

  /**
   * 实时计算扣减积分、优惠券后订单总金额，
   * @returns {Promise<void>}
   * @private
   */
  _calcOrderTotalAmount(totalPrice, couponPrice, usePoint, giftCardPrice) {
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

    // 减去礼品卡抵扣
    newTotalPrice = _.sub(newTotalPrice, giftCardPrice);
    if (newTotalPrice <= 0) newTotalPrice = 0;

    return newTotalPrice.toFixed(2);
  }

  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    const {
      stores,
      isThirdPlatform,
      isPresale,
      gifts,
      isLoading,
      price = {},
      localData = {},
      points = {},
      giftCardPrice,
      giftCardType,
    } = main || {};

    const { deliverType, confirmCoupon = {} } = localData as any;
    const couponTotalPrice = confirmCoupon.couponTotalPrice ? confirmCoupon.couponTotalPrice : 0;

    const { usePoint } = points as any;
    const totalAmount = [1, 2].includes(giftCardType)
      ? 0
      : this._calcOrderTotalAmount((price as any).totalPrice, couponTotalPrice, usePoint, giftCardPrice);
    if (+totalAmount <= 0 && deliverType !== 0) {
      action.commonChange('main.localData', { ...localData, deliverType: 0 });
    }

    // 是不是卡管卡券/直冲商品
    const isCouponOrZhichongGoods = stores?.map(e => e.tradeItems).flat().some(e => (e.goodsType === 7 || e.goodsType === 6))
    return (
      <View>
        {isLoading && <WMLoading />}
        {stores && Boolean(stores.length) && (
          <View className="packageCOrderOrderConfirm">
            {isThirdPlatform && (
              <View className="tip-info">
                <Image src={tip} className="tip-info-image"></Image>
                <Text className="tip-info-text">订单包含需要向供应商采购的商品，如采购失败会进行自动退款</Text>
              </View>
            )}
            {isPresale && <Presale />}
            <View className="confirm-con">
              {/*收货地址*/}
              {(isCouponOrZhichongGoods) ? null : <Address />}


              {/*店铺商品详情*/}
              {stores &&
                Boolean(stores.length) &&
                stores.map((store, key) => (
                  <Store key={store.supplier.storeId} myStore={store} single={store.length === 1} />
                ))}

              {/*支付 配送*/}
              <PayCon totalAmount={totalAmount} />

              {/*订单金额*/}
              <PriceCon />
              {/* 定金支付 */}
              <Deposit />
            </View>

            {/*提交订单*/}
            <PriceFooter totalAmount={totalAmount} />

            {/* 赠品列表 */}
            {gifts?.isMaskOpen && <Gifts />}
          </View>
        )}
        {/*商品失效之类弹窗*/}
        <ConfirmMask />
        <PrivacyModal />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
