import { Image, Input, Text, View, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component, Fragment } from 'react';
import { immutable } from 'wmkit'
import * as T from '../types';
import '../css/store.less';
import '../css/index.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import PictureCom from './picture-com';
import Enclosure from './enclosure';
import plus from '../img/plus.png';
import Price from '@/pages/common/goods/price';
import noneImg from '../img/none.png';
import arrow from '@/assets/image/common/arrow.png';
import dayjs from 'dayjs';
import arrowDown from '@/assets/image/order/arrow-down.png';
import arrowUp from '@/assets/image/order/arrow-up.png';
import IconFont from '@/wmkit/common/iconfont';

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

  renderCakeInfo = (item: any) => {
    const isCake = item.goodsType === 3;
    if (!isCake) return null;
    let {
      actions: { action },
    } = this.props;
    const startDay = this.getDeliverDay(item.deliveryDay);
    const times = this.getDeliverTime(item.goodsDeliveryTimeList);
    const dTime = this.getTime(item);
    const timeIndex = times.indexOf(dTime);
    if (!item.deliveryDate) {
      action.updateTradeItem(startDay, item.skuId, true, item.isGift);
    }
    const end = dayjs(startDay).add(1, 'years').add(-1, 'dates').format('YYYY-MM-DD');
    return (
      <View>
        <Picker
          mode="date"
          start={startDay}
          end={end}
          value={item.deliveryDate || startDay}
          onChange={(e) => {
            action.updateTradeItem(e.detail.value, item.skuId, true, item.isGift);
          }}
        >
          <View className="order-confirm-store-item" style={{ marginTop: '20px', marginBottom: 0 }}>
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
            className="order-confirm-store-item"
            style={{ marginTop: '20px', marginBottom: 0 }}
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
  render() {
    let {
      actions: { action },
      actions,
      myStore,
      main,
      main: {
        stores,
        orderList: { invoiceData, buyRemark, enclosures },
      },
    } = this.props;
    const { supplier, tradeItems, gifts } = myStore;
    const allSkus = tradeItems.concat(gifts);
    const cartList = allSkus
      .filter((sku, index) => index < 4)
      .map((sku) => {
        return {
          url: sku.pic,
        };
      });
    const { discountsPrice, tradePrice } = myStore;

    const prices = (immutable.fromJS(discountsPrice) || immutable.fromJS([])).groupBy((item) => item.get('type')).toArray();
    const invoiceType = invoiceData && invoiceData[supplier.supplierId]['supportInvoice'];
    console.log('main', stores);
    const goodsType = allSkus?.[0]?.goodsType

    return (
      <View className="confirm-store">
        <View className="confirm-store-left">
          {supplier.isSelf && (
            <View className="confirm-store-type">
              <Text className="confirm-store-type-text">自营</Text>
            </View>
          )}
          <Text className="confirm-store-name">{supplier.storeName}</Text>
        </View>

        {/* 只有一个店铺显示明细,只有一个店铺跳转到商品详情页，不跳转到清单页 */}
        {stores && stores.length == 1 ? (
          <View className="order-confirm-middle-detail">
            {allSkus
              ? allSkus.map((item, index) => {
                return (
                  <View>
                    <View
                      key={index}
                      className="product-item"
                      onClick={async () => {
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
                          <View className="name">{item.skuName}</View>
                          <View className="specDetails">{item.specDetails ? item.specDetails : ''}</View>
                        </View>
                        <View className="right">
                          <View className="price">
                            <Price price={item.isGift ? 0 : item.price} buyPoint={item.buyPoint} />
                          </View>
                          <View className="number">{'x' + item.num}</View>
                        </View>
                      </View>

                    </View>
                    {this.renderRestrictedInfo(item, myStore)}
                    {this.renderDangaoGreeting(item, supplier)}
                    {this.renderCakeInfo(item)}
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
                        <View className="packages-goods">
                          {item.packageGoodsRels.map((item1, index) => {
                            if (this.state[`${item.skuId}_status`] && index > 0) return null;
                            return (
                              <View className="goods-item">
                                <View className="item-name">
                                  <Text className="name-left">·</Text>
                                  <Text className="name-right">{item1.skuName}</Text>
                                </View>
                                <Text className="item-num">×{item1.num}</Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                );
              })
              : null}
          </View>
        ) : (
            <View
              className="order-confirm-store-item"
              onClick={async () => {
                await action._urlChange(3, supplier.storeId);
              }}
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

        {/* <View
          className="order-store-item"
          onClick={async () => {
            invoiceType && (await action._urlChange(2, supplier.supplierId));
          }}
        >
          <Text className="order-item-label">发票信息</Text>
          <View className="store-item-right">
            <Text className="item-text">{INVOICE_TYPE[invoiceType]}</Text>
            {invoiceType !== 0 && INVOICE_TYPE[invoiceType] != '不需要发票' && (
              <Image className="arrow-img" src={arrow} />
            )}
          </View>
        </View> */}
        {goodsType === 8 && this.renderDangaoForm(myStore)}
        {
          [6, 7, 8].includes(goodsType) ? null : (
            <View className="order-store-item">
              <Text className="order-item-label">订单备注</Text>
              <View className="order-item-input">
                <Input
                  maxlength={100}
                  value={buyRemark[supplier.storeId]}
                  placeholder="点击输入，100字以内"
                  className="invoice-input"
                  onInput={(e) => {
                    action._orderBuyRemarkChange(supplier.storeId, e.detail.value);
                  }}
                />
              </View>
            </View>
          )
        }
        {/* <View
          className="order-store-item"
          onClick={async () => {
            await this._chooseImage(enclosures, supplier.storeId);
          }}
        >
          <Text className="order-item-label">订单附件</Text>
          <View className="store-item-right">
            <Text className="item-input-text" decode={true}>
              上传图片&ensp;
            </Text>
            <Image className="arrow-img" src={plus} />
          </View>
        </View> */}

        {/*附件图片列表*/}
        <Enclosure storeId={supplier.storeId} />

        {prices.map((val, key) => {
          const price = val.map((v) => v.get('amount')).reduce((a, b) => (a += b));
          return (
            price && (
              <View className="order-store-item" key={key}>
                <Text className="order-item-label">{TYPES[key]}</Text>
                <View className="store-item-right">
                  <Text className="item-text">-¥{actions._addZero(price)}</Text>
                </View>
              </View>
            )
          );
        })}
      </View>
    );
  }

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
  renderRestrictedInfo = (item: any, myStore: any) => {
    const { isDistribution } = myStore
    if (!item.restrictedFlag && [null, 1].includes(isDistribution)) return null;
    return (
      <View className='tips'>
        <IconFont value="zhuyi" size={15} color="#FF0022" />
        <Text className='text'>当前地区不支持销售，可更换收货地址购买</Text>
      </View>
    )
  }
  renderDangaoGreeting = (item, supplier) => {
    let {
      actions: { action },
      main: { orderList: { dangaoGreeting, dangaoDeliverWay } }
    } = this.props;
    const isGreeting = item.isGreeting
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
  renderDangaoForm = (myStore) => {
    const { supplier, tradeValidateDeliveryDatesVOList = [], tradeValidateTakeDatesVOList = [], deliveryText, distributionRuleId, validateSameRow = [] } = myStore
    let {
      actions: { action },
      main: { cityId, orderList: { address, dangaoDate, dangaoPhone, dangaoTime, dangaoGreeting, dangaoShop, dangaoDeliverWay } }
    } = this.props;
    const { isDistribution } = myStore

    /**
     * type: 4 自取 3 配送 2 快递
     */
    const type = dangaoDeliverWay[supplier.storeId]
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
    const _date = dangaoDate[supplier.storeId]
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
        <View className="order-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
          <Text className="order-item-label">订货人手机号</Text>
          <View className="order-item-input phone">
            <Input
              maxlength={11}
              value={dangaoPhone[supplier.storeId]}
              placeholder="请输入订货人手机号"
              placeholderStyle="color:#00000066"
              className="invoice-input"
              onInput={(e) => {
                action._orderDangaoChange(supplier.storeId, 'Phone', e.detail.value);
              }}
            />
          </View>
        </View>
        <Picker
          range={deliveryTypeRange}
          mode="selector"
          value={dangaoDeliverWay[supplier.storeId]}
          disabled={deliveryTypeRange.length === 0 || isDistribution === 0}
          onChange={(e) => {
            const val = e.detail.value as number
            const valName = deliveryTypeRange[val]
            const key = Object.keys(DELIVERY_TYPE).find(key => DELIVERY_TYPE[key] === valName);
            action._orderDangaoChange(supplier.storeId, 'DeliverWay', Number(key));
            //切换配送方式清  日期 时间
            action._orderDangaoChange(supplier.storeId, 'Date', undefined);
            action._orderDangaoChange(supplier.storeId, 'Time', undefined);
            action._orderDangaoChange(supplier.storeId, 'DistributionRuleId', distributionRuleId);
            action.commonChange('main.orderList.dangaoDeliveryAmount', {})
            //获取到当前配送方式的运费,商家自配的运费和配送日期相关
            if (key === '2') {
              const fee = validateSameRow.length > 0 ? validateSameRow[0] : 0
              action._orderDangaoChange(supplier.storeId, 'DeliveryText', deliveryText);
              action._orderDangaoChange(supplier.storeId, 'DeliveryAmount', kuaidifee);
              action._calcFreight(Number(fee));
            } else {
              action._calcFreight(0);
            }
          }}
        >
          <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
            <Text className="order-item-label">配送方式</Text>
            <View className="store-item-right">
              <Text className="item-text2"> {DELIVERY_TYPE[dangaoDeliverWay[supplier.storeId]] || '请选择配送方式'}</Text>
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
              <View className="store-item-right" onClick={async () => action._urlChange(6, JSON.stringify({ address, cityId, brandId, id: supplier.storeId }))}>
                <Text className="item-text2">{dangaoShop[supplier.storeId]?.shop_name || '请选择自取门店'}</Text>
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
                value={dangaoDate[supplier.storeId] || startDay}
                onChange={(e) => {
                  //切换日期清时间
                  action._orderDangaoChange(supplier.storeId, 'Date', e.detail.value);
                  action._orderDangaoChange(supplier.storeId, 'Time', undefined);
                  if (type === 3) {
                    const fee = shipList.find(v => v.date === e.detail.value).delivery_amount || 0
                    action._orderDangaoChange(supplier.storeId, 'DeliveryAmount', fee);
                    action._calcFreight(fee);
                  } else {
                    action._calcFreight(0);
                  }
                }}
              >
                <View className="order-confirm-store-item" style={{ marginBottom: '20px', marginTop: 0 }}>
                  <Text className="order-item-label">{text}日期</Text>
                  <View className="store-item-right">
                    <Text className="item-text2">{dangaoDate[supplier.storeId] || `请选择${text}日期`}</Text>
                    <Image className="arrow-img" src={arrow} />
                  </View>
                </View>
              </Picker>
              <Picker
                mode="selector"
                range={rangeTime || []}
                value={dangaoTime[supplier.storeId]}
                disabled={Boolean(!dangaoDate[supplier.storeId])}
                onChange={(e) => {
                  action._orderDangaoChange(supplier.storeId, 'Time', rangeTime[e.detail.value]);
                }}
              >
                <View
                  className="order-confirm-store-item"
                  style={{ marginBottom: '20px', marginTop: 0 }}
                  onClick={() => {
                    if (!dangaoDate[supplier.storeId]) {
                      Taro.showToast({
                        title: '请先选择日期',
                        icon: 'none',
                      })
                    }
                  }}
                >
                  <Text className="order-item-label">{text}时间</Text>
                  <View className="store-item-right">
                    <Text className="item-text2">{dangaoTime[supplier.storeId] || `请选择${text}时间`}</Text>
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
}

//create by moon https://github.com/creasy2010/moon
