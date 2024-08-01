import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { AtSwipeAction, AtList } from 'taro-ui';
import { Checkbox } from '@wanmi/ui-taro';
import { isEqual } from 'lodash';
import * as T from '@/pages/shop-cart/types';
import { cache, Const } from 'config';
import { toFixed2 } from '@/utils/priceFormat';
import PictureCom from '@/pages/common/goods/picture-com';
import '../../css/sku-item.less';
import { _, WMkit } from 'wmkit';
import moment from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween');
moment.extend(isBetween);
import { getData } from '../../../../pages/shop-cart/actions/action';
import Price from '@/pages/common/goods/price';
import down from '@/assets/image/shop-cart/down2x.png';
import arrow from '@/assets/image/customer/user-center/arrow.png';
import CartCount from '@/pages/common/goods/cart-count';
import defaultImg from '@/assets/image/common/default-img.png';
import IconFont from '@/wmkit/common/iconfont';
import Restriction from '../restriction';
type ISkuItemProps = T.IProps & T.ISkuItemProps;
export default class SkuItem extends Component<Partial<ISkuItemProps>, T.ISkuItemState> {
  constructor(props: ISkuItemProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const {
      sku,
      main: {
        goods: { checkSku },
        useStatus: { isEdit },
        isSecondShopCart,
      },
    } = this.props;
    //@ts-ignore
    const bool = __TARO_ENV === 'h5';
    if (bool) {
      return true;
    } else {
      // sku选中或反选时，只更新当前的sku
      return !(
        isEqual(isEdit, nextProps.main.useStatus.isEdit) &&
        isEqual(sku, nextProps.sku) &&
        isEqual(isSecondShopCart, nextProps.isSecondShopCart)
      );
    }
  }

