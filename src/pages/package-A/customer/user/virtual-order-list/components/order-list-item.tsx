/* eslint-disable */
import * as T from '../types';
import { store2Props } from '../selectors';
import actions from '../actions/index';
import { View, Text, Image } from '@tarojs/components';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import moment from 'dayjs';
import api from 'api';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
moment.extend(isSameOrBefore);
import { _, WMkit, immutable, OrderWrapper } from 'wmkit';
import { debounce } from 'lodash';
// import '../css/style.less';
import CountDown from '@/pages/common/count-down';
import PriceAll from '@/pages/common/goods/priceAll';
import noneImg from '@/assets/image/default/no-goods-img.png';
type IOrderListProps = T.IProps & T.IOrderListProps;
import dowmImg from '@/assets/image/coupon/down.png';
import dingdongIcon from '@/assets/image/order/dingdong.png';
import meituanIcon from '@/assets/image/order/meituan.png';
import samIcon from '@/assets/image/order/sam.png';
import './order-list-item.less';
import Price from '@/pages/common/goods/price';
import { Label } from '@wanmi/ui-taro';
import { XuanKuaType } from 'api/CustomerBaseController';
//@ts-ignore
const DELIVERY_STATUS = {
  NOT_YET_SHIPPED: '未发货',
  PART_SHIPPED: '部分发货',
  SHIPPED: '全部发货',
  FAIL: '发货失败',
};

const tongKaShuKeTradeTypeMap={
  '0':'shanmuyouxuan',
  '1':'meituan',
  '2':'dingdong'
}
/**
 * 订单状态
 * @type {{INIT: string; GROUPON: string; AUDIT: string; DELIVERED_PART: string; DELIVERED: string; CONFIRMED: string; COMPLETED: string; VOID: string}}
 */
