import { Image, Input, Text, View, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component, Fragment } from 'react';

import * as T from '../types';
import '../css/store.less';
import '../css/index.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import PictureCom from './picture-com';
import Enclosure from './enclosure';

import Price from '@/pages/common/goods/price';
import plus from '../img/plus.png';
import { WMkit, immutable, getPrivacySetting, msg } from 'wmkit';

import noneImg from '@/assets/image/goods/goods-list/no-data-s.png';

import arrow from '@/assets/image/common/arrow.png';
import arrowDown from '@/assets/image/order/arrow-down.png';
import arrowUp from '@/assets/image/order/arrow-up.png';
import { cache, Const } from 'config';
import dayjs from 'dayjs';
import IconFont from '@/wmkit/common/iconfont';
import { includes } from 'lodash';

type IStoreItemProps = T.IProps & T.IStoreItemProps;

const TYPES = {
  '0': '满减优惠',
  '1': '满折优惠',
  '2': '满赠优惠',
};

const INVOICE_TYPE = {
  '0': '不支持开票',
  '1': '不需要发票',
  '2': '普通发票',
  '3': '增值税发票',
};

const MARKETING_TYPE = {
  0: '满减',
  1: '满折',
  2: '满赠',
  3: '一口价优惠',
  4: '第二件半价',
  5: '秒杀',
  6: '组合套餐',
};
const DELIVERY_TYPE = {
  2: '快递配送',
  3: '送货上门',
  4: '到店自提',
};
@connect<Partial<IStoreItemProps>, T.IStoreItemState>(store2Props, actions)
export default class Store extends Component<Partial<IStoreItemProps>, T.IStoreItemState> {
  constructor(props: IStoreItemProps) {
    super(props);
  }

  getDeliverDay = (num: number) => {
    const start = num;
    const now = new Date();
    now.setDate(now.getDate() + start);
    return dayjs(now).format('YYYY-MM-DD');
  };

  getDeliverTime = (times: { startTime: number; endTime: number }[]) => {
    if (!times) return [];
    return times.map((e) => {
      const start = `${e.startTime < 10 ? `0${e.startTime}` : e.startTime}`;
      const end = `${e.endTime < 10 ? `0${e.endTime}` : e.endTime}`;
      return `${start}:00 - ${end}:00`;
    });
  };

  getTime = (item: any) => {
    if (item.deliveryStartTime || item.deliveryEndTime) {
      const start = `${item.deliveryStartTime < 10 ? `0${item.deliveryStartTime}` : item.deliveryStartTime}`;
      const end = `${item.deliveryEndTime < 10 ? `0${item.deliveryEndTime}` : item.deliveryEndTime}`;
      return `${start}:00 - ${end}:00`;
    }
    return '选择时间';
  };

