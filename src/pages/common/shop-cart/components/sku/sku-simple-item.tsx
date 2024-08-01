import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Checkbox } from '@wanmi/ui-taro';
import React, { Component } from 'react';
import { AtSwipeAction } from 'taro-ui';
import { isEqual, debounce } from 'lodash';
import * as T from '@/pages/shop-cart/types';
import actions from '@/pages/shop-cart/actions';
import { connect } from 'react-redux';
import { store2Props } from '@/pages/shop-cart/selectors';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import disabledcheck from '@/assets/image/shop-cart/disabled-check.png';
import CartCount from '@/pages/common/goods/cart-count';
import PictureCom from '@/pages/common/goods/picture-com';
import '../../css/spu-item.less';
import '../../css/sku-simple-item.less';
import { _, WMkit } from 'wmkit';
import moment from 'dayjs';

import Price from '@/pages/common/goods/price';
import down from '@/assets/image/shop-cart/down2x.png';
import { Const } from 'config';
import Restriction from '../restriction';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
type ISkuSimpleItemProps = T.IProps & T.ISkuSimpleItemProps;
@connect<Partial<ISkuSimpleItemProps>, T.ISkuSimpleItemState>(store2Props, actions)
export default class SkuSimpleItem extends Component<Partial<ISkuSimpleItemProps>, T.ISkuItemState> {
  // 自定义checkbox样式
  static externalClasses = ['wanmi-checkbox'];
  constructor(props: ISkuSimpleItemProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    let {
      sku,
      type,
      main: {
        useStatus: { isEdit },
        goods: { checkSku },
      },
    } = this.props;

    //@ts-ignore
    const bool = __TARO_ENV === 'h5';
    if (bool) {
      return true;
    } else {
      // sku选中或反选时，只更新当前的sku
      return (
        !(
          isEqual(checkSku, nextProps.main.goods.checkSku) &&
          isEqual(isEdit, nextProps.main.useStatus.isEdit) &&
          isEqual(sku, nextProps.sku)
        ) &&
        ((checkSku.includes(sku.goodsInfoId) && !nextProps.main.goods.checkSku.includes(sku.goodsInfoId)) ||
          (!checkSku.includes(sku.goodsInfoId) && nextProps.main.goods.checkSku.includes(sku.goodsInfoId)))
      );
    }
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      sku,
      key,
      type,
      hasManyMarketing,
      sku: { goodsInfoId, goodsStatus, buyPoint },
      actions,
      actions: { action },
      main,
      main: {
        goods: { checkSku, skuMarketingDict },
        purInfo: { goodsIntervalPrices, selfBuying, bookingSaleVOList },
        useStatus: { isEdit },
        isFromC,
        iepSwitch,
        activedItem,
      },
      singleSpecFlag,
    } = this.props;
    const noStock = goodsStatus === 1;
    const isShortage = type === 2 ? 'no' : '';
    // const {selectedMarketing, hasMarketing} = actions._marketingInit(skuMarketingDict[goodsInfoId]);
    const social = selfBuying && sku.distributionGoodsAudit == 2;
    // 企业价
    const iepShowFlag = iepSwitch && !noStock && !social && sku.enterPriseAuditStatus == 2;
    const iepGoodsPrice = sku.enterPrisePrice;
    let isAppointmentArry = main.purInfo.appointmentSaleVOList
      ? main.purInfo.appointmentSaleVOList.filter((index) => sku.goodsInfoId == index.appointmentSaleGood.goodsInfoId)
      : [];
    const bookingArry =
      bookingSaleVOList?.length > 0
        ? bookingSaleVOList.filter((index) => sku.goodsInfoId == index.bookingSaleGoods.goodsInfoId)
        : [];

    let price =
      social || buyPoint
        ? sku.salePrice
        : iepShowFlag
          ? iepGoodsPrice
          : sku.priceType == 1
            ? sku.intervalMinPrice
            : sku.salePrice;

    if (!sku.buyPoint) {
      // 预约价
      main.purInfo.appointmentSaleVOList?.length > 0 &&
        main.purInfo.appointmentSaleVOList.map((item) => {
          if (goodsInfoId == item.appointmentSaleGood.goodsInfoId && !isEdit) {
            price = item.appointmentSaleGood.price ? item.appointmentSaleGood.price : sku.salePrice;
          }
        });

      // 预售价格
      bookingArry.length > 0 &&
        bookingSaleVOList.length > 0 &&
        bookingSaleVOList.map((item) => {
          if (goodsInfoId == item.bookingSaleGoods.goodsInfoId && !isEdit) {
            // 预售中
            if (this.isPresaleStatus(item)) {
              price =
                item.bookingSaleGoods.bookingPrice || item.bookingSaleGoods.bookingPrice == 0
                  ? item.bookingSaleGoods.bookingPrice
                  : sku.salePrice
                    ? sku.salePrice
                    : 0;
            }
          }
        });
    }

