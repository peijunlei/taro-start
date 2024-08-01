import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import './pay-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import alipay from '../img/alipay.png';
import weapp from '../img/wechat.png';
import bankpay from '../img/bankpay.png';
import balance from '../img/balance.png';
import credit from '../img/credit.png';
import unionpay from '../img/unionpay.png';

import { _ } from 'wmkit';
import api from 'api';

import arrow from '@/assets/image/common/arrow.png';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import disabledCheck from '@/assets/image/shop-cart/disabled-check.png';
import IconFont from '@/wmkit/common/iconfont';
type IPayListProps = T.IProps & T.IPayListProps;
//@ts-ignore
const isH5 = __TARO_ENV === 'h5';
//@ts-ignore
const isWechatShow = __TARO_ENV === 'h5' || __TARO_ENV === 'weapp';
//@ts-ignore
const isAlipayShow = __TARO_ENV === 'h5' || __TARO_ENV === 'alipay';
const unionpayShow = __TARO_ENV === 'h5';
@connect<Partial<IPayListProps>, T.IPayListState>(store2Props, actions)
export default class PayList extends Component<Partial<IPayListProps>, T.IPayListState> {
  constructor(props: IPayListProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main: {
        balance: { balancMoney },
        payInfo,
        credit: { alias, usableAmount },
        tradePrice,
        checkedBalance,
        balancePrice,
        giftCardPrice
      },
    } = this.props;
    const isCardOrder = Boolean(giftCardPrice);
    const openPayList = payInfo.reduce((a, b) => (b.isOpen && a.push(b.channel), a), []);
    let isWeixin = _.isWeixin();
    const gateway = payInfo.filter((item) => item.channel === 'Balance')?.[0]?.gateway;
    const combinePayFlag = gateway?.combinePayFlag;
    let isCombPay = false;
    // 支持组合支付 且 可用余额＜须支付金额
    if (combinePayFlag === 1 && Number(balancMoney) < Number(tradePrice)) {
      isCombPay = true;
    }
    const isCommLogin = __TARO_ENV === 'h5' && sessionStorage.getItem('isCommLogin');
    // console.log('isCombPay', isCombPay);
    return (
      <View className="payList">
        {
          //余额支付
           Boolean(~openPayList.indexOf('Balance')) && !isCommLogin&& (
            <View
              className={`pay-item ${isCardOrder ? 'disabled' : ''}`}
              onClick={async () => {
                // 余额没有钱
                if (balancMoney === '0.00' || isCardOrder) {
                  return;
                }
                if (isCombPay) {
                  action.commonChange('main.checkedBalance', !checkedBalance);
                } else {
                  const balance = payInfo.filter((o) => o.channel === 'Balance')[0];
                  await action.checkPwdValid(balance.id);
                }
              }}
            >
              <View style={{ flex: 1 }}>
                <View className="left-pay">
                  <Image src={balance} className="pay-icon" />
                  <Text className="pay-title">{gateway.alias}支付</Text>
                </View>
                {
                  isCardOrder && (
                    <View className='tip'>
                      <IconFont value="zhuyi" size={12} color="#999" />
                      <Text className='tip_text'> {`礼品卡订单暂不支持${gateway.alias}支付`} </Text>
                    </View>
                  )
                }
              </View>
              <View className="right-pay">
                <Text className="money-title" decode>
                  当前余额&nbsp;
                </Text>
                <Text className="money-num">¥{_.addZero(balancMoney)}</Text>
                {(isCombPay || isCardOrder) ? (
                  <Image
                    className="arrow-icon arrow-icon-check"
                    src={(balancMoney === '0.00' || isCardOrder) ? disabledCheck : checkedBalance ? check : uncheck}
                  />
                ) : (
                    <Image src={arrow} className="arrow-icon" />
                  )}
              </View>
            </View>
          )
        }
        {/*如果已经余额组合支付后不展示授信支付。*/}
        {/*如果组合支付时选择了余额不展示授信支付。*/}
        {balancePrice === null && !checkedBalance && isWechatShow && Boolean(~openPayList.indexOf('Credit')) && (
          <View
            className={`pay-item ${isCardOrder ? 'disabled' : ''}`}
            onClick={async () => {
              if (isCardOrder) return;
              const credit = await payInfo.filter((o) => o.channel === 'Credit')[0];
              await action.checkCreditPwdValid(credit.id);
            }}
          >
            <View style={{ flex: 1 }}>
              <View className="left-pay">
                <Image src={credit} className="pay-icon" />
                <Text className="pay-title">{`${alias}支付`}</Text>
              </View>
              {
                isCardOrder && (
                  <View className='tip'>
                    <IconFont value="zhuyi" size={12} color="#999" />
                    <Text className='tip_text'> {`礼品卡订单暂不支持${alias}支付`} </Text>
                  </View>
                )
              }
            </View>
            <View className="right-pay">
              <Text className="money-title" decode>
                可用额度&nbsp;
              </Text>
              <Text className="money-num">¥{_.addZero(usableAmount)}</Text>
              <Image src={arrow} className="arrow-icon" />
            </View>
          </View>
        )}

        {isWechatShow && Boolean(~openPayList.indexOf('WeChat')) && (
          <View
            className="pay-item"
            onClick={async () => {
              if (checkedBalance) {
                await action.useBalancePay('WeChat');
              } else {
                await action.weChatpay(isWeixin);
              }
            }}
          >
            <View className="left-pay">
              <Image src={weapp} className="pay-icon" />
              <Text className="pay-title">微信支付</Text>
            </View>
            <View className="right-pay">
              <Image src={arrow} className="arrow-icon" />
            </View>
          </View>
        )}

        {isAlipayShow && Boolean(~openPayList.indexOf('Alipay')) && !_.isWeixin() && (
          <View
            className="pay-item"
            onClick={async () => {
              if (checkedBalance) {
                await action.useBalancePay('Alipay');
              } else {
                await action.alipay();
              }
            }}
          >
            <View className="left-pay">
              <Image src={alipay} className="pay-icon" />
              <Text className="pay-title">支付宝支付</Text>
            </View>
            <View className="right-pay">
              <Image src={arrow} className="arrow-icon" />
            </View>
          </View>
        )}
        {/*如果已经余额组合支付后不展示授信支付。*/}
        {/*如果组合支付时选择了余额不展示授信支付。*/}
        {
          //企业银联支付
          balancePrice === null && !checkedBalance && Boolean(~openPayList.indexOf('unionpay_b2b')) && (
            <View
              className="pay-item"
              onClick={async () => {
                await action.bankPay();
              }}
            >
              <View className="left-pay">
                <Image src={bankpay} className="pay-icon" />
                <Text className="pay-title">银联企业支付</Text>
              </View>
              <View className="right-pay">
                <Image src={arrow} className="arrow-icon" />
              </View>
            </View>
          )
        }
        {
          //银联支付
          unionpayShow && Boolean(~openPayList.indexOf('unionpay')) && (
            <View
              className="pay-item"
              onClick={async () => {
                if (checkedBalance) {
                  await action.useBalancePay('unionpay_b2b_unionPay');
                } else {
                  await action.unionPay();
                }
              }}
            >
              <View className="left-pay">
                <Image src={unionpay} className="pay-icon" />
                <Text className="pay-title">银联云闪付</Text>
              </View>
              <View className="right-pay">
                <Image src={arrow} className="arrow-icon" />
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