const flowState = (status, payState, paymentOrder) => {
  if (status == 'INIT') {
    return '待审核';
  } else if (status == 'GROUPON') {
    // 是拼团订单 根据支付状态 ? 待支付 : 待发货
    if (payState == 'NOT_PAID') {
      return '待付款';
    } else if (payState == 'UNCONFIRMED') {
      return '待确认';
    } else if (payState == 'PAID') {
      return '待发货';
    }
  } else if (status == 'AUDIT' && payState == 'NOT_PAID' && paymentOrder == 'PAY_FIRST') {
    return '待付款';
  } else if (status == 'AUDIT' && payState == 'UNCONFIRMED' && paymentOrder == 'PAY_FIRST') {
    return '待付款';
  } else if (status == 'WAIT_PAY_EARNEST' && payState == 'NOT_PAID') {
    return '待支付定金';
  } else if (
    (status == 'WAIT_PAY_TAIL' && payState == 'PAID_EARNEST') ||
    (status == 'AUDIT' && payState == 'PAID_EARNEST')
  ) {
    return '待支付尾款';
  } else if (status == 'CONFIRMED') {
    return '已收货';
  } else if (status == 'AUDIT') {
    return '待发货';
  } else if (status === 'DELIVERED_PART') {
    return '部分发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};

@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderList extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);

    this.state = {
      maxNum: 5,
    };
  }

  getStatusDesc = (order) => {
    const status = flowState(order.tradeState.flowState, order.tradeState.payState, order.paymentOrder);
    return status;
  };
  getTag = (deliverWay: string | number, pickupFlag: boolean, orderTag: any, order: any) => {
    if (order.xuanKuaTradeFlag || order.tongKaShuKeTrade) {
      return null
    }
    if (orderTag?.virtualFlag) return <Text className="city-delivery">虚拟订单</Text>;
    if (orderTag?.electronicCouponFlag) return <Text className="city-delivery">卡券订单</Text>;
    return null;
  };

  renderXuanKuaItem = (item, index) => {
    const xuanKuaFlag = item.xuanKuaDramaTrade ? 'Drama' : item.xuanKuaMovieTrade ? 'Movie' : item.xuanKuaLifeTrade ? 'Life' : null;
    console.log('xuanKuaFlag', item.xuanKuaLifeTrade);

    switch (xuanKuaFlag) {
      case 'Movie':
        return (
          <View className="product-item" key={index}>
            <Image className="img-item" src={item.pic ? item.pic : noneImg} />
            <View className="content">
              <View className="content-detail">
                <View className="name">{item.skuName}</View>
                <View className="specDetails">{item.xuanKuaMovieTrade?.playtime}（{item.xuanKuaMovieTrade?.edition}）</View>
                <View className="specDetails">{item.xuanKuaMovieTrade?.roomname}  {item.xuanKuaMovieTrade?.seats}</View>
              </View>
            </View>
          </View>
        )
      case 'Drama':
        return (
          <View className="product-item" key={index}>
            <View className="content" style={{ width: '100%' }}>
              <View className="content-detail">
                <View className="name">{item.xuanKuaDramaTrade.projectName}</View>
                <View className="drama-con" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View className='box'>
                    <Text className='venuesname'>{item.xuanKuaDramaTrade.performBeginTime?.split('.')[0]}</Text>
                    <Text className='venuesname'>{item.xuanKuaDramaTrade.venuesname}</Text>
                    {
                      item.xuanKuaDramaTrade.isexpress &&
                      <Text className='venuesname'>快递费：￥{item.xuanKuaDramaTrade.expressfee?.toFixed(2)}</Text>
                    }
                  </View>
                  <View className='num'>
                    x{item.xuanKuaDramaTrade.quantity}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )
      case 'Life':
        return (
          <View className="product-item" key={index}>
            <Image className="img-item" src={item.xuanKuaLifeTrade.goodsLogo} />
            <View className="content">
              <View className="content-detail">
                <View className="name">{item.xuanKuaLifeTrade.goodsName}</View>
              </View>
            </View>
          </View>
        )
      default:
        return null
    }

  }
  renderTongKaItem = (item) => {
    const type = item.tongKaShuKeTradeType === 2 ? 'dingdong' : item.tongKaShuKeTradeType === 1 ? 'meituan' : item.tongKaShuKeTradeType === 0 ? 'sam' : null;

    switch (type) {
      case 'dingdong':
        return (
          <View className="product-item">
            <Image className="img-item tongka" src={dingdongIcon} />
            <View className="content">
              <View className="content-detail">
                <View className="name">叮咚买菜-{item.tongKaShuKeTradeNo}</View>
              </View>
            </View>
          </View>
        )
      case 'meituan':
        return (
          <View className="product-item" >
            <Image className="img-item tongka" src={meituanIcon} />
            <View className="content">
              <View className="content-detail">
                <View className="name">美团-{item.tongKaShuKeTradeNo}</View>
              </View>
            </View>
          </View>
        )
      case 'sam':
        return (
          <View className="product-item" >
            <Image className="img-item tongka" src={samIcon} />
            <View className="content">
              <View className="content-detail">
                <View className="name">山姆优选-{item.tongKaShuKeTradeNo}</View>
              </View>
            </View>
          </View>
        )
      default:
        return null
    }

  }

  renderStoreName(order) {
    return order.xuanKuaDramaTradeFlag ? '演出' : order.xuanKuaLifeTradeFlag ? '生活券' : order.tongKaShuKeTradeType === 0 ? '山姆优选' : order.tongKaShuKeTradeType === 1 ? '美团' : order.tongKaShuKeTradeType === 2 ? '叮咚买菜' : order.supplier.storeName
  }
  render() {
    let { main, order, index, inviteeShopName } = this.props;
    const { maxNum } = this.state;
    const opeBtnArr = this.getOpeBtnArr(immutable.fromJS(main.orders[index]));
    const gifts = (order && order.gifts) || [];
    const endTime =
      order && order.orderTimeOut && !moment(order.orderTimeOut).isBefore(main.serverTime)
        ? moment(order.orderTimeOut)
        : null;
    //商品清单展示形式  0:普通 1: 明细
    order.type = main.orderListType;

    return (
      <View>
        <View className="user-box" key={order.id}>
          <View
            className="user-order-item"
            onClick={async() => {
              if (order.xuanKuaTradeFlag) {
                const url = order.orderQueryUrl || order.xuanKuaMovieTrade.orderQueryUrl
                if (__TARO_ENV === 'h5') {
                  window.location.href = url
                } else {
                  Taro.setStorageSync('movieOrderDetail', url);
                  Taro.navigateTo({ url: `/pages/package-B/x-site/movie-order-detail/index` });
                }
              } else if (order.tongKaShuKeTrade) {
                let url = order.tongKaShuKeTrade.dingDongDetailPageUrl || order.tongKaShuKeTrade.shanMuYouXuanDetailUrl
                const meiTuanOrderType = order.tongKaShuKeTrade.meiTuanOrderType
                if(meiTuanOrderType){
                  // 买单1,16,团购3 获取美团餐饮首页地址跳转
                  // 外卖 4 获取美团外卖首页地址跳转
                  const isWaimai = [4].includes(meiTuanOrderType)
                  try {
                    const { url:uri } = await api.customerBaseController.getXuanKuaUrl(isWaimai?XuanKuaType.MT_TAKEOUT:XuanKuaType.MT_CATERING);
                    url = uri
                  } catch (error) {
                    console.log('error', error);
                  }
                }
                if (__TARO_ENV === 'h5') {
                  window.location.href = url
                } else {
                  Taro.setStorageSync('movieOrderDetail', url);
                  Taro.navigateTo({ url: `/pages/package-B/x-site/movie-order-detail/index` });
                }
              } else {
                Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${order.id}` });

              }
            }}
          >
            <View className="user-order-item-link">
              {WMkit.inviteeId() && WMkit.isShop() ? (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.navigateTo({
                      url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${order.inviteeId}`,
                    });
                  }}
                >
                  <View className="dinapu">
                    <Text className="name">
                      {order.storeBagsFlag == 1 ? inviteeShopName : `${order.distributorName}的${order.shopName}`}
                    </Text>
                  </View>
                  {!order.xuanKuaTradeFlag ? <Image className="icon" src={require('../img/jiantou.png')} /> : null}
                </View>
              ) : (
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {!(order && order.platform == 'CUSTOMER') && (
                      <Image className="icon" src={require('../img/dai.png')} />
                    )}

                    {order.supplier.isSelf == true && !order.xuanKuaTradeFlag && !order.tongKaShuKeTrade && <Label name="自营" type="gold" />}
                    <View className="dian-pu">
                      <Text className="store-title">{this.renderStoreName(order)}</Text>
                    </View>
                    {this.getTag(order.deliverWay, order.pickupFlag, order.orderTag, order)}
                    {(!order.xuanKuaTradeFlag && !order.tongKaShuKeTrade) ? <Image className="icon" src={require('../img/jiantou.png')} /> : null}
                  </View>
                )}

              {order && (
                <View
                  className={
                    order.tradeState.flowState == 'COMPLETED' ||
                      order.tradeState.flowState == 'CONFIRMED' ||
                      order.tradeState.flowState == 'VOID'
                      ? 'order-list-item-status'
                      : 'order-list-item-status2'
                  }
                >
                  {this.getStatusDesc(order)}
                </View>
              )}
            </View>

            {
              order.type == 0 ? (
                <View className="middle">
                  <View className="pic">
                    {order
                      ? order.tradeItems
                        .concat(gifts)
                        .filter((val, index) => index < 4)
                        .map((item, index) => (
                          <Image className="img-item" key={index} src={item.pic ? item.pic : noneImg} />
                        ))
                      : null}
                  </View>
                  <View className="right">
                    {order ? order.tradeItems.concat(gifts).length : null}
                    <Image className="icon" src={require('../img/jiantou.png')} />
                  </View>
                </View>
              ) : (!order.xuanKuaTradeFlag && !order.tongKaShuKeTradeNo) ? (
                <View className="middle-detail">
                  {order
                    ? order.tradeItems
                      .concat(gifts)
                      .filter((val, index) => index < maxNum)
                      .map((item, index) => (
                        <View className="product-item" key={index}>
                          <Image className="img-item" src={item.pic ? item.pic : noneImg} />
                          <View className="content">
                            <View className="content-detail">
                              <View className="name">{item.skuName}</View>
                              <View className="specDetails">{item.specDetails ? item.specDetails : ''}</View>
                            </View>
                            <View className="content-right">
                              <View className="price">
                                {item.buyPoint && item.buyPoint > 0 && item.price > 0 ? (
                                  <Text className="unit">
                                    <Text className="fixed1">{item.buyPoint}</Text>积分
                                    <Text className="fixed1">+</Text>￥
                                    <Text className="fixed1">{_.addZero(item.price).split('.')[0]}</Text>.
                                    {_.addZero(item.price).split('.')[1]}
                                  </Text>
                                ) : null}
                                {item.buyPoint && item.buyPoint > 0 && item.price == 0 ? (
                                  <Text className="unit">
                                    <Text className="fixed1">{item.buyPoint}</Text>积分
                                  </Text>
                                ) : null}
                                {!item.buyPoint || item.buyPoint == 0 ? (
                                  <Text className="unit">
                                    ￥<Text className="fixed1">{_.addZero(item.price).split('.')[0]}</Text>.
                                    {_.addZero(item.price).split('.')[1]}
                                  </Text>
                                ) : null}
                              </View>
                              <View className="number">{'x' + item.num}</View>
                            </View>
                          </View>
                        </View>
                      ))
                    : null}
                </View>
              ) : order.xuanKuaTradeFlag ? (
                <View className="middle-detail middle-detail-movie">
                  {order
                    ? order.tradeItems
                      .concat(gifts)
                      .filter((val, index) => index < maxNum)
                      .map((item, index) => this.renderXuanKuaItem(item, index))
                    : null}
                </View>
              ) : <View className="middle-detail middle-detail-movie">
                      {this.renderTongKaItem(order)}
                    </View>
            }

            {order.type == 1 && order.tradeItems.length > maxNum && (
              <View
                className="product-more"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ maxNum: order.tradeItems.length });
                }}
              >
                剩余{order.tradeItems.length - maxNum}种商品
                <Image className="down-img" src={require('../img/jiantoudown.png')} />
              </View>
            )}

            {order.type == 1 && order.tradeItems.length == maxNum && maxNum > 5 && (
              <View
                className="product-more"
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ maxNum: 5 });
                }}
              >
                收起商品
                <Image className="up-img" src={require('../img/jiantoudown.png')} />
              </View>
            )}

            <View className="order-bottom">
              <View className="info">
                <View style={{ flexDirection: 'row' }}>
                  {endTime &&
                    order.tradeState.payState == 'NOT_PAID' &&
                    order.tradeState.flowState != 'VOID' &&
                    order.tradeState.auditState != 'NON_CHECKED' ? (
                      <View className="doajishi">
                        <Text className="count-text">支付倒计时：</Text>
                        <CountDown
                          timeStyle={{ margin: 0 }}
                          visibleSecond={true}
                          visible={endTime && main.serverTime}
                          endHandle={() => {
                            let state = null;
                            //tab切换后返回需要重新选中之前的tab
                            const order_list_tab = Taro.getStorageSync('vir_order_list_tab');
                            if (order_list_tab) {
                              state = order_list_tab.status;
                            }
                            this.props.actions.clean();
                            this.props.actions.init(state ? state : '');
                          }}
                          timeOffset={moment(endTime).diff(moment(main.serverTime), 's').toFixed(0)}
                        />
                      </View>
                    ) : null}
                </View>

                <View className="price">
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <PriceAll
                      price={_.addZero(order.tradePrice.totalPrice)}
                      sum={order.tradeItems.concat(gifts).length}
                    />
                  </View>
                </View>
              </View>

              <View className="operate" onClick={(e) => e.stopPropagation()}>
                {opeBtnArr.available.length > 0
                  ? opeBtnArr.available.map((availableButton, index) => {
                    if (
                      availableButton === '支付尾款' &&
                      !moment(order.tradeItems[0].tailStartTime).isSameOrBefore(main.serverTime)
                    ) {
                      const timeOffset = moment(order.tradeItems[0].tailStartTime)
                        .diff(moment(main.serverTime), 's')
                        .toFixed(0);
                      return (
                        <View key={index} className="btn-disabled">
                          <CountDown
                            timeStyle={{ margin: 0, paddingTop: '2px' }}
                            allowFontScaling={false}
                            numberOfLines={1}
                            groupFlag={false}
                            prelistFlag={true}
                            showTimeDays={true}
                            endHandle={() => {
                              let state = null;
                              //tab切换后返回需要重新选中之前的tab
                              const order_list_tab = Taro.getStorageSync('vir_order_list_tab');
                              if (order_list_tab) {
                                state = order_list_tab.status;
                              }
                              this.props.actions.clean();
                              this.props.actions.init(state ? state : '');
                            }}
                            timeOffset={timeOffset}
                          />
                          <View className="buyText">后支付尾款</View>
                        </View>
                      );
                    }

                    return (
                      <View
                        key={index}
                        className={this.getButtonClass(availableButton, opeBtnArr.available)}
                        onClick={() =>
                          this._operationButtons(
                            order.id,
                            availableButton,
                            order.payInfo.payTypeId,
                            order.writeOffInfo?.writeOffCode,
                          )
                        }
                        onClick={() => {
                          this._operationButtons(order.id, availableButton, order.payInfo.payTypeId, order.deliverId);
                        }}
                      >
                        {availableButton}
                      </View>
                    );
                  })
                  : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  getButtonClass = (availableButton, btns) => {
    return ['去付款'].includes(availableButton) ? 'btn btn-warning' : 'btn';
  };

  /**
   * 订单可用操作按钮
   */
  getOpeBtnArr(order) {
    let orderButtons = {
      available: [],
      id: '',
    };
    let electronicCouponFlag = order?.getIn(['orderTag', 'electronicCouponFlag']);
    let virFlag = order?.getIn(['orderTag', 'virtualFlag']);
    if (order) {
      const pickupFlag = order.get('pickupFlag');

      const flow = order.getIn(['tradeState', 'flowState']); // 流程状态
      const pay = order.getIn(['tradeState', 'payState']); // 支付状态

      //取消订单
      const cancelButtons = [
        ['INIT', 'NOT_PAID'],
        ['AUDIT', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID'],
      ];
      //付款
      const payButtons = [
        ['AUDIT', 'NOT_PAID'],
        ['DELIVERED_PART', 'NOT_PAID'],
        ['DELIVERED', 'NOT_PAID'],
        ['CONFIRMED', 'NOT_PAID'],
        ['GROUPON', 'NOT_PAID'],
        ['AUDIT', 'PAID_EARNEST'],
      ];
      //确认收货
      const confirmButtons = [];
      //待支付定金
      const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
      //待支付尾款
      const presaleBalanceButtons = [['WAIT_PAY_TAIL', 'PAID_EARNEST']];

      // 是否可退标识
      let canReturnFlag = order.get('canReturnFlag');

      if (order.getIn(['tradeState', 'flowState']) == 'GROUPON') {
        // 待成团单，不展示退货退款
        canReturnFlag = false;
      }

      let availables = [];
      let showFirdeBtn =
        order.toJS()?.tradeState?.flowState == 'VOID' || order.toJS()?.tradeState?.flowState == 'COMPLETED';

      if (cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('取消订单');
      }
      if (payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('去付款');
      }
      const applyReturnButtons = [
        ['AUDIT', 'PAID'],
        ['DELIVERED_PART', 'PAID'],
        ['DELIVERED', 'PAID'],
        ['COMPLETED', 'PAID'],
      ];
      const virtualApplyReturnButtons = [
        ['AUDIT', 'PAID'],
        ['DELIVERED_PART', 'PAID'],
        ['DELIVERED', 'PAID'],
      ];
      canReturnFlag && !order.toJS()?.xuanKuaTradeFlag &&!order.toJS()?.tongKaShuKeTrade&& applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0
        ? availables.push('退货退款')
        : null;
      // 同城配送已付款未发货支持退货退款，已经发货未完成不支持退货退款，已完成状态支持退货退款
      if (order?.getIn(['orderTag', 'virtualFlag']) && !order.toJS()?.xuanKuaTradeFlag&&!order.toJS()?.tongKaShuKeTrade) {
        let arr = ['退货退款', '核销码'];

        canReturnFlag &&
          virtualApplyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
          availables.push(...arr);
      } else {
        canReturnFlag && !order.toJS()?.xuanKuaTradeFlag &&!order.toJS()?.tongKaShuKeTrade&&
          applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
          availables.push('退货退款');
      }
      orderButtons['available'] = Array.from(new Set(availables));
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }

  checkOrderCanComfirm = (order: any) => {
    const orderJs = order.toJS();
    const tradeVOList = orderJs.tradeVOList || [];
    if (tradeVOList.length <= 0) return false;
    let isSupplierComplete = false;
    let isProviderDELIVERED = true;
    tradeVOList.forEach((item) => {
      if (item.id.substr(0, 1) === 'S') {
        isSupplierComplete = item.tradeState.flowState === 'COMPLETED';
      } else {
        // 供应商
        isProviderDELIVERED = isProviderDELIVERED && item.tradeState.flowState === 'DELIVERED';
      }
    });
    return isProviderDELIVERED;
    // return isSupplierComplete && isProviderDELIVERED;
  };

  /**
   * 计算订单有效按钮
   */
  _calc = (button: Array<string>) => {
    return function (flow: string, pay: string) {
      return button[0] === flow && button[1] === pay;
    };
  };
  /**
   * 订单按钮event handler
   */
  _operationButtons = debounce(
    async (tid, button, payTypeId, writeOffCode, deliverId) => {
      let {
        order,
        actions: { goodsAction },
      } = this.props;
      //0元订单去付款直接跳转到付款成功页

      if (button == '去付款' && order.tradePrice.totalPrice == 0) {
        //直接调默认支付接口
        goodsAction.defaultPay(tid);
      }
      if (button == '去付款' && payTypeId == 0 && order.tradePrice.totalPrice != 0) {
        let url = `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`
        if([0,1,2].includes(order.tongKaShuKeTradeType)){
          url+=`&ordersource=${tongKaShuKeTradeTypeMap[order.tongKaShuKeTradeType]}`
        }
        await Taro.navigateTo({ url: url });
      } else if (button == '去付款' && payTypeId == 1 && order.tradePrice.totalPrice != 0) {
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment/index?tid=${tid}`,
        });
      } else if (button == '取消订单') {
        this.props.actions.goodsAction.cancelOrder(tid);
      } else if (button === '退货退款') {
        // 判断如果是电子卡券订单或者虚拟商品订单的话，跳转到联系商家页面
        if (order?.orderTag?.electronicCouponFlag || order?.orderTag?.virtualFlag) {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/virtual-goods-return/index?storeId=${order.supplier.storeId}`,
          });
        }
      } else if (button === '核销码') {
        Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${tid}` });
      }
    },
    500,
    { leading: true },
  );
  orderDeliveryState() {
    return DELIVERY_STATUS[this.props.getIn(['tradeState', 'deliverStatus'])];
  }
}
