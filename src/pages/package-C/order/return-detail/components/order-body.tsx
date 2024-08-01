import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './order-body.less';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import FormSelect from '@/pages/common/form-select';
import FormItem from '@/pages/common/form-item';
import ImageListScroll from '@/pages/common/image-list-scroll';
import {cache} from 'config';
import { getPrivacySetting, msg } from 'wmkit'
const noneImg = require('../img/none.png');
type OrderStatusProps = T.IProps & T.OrderStatusProps;

/**
 * 售后类型
 */
const RETURN_TYPE = {
  REFUND: '仅退款',
  RETURN: '退货退款',
};

/**
 * 货物状态 0 未收到货 1 已收到货
 */
const GOODS_INFO_STATE = {
  RECEIVED: '已收到货',
  NOT_RECEIVED: '未收到货',
};

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderBody extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }

  render() {
    let {
      main: { detail, pointsIsOpen },
    } = this.props;
    const rid = detail.id;

    const returnItems = detail.returnItems || [];
    const returnGifts = detail.returnGifts || [];
    //全部商品(商品+赠品)
    const items = returnItems.concat(returnGifts);

    // 退款原因（老）
    const returnReason = detail.returnReason ? detail.returnReason : null;
    // 退款原因（新）
    const refundCause = detail.refundCause ? detail.refundCause : {};
    const returnWay = detail.returnWay ? detail.returnWay : {};

    // 附件
    const attachments = [];
    detail.images &&
      detail.images.map((v) => {
        return attachments.push({ image: JSON.parse(v).url });
      });

    const returnType = detail.returnType;

    // 总额
    const totalPrice = detail.returnPrice ? detail.returnPrice.totalPrice : 0;
    // 改价金额
    const actualReturnPrice = detail.returnPrice ? detail.returnPrice.actualReturnPrice : null;
    // 应退金额，如果对退单做了改价，使用actualReturnPrice，否则，使用总额totalPrice
    const payPrice = actualReturnPrice == null ? totalPrice : actualReturnPrice;
    // 应退礼品卡金额
    const giftCardPrice = detail?.returnPrice ? detail?.returnPrice.giftCardPrice : 0;

    const storeId = detail.company ? detail.company.storeId : 0;
    const companyType = detail.company ? detail.company.companyType : 0;
    const storeName = detail.company ? detail.company.storeName : '';
    const returnFlowState = detail.returnFlowState ? detail.returnFlowState : '';
    //分销渠道，分销员名称，店铺名称
    const channelType = detail.channelType;
    const inviteeName = detail.distributorName ? detail.distributorName : '';
    const shopName = detail.shopName ? detail.shopName : '';
    const inviteeId = detail.inviteeId ? detail.inviteeId : '';
    const returnAddress = detail.returnAddress;
    const storeType = detail?.company?.storeType ? detail?.company?.storeType : -1;

    return (
      detail && (
        <View style={{ width: '100%' }}>
          <View className="body1">
            <View className="sku-head">
              <View
                className="head-top"
                onClick={() => {
                  if (storeType != 2) return;
                  const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                  const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
                  if (singerCardLogin) {
                    Taro.redirectTo({
                      url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${LOGIN_DATA.userGiftCardId}&preview=false`,
                    });
                  } else {
                    Taro.navigateTo({
                      url:
                        storeType == 2
                          ? `/pages/index/index?model=o2o`
                          : `/pages/package-A/store/store-main/index?storeId=${storeId}`,
                    });
                  }
                }}
              >
                {storeType == 2 || companyType == 0 ? (
                  storeType == 2 ? (
                    <Text className="isShop">门店</Text>
                  ) : (
                      <View className="self-sales">自营</View>
                    )
                ) : null}
                {storeName}
              </View>
            </View>
            <View
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-C/order/return-sku-list/index?tid=${rid}`,
                });
              }}
            >
              <View className="limit-img">
                <View className="img-content">
                  {items.map((v, k) => {
                    if (k < 4) {
                      return <Image key={k} className="img-item" src={v.pic ? v.pic : noneImg} />;
                    }
                  })}
                </View>
                <View className="right-context">
                  <View className="total-num">{items.length}</View>
                  <Image className="icon" src={require('../img/jiantou.png')} />
                </View>
              </View>
            </View>
          </View>
          <View className="return-detail">
            <View className="mb10">
              <FormSelect
                labelName="退款记录"
                textStyle={{ fontWeight: 500 }}
                placeholder=""
                selected={{
                  key: '1',
                  value: '',
                }}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/package-C/order/finance-refund-record/index?rid=${rid}&returnFlowState=${returnFlowState}`,
                  });
                }}
              />
            </View>
            {detail.returnLogistics && (
              <FormSelect
                labelName="退货物流信息"
                textStyle={{ fontWeight: 500 }}
                placeholder=""
                selected={{
                  key: '1',
                  value: '',
                }}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/package-C/order/return-logistics-info/index?rid=${rid}`,
                  });
                }}
              />
            )}
          </View>
          <View className="body1">
            <View className="mb10 top-border">
              <FormItem
                styles={{ padding: '20rpx 10rpx' }}
                labelName="售后类型"
                textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                placeholder={RETURN_TYPE[returnType] || '-'}
              />
              {returnType == 'REFUND' && (
                <FormItem
                  styles={{ padding: '20rpx 10rpx' }}
                  labelName="货物状态"
                  textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                  placeholder={GOODS_INFO_STATE[detail.goodsInfoState] || '无'}
                />
              )}

              <FormItem
                styles={{ padding: '20rpx 10rpx' }}
                labelName="退货原因"
                textStyle={{ttextAlign: 'justify', display: 'inline-block', fontWeight: 500, color: 'rgba(0,0,0,0.8)'}}
                placeholder={
                  returnReason
                    ? Object.getOwnPropertyNames(returnReason).map((key) => returnReason[key])[0]
                    : refundCause
                      ? refundCause?.cause
                      : '无'
                }
              />
              {returnType == 'RETURN' ? (
                <View>
                  <FormItem
                    styles={{ padding: '20rpx 10rpx' }}
                    labelName="退货方式"
                    textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                    placeholder={Object.getOwnPropertyNames(returnWay).map((key) => returnWay[key])[0]}
                  />
                  {/* <FormItem
                    styles={{padding: '20rpx 10rpx'}}
                    labelName="退货地址"
                    textStyle={{textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)'}}
                    placeholder={Object.getOwnPropertyNames(returnWay).map((key) => returnWay[key])[0]}
                  /> */}
                </View>
              ) : null}
              {returnAddress ? (
                <FormItem
                  styles={{ padding: '20rpx 10rpx', alignItems: 'center' }}
                  labelName="退货地址"
                  textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                  placeholder={returnAddress.name + ' ' + returnAddress.phone + ' ' + returnAddress.detailAddress}
                />
              ) : null}

              <FormItem
                styles={{ padding: '20rpx 10rpx' }}
                labelName="退货说明"
                textStyle={{textAlign: 'justify', display: 'inline-block', fontWeight: 500, color: 'rgba(0,0,0,0.8)'}}
                placeholder={detail.description || '无'}
              />

              {/*linkedmall商家同意退单留言，包含退货地址*/}
              {detail.thirdPlatformType == 0 && detail.thirdSellerAgreeMsg && (
                <FormItem
                  styles={{ padding: '20rpx 10rpx' }}
                  labelName="商家留言"
                  textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                  placeholder={detail.thirdSellerAgreeMsg}
                  showCopy
                />
              )}
              <ImageListScroll imageList={attachments} labelName="退单附件" />
            </View>
          </View>
          <View className="body1">
            <View className="total-price-return-detail mb10">
              <View className="total-list">
                <Text className="price">应退金额</Text>
                <Text className="price-color">￥{totalPrice.toFixed(2)}</Text>
              </View>
              {returnFlowState == 'COMPLETED' ? (
                <View className="total-list">
                  <Text className="price3">实退金额</Text>
                  <Text className="price2">￥{payPrice.toFixed(2)}</Text>
                </View>
              ) : null}

              {pointsIsOpen && (
                <View className="total-list">
                  <Text className="price3">应退积分</Text>
                  {detail?.returnPoints?.applyPoints === 0 ? (
                    <Text className="price2">0</Text>
                  ) : (
                    <Text className="price2">{detail?.returnPoints?.applyPoints || 0}</Text>
                  )}
                </View>
              )}
              {pointsIsOpen && (
                <View className="total-list">
                  <Text className="price3">实退积分</Text>
                  {returnFlowState == 'COMPLETED' ? (
                    <Text className="price2">{(detail?.returnPoints?.actualPoints || 0).toString()}</Text>
                  ) : (
                      <Text className="price2">0</Text>
                    )}
                </View>
              )}
              {giftCardPrice > 0 && (
                <View className="total-list">
                  <Text className="price3">应退卡包</Text>
                  <Text className="price2">￥{giftCardPrice.toFixed(2)}</Text>
                </View>
              )}
              {giftCardPrice > 0 && (
                <View className="total-list">
                  <Text className="price3">实退卡包</Text>
                  {returnFlowState == 'COMPLETED' ? (
                    <Text className="price2">￥{giftCardPrice.toFixed(2)}</Text>
                  ) : (
                    <Text className="price2">￥0.00</Text>
                  )}
                </View>
              )}
              
            </View>
          </View>
        </View>
      )
    );
  }
}