  renderCakeInfo = (item: any, last?: boolean) => {
    const isCake = item.goodsType === 3;
    if (!isCake) return null;
    let {
      actions: { action },
    } = this.props;
    const startDay = this.getDeliverDay(item.deliveryDay);
    const times = this.getDeliverTime(item.goodsDeliveryTimeList);
    const dTime = this.getTime(item);
    const timeIndex = Math.max(0, times.indexOf(dTime));
    if (!item.deliveryDate) {
      action.updateTradeItem(startDay, item.skuId, true, item.isGift);
    }
    const end = dayjs(startDay).add(1, 'years').add(-1, 'dates').format('YYYY-MM-DD');
    return (
      <View className='cake_info' >
        <Picker
          mode="date"
          start={startDay}
          end={end}
          value={item.deliveryDate || startDay}
          onChange={(e) => {
            action.updateTradeItem(e.detail.value, item.skuId, true, item.isGift);
          }}
        >
          <View className="order-confirm-store-item">
            <Text className="order-item-label">配送日期</Text>
            <View className="store-item-right">
              <Text className="item-text2">{item.deliveryDate || '选择日期'}</Text>
              <Image className="arrow-img" src={arrow} />
            </View>
          </View>
        </Picker>
        <Picker
          mode="selector"
          range={times}
          value={timeIndex}
          onChange={(e) => {
            action.updateTradeItem(times[e.detail.value], item.skuId, false, item.isGift);
          }}
        >
          <View
            className={`order-confirm-store-item ${last ? 'last' : ''}`}
            onClick={async () => { }}
          >
            <Text className="order-item-label">时间段选择</Text>
            <View className="store-item-right">
              <Text className="item-text2">{dTime}</Text>
              <Image className="arrow-img" src={arrow} />
            </View>
          </View>
        </Picker>
      </View>
    );
  };
  renderRestrictedInfo = (item: any, myStore: any) => {
    const { isDistribution } = myStore
    if (!item.restrictedFlag && [null, 1].includes(isDistribution)) return null;
    return (
      <View className="tips">
        <IconFont value="zhuyi" size={15} color="#FF0022" />
        <Text className="text">当前地区不支持销售，可更换收货地址购买</Text>
      </View>
    );
  };
  renderDangaoGreeting = (item, supplier) => {
    let {
      actions: { action },
      main: { orderList: { dangaoGreeting, dangaoDeliverWay } }
    } = this.props;
    const isGreeting = item.isGreeting
    const type = dangaoDeliverWay[supplier._storeId]
    if (!isGreeting) return null
    return (
      <View className="order-confirm-store-item greeting">
        <Text className="order-item-label">祝福语</Text>
        <View className="order-item-input">
          <Input
            maxlength={100}
            // value={dangaoGreeting[supplier._greetingId]}
            placeholder="在这里添加你的祝福语，100字以内"
            placeholderStyle="color:#00000066"
            className="invoice-input"
            onInput={(e) => {
              action._orderDangaoGreetingChange(`${supplier.storeId}_${item.skuId}`, e.detail.value);
            }}
          />
        </View>
      </View>
    )
  }
  getDangaoShuShuAvailableDeliveryType = (item: any) => {
    // canTake 门店自提
    // canShip 商家配送
    // canSame 快递配送
    const { canTake, canShip, canSame } = item
    const arr = []
    if (canTake) arr.push(DELIVERY_TYPE[4])
    if (canShip) arr.push(DELIVERY_TYPE[3])
    if (canSame) arr.push(DELIVERY_TYPE[2])
    return arr;
  };
  /**蛋糕叔叔商品表单 */
  renderDangaoForm = (myStore, cityId: string) => {
    const { supplier, tradeValidateDeliveryDatesVOList = [], tradeValidateTakeDatesVOList = [], deliveryText, distributionRuleId, validateSameRow = [] } = myStore
    let {
      actions: { action },
      main: { orderList: { address, dangaoDate, dangaoPhone, dangaoTime, dangaoGreeting, dangaoShop, dangaoDeliverWay } }
    } = this.props;
    const { isDistribution } = myStore
    /**
     * type: 4 自取 3 配送 2 快递
     */
    const type = dangaoDeliverWay[supplier._storeId]
    // 自提可选日期
    const takeList = tradeValidateTakeDatesVOList?.length > 0 ? tradeValidateTakeDatesVOList : [{ date: dayjs().format('YYYY-MM-DD'), validate_take_times: ['09:00-18:00'] }, { date: dayjs().format('YYYY-MM-DD'), validate_take_times: ['09:00-18:00'] }]
    // 配送可选日期
    const shipList = tradeValidateDeliveryDatesVOList?.length > 0 ? tradeValidateDeliveryDatesVOList : [{ date: dayjs().format('YYYY-MM-DD'), validate_delivery_times: ['09:00-18:00'] }, { date: dayjs().format('YYYY-MM-DD'), validate_delivery_times: ['09:00-18:00'] }]
    const text = type === 4 ? '自取' : '配送'
    //配送id
    const brandId = myStore.tradeItems[0].brand
    // 快递配送描述
    const deliveryDesc = deliveryText || '下单后24小时发货，请耐心等候～'
    // 可选配送方式
    const deliveryTypeRange = this.getDangaoShuShuAvailableDeliveryType(myStore);
    // 配送日期
    const startDay = type === 4 ? takeList[0].date : shipList[0].date
    const end = type === 4 ? takeList[takeList.length - 1].date : shipList[shipList.length - 1].date;
    // 配送时间段
    const _date = dangaoDate[supplier._storeId]
    const rangeTime = type === 4 ? takeList.find(v => v.date === _date)?.validate_take_times : shipList.find(v => v.date === _date)?.validate_delivery_times
    // 快递费用
    const kuaidifee = Number(validateSameRow?.length > 0 ? validateSameRow[0] : 0)
    const fee = type === 2 ? kuaidifee : shipList.find(v => v.date === _date)?.delivery_amount || 0
    return (
      <View className='dangaoshushu'>
        <View className='tips'>
          <IconFont value="zhuyi" size={15} color="#FF6600" />
          <Text className="text">蛋糕商品将根据您的收货地址实时计算运费</Text>
        </View>
        <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
          <Text className="order-item-label">订货人手机号</Text>
          <View className="order-item-input phone">
            <Input
              maxlength={11}
              value={dangaoPhone[supplier._storeId]}
              placeholder="请输入订货人手机号"
              placeholderStyle="color:#00000066"
              className="invoice-input"
              onInput={(e) => {
                action._orderDangaoChange(supplier._storeId, 'Phone', e.detail.value);
              }}
            />
          </View>
        </View>
        <Picker
          range={deliveryTypeRange}
          mode="selector"
          value={dangaoDeliverWay[supplier._storeId]}
          disabled={deliveryTypeRange.length === 0 || isDistribution === 0}
          onChange={(e) => {
            const val = e.detail.value as number
            const valName = deliveryTypeRange[val]
            const key = Object.keys(DELIVERY_TYPE).find(key => DELIVERY_TYPE[key] === valName);
            action._orderDangaoChange(supplier._storeId, 'DeliverWay', Number(key));
            //切换配送方式清  日期 时间
            action._orderDangaoChange(supplier._storeId, 'Date', undefined);
            action._orderDangaoChange(supplier._storeId, 'Time', undefined);
            action._orderDangaoChange(supplier._storeId, 'DistributionRuleId', distributionRuleId);
            //获取到当前配送方式的运费,商家自配的运费和配送日期相关
            if (key === '2') {
              const fee = validateSameRow.length > 0 ? validateSameRow[0] : 0
              action._orderDangaoChange(supplier._storeId, 'DeliveryText', deliveryText);
              action._orderDangaoChange(supplier._storeId, 'DeliveryAmount', kuaidifee);
              action._calcFreight(Number(fee));
            } else {
              action._orderDangaoChange(supplier._storeId, 'DeliveryAmount', 0);
              action._calcFreight(0);
            }
          }}
          onClick={() => {
            if (!address.deliveryAddressId) {
              Taro.showToast({ title: '请选择收货地址', icon: 'none' })
            }
          }}
        >
          <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
            <Text className="order-item-label">配送方式</Text>
            <View className="store-item-right">
              <Text className="item-text2"> {DELIVERY_TYPE[dangaoDeliverWay[supplier._storeId]] || '请选择配送方式'}</Text>
              <Image className="arrow-img" src={arrow} />
            </View>
          </View>
        </Picker>
        {
          [2, 3].includes(type) && (
            <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
              <Text className="order-item-label">配送费</Text>
              <View className="order-item-input price">
                ¥{fee.toFixed(2)}
              </View>
            </View>
          )
        }
        {
          type === 4 && (
            <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
              <Text className="order-item-label">自取门店</Text>
              <View className="store-item-right" onClick={async () => action._urlChange(6, JSON.stringify({ address, cityId, brandId, id: supplier._storeId }))}>
                <Text className="item-text2">{dangaoShop[supplier._storeId]?.shop_name || '请选择自取门店'}</Text>
                <Image className="arrow-img" src={arrow} />
              </View>
            </View>
          )
        }
        {
          [3, 4].includes(type) && (
            <Fragment>
              <Picker
                mode="date"
                start={startDay}
                end={end}
                value={dangaoDate[supplier._storeId] || startDay}
                onChange={(e) => {
                  //切换日期清时间
                  action._orderDangaoChange(supplier._storeId, 'Date', e.detail.value);
                  action._orderDangaoChange(supplier._storeId, 'Time', undefined);
                  if (type === 3) {
                    const fee = shipList.find(v => v.date === e.detail.value).delivery_amount || 0
                    action._orderDangaoChange(supplier._storeId, 'DeliveryAmount', fee);
                    action._calcFreight(fee);
                  } else {
                    action._calcFreight(0);
                  }
                }}
              >
                <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
                  <Text className="order-item-label">{text}日期</Text>
                  <View className="store-item-right">
                    <Text className="item-text2">{dangaoDate[supplier._storeId] || `请选择${text}日期`}</Text>
                    <Image className="arrow-img" src={arrow} />
                  </View>
                </View>
              </Picker>
              <Picker
                mode="selector"
                range={rangeTime || []}
                value={dangaoTime[supplier._storeId]}
                disabled={Boolean(!dangaoDate[supplier._storeId])}
                onChange={(e) => {
                  action._orderDangaoChange(supplier._storeId, 'Time', rangeTime[e.detail.value]);
                }}
              >
                <View
                  className="order-confirm-store-item"
                  style={{ marginBottom: '20px', marginTop: 0 }}
                  onClick={() => {
                    if (!dangaoDate[supplier._storeId]) {
                      Taro.showToast({
                        title: '请先选择日期',
                        icon: 'none',
                      })
                    }
                  }}
                >
                  <Text className="order-item-label">{text}时间</Text>
                  <View className="store-item-right">
                    <Text className="item-text2">{dangaoTime[supplier._storeId] || `请选择${text}时间`}</Text>
                    <Image className="arrow-img" src={arrow} />
                  </View>
                </View>
              </Picker>
            </Fragment>
          )
        }
        {
          type === 2 && (
            <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
              <Text className="order-item-label">配送时间</Text>
              <View className="order-item-input">
                {deliveryDesc}
              </View>
            </View>
          )
        }
      </View>
    )
  }
  // componentDidMount() {
  //   let { myStore = {} } = this.props;
  //   const { tradeItems } = myStore;
  //   this.setState(() => {
  //     let obj;
  //     tradeItems.forEach((item) => {
  //       obj[`${item.skuId}_status`] = true;
  //     });
  //     return obj;
  //   });
  // }