  render() {
    if (!this.props.main) {
      return false;
    }

    if (!this.props.sku) {
      return false;
    }

    let {
      type,
      sku,
      sku: { goodsInfoId, goodsStatus, packageGoodsRelsInfo },
      actions,
      actions: { action },
      main,
      main: {
        goods: { checkSku, skuMarketingDict },
        purInfo: { goodsIntervalPrices, selfBuying, bookingSaleVOList },
        useStatus: { isEdit },
        isFromC,
        isSecondShopCart,
        iepSwitch,
        activedItem,
      },
      singleSpecFlag,
    } = this.props;
    const stock = sku.stock
    const isAppointmentArry = main.purInfo.appointmentSaleVOList
      ? main.purInfo.appointmentSaleVOList.filter((index) => goodsInfoId == index.appointmentSaleGood.goodsInfoId)
      : [];

    const bookingArry = bookingSaleVOList
      ? bookingSaleVOList.filter(
        (index) => goodsInfoId == index.bookingSaleGoods.goodsInfoId && this.isPresaleStatus(index),
      )
      : [];

    const isShortage = type === 2 ? 'no' : '';
    const noStock = goodsStatus === 1 || stock <= 0;
    const { selectedMarketing, hasMarketing, hasManyMarketing } = actions._marketingInit(skuMarketingDict[goodsInfoId]);
    const social = selfBuying && sku.distributionGoodsAudit == 2;
    //判断是否可以结算 非预约、非预售
    const isClick =
      // 非预售
      (bookingArry.length != 0 &&
        goodsInfoId == bookingArry[0].bookingSaleGoods.goodsInfoId &&
        this.isPresaleStatus(bookingArry[0])) ||
      // 非预约
      (isAppointmentArry.length != 0 &&
        goodsInfoId == isAppointmentArry[0].appointmentSaleGood.goodsInfoId &&
        this.isBuyStatus(isAppointmentArry[0]) != '抢购中');
    const isShop = WMkit.isShop();
    const login = Taro.getStorageSync(cache.LOGIN_DATA);
    //企业标识
    let iepShowFlag = iepSwitch && !social && !noStock && sku.enterPriseAuditState == 2;
    //商品价格
    let buyPoint = sku.buyPoint;
    let thirdPlatformType = sku.thirdPlatformType;
    let isbuyPoint = buyPoint != null && buyPoint > 0;
    let price =
      iepShowFlag && login?.enterpriseCheckState === 2 && !isbuyPoint
        ? sku.enterPrisePrice
        : actions._calculateGoodsPrice(sku, goodsIntervalPrices).toFixed(2);
    // 特殊处理
    console.log('asdf: ', isClick, type, !isEdit);
    if ((isClick || type == 1 || type == 4) && !isEdit) {
      if (checkSku.includes(goodsInfoId)) {
        action._checkSku(goodsInfoId, false);
      }
    }
    return (
      <View>
        <AtSwipeAction
          // onOpened={() => this.handleOpen(goodsInfoId)}
          autoClose
          onClick={(e) => this.onTap(e, goodsInfoId)}
          key={goodsInfoId}
          options={isShop ? shopOptions : options}
        // isOpened={activedItem === goodsInfoId}
        >
          <View className="skuItem-cart cart-skuItem">
            <View className="goods-item">
              {
                //失效商品
                type !== 2 && (
                  <View className="check-view">
                    <Checkbox
                      disabled={(isClick || [1,4,99].includes(type) || stock <= 0) && !isEdit}
                      checked={checkSku.includes(goodsInfoId)}
                      onClick={(checked) => {
                        if (isEdit || (!isClick && !isEdit && !noStock)) {
                          // 选中状态
                          action._checkSku(goodsInfoId, checked);
                          // let result = checkSku.includes(goodsInfoId);
                          // action.loadingWML(!result);
                        }
                      }}
                    />
                  </View>
                )
              }
              <View style={{ flex: 1 }}>
                <View className="cart-to-good">
                  {/*商品图片*/}
                  <PictureCom
                    type={type}
                    stock={stock}
                    url={sku.goodsInfoImg}
                    appointmentSaleVOList={main.purInfo.appointmentSaleVOList || []}
                    bookingSaleVOList={bookingSaleVOList || []}
                    goodsInfoId={goodsInfoId}
                    onClick={() => {
                      if (type !== 2) {
                        // 小c通过小B的店铺内分享链接进来加购的商品
                        if (WMkit.inviteeId() && WMkit.channelType() == '2' && sku.distributionGoodsAudit == '2') {
                          Taro.navigateTo({
                            url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${
                              sku.goodsId
                              }&skuId=${goodsInfoId}`,
                          });
                        } else {
                          Taro.navigateTo({ url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfoId}` });
                        }
                      }
                    }}
                  />

                  <View
                    className={['sku-item-goods-info', goodsStatus === 2 ? 'goods-info-invalid' : ''].join(' ')}
                    onClick={() => {
                      if (type !== 2) {
                        // 小c通过小B的店铺内分享链接进来加购的商品
                        if (WMkit.inviteeId() && WMkit.channelType() == '2' && sku.distributionGoodsAudit == '2') {
                          Taro.navigateTo({
                            url: `/pages/package-B/distribution/shop/socia-details/index?id=${WMkit.inviteeId()}&goodsId=${
                              sku.goodsId
                              }&skuId=${goodsInfoId}`,
                          });
                        } else {
                          Taro.navigateTo({ url: `/pages/package-B/goods/goods-details/index?skuId=${goodsInfoId}` });
                        }
                      }
                    }}
                  >
                    <View>
                      <View>
                        <View className="goods-text">
                          {thirdPlatformType != null && (
                            <View className="marketing">
                              <Text className="market-text">{Const.thirdPlatformTypeList[thirdPlatformType]}</Text>
                            </View>
                          )}
                          {sku.goodsInfoName}
                        </View>
                      </View>
                      <View className="goods-spec">
                        {sku.specText ? (
                          singleSpecFlag ? (
                            <View className="spec-text-box">
                              <Text className="spec-text">{sku.specText}</Text>
                            </View>
                          ) : (
                              <View
                                className="spec-text-box"
                                style={{ display: 'flex', flexDirection: 'row', height: '16px', alignItems: 'center' }}
                                onClick={async (e) => {
                                  if (!isFromC) {
                                    e.stopPropagation();
                                    this.props.onSkuChange(sku, goodsInfoId);
                                    action.commonChange('main.isSecondShopCart', true);
                                  }
                                  Taro.hideTabBar();
                                }}
                              >
                                <Text className="spec-text">{sku.specText}</Text>
                                {!isFromC && <Image src={down} style={{ width: '13px', height: '15px' }} />}
                              </View>
                            )
                        ) : (
                            <View></View>
                          )}
                        {hasManyMarketing && !isEdit && (
                          <View
                            className="spec-text-box"
                            style={{ display: 'flex', flexDirection: 'row', height: '16px', alignItems: 'center' }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await action.loadingWML(true);
                              Taro.hideTabBar();
                              setTimeout(async () => {
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
                    <View className="goods-price">
                      <View className="price-goods">
                        {/* 预约 */}
                        {isAppointmentArry.length > 0 && (
                          <Price buyPoint={sku.buyPoint} price={isAppointmentArry[0].appointmentSaleGood.price} />
                        )}
                        {/* 预售 */}
                        {bookingArry.length > 0 && (
                          <Price
                            buyPoint={bookingArry[0].bookingSaleGoods.buyPoint}
                            price={
                              (sku && bookingArry[0].bookingSaleGoods.bookingPrice) ||
                                bookingArry[0].bookingSaleGoods.bookingPrice == 0
                                ? toFixed2(bookingArry[0].bookingSaleGoods.bookingPrice)
                                : toFixed2(sku.marketPrice)
                            }
                          />
                        )}

                        {isAppointmentArry.length == 0 && bookingArry.length == 0 && (
                          <Price buyPoint={sku.buyPoint} price={price} />
                        )}
                      </View>

                      {goodsStatus !== 2 && !isEdit && (
                        <View className="cart-count-con">
                          <CartCount
                            min={noStock ? 0 : 1}
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
                      )}
                    </View>
                  </View>
                </View>
                {/* 限售展示信息 */}
                {
                  sku.restrictedFlag && <Restriction />
                }
                {social && sku.distributionCommission > 0 && (
                  <Text className="distribution-price-item">
                    <Text className="price-line" decode>
                      返利￥
                  </Text>
                    {_.addZero(sku.distributionCommission).length > 6 ? (
                      <Text className={[isShortage, 'price-num', 'distribution-price'].join('-')}>
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
            </View>
            {/*促销*/}
            {/* <View className="marketing-box">
            <View className="marketing-con">
              {goodsStatus === 0 && Boolean(hasMarketing) && !isEdit && (
                <View className="sku-marketing">
                  <View className="marketing-item">
                    {isSecondShopCart ? (
                      <View className="marketing-label marketing-label-second">
                        <Text className="marketing-label">促销</Text>
                      </View>
                    ) : (
                      <Text className="marketing-label">促销</Text>
                    )}
                    {isSecondShopCart ? (
                      <View className="marketing-text marketing-text-second">
                        <Text className="marketing-text">
                          {selectedMarketing && this.getMarketingName(selectedMarketing)}
                        </Text>
                      </View>
                    ) : (
                      <Text className="marketing-text">
                        {selectedMarketing && this.getMarketingName(selectedMarketing)}
                      </Text>
                    )}

                    {hasManyMarketing && (
                      <View
                        className="marketing-set"
                        onClick={async () => {
                          await action.commonChange([
                            {paths: 'main.useStatus.isMaskOpen', value: true},
                            {paths: 'main.useStatus.maskType', value: 0},
                            {paths: 'main.goods.chooseMarketingSkuId', value: goodsInfoId},
                          ]);
                        }}
                      >
                        <View className="marketing-set-text">修改</View>
                        <Image src={arrowDown} className="marketing-icon" />
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View> */}
          </View>
        </AtSwipeAction>
        {packageGoodsRelsInfo && packageGoodsRelsInfo.length > 0 && (
          <View className="package-goods2">
            <View className="package-top">
              <View className="package-title">套餐内包含以下商品</View>
              <View
                className="package-detail"
                onClick={async () => {
                  await action.loadingWML(true);
                  setTimeout(async () => {
                    await action._packageInit(packageGoodsRelsInfo);
                  }, 300);
                  Taro.hideTabBar();
                }}
              >
                <Text className="detail-text">详情</Text>
                <Image src={arrow} className="marketing-icons" style={{ width: '13px', height: '15px' }} />
              </View>
            </View>
            <View className="goods">
              {packageGoodsRelsInfo.map((item) => {
                return (
                  <View
                    key={item.goodsInfoId}
                    className="goods-item"
                    onClick={() =>
                      Taro.navigateTo({
                        url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodsInfoId}`,
                      })
                    }
                  >
                    <Image className="goods-image" src={item.goodsInfoImg || defaultImg} />
                    <Text className="goods-num">x{item.packageNum}</Text>
                    {item.goodsStatus === 1 && (
                      <View className="goods-no-stock">
                        <View className="no-stock-text">缺货</View>
                      </View>
                    )}
                    {item.goodsStatus === 2 && (
                      <View className="goods-no-stock">
                        <View className="no-stock-text">失效</View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
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

  handleOpen = (goodsInfoId) => {
    const {
      actions: {
        action: { commonChange },
      },
    } = this.props;
    commonChange('main.activedItem', goodsInfoId);
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