    //判断是否可以结算 非预约、非预售
    const isClick =
      // 非预售
      (bookingArry.length != 0 &&
        goodsInfoId == bookingArry[0].bookingSaleGoods.goodsInfoId &&
        this.isPresaleStatus(bookingArry[0])) ||
      // 非预约时间段（预约抢购端可以购买）
      (isAppointmentArry.length != 0 &&
        goodsInfoId == isAppointmentArry[0].appointmentSaleGood.goodsInfoId &&
        this.isBuyStatus(isAppointmentArry[0]) != '抢购中');

    if (!isAppointmentArry) isAppointmentArry = [];
    return (
      <AtSwipeAction
        autoClose
        // onOpened={() => {
        //   action.commonChange('main.activedItem', goodsInfoId);
        // }}
        onClick={(e) => this.onTap(e, goodsInfoId)}
        key={goodsInfoId}
        options={WMkit.isShop() ? shopOptions : options}
      // isOpened={activedItem === goodsInfoId}
      >
        <View className="skuItem sku-simple-item cart-skuItem">
          <View className="goods-item">
            {
              //失效商品
              type !== 2 && (
                <View className="check-view">
                  <Checkbox
                    className="wanmi-checkbox"
                    disabled={(isClick || [1,4,99].includes(type)) && !isEdit}
                    checked={checkSku.includes(goodsInfoId)}
                    onClick={(checked) => {
                      action._checkSku(goodsInfoId, checked);
                      // action.reCalcMarketingAndPrice()
                      // const result = checkSku.includes(goodsInfoId);
                      // action.loadingWML(result);
                    }}
                  />
                  {/* <CheckboxGroup
                  onChange={(event) => {
                    if (isEdit || (!isClick && !isEdit && !noStock)) {
                     // 选中状态
                      let checked = event.detail.value.length > 0;
                      action._checkSku(goodsInfoId, checked);
                      // action.reCalcMarketingAndPrice()
                      const result = checkSku.includes(goodsInfoId);
                      action.loadingWML(result);
                    }
                  }}
                >
                  <Checkbox
                    className={'wanmi-checkbox'}
                    disabled={(isClick || type == 1 || type == 4) && !isEdit}
                    checked={checkSku.includes(goodsInfoId)}
                  />
                </CheckboxGroup> */}
                </View>
              )
            }

            <View style={{ flex: 1 }}>
              <View className="cart-to-good">
                {/*商品图片*/}
                <PictureCom
                  type={type}
                  url={sku.goodsInfoImg}
                  appointmentSaleVOList={main.purInfo.appointmentSaleVOList || []}
                  bookingSaleVOList={bookingSaleVOList || []}
                  goodsInfoId={sku.goodsInfoId}
                  stock={sku.stock}
                  onClick={() => {
                    // 小c通过小B的店铺内分享链接进来加购的商品
                    if (WMkit.inviteeId() && WMkit.channelType() == '2' && sku.distributionGoodsAudit == '2') {
                      Taro.navigateTo({
                        url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${
                          sku.goodsId
                          }&skuId=${goodsInfoId}`,
                      });
                    } else {
                      Taro.navigateTo({ url: `/pages/package-B/goods/goods-details/index?skuId=${sku.goodsInfoId}` });
                    }
                  }}
                />

                <View className={['sku-item-goods-info', goodsStatus === 2 ? 'goods-info-invalid' : ''].join(' ')}>
                  <View>
                    <View>
                      <Text
                        className="goods-text"
                        onClick={() => {
                          // 小c通过小B的店铺内分享链接进来加购的商品
                          if (WMkit.inviteeId() && WMkit.channelType() == '2' && sku.distributionGoodsAudit == '2') {
                            Taro.navigateTo({
                              url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${
                                sku.goodsId
                                }&skuId=${goodsInfoId}`,
                            });
                          } else {
                            Taro.navigateTo({
                              url: `/pages/package-B/goods/goods-details/index?skuId=${sku.goodsInfoId}`,
                            });
                          }
                        }}
                      >
                        {sku.thirdPlatformType != null && (
                          <View className="marketing">
                            <Text className="market-text">{Const.thirdPlatformTypeList[sku.thirdPlatformType]}</Text>
                          </View>
                        )}{sku.goodsInfoName}
                      </Text>
                    </View>
                    <View className="goods-spec">
                      {sku.specText ? (
                        <View>
                          {/* 单规格不可点击 */}
                          {singleSpecFlag ? (
                            <View className="spec-text-box">
                              <Text className="spec-text">{sku.specText}</Text>
                            </View>
                          ) : (
                              <View
                                className="spec-text-box"
                                style={{ display: 'flex', flexDirection: 'row', height: '16px', alignItems: 'center' }}
                                onClick={() => {
                                  if (!isFromC) {
                                    Taro.hideTabBar();
                                    this.props.onSkuChange(sku, goodsInfoId);
                                  }
                                }}
                              >
                                <Text className="spec-text">{sku.specText}</Text>
                                {!isFromC && <Image src={down} style={{ width: '13px', height: '15px' }} />}
                              </View>
                            )}
                        </View>
                      ) : (
                          <View />
                        )}
                      {hasManyMarketing && (
                        <View
                          className="spec-text-box"
                          style={{ display: 'flex', flexDirection: 'row', height: '16px', alignItems: 'center' }}
                          onClick={async (e) => {
                            e.stopPropagation();
                            await action.loadingWML(true);
                            debounce(async () => {
                              await action.commonChange([
                                { paths: 'main.useStatus.isMaskOpen', value: true },
                                { paths: 'main.useStatus.maskType', value: 0 },
                                { paths: 'main.goods.chooseMarketingSkuId', value: goodsInfoId },
                              ]);
                            }, 300);
                          }}
                        >
                          <Text className="spec-text">换促销</Text>
                          <Image src={down} className="marketing-icons" style={{ width: '13px', height: '15px' }} />
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="goods-prices">
                    <View className="price-goods">
                      {/* 预约 */}
                      {isAppointmentArry.length > 0 && (
                        <Price
                          buyPoint={isAppointmentArry[0].appointmentSaleGood.buyPoint}
                          price={isAppointmentArry[0].appointmentSaleGood.price}
                        />
                      )}

                      {/* 预售 */}
                      {bookingArry.length > 0 && (
                        <Price buyPoint={bookingArry[0].bookingSaleGoods.buyPoint} price={_.addZero(price)} />
                      )}

                      {isAppointmentArry.length == 0 && bookingArry.length == 0 && (
                        <Price
                          buyPoint={sku.buyPoint}
                          price={sku && actions._calculateGoodsPrice(sku, goodsIntervalPrices).toFixed(2)}
                        />
                      )}

                      {social && sku.distributionCommission > 0 && (
                        <Text>
                          <Text className="price-line" decode>
                            返利￥
                          </Text>
                          {sku.distributionCommission.length > 6 ? (
                            <Text className={[isShortage, 'price-num-small', 'distribution-price'].join('-')}>
                              {_.addZero(sku.distributionCommission)}
                            </Text>
                          ) : (
                              <Text className={[isShortage, 'price-num', 'distribution-price'].join('-')}>
                                {_.addZero(sku.distributionCommission)}
                              </Text>
                            )}
                        </Text>
                      )}
                    </View>

                    {
                      //失效商品  编辑模式下不展示
                      goodsStatus !== 2 && !isEdit && (
                        <View className="cart-count-con">
                          <CartCount
                            min={1}
                            count={noStock ? 0 : sku.buyCount}
                            inventory={noStock ? 0 : sku.stock}
                            getNum={async (index) => {
                              if (index) {
                                await action._changeSkuNum(goodsInfoId, Number(index));
                              }
                            }}
                            shopCarSmallLoading={async (type) => {
                              await action.loadingWML(type);
                            }}
                          />
                          <Text className="valid-text">{actions._validSku(sku, checkSku)}</Text>
                        </View>
                      )
                    }
                  </View>
                </View>
              </View>
              {
                sku.restrictedFlag && <Restriction />
              }
            </View>
          </View>
        </View>
        <View className={isFromC ? '' : 'store-item'}></View>
      </AtSwipeAction>
    );
  }

  onTap = (e, goodsInfoId) => {
    const {
      actions: {
        action: { _deleteSku, _addFollow },
      },
    } = this.props;
    if (e.text === '删除') {
      _deleteSku(goodsInfoId);
    } else if (e.text === '移入收藏') {
      _addFollow([goodsInfoId]);
    }
  };

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
    return result;
  };
  //判断当前的预售状态
  isPresaleStatus = (item) => {
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

  getMarketingName(selectedMarketing) {
    let marketingName;
    if (selectedMarketing && selectedMarketing.marketingType == 4) {
      // 判断存不存在第二件打折商品为0折
      let isExitDiscountZero = selectedMarketing.halfPriceSecondPieceLevel.some((item) => item.discount == 0);
      if (isExitDiscountZero) {
        marketingName = `买${selectedMarketing.halfPriceSecondPieceLevel[0].number - 1}送1`;
      } else {
        marketingName = selectedMarketing.alllevelDesc;
      }
    } else {
      marketingName = selectedMarketing.alllevelDesc;
    }
    return marketingName;
  }

  onTap = (e, goodsInfoId) => {
    const {
      actions: {
        action: { _deleteSku, _addFollow },
      },
    } = this.props;
    if (e.text === '删除') {
      _deleteSku(goodsInfoId);
    } else if (e.text === '移入收藏') {
      _addFollow([goodsInfoId]);
    }
  };
}

const options = [
  {
    text: '移入收藏',
    style: {
      background: 'linear-gradient(360deg,rgba(255,209,25,1) 0%,rgba(255,162,0,1) 100%)',
      color: '#fff',
      padding: 0,
    },
  },
  {
    text: '删除',
    style: {
      background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
      color: '#fff',
      padding: 0,
    },
  },
];

const shopOptions = [
  {
    text: '删除',
    style: {
      background: 'linear-gradient(270deg,rgba(255,136,0,1) 0%,rgba(255,77,0,1) 100%)',
      color: '#fff',
      padding: 0,
    },
  },
];