  render() {
    let {
      actions: { action },
      actions,
      myStore = {},
      main = {},
    } = this.props;
    const {
      orderList = {},
      stores = [],
      isBookingSaleGoods,
      shopName,
      inviteeName,
      purchaseBuy,
      giftCardType,
      giftCard2,
      kaGuanZhiChongNumber,
      cityId,
    } = main;
    const { invoiceData, buyRemark,kaGuanZhiChong, enclosures, dangaoDeliveryAmount } = orderList;
    const { supplier, tradeItems, gifts, tradeConfirmMarketingList } = myStore;
    gifts.forEach((gift) => {
      gift.isGift = true;
    });
    const allSkus = tradeItems.concat(gifts);

    const cartList = allSkus
      .filter((sku, index) => index < 4)
      .map((sku) => {
        return {
          url: sku.pic,
        };
      });
    const { discountsPrice, tradePrice } = myStore;

    const prices = (immutable.fromJS(discountsPrice) || immutable.fromJS([]))
      .groupBy((item) => item.get('type'))
      .toArray();
    // const invoiceType = invoiceData && invoiceData[supplier._storeId]['supportInvoice'];
    // const enclosureList = enclosures && enclosures[supplier._storeId];

    let initGiftMarketLevelId;
    tradeItems.forEach((item) => {
      gifts.forEach((item1) => {
        if (
          item.marketingLevelIds &&
          item1.marketingLevelIds &&
          item.marketingLevelIds[0] === item1.marketingLevelIds[0]
        ) {
          initGiftMarketLevelId = item.marketingLevelIds[0];
        }
      });
    });
    const hidePrice = giftCard2.cardRuleTypes?.includes(4);

    const goodsType = allSkus?.[0]?.goodsType
    const accountType = allSkus?.[0]?.accountType
    return (
      <View className="confirm-store">
        {WMkit.isMall() ? null : WMkit.isShop() ? (
          <View className="confirm-store-left">
            <View
              onClick={() => {
                const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                if (singerCardLogin) return;
                Taro.navigateTo({
                  url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
                });
              }}
            >
              <Text className="confirm-store-name">
                {inviteeName}的{shopName}
              </Text>
            </View>
          </View>
        ) : (
            <View className="confirm-store-left">
              <View style={{ flexDirection: 'row' }}>
                {supplier.isSelf && (
                  <View className="confirm-store-type">
                    <Text className="confirm-store-type-text">自营</Text>
                  </View>
                )}
                <Text className="confirm-store-name">{supplier.storeName}</Text>
              </View>
            </View>
          )}

        {tradeConfirmMarketingList?.length > 0 && (
          <View className="marketing-box">
            {this._distinct(tradeConfirmMarketingList).map((item, index) => {
              return (
                item && (
                  <View className="marketing" key={index}>
                    <View className="act-type">
                      <Text className="act-type-label">
                        {item.marketingType == 4 ? item.marketingDesc.substr(4) : MARKETING_TYPE[item.marketingType]}
                      </Text>
                    </View>
                    <Text className="act-content">{item.marketingDesc}</Text>

                    {item.marketingType == 2 && (
                      //领取赠品 满赠显示
                      <View
                        className="go-invalid"
                        onClick={async () => {
                          await action._getMarketingById(item, supplier?.storeId);
                          await action.commonChange([
                            { paths: 'main.initGiftMarketLevelId', value: initGiftMarketLevelId },
                          ]);
                          await action.commonChange([{ paths: 'main.gifts.isMaskOpen', value: true }]);
                        }}
                      >
                        <Text className="coupon-text">领取赠品</Text>
                      </View>
                    )}
                  </View>
                )
              );
            })}
          </View>
        )}

        {/* 只有一个店铺显示明细,只有一个店铺跳转到商品详情页，不跳转到清单页 */}
        {stores && stores.length > 0 ? (
          <View
            className="order-confirm-middle-detail"
            style={tradeConfirmMarketingList?.length > 0 ? { paddingTop: '20px' } : { paddingTop: '10px' }}
          >
            {allSkus
              ? allSkus.map((item, index) => {
                const gs = item.goodsStatus;
                const time = item.estimatedDeliveryTime;
                const last = index === allSkus.length - 1
                return (
                  <>
                    <View
                      key={index}
                      className="product-item"
                      onClick={async () => {
                        const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                        if (singerCardLogin) return;
                        await action._urlChange(5, item);
                      }}
                    >
                      <Image className="img-item" key={item.oid} src={item.pic ? item.pic : noneImg} />
                      <View className="good-info">
                        <View className="good-info-detail">
                          {item.isGift && (
                            <View className="gift-sku-icon">
                              <Text className="gift-sku-text">赠品</Text>
                            </View>
                          )}
                          <View className="name">
                            {[0, 1].includes(item.thirdPlatformType) && (
                              <View className="marketing_sign">
                                <Text className="market-text">
                                  {Const.thirdPlatformTypeList[item.thirdPlatformType]}
                                </Text>
                              </View>
                            )}
                            {item.skuName ? item.skuName : '-'}
                          </View>
                          <View className="specDetails">{item.specDetails ? item.specDetails : ''}</View>
                        </View>
                        <View className="right">
                          <View className="price">
                            {!hidePrice && (
                              <Price
                                price={item.isGift ? 0 : item.price}
                                buyPoint={item.isGift ? 0 : item.buyPoint}
                              />
                            )}
                          </View>
                          <View className="number">{'x' + item.num}</View>
                        </View>
                      </View>
                    </View>
                    {item.packageGoodsRels && item.packageGoodsRels.length > 0 && (
                      <View>
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
                                    {item1.skuName}
                                    {item1.specDetails ? ` / ${item1.specDetails}` : ''}
                                  </Text>
                                </View>
                                <Text className="item-numxx">×{item1.num}</Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                    {gs === 5 && (
                      <View className="pre-sale">
                        <View className="text">当前商品为预售商品，预计发货时间 </View>
                        <View className="time">{dayjs(time).format('YYYY年MM月DD日')}</View>
                      </View>
                    )}
                    {/* 这个渲染在renderCakeInfo 之前 */}
                    {this.renderRestrictedInfo(item, myStore)}
                    {this.renderDangaoGreeting(item, supplier)}
                    {this.renderCakeInfo(item, last)}
                  </>
                );
              })
              : null}
          </View>
        ) : (
            <View
              className="order-confirm-store-item"
              onClick={async () => {
                const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                if (singerCardLogin) return;
                await action._urlChange(3, supplier.storeId);
              }}
              style={{ marginTop: '10px' }}
            >
              <View className="sku-pic-list">
                {cartList.slice(0, 4).map((item, index) => (
                  <PictureCom key={index} type={0} url={item.url} />
                ))}
              </View>
              <View className="store-item-right">
                <Text className="item-text">{allSkus.length}</Text>
                <Image className="arrow-img" src={arrow} />
              </View>
            </View>
          )}
        {goodsType === 8 && this.renderDangaoForm(myStore, cityId)}
        {/* {giftCardType !== 1 && ![6, 7].includes(goodsType) ? (
          <View
            className="order-confirm-store-item"
            onClick={async () => {
              invoiceType && (await action._urlChange(2, supplier.supplierId));
            }}
          >
            <Text className="order-item-label">发票信息</Text>
            <View className="store-item-right">
              <Text className="item-text">{INVOICE_TYPE[invoiceType]}</Text>
              {invoiceType !== 0 && <Image className="arrow-img" src={arrow} />}
            </View>
          </View>
        ) : null} */}

        {goodsType === 6 ? (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">充值帐户</Text>

            <View className="order-item-input">
              {
                kaGuanZhiChongNumber ? <Text className="item-text">{kaGuanZhiChongNumber}</Text> : (
                  <Input
                    type='idcard'
                    value={kaGuanZhiChong[supplier._storeId]}
                    placeholder={`请输入${accountType == 0 ? '账号' : accountType == 1 ? '手机号码' : 'QQ号'}`}
                    className="invoice-input"
                    onInput={(e) => {
                      action._orderKaGuanZhiChongNumberChange(supplier._storeId, e.detail.value);
                    }}
                  />
                )
              }
            </View>
          </View>

        ) : null}
        {
          [6, 7, 8].includes(goodsType) ? null : (
            <View className="order-confirm-store-item firstElem">
              <Text className="order-item-label">订单备注</Text>
              <View className="order-item-input">
                <Input
                  maxlength={100}
                  value={buyRemark[supplier._storeId]}
                  placeholder="点击输入，100字以内"
                  placeholderStyle="color:#00000066"
                  className="invoice-input"
                  onInput={(e) => {
                    action._orderBuyRemarkChange(supplier._storeId, e.detail.value);
                  }}
                />
              </View>
            </View>
          )
        }
        {/* <View
          className="order-confirm-store-item"
          onClick={async () => {
            getPrivacySetting().then((res) => {
              if ((res as any).needAuthorization) {
                msg.emit('privacyModalVisible', {
                  visible: true,
                  privacyContractName: (res as any).privacyContractName,
                  callback: () => {
                    this.listenKeyBordHidden(enclosures, supplier);
                  },
                });
              } else {
                this.listenKeyBordHidden(enclosures, supplier);
              }
            });
          }}
        >
          <Text className="order-item-label">订单附件</Text>
          <View className="store-item-right">
            <Text className="item-input-text" decode>
              上传图片&ensp;
            </Text>
            <Image className="arrow-img" src={plus} />
          </View>
        </View> */}

        {/*附件图片列表*/}
        {/* {enclosureList && enclosureList.length > 0 && <Enclosure storeId={supplier._storeId} />} */}

        {!isBookingSaleGoods && stores && stores.length > 1 && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">商品金额</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{actions._addZero(tradePrice.goodsPrice)}</Text>
            </View>
          </View>
        )}

        {!isBookingSaleGoods && stores && stores.length > 1 && (![6, 7, 8].includes(goodsType)) && (
          <View className="order-confirm-store-item">
            <Text className="order-item-label">配送费用</Text>
            <View className="store-item-right">
              <Text className="item-text">¥{actions._addZero(goodsType === 8 ? dangaoDeliveryAmount[supplier._storeId] : tradePrice.deliveryPrice)}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  private listenKeyBordHidden = (enclosures, supplier) => {
    setTimeout(async () => {
      await this._chooseImage(enclosures, supplier._storeId);
    }, 500);
  };

  _chooseImage = async (enclosures, storeId) => {
    if (enclosures && enclosures[storeId] && enclosures[storeId].length === 10) {
      await Taro.showToast({
        title: '最多上传10张哦~',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    await this.props.actions.action._chooseImage(storeId);
  };

  /**
   * 去重
   * @param marketings
   */
  _distinct = (marketings) => {
    let newMarketings = [marketings[0]];
    marketings.map((marketing) => {
      let m = newMarketings.find((newMarketing) => newMarketing && newMarketing.marketingId == marketing.marketingId);
      if (!m) {
        newMarketings.push(marketing);
      }
    });
    return newMarketings;
  };
}

//create by moon https://github.com/creasy2010/moon
