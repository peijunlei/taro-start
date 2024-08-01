import { Image, Input, Text, View, Picker } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component, Fragment } from 'react';
import './order-body.less';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { _, OrderWrapper, WMkit, immutable, getPrivacySetting, msg } from 'wmkit';
import FormSelect from '@/pages/common/form-select';
import FormItem from '@/pages/common/form-item';
import ImageListScroll from '@/pages/common/image-list-scroll';
import Price from '@/pages/common/goods/price';
import moment from 'dayjs';
import FormSwitch from '@/pages/common/form/form-switch';
import { IndexModuleSpuIdResponse } from '../../../../../webapi/IndexController';
import arrowDown from '@/assets/image/order/arrow-down.png';
import arrowUp from '@/assets/image/order/arrow-up.png';
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
type OrderStatusProps = T.IProps & T.OrderStatusProps;
const noneImg = require('../img/none.png');
import arrow from '@/assets/image/common/arrow.png';
import { getDeliverFormat } from '@/utils/common-functions';
import dayjs from 'dayjs';
import { Const, cache } from 'config';
import IconFont from '@/wmkit/common/iconfont';
import { isEmpty } from 'lodash';
import { getCardType, getCardCopyText } from '../utils';
const DELIVERY_TYPE = {
  4: '到店自提',
  3: '送货上门',
  2: '快递配送',
};
@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderBody extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
    // this.setState({
    //   inputPoints: 0,
    // });

    this.state = {
      inputPoints: 0,
    };
  }

  componentDidMount(): void {
    let { points = {} } = (this.props && this.props.main) || {};
    this.setState({
      inputPoints: points.usePoint,
    });
  }

  renderCouponPwd = (isCouponGoods, detail) => {
    if (!isCouponGoods || !(detail.tongKaShuKeTrade.kaGuanCouponCards?.length)) return null
    const kaGuanCouponCards = detail.tongKaShuKeTrade.kaGuanCouponCards
    return (
      <View className="middle-detail" style={{ paddingBottom: 0 }}>
        {
          kaGuanCouponCards.map((item, index) => (
            <View key={index} className="electronicCard-item">
              <View className="electron-row" style={{ justifyContent: 'space-between' }}>
                <Text className="electron-title">{detail.tradeItems[0].skuName}</Text>
                <View
                  className="btn"
                  onClick={() => {
                    getPrivacySetting().then((res) => {
                      if ((res as any).needAuthorization) {
                        msg.emit('privacyModalVisible', {
                          visible: true,
                          privacyContractName: (res as any).privacyContractName,
                          callback: () => {
                            Taro.setClipboardData({
                              data: getCardCopyText(item),
                            }).then((res) => {
                              // web端手动提示，小程序端有默认提示
                              if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                                Taro.showToast({
                                  title: '内容已复制',
                                  icon: 'success',
                                });
                              }
                            });
                          },
                        });
                      } else {
                        Taro.setClipboardData({
                          data: getCardCopyText(item),
                        }).then((res) => {
                          // web端手动提示，小程序端有默认提示
                          if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                            Taro.showToast({
                              title: '内容已复制',
                              icon: 'success',
                            });
                          }
                        });
                      }
                    });
                  }}
                >
                  一键复制
                </View>
              </View>
              {
                getCardType(item).map((v, index) => (
                  <View className="electron-row" key={index}>
                    <Text className="electron-text">{v.label}：{v.value}</Text>
                  </View>
                ))
              }
            </View>
          ))

        }
      </View>
    )
  }

  render() {
    let {
      main = {},
      actions = {},
      actions: { action },
    } = this.props;
    let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));
    const {
      pointConfig = {},
      isBookingSaleGoods,
      detail = {},
      localData = {},
      points = {},
      isPayBalance,
      goodsTotalPrice,
      pointsOrder,

      giftCardType,
      giftCardNum,
      giftCardPrice,
      pickUpCardName,
      cashCardName,
    } = main;
    if (isEmpty(detail)) return null
    const { confirmCoupon = {} } = localData;
    const { totalPoint, showPointInput, maxPoint, usePoint } = points;
    // 积分设置打开且为订单抵扣
    let pointsUsageFlag = pointConfig.status == 1 && pointConfig.pointsUsageFlag == 1 ? true : false;
    /**
     * pointsUsageFlag - 0订单抵扣，1商品抵扣
     * status - 0禁用积分设置，1开启积分设置
     */
    const isOrderDeduction = pointConfig.status === 1 && pointConfig.pointsUsageFlag === 0;
    let earnestPrice = 0,
      swellPrice = 0,
      tailStartTime;
    const tradePrice = detail.tradePrice;
    const tradeState = detail.tradeState;
    // 是否设置膨胀金
    let hasSwellPrice = false;
    if (detail && JSON.stringify(detail) != '{}') {
      earnestPrice = tradePrice.earnestPrice; //定金
      swellPrice = tradePrice.swellPrice; //膨胀
      hasSwellPrice = _.sub(swellPrice, earnestPrice) == 0 ? false : true;
      tailStartTime = tradeState.tailStartTime;
    }
    let couponPrice;
    if (detail?.tradeState?.flowState == 'WAIT_PAY_EARNEST' || detail?.tradeState?.flowState == 'WAIT_PAY_TAIL') {
      couponPrice = confirmCoupon.couponTotalPrice || 0;
    } else {
      couponPrice = detail?.tradePrice ? orderWrapper.couponPrice() : 0;
    }
    //尾款，膨胀金可能大于商品价格，导致尾款为负数
    let tailPrice = _.sub(_.sub(_.sub(goodsTotalPrice, swellPrice), actions._pointToMoney(usePoint)), couponPrice);
    tailPrice = tailPrice < 0 ? 0 : tailPrice;
    // 尾款需要加上运费
    tailPrice = tailPrice + tradePrice?.deliveryPrice || 0;

    const _calc = (button: Array<string>) => {
      return function (flow: string, pay: string) {
        return button[0] === flow && button[1] === pay;
      };
    };

    const isShowReturn = () => {
      const canReturnFlag = orderWrapper.canReturnFlag(); //订单状态
      const flowState = orderWrapper.flowState(); //订单状态
      const payState = orderWrapper.payState(); //订单状态
      const applyReturnButtons = [
        // 待发货禁止单个退
        // ['AUDIT', 'PAID'],
        ['DELIVERED_PART', 'PAID'],
        ['DELIVERED', 'PAID'],
        ['COMPLETED', 'PAID'],
      ];
      if (canReturnFlag && applyReturnButtons.filter((button) => _calc(button)(flowState, payState)).length > 0) {
        return true;
      }
    };
    // 蛋糕是否可退
    const cakeCanreturn = (item) => {
      if (item.goodsType === 3) {
        if (item.num === item.deliveredNum || item.canReturnNum === 0) return false;
        return true;
      }
    }

    let orderTag = orderWrapper.orderTag();
    // 展示商品金额
    let showGoodsPriceFlag = orderWrapper.showGoodsPriceFlag();
    // 卡券订单
    let giftCardFlag = orderWrapper.giftCardFlag();
    const showGiftCard = goodsTotalPrice > 0 || cashCardName;

    // 直冲商品
    const isZhiChongGoods = detail.tradeItems.some(e => e.goodsType === 6)
    // 卡券商品
    const isCouponGoods = detail.tradeItems.some(e => e.goodsType === 7)

    return (
      <View className="commonForm" style={{ width: '100%' }}>
        <View className="body1">
          <View className="sku-head">
            <View
              className="head-top"
            // onClick={() => {
            //   Taro.navigateTo({
            //     url:
            //       WMkit.channelType() == '2' && WMkit.inviteeId() != ''
            //         ? `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`
            //         : `/pages/package-A/store/store-main/index?storeId=${orderWrapper.storeId()}`,
            //   });
            // }}
            >
              {orderWrapper.isSelf() && !(WMkit.channelType() == '2' && WMkit.inviteeId() != '') ? (
                <View className="self-sales">自营</View>
              ) : null}
              {WMkit.channelType() == '2' && WMkit.inviteeId() != ''
                ? `${main.detail.distributorName}的${main.detail.shopName || '小店'}`
                : orderWrapper.storeName()}
              {this.getTag(detail.deliverWay, detail.pickupFlag, detail.orderTag)}
            </View>
          </View>
          <View
          // 废弃 订单详情页商品点击跳转到商品详情页
          // onClick={() => {
          //   if (main.promotionOrder) {
          //     Taro.navigateTo({
          //       url: `/pages/package-C/order/order-sku-list/index?tid=${orderWrapper.orderNo()}&type=promotionOrder`,
          //     });
          //   } else {
          //       Taro.navigateTo({
          //         url: `/pages/package-C/order/order-sku-list/index?tid=${orderWrapper.orderNo()}`,
          //       });
          //   }
          // }}
          >
            <View className="middle-detail">
              {orderWrapper
                .tradeItems()
                .toJS()
                .map((item, index) => (
                  <View key={index}>
                    <View
                      key={index}
                      className="product-item"
                      onClick={() => {
                        const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                        if (singerCardLogin) return;
                        // 小c通过小B的店铺内分享链接进来购买的商品
                        if (
                          WMkit.inviteeId() &&
                          !WMkit.isDistributorFlag() &&
                          WMkit.channelType() == '2' &&
                          item.distributionGoodsAudit == '2'
                        ) {
                          Taro.navigateTo({
                            url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${item.spuId
                              }&skuId=${item.skuId}`,
                          });
                        } else {
                          if (isZhiChongGoods) {
                            Taro.navigateTo({ url: `/pages/package-F/cards/details/index?id=${item.skuId}&type=zhichong` })
                          } else if (isCouponGoods) {
                            Taro.navigateTo({ url: `/pages/package-F/cards/details/index?id=${item.skuId}&type=coupon` })
                          } else {
                            // 积分商品详情，跳转到积分商品页面
                            if (pointsOrder) {
                              Taro.navigateTo({
                                url: `/pages/package-B/goods/goods-details/index?skuId=${item.skuId}&pointsGoodsId=${item.pointsGoodsId}`,
                              });
                            } else {
                              Taro.navigateTo({
                                url: `/pages/package-B/goods/goods-details/index?skuId=${item.skuId}`,
                              });
                            }
                          }
                        }
                      }}
                    >
                      <Image className="img-item" key={item.oid} src={item.pic ? item.pic : noneImg} />
                      <View className="order-body-detail">
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View className="name">{item.thirdPlatformType != null && (
                            <View className="marketing">
                              <Text className="market-text">{Const.thirdPlatformTypeList[item.thirdPlatformType]}</Text>
                            </View>
                          )}{item.skuName}</View>
                        </View>
                        {
                          // true 不展示金额
                          !showGoodsPriceFlag && <View className="price">
                            <View className="specDetails">{item.specDetails ? `${item.goodsType === 7 ? '面值 ' : ''}${item.specDetails}` : ''}</View>
                            <View className='item-num'>
                              {main.pointsOrder ? (
                                <Price price={0} buyPoint={item.points} />
                              ) : (
                                  <Price price={_.addZero(item.price)} buyPoint={item.buyPoint} />
                                )}
                              <Text className='num2'>x{item.num}</Text>
                            </View>

                          </View>
                        }

                        <View className="right">
                          {item.rids && item.rids.length > 0 && (
                            <View
                              className="btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.rids.length === 1) {
                                  Taro.navigateTo({
                                    url: `/pages/package-C/order/return-detail/index?id=${item.rids[0]}`,
                                  });
                                } else {
                                  Taro.navigateTo({
                                    url: `/pages/package-C/order/refund-list/index?rids=${item.rids.join(',')}`,
                                  });
                                }
                              }}
                            >
                              售后进度
                            </View>
                          )}
                          {!(orderTag?.toJS()?.electronicCouponFlag || orderTag?.toJS()?.virtualFlag) &&
                            isShowReturn() && cakeCanreturn(item) && (
                              <View
                                className="btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // if (item.canReturnNum > 0) {
                                  //   Taro.navigateTo({
                                  //     url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${main.tid}&skuId=${item.skuId}`,
                                  //   });
                                  // } else {
                                  //   Taro.showToast({
                                  //     title: '无可退商品',
                                  //     icon: 'none',
                                  //     duration: 2000,
                                  //   });
                                  // }

                                  if (orderTag?.toJS()?.electronicCouponFlag || orderTag?.toJS()?.virtualFlag) {
                                    Taro.navigateTo({
                                      url: `/pages/package-C/order/return-refund/virtual-goods-return/index?storeId=${main.detail.supplier.storeId}`,
                                    });
                                  } else {
                                    if (item.canReturnNum > 0) {
                                      Taro.navigateTo({
                                        url: `/pages/package-C/order/return-refund/return-first-step/index?tid=${main.tid}&skuId=${item.skuId}`,
                                      });
                                    } else {
                                      Taro.showToast({
                                        title: '无可退商品',
                                        icon: 'none',
                                        duration: 2000,
                                      });
                                    }
                                  }
                                }}
                              >
                                退货退款
                              </View>
                            )}
                          {!(orderTag?.toJS()?.electronicCouponFlag || orderTag?.toJS()?.virtualFlag || giftCardFlag) && !isZhiChongGoods && !isCouponGoods && (
                            <View
                              className="btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.action.addGoods(item);
                              }}
                            >
                              加购
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                    {this.renderGreeting(item)}
                    {this.renderRestrictedInfo(item)}
                    <View>
                      {
                        item.packageGoodsRels && item.packageGoodsRels.length > 0 && (
                          <>
                            <View className="package-top">
                              <View className="package-desc">套餐内包含以下商品</View>
                              <View className="package-arrow">
                                <Text
                                  className="package-arrow-text"
                                  onClick={() => {
                                    this.setState({
                                      [`${item.skuId}_status`]: !this.state[`${item.skuId}_status`],
                                    });
                                  }}
                                >
                                  {this.state[`${item.skuId}_status`] ? '展开' : '收起'}
                                </Text>
                                <Image
                                  style={{ width: '12px', height: '12px' }}
                                  src={this.state[`${item.skuId}_status`] ? arrowDown : arrowUp}
                                />
                              </View>
                            </View>
                            <View className="packages-goodsxx">
                              {item.packageGoodsRels.map((item1, index) => {
                                if (this.state[`${item.skuId}_status`] && index > 0) return null;
                                return (
                                  <View className="goods-itemxx" key={index}>
                                    <View className="item-namexx">
                                      <Text className="name-leftxx">·</Text>
                                      <Text className="name-rightxx">
                                        {item1.skuName} {item1.specDetails ? ` / ${item1.specDetails}` : ''}
                                      </Text>
                                    </View>
                                    <Text className="item-numxx">×{item1.num}</Text>
                                  </View>
                                );
                              })}
                            </View>
                          </>
                        )
                      }
                      {item.goodsStatus === 5 && (
                        <View className="pre-sale">
                          <View className="text">当前商品为预售商品，预计发货时间 </View>
                          <View className="time">{dayjs(item.estimatedDeliveryTime).format('YYYY年MM月DD日')}</View>
                        </View>
                      )}
                      {item.goodsType === 3 ? (
                        <FormItem
                          labelName="配送时间"
                          leftStyle={{
                            fontSize: '12px',
                            color: 'rgba(0,0,0,0.8)',
                          }}
                          styles={{ padding: '4px 0 0 0', alignItems: 'center' }}
                          textStyle={{ textAlign: 'right', color: 'rgba(0,0,0,0.8)' }}
                          placeholder={getDeliverFormat(
                            item.deliveryDate,
                            item.deliveryStartTime,
                            item.deliveryEndTime,
                          )}
                        ></FormItem>
                      ) : null}
                    </View>
                  </View>
                ))}
              {orderTag?.toJS()?.electronicCouponFlag &&
                orderWrapper
                  .tradeItems()
                  .toJS()
                  .map((item, index) => this.renderElectronicCards(main, item))}
              {orderWrapper
                .gifts()
                .toJS()
                .map((item, index) => (
                  <View key={index}>
                    <View className="product-item" key={index}>
                      <Image className="img-item" key={item.oid} src={item.pic ? item.pic : noneImg} />
                      <View className="order-body-detail">
                        <View className="gift-con">
                          <View className="gift-sku-icon">
                            <Text className="gift-sku-text">赠品</Text>
                          </View>
                          <View className="name">
                            <Text style={{ opacity: '0' }} className="gift-sku-text">
                              赠品
                            </Text>
                            {item.skuName}
                          </View>
                        </View>
                        {/*<View className="name">*/}
                        {/*  <View className="gifts">赠品</View>*/}
                        {/*</View>*/}
                        <View className="specDetails">{item.specDetails}</View>
                        <View className="price">
                          <Price price={_.addZero(item.price)} />
                        </View>
                        {isCouponGoods || isZhiChongGoods ? null : (
                          <View className="right">
                            <View
                              className="btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                actions.action.addGoods(item);
                              }}
                            >
                              加购
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                    {item.goodsType === 3 ? (
                      <FormItem
                        labelName="配送时间"
                        leftStyle={{
                          fontSize: '12px',
                          color: 'rgba(0,0,0,0.8)',
                        }}
                        styles={{ padding: '4px 0 0 0', alignItems: 'center' }}
                        textStyle={{ textAlign: 'right', color: 'rgba(0,0,0,0.8)' }}
                        placeholder={getDeliverFormat(
                          item.deliveryDate,
                          item.deliveryStartTime,
                          item.deliveryEndTime,
                        )}
                      ></FormItem>
                    ) : null}
                  </View>
                ))}
            </View>
            {this.renderCouponPwd(isCouponGoods, detail)}
          </View>
        </View>
        <View className="body1">
          {!isBookingSaleGoods && (
            <View>
              <FormSelect
                labelName="付款记录"
                placeholder=""
                formStyle={{ padding: '10px 5px' }}
                textStyle={{ fontWeight: 500 }}
                inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
                // selected={{
                //   key: '1',
                //   value: orderWrapper.orderPayState(),
                // }}
                value={orderWrapper.orderPayState()}
                onClick={() => {
                  this._toPayRecord(orderWrapper.orderNo(), orderWrapper.orderPayState());
                }}
              />
              {isZhiChongGoods || isCouponGoods ? null : (
                <FormSelect
                  labelName="发货记录"
                  formStyle={{ padding: '10px 5px' }}
                  textStyle={{ fontWeight: 500 }}
                  placeholder=""
                  inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
                  // selected={{
                  //   key: '1',
                  //   value: orderWrapper.orderDeliveryState(),
                  // }}
                  value={orderWrapper.orderDeliveryState()}
                  onClick={() => {
                    this._toShipRecord(orderWrapper.orderNo(), orderWrapper.orderDeliveryState());
                  }}
                  iconVisible={this._isIconVisible(orderWrapper.orderDeliveryState())}
                />
              )}
            </View>
          )}
          {!main.pointsOrder && !isZhiChongGoods && !isCouponGoods && (
            <FormSelect
              labelName="发票信息"
              formStyle={{ padding: '10px 5px' }}
              textStyle={{ fontWeight: 500 }}
              inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
              placeholder=""
              // selected={{
              //   key: '1',
              //   value: orderWrapper.orderInvoice(),
              // }}
              value={orderWrapper.orderInvoice()}
              onClick={() => {
                this._toInvoice(orderWrapper.orderNo());
              }}
              iconVisible={this._isInvoiceVisible(orderWrapper.orderInvoice())}
            />
          )}
          {
            isZhiChongGoods ? (
              <FormSelect
                labelName="充值号码"
                placeholder=""
                formStyle={{ padding: '10px 5px' }}
                textStyle={{ fontWeight: 500 }}
                iconVisible={false}
                inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
                value={detail.kaGuanZhiChongNumber || detail.tongKaShuKeTrade.kaGuanZhiChongAccount || '-'}
              />
            ) : null
          }
          {orderWrapper.isDangaoss() && this.renderDangaoForm(detail)}
          {orderWrapper.buyerRemark() != '无' ? (
            <FormSelect
              labelName="订单备注"
              placeholder=""
              formStyle={{ padding: '10px 5px' }}
              textStyle={{ fontWeight: 500 }}
              iconVisible={false}
              inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
              value={orderWrapper.buyerRemark()}
            />
          ) : null}

          {/* <FormItem
                labelName="卖家备注"
                textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                placeholder={orderWrapper.sellerRemark()}
              /> */}
          {(main.detail.tradeItems && main.detail.tradeItems[0].isFlashSaleGoods) ||
            orderWrapper.encloses().length == 0 ? (
              ''
            ) : (
              <ImageListScroll imageList={orderWrapper.encloses()} labelName="订单附件" />
            )}
        </View>
        {isBookingSaleGoods && (
          <View className="body1">
            <View className="mb10 top-border">
              {orderWrapper.orderState() == '待支付定金' ? (
                <FormItem
                  labelName="使用优惠券"
                  styles={{ padding: '10px 5px' }}
                  leftStyle={{ fontSize: '12px' }}
                  textStyle={{ textAlign: 'right', color: 'rgba(0,0,0,0.8)' }}
                  placeholder="尾款阶段可用"
                />
              ) : (
                  orderWrapper.orderState() == '待支付尾款' && (
                    <View
                      className="order-store-item"
                      onClick={async () => {
                        // 待支付尾款并且尾款未提交订单
                        if (orderWrapper.orderState() == '待支付尾款' && !isPayBalance) {
                          await actions.action._urlChange(1);
                        }
                      }}
                    >
                      <Text className="order-item-label">使用优惠券</Text>
                      <View className="store-item-right">
                        <Text className="item-text">
                          ¥{confirmCoupon.couponTotalPrice ? actions._addZero(confirmCoupon.couponTotalPrice) : '0.00'}
                        </Text>
                        {orderWrapper.orderState() == '待支付尾款' && !isPayBalance && (
                          <Image className="arrow-img" src={arrow} />
                        )}
                      </View>
                    </View>
                  )
                )}

              {/* 待支付定金、已创建支付尾款快照、状态不等于待支付尾款情况下显示使用积分 */}
              {orderWrapper.orderState() == '待支付定金' ? (
                <FormItem
                  labelName="使用积分"
                  styles={{ padding: '10px 5px' }}
                  leftStyle={{ fontSize: '12px' }}
                  textStyle={{ textAlign: 'right', color: 'rgba(0,0,0,0.8)' }}
                  placeholder="尾款阶段可用"
                />
              ) : (
                  orderWrapper.orderState() == '待支付尾款' &&
                  isOrderDeduction &&
                  !isPayBalance && (
                    <View className="order-store-item">
                      <View className="order-store-point">
                        <View className="point-con">
                          <Text className="order-item-label">使用积分</Text>
                          {showPointInput && (
                            <View className="point-box">
                              <Input
                                type="number"
                                value={usePoint.toString()}
                                // 通过value无法控制输入最大值，达到最大依然能够输入，结合长度来控制，默认长度为140
                                maxlength={usePoint >= maxPoint ? maxPoint.toString().length : 140}
                                onInput={({ detail: { value } }) => {
                                  const point = Number(value) >= maxPoint ? maxPoint : Number(value);
                                  action.commonChange('main.points.usePoint', point);
                                  // this.setState({
                                  //   inputPoints: point,
                                  // });
                                  return point;
                                }}
                                onBlur={(e) => {
                                  action.calcSplitInfo();
                                }}
                                className="point-input"
                                placeholder="点击输入"
                              />
                              <Text className="order-item-label" decode>
                                积分&nbsp;&nbsp;&nbsp;抵扣
                            </Text>
                              <Text className="use-point-price">¥{actions._pointToMoney(usePoint)}</Text>
                            </View>
                          )}
                          <FormSwitch
                            title=""
                            checked={showPointInput}
                            disabled={maxPoint <= 0}
                            onChange={(bool) => {
                              if (maxPoint > 0) {
                                action.commonChange([
                                  { paths: 'main.points.showPointInput', value: bool },
                                  { paths: 'main.points.usePoint', value: 0 },
                                ]);
                              }
                            }}
                          />
                        </View>
                        <View className="order-point-con">
                          <Text className="item-input-text">共</Text>
                          <Text className="item-input-price">{totalPoint ? totalPoint : '0'}</Text>
                          <Text className="item-input-text">积分，</Text>
                          {showPointInput ? (
                            <View className="order-point-con">
                              <Text className="item-input-text">最多可用</Text>
                              <Text className="item-input-price">{maxPoint ? maxPoint : '0'}</Text>
                              <Text className="item-input-text">积分抵扣</Text>
                              <Text className="item-input-price">
                                ¥{actions._pointToMoney(maxPoint ? maxPoint : 0)}
                              </Text>
                            </View>
                          ) : (
                              <View className="order-point-con">
                                <Text className="item-input-text">达到</Text>
                                <Text className="item-input-price">{pointConfig?.overPointsAvailable + ''}</Text>
                                <Text className="item-input-text">积分后可用于下单抵扣</Text>
                              </View>
                            )}
                        </View>
                      </View>
                    </View>
                  )
                )}
              {showGiftCard && (
                <View
                  className="order-confirm-store-item"
                  onClick={() => {
                    Taro.navigateTo({
                      url: '/pages/package-D/gift-card/use-gift-card/index',
                    });
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text className={`order-item-label ${isH5 && 'order-item-pad'}`}>使用卡包</Text>
                    {!cashCardName && !isBookingSaleGoods && giftCardNum > 0 && (
                      <View className="order-item-number">
                        <Text className="order-item-number-text">{giftCardNum}张可用</Text>
                      </View>
                    )}
                  </View>
                  {giftCardType !== 1 && (
                    <View className="store-item-right">
                      <Text className="item-text">
                        {[1, 2].includes(giftCardType)
                          ? '提货卡'
                          : `¥${giftCardPrice ? actions._addZero(giftCardPrice) : '0.00'}`}
                      </Text>
                      {!cashCardName && <Image className="arrow-img" src={arrow} />}
                    </View>
                  )}
                  {giftCardType === 1 && <Text className="item-text">提货卡</Text>}
                </View>
              )}
              {orderWrapper.orderState() != '待支付定金' && orderWrapper.orderState() != '待支付尾款' && !isZhiChongGoods && !isCouponGoods ? (
                <FormSelect
                  labelName="发货记录"
                  formStyle={{ padding: '10px 5px' }}
                  textStyle={{ fontWeight: 500 }}
                  placeholder=""
                  inputStyle={__TARO_ENV == 'h5' ? { color: 'rgba(0,0,0,0.8)', fontWeight: 500, opacity: '1' } : {}}
                  // selected={{
                  //   key: '1',
                  //   value: orderWrapper.orderDeliveryState(),
                  // }}
                  value={orderWrapper.orderDeliveryState()}
                  onClick={() => {
                    this._toShipRecord(orderWrapper.orderNo(), orderWrapper.orderDeliveryState());
                  }}
                  iconVisible={this._isIconVisible(orderWrapper.orderDeliveryState())}
                />
              ) : null}
              <FormItem
                labelName="尾款通知手机号"
                styles={{ padding: '10px 0px 10px 5px' }}
                leftStyle={{ fontSize: '12px' }}
                textStyle={{ textAlign: 'right', color: 'rgba(0,0,0,0.8)' }}
                placeholder={detail.tailNoticeMobile}
              />
            </View>
          </View>
        )}
        {!main.pointsOrder ? (
          <View className="body2">
            <View className="total-price mb10">
              {!isBookingSaleGoods && (
                <View className="total-list">
                  <Text className="price">应付金额</Text>
                  <Text className="price-color">￥{orderWrapper.totalPrice()}</Text>
                </View>
              )}
              {
                !showGoodsPriceFlag && <View className="total-list">
                  <Text className="price3">商品金额</Text>
                  <Text className="price2">￥{orderWrapper.goodsPrice()}</Text>
                </View>
              }
              {/*非店铺内购买商品，展示原本营销优惠*/}
              {!(WMkit.inviteeId() && WMkit.isShop()) && !isBookingSaleGoods && (
                <View>
                  {orderWrapper.marketingDiscountPrice() != 0 && (
                    <View className="total-list">
                      <Text className="price3">活动优惠</Text>
                      <Text className="price2">
                        -￥
                        {orderWrapper.marketingDiscountPrice()}
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {pointsUsageFlag
                ? orderWrapper.points() != 0 && (
                  <View className="total-list">
                    <Text className="price3">使用积分</Text>
                    {orderWrapper.points() ? (
                      <Text className="price2">{orderWrapper.points()}</Text>
                    ) : (
                        <Text className="price2">0</Text>
                      )}
                  </View>
                )
                : orderWrapper.pointsPrice() != 0 && (
                  <View className="total-list">
                    <Text className="price3">积分抵扣</Text>
                    <Text className="price2">
                      -￥
                      {orderWrapper.pointsPrice()}
                    </Text>
                  </View>
                )}
              {orderWrapper.couponPrice() != 0 && (
                <View className="total-list">
                  <Text className="price3">优惠券</Text>
                  <Text className="price2">
                    -￥
                    {orderWrapper.couponPrice()}
                    {/*66*/}
                  </Text>
                </View>
              )}
              {!main.detail.isNotShowPrice&&orderWrapper.giftCardPrice() > 0 && (
                <View className="total-list">
                  <Text className="price3">卡包</Text>
                  <Text className="price2">
                    -￥
                    {orderWrapper.giftCardPrice()}
                    {/*66*/}
                  </Text>
                </View>
              )}
              {orderWrapper.privilegePrice() > 0 && (
                <View className="total-list">
                  <Text className="price3">订单改价</Text>
                  <Text className="item-text">￥{orderWrapper.privilegePrice()}</Text>
                </View>
              )}
              {!(orderTag?.toJS()?.electronicCouponFlag || orderTag?.toJS()?.virtualFlag) && !isCouponGoods && !isZhiChongGoods &&
                (!detail?.pickupFlag || (detail.tradeVOList || []).length > 0) && (
                  <View className="total-list">
                    <Text className="price3">配送费用</Text>
                    <Text className="item-text">￥{orderWrapper.deliveryPrice()}</Text>
                  </View>
                )}
              {orderWrapper.commission() > 0 && !isBookingSaleGoods && WMkit.isDistributor() && (
                <View className="total-list">
                  <Text className="price3">预计返利</Text>
                  <Text className="price2">￥{orderWrapper.commission()}</Text>
                </View>
              )}
              {isBookingSaleGoods && (
                <View className="total-list">
                  <Text className="price3">定金</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text className="item-text" style={{ textAlign: 'end' }}>
                      -¥{earnestPrice ? earnestPrice.toFixed(2) : '0'}
                    </Text>
                    {hasSwellPrice && (
                      <Text className="swellPrice">定金膨胀 ¥{swellPrice ? swellPrice.toFixed(2) : '0'}</Text>
                    )}
                  </View>
                </View>
              )}
              {/* {isBookingSaleGoods && hasSwellPrice && (
                <View className="total-list">
                  <Text className="price3"></Text>
                  <Text className="swellPrice">定金膨胀 ¥{swellPrice ? swellPrice.toFixed(2) : '0'}</Text>
                </View>
              )} */}
              {isBookingSaleGoods && (
                <View className="total-list">
                  <Text className="price3">尾款</Text>
                  <View style={{ flexDirection: 'column' }}>
                    <Text className="item-text" style={{ textAlign: 'end' }}>
                      ¥{tailPrice.toFixed(2)}
                    </Text>
                    {orderWrapper.orderState() == '待支付尾款' && (
                      <Text className="item-text tailStartTime">
                        {moment(tailStartTime).format('M月DD日 HH:mm')}开始支付尾款
                      </Text>
                    )}
                  </View>
                </View>
              )}
              {/* {isBookingSaleGoods && (
                <View className="total-list">
                  <Text className="price3"></Text>
                  {orderWrapper.orderState() == '待支付尾款' && (
                    <Text className="item-text tailStartTime">
                      {moment(tailStartTime).format('M月DD日 HH:mm')}开始支付尾款
                    </Text>
                  )}
                </View>
              )} */}
            </View>
          </View>
        ) : (
            <View className="order-point-wrap">
              <Text className="order-point-label">订单积分</Text>
              <Text className="order-point-num">{orderWrapper.points()}</Text>
            </View>
          )}
      </View>
    )
  }
  /**蛋糕叔叔商品表单 */
  renderDangaoForm = (detail: any) => {
    const item = detail.dangaossTrade
    if (!item) return null
    const { deliveryText, ordererPhone, dangaossTakeShopName, dangaossDeliveryDate, dangaossDeliveryTime, dangaossTakeDate, dangaossTakeTime } = item
    /**
     * type: 4 自取 3 配送 2 快递
     */
    const type = detail.deliverWay
    const text = type === 4 ? '自取' : '配送'
    // 快递配送时间
    const deliveryDesc = deliveryText || '下单后24小时发货，请耐心等候～'
    const phone = ordererPhone
    // 配送费
    const deliveryPrice = detail.tradePrice.deliveryPrice
    // 门店名称
    const shopName = dangaossTakeShopName
    // 配送日期
    const deliveryDate = type === 4 ? dangaossTakeDate : dangaossDeliveryDate
    // 配送时间
    const deliveryTime = type === 4 ? dangaossTakeTime : dangaossDeliveryTime

    return (
      <Fragment>
        <FormItem
          styles={{ padding: '10px 5px' }}
          labelName="订货人手机号"
          textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
          placeholder={phone}
        />
        <FormItem
          styles={{ padding: '10px 5px' }}
          labelName="配送方式"
          textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
          placeholder={DELIVERY_TYPE[type]}
        />
        {
          [2, 3].includes(type) && (
            <FormItem
              styles={{ padding: '10px 5px' }}
              labelName="配送费"
              textStyle={{ textAlign: 'right', fontWeight: 500, color: 'var(--themeColor)' }}
              placeholder={`¥${deliveryPrice.toFixed(2)}`}
            />
          )
        }
        {
          type === 4 && (
            <FormItem
              styles={{ padding: '10px 5px' }}
              labelName="自取门店"
              textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
              placeholder={shopName}
            />
          )
        }
        {
          [3, 4].includes(type) && (
            <Fragment>
              <FormItem
                styles={{ padding: '10px 5px' }}
                labelName={`${text}日期`}
                textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                placeholder={deliveryDate}
              />
              <FormItem
                styles={{ padding: '10px 5px' }}
                labelName={`${text}时间`}
                textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
                placeholder={deliveryTime}
              />
            </Fragment>
          )
        }
        {
          type === 2 && (
            <FormItem
              styles={{ padding: '10px 5px' }}
              labelName="配送时间"
              textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
              placeholder={deliveryDesc}
            />
          )
        }
      </Fragment>
    )
  }
  getTag = (deliverWay: number, pickupFlag: boolean, orderTag: any) => {
    if (pickupFlag) return <View className="city-delivery">自提订单</View>;
    if (orderTag?.virtualFlag) {
      return <View className="city-delivery">虚拟订单</View>;
    } else if (orderTag?.electronicCouponFlag) {
      return <View className="city-delivery">卡券订单</View>;
    }
    return null;
  };

  /**
   * 付款记录页
   */
  async _toPayRecord(tid: string, pay: string) {
    await Taro.navigateTo({ url: `/pages/package-C/order/pay-detail/index?tid=${tid}` });
  }

  renderElectronicCards = (main, item) => {
    const detail = main.detail;
    const electronicCards = detail.electronicCards || [];
    const skuName = item.skuName;

    return electronicCards.map((item, index) => {
      return (
        <View key={index} className="electronicCard-item">
          <View className="electron-row">
            <Text className="electron-title">{skuName}</Text>
          </View>
          {item.cardNumber !== '' && (
            <View className="electron-row">
              <Text className="electron-text">卡号：</Text>
              <Text className="electron-text electron-cls">{item.cardNumber}</Text>
              <View
                className="btn"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: item.cardNumber,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: item.cardNumber,
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });
                }}
              >
                一键复制
              </View>
            </View>
          )}
          {item.cardPassword !== '' && (
            <View className="electron-row">
              <Text className="electron-text">卡密：</Text>
              <Text className="electron-text electron-cls">{item.cardPassword}</Text>
              <View
                className="btn"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: item.cardPassword,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: item.cardPassword,
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });
                }}
              >
                一键复制
              </View>
            </View>
          )}
          {item.cardPromoCode !== '' && (
            <View className="electron-row">
              <Text className="electron-text">优惠码：</Text>
              <Text className="electron-text electron-cls">{item.cardPromoCode}</Text>
              <View
                className="btn"
                onClick={() => {
                  getPrivacySetting().then((res) => {
                    if ((res as any).needAuthorization) {
                      msg.emit('privacyModalVisible', {
                        visible: true,
                        privacyContractName: (res as any).privacyContractName,
                        callback: () => {
                          Taro.setClipboardData({
                            data: item.cardPromoCode,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '内容已复制',
                                icon: 'success',
                              });
                            }
                          });
                        },
                      });
                    } else {
                      Taro.setClipboardData({
                        data: item.cardPromoCode,
                      }).then((res) => {
                        // web端手动提示，小程序端有默认提示
                        if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                          Taro.showToast({
                            title: '内容已复制',
                            icon: 'success',
                          });
                        }
                      });
                    }
                  });
                }}
              >
                一键复制
              </View>
            </View>
          )}
          {(item.receiveUrl || '1') && (
            <View>
              <View className="electron-row">
                <Text className="electron-text">领取链接：</Text>
                {/* <Text className="electron-text electron-cls">{item.receiveUrl}</Text> */}
                {Taro.getEnv() == Taro.ENV_TYPE.WEB && (
                  <View
                    className="btn"
                    onClick={() => {
                      window.location.href = item.receiveUrl;
                    }}
                  >
                    点击领取
                  </View>
                )}
                <View
                  className="btn"
                  onClick={() => {
                    getPrivacySetting().then((res) => {
                      if ((res as any).needAuthorization) {
                        msg.emit('privacyModalVisible', {
                          visible: true,
                          privacyContractName: (res as any).privacyContractName,
                          callback: () => {
                            Taro.setClipboardData({
                              data: item.receiveUrl,
                            }).then((res) => {
                              // web端手动提示，小程序端有默认提示
                              if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                                Taro.showToast({
                                  title: '内容已复制',
                                  icon: 'success',
                                });
                              }
                            });
                          },
                        });
                      } else {
                        Taro.setClipboardData({
                          data: item.receiveUrl,
                        }).then((res) => {
                          // web端手动提示，小程序端有默认提示
                          if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                            Taro.showToast({
                              title: '内容已复制',
                              icon: 'success',
                            });
                          }
                        });
                      }
                    });
                  }}
                >
                  一键复制
                </View>
              </View>
              {Taro.getEnv() == Taro.ENV_TYPE.WEB && (
                <Text style={{ color: '#00000066', fontSize: '12px' }}>如无法跳转请复制链接到浏览器打开</Text>
              )}
            </View>
          )}
        </View>
      );
    });
  };

  /**
   * 发票记录
   */
  _toInvoice = (id: string) => {
    const {
      main: { detail, promotionOrder },
    } = this.props;
    let orderWrapper = OrderWrapper(immutable.fromJS(detail));
    if (orderWrapper.orderInvoice() == '不需要发票') {
      return;
    } else if (promotionOrder) {
      Taro.navigateTo({ url: `/pages/package-C/order/invoice-info/index?tid=${id}&type=${1}` });
    } else {
      Taro.navigateTo({ url: `/pages/package-C/order/invoice-info/index?tid=${id}&type=${0}` });
    }
  };

  _toShipRecord = (id: string, state: string) => {
    let { main } = this.props;
    let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));
    let orderTag = orderWrapper.orderTag();
    let orderType;
    if (orderTag?.toJS()?.virtualFlag) {
      orderType = 1;
    } else if (orderTag?.toJS()?.electronicCouponFlag) {
      orderType = 2;
    } else {
      orderType = 0;
    }
    if (state == '未发货') {
      return;
    } else {
      if (main.promotionOrder) {
        Taro.navigateTo({ url: `/pages/package-C/order/ship-record/index?tid=${id}&type=1&orderType=${orderType}` });
      } else {
        Taro.navigateTo({ url: `/pages/package-C/order/ship-record/index?tid=${id}&type=0&orderType=${orderType}` });
      }
    }
  };

  /**
   * 发货记录icon是否显示
   * @param state
   * @returns {boolean}
   * @private
   */
  _isIconVisible = (state: string) => {
    return state !== '未发货';
  };

  /**
   * 发票信息是否显示
   */
  _isInvoiceVisible = (invoice: string) => {
    return invoice !== '不需要发票';
  };
  renderRestrictedInfo = (item: any) => {
    if (!item.restrictedFlag) return null;
    return (
      <View className='tips'>
        <IconFont value="zhuyi" size={15} color="#FF0022" />
        <Text className='text'>当前地区不支持销售，可更换收货地址购买</Text>
      </View>
    )
  }
  renderGreeting = (item) => {
    if (item.isGreeting !== 1 || !item.greetingContent) return null
    return (
      <FormItem
        styles={{ padding: '10px 5px' }}
        labelName="祝福语"
        textStyle={{ textAlign: 'right', fontWeight: 500, color: 'rgba(0,0,0,0.8)' }}
        placeholder={item.greetingContent}
      />
    )
  }
}
