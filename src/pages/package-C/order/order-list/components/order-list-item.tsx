import * as T from '../types';
import { store2Props } from '../selectors';
import actions from '../actions/index';
import { View, Text, Image } from '@tarojs/components';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import api from 'api';
import moment from 'dayjs';
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
moment.extend(isSameOrBefore);
import { _, WMkit, immutable } from 'wmkit';
import { debounce } from 'lodash';
// import '../css/style.less';
import CountDown from '@/pages/common/count-down';
import PriceAll from '@/pages/common/goods/priceAll';
import noneImg from '@/assets/image/default/no-goods-img.png';
import dingdongIcon from '@/assets/image/order/dingdong.png';
import meituanIcon from '@/assets/image/order/meituan.png';
import samIcon from '@/assets/image/order/sam.png';
type IOrderListProps = T.IProps & T.IOrderListProps;
import dowmImg from '@/assets/image/coupon/down.png';
import './order-list-item.less';
import Price from '@/pages/common/goods/price';
import { Label } from '@wanmi/ui-taro';
import dayjs from 'dayjs';
import { getDeliverFormat } from '@/utils/common-functions';
import { Const } from 'config';
import IconFont from '@/wmkit/common/iconfont';
import { XuanKuaType } from 'api/CustomerBaseController';

const DELIVERY_STATUS = {
  NOT_YET_SHIPPED: '未发货',
  PART_SHIPPED: '部分发货',
  SHIPPED: '全部发货',
  FAIL: '发货失败',
};
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
  } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
    return '待发货';
  } else if (status == 'DELIVERED') {
    return '待收货';
  } else if (status == 'COMPLETED') {
    return '已完成';
  } else if (status == 'VOID') {
    return '已作废';
  }
};
const tongKaShuKeTradeTypeMap = {
  '0': 'shanmuyouxuan',
  '1': 'meituan',
  '2': 'dingdong'
}
@connect<Partial<IOrderListProps>, T.IOrderListState>(store2Props, actions)
export default class OrderList extends Component<Partial<IOrderListProps>, T.IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);

    this.state = {
      maxNum: 5,
    };
  }

  getTag = (deliverWay: string | number, pickupFlag: boolean, orderTag: any, order: any) => {
    if (order.xuanKuaTradeFlag || order.tongKaShuKeTrade) {
      return null
    }
    if (pickupFlag) return <Text className="city-delivery">自提订单</Text>;
    if (orderTag?.virtualFlag) return <Text className="city-delivery">虚拟订单</Text>;
    if (orderTag?.electronicCouponFlag) return <Text className="city-delivery">卡券订单</Text>;
    return null;
  };

  /**
   *  自提
   * @returns
   */
  getSelfOpeBtnArr(order: any) {
    let orderButtons = {
      available: [],
      id: '',
    };
    const flow = order.getIn(['tradeState', 'flowState']); // 流程状态
    const pay = order.getIn(['tradeState', 'payState']); // 支付状态
    const tradeItems = order.get('tradeItems');
    const pluginType = tradeItems.first().get('pluginType'); //跨境直邮商品只有 0，1，o2o商品为2

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
    const confirmButtons = [
      ['DELIVERED', 'NOT_PAID'],
      ['DELIVERED', 'PAID'],
      ['DELIVERED', 'UNCONFIRMED'],
    ];

    // 已发货未付款
    const delievedNotPay = [['DELIVERED', 'NOT_PAID']];

    //待支付定金
    const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
    //待支付尾款
    const presaleBalanceButtons = [['WAIT_PAY_TAIL', 'PAID_EARNEST']];

    // 是否可退标识
    let canReturnFlag = order.get('canReturnFlag');
    // 蛋糕叔叔商品
    const isDangaoss = order.getIn(['orderTag', 'dangaossOrderFlag']);
    // 是否是 叮咚 美团 山姆
    const isTongKaShuKe = [0,1,2].includes(order.get('tongKaShuKeTradeType'))
    if (
      order.getIn(['tradeState', 'flowState']) == 'GROUPON' ||
      [1, 2].includes(order.getIn(['tradePrice', 'giftCardType']))||isDangaoss
    ) {
      // 待成团单，不展示退货退款
      canReturnFlag = false;
    }

    let availables = [];

    let showFirdeBtn =
      order.toJS()?.tradeState?.flowState == 'VOID' || order.toJS()?.tradeState?.flowState == 'COMPLETED';
    const isMeituan = order.get('tongKaShuKeTradeType')===1
      if (
      DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '部分发货' ||
      DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '全部发货'
    ) {
      !showFirdeBtn && availables.push('物流信息');
    }

    if (cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
      availables.push('取消订单');
    }
    if (payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0&&!isTongKaShuKe) {
      availables.push('去付款');
    }
    if (presaleDepositButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
      availables.push('支付定金');
    }
    if (presaleBalanceButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
      availables.push('支付尾款');
    }

    if (confirmButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
      if (delievedNotPay.filter((btn) => this._calc(btn)(flow, pay)).length > 0) {
        if (pluginType != 2&&!isTongKaShuKe) {
          availables.push('去付款');
        }
      }
    }
    const virtualApplyReturnButtons = [
      ['AUDIT', 'PAID'],
      ['DELIVERED_PART', 'PAID'],
      ['DELIVERED', 'PAID'],
    ];

    const applyReturnButtons = [
      ['AUDIT', 'PAID'],
      ['DELIVERED_PART', 'PAID'],
      ['DELIVERED', 'PAID'],
      ['COMPLETED', 'PAID'],
    ];

    if (order.toJS()?.orderTag?.virtualFlag) {
      canReturnFlag &&
        !order?.get('xuanKuaTradeFlag') &&
        !order?.get('tongKaShuKeTrade') &&
        virtualApplyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
        availables.push('退货退款');
    } else {
      canReturnFlag &&
        !order?.get('xuanKuaTradeFlag') &&
        !order?.get('tongKaShuKeTrade') &&
        applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
        availables.push('退货退款');
    }

    availables.push('提货码');
    availables.push('确认收货');
    availables = Array.from(new Set(availables));

    // 自提订单不支持点击确认收货
    if (!this.checkOrderCanComfirm(order)) {
      const _index = availables.indexOf('确认收货');
      if (_index > -1) availables.splice(_index, 1);
    }

    let showCode = false;
    const status = order.getIn(['tradeState', 'flowState']);
    const payState = order.getIn(['tradeState', 'payState']);
    const writeOffStatus = order.getIn(['writeOffInfo', 'writeOffStatus']);

    let isInWaitSendOrWaitReceive = false;
    if (status == 'GROUPON') {
      if (payState == 'PAID') isInWaitSendOrWaitReceive = true;
    } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
      isInWaitSendOrWaitReceive = true;
    } else if (status == 'DELIVERED') {
      isInWaitSendOrWaitReceive = true;
    }
    if (writeOffStatus == 1) isInWaitSendOrWaitReceive = false;

    if (pluginType == 2) {
      // o2o
      if (payState == 'PAID' && isInWaitSendOrWaitReceive) showCode = true;
    } else {
      if (isInWaitSendOrWaitReceive) showCode = true;
    }
    if (order.get('isReturn')) showCode = false;
    if (order.get('paymentOrder') === 'PAY_FIRST' && ['UNCONFIRMED', 'NOT_PAID'].includes(payState)) showCode = false;
    if (order.get('tradeGroupon')) {
      if (order.getIn(['tradeGroupon', 'grouponOrderStatus']) != 2) {
        showCode = false;
      }
    }
    if (!showCode) {
      const codeIndex = availables.findIndex((e) => e == '提货码');
      if (codeIndex > -1) availables.splice(codeIndex, 1);
    }

    const index = availables.findIndex((e) => e == '提货码');
    if (index > -1) {
      availables.splice(index, 1);
      availables.push('提货码');
    }

    orderButtons['available'] = availables;
    orderButtons['id'] = order.get('id');
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
   * 订单可用操作按钮
   */
  getOpeBtnArr(order) {
    let orderButtons = {
      available: [],
      id: '',
    };

    if (order) {
      const pickupFlag = order.get('pickupFlag');
      if (pickupFlag) return this.getSelfOpeBtnArr(order);
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
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED'],
      ];
      const virtualApplyReturnButtons = [
        ['AUDIT', 'PAID'],
        ['DELIVERED_PART', 'PAID'],
        ['DELIVERED', 'PAID'],
      ];
      //待支付定金
      const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
      //待支付尾款
      const presaleBalanceButtons = [['WAIT_PAY_TAIL', 'PAID_EARNEST']];
      // 是否是 叮咚 美团 山姆
      const isTongKaShuKe = [0,1,2].includes(order.get('tongKaShuKeTradeType'))
      // 是否可退标识
      let canReturnFlag = order.get('canReturnFlag');
      let virtualFlag = order.get('orderTag')?.get('electronicCouponFlag') || order.get('orderTag')?.get('virtualFlag');
      const isDangaoss = order.getIn(['orderTag', 'dangaossOrderFlag']);

      if (
        order.getIn(['tradeState', 'flowState']) == 'GROUPON' ||
        [1, 2].includes(order.getIn(['tradePrice', 'giftCardType']))||isDangaoss
      ) {
        // 待成团单，不展示退货退款
        canReturnFlag = false;
      } else {
        const tradeItems = order.get('tradeItems');
        if (tradeItems.every(e => e.get('goodsType') == 3) && tradeItems.every((e) => e.get('num') === e.get('deliveredNum') || e.get('canReturnNum') === 0)) {
          canReturnFlag = false;
        }
        if (tradeItems.some(e => [6, 7].includes(e.get('goodsType')))) {
          canReturnFlag = false;
        }
      }

      let availables = [];
      let showFirdeBtn =
        order.toJS()?.tradeState?.flowState == 'VOID' || order.toJS()?.tradeState?.flowState == 'COMPLETED';
      const isMeituan = order.get('tongKaShuKeTradeType')===1
      if (cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        if (![0, 1, 2].includes(order.get('tongKaShuKeTradeType'))) {
          availables.push('取消订单');
        }
      }
      if (payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0&&!isTongKaShuKe) {
        availables.push('去付款');
      }
      if (presaleDepositButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('支付定金');
      }
      if (presaleBalanceButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('支付尾款');
      }
      if (
        DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '部分发货' ||
        DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '全部发货'
      ) {
        !showFirdeBtn && !virtualFlag && availables.push('物流信息');
      }

      let confirmGoods = confirmButtons.filter((button) => this._calc(button)(flow, pay)).length > 0;
      if (confirmGoods) {
        !virtualFlag && availables.push('确认收货');
      }
      const applyReturnButtons = [
        ['AUDIT', 'PAID'],
        ['DELIVERED_PART', 'PAID'],
        ['DELIVERED', 'PAID'],
        ['COMPLETED', 'PAID'],
      ];
      canReturnFlag &&
        !order?.get('xuanKuaTradeFlag') &&
        !order?.get('tongKaShuKeTrade') &&
        applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0
        ? availables.push('退货退款')
        : null;
      // 同城配送已付款未发货支持退货退款，已经发货未完成不支持退货退款，已完成状态支持退货退款
      if (order?.getIn(['orderTag', 'virtualFlag'])) {
        let arr = ['退货退款'];
        canReturnFlag && !order.toJS().isReturn && arr.push('核销码');
        canReturnFlag &&
          !order?.get('xuanKuaTradeFlag') &&
          !order?.get('tongKaShuKeTrade') &&
          virtualApplyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
          availables.push(...arr);
      } else {
        canReturnFlag &&
          !order?.get('xuanKuaTradeFlag') &&
          !order?.get('tongKaShuKeTrade') &&
          applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0 &&
          availables.push('退货退款');
      }
      orderButtons['available'] = Array.from(new Set(availables));
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }
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
    async (tid, button, payTypeId) => {
      console.log('button', button, payTypeId);
      let {
        order,
        actions: { goodsAction },
      } = this.props;
      if (button == '提货码') {
        Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${tid}` });
        // this.props.actions.goodsAction.commonChange('main.ztCode', writeOffCode)
        return;
      }
      //0元订单去付款直接跳转到付款成功页
      if (
        button == '去付款' &&
        (order.tradePrice.totalPrice == 0 || order.tradePrice.balancePrice === order.tradePrice.totalPrice)
      ) {
        //直接调默认支付接口
        goodsAction.defaultPay(tid);
      }
      if (
        button == '去付款' &&
        payTypeId == 0 &&
        order.tradePrice.totalPrice != 0 &&
        order.tradePrice.balancePrice != order.tradePrice.totalPrice
      ) {
        let url = `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`
        if ([0, 1, 2].includes(order.tongKaShuKeTradeType)) {
          url += `&ordersource=${tongKaShuKeTradeTypeMap[order.tongKaShuKeTradeType]}`
        }
        await Taro.navigateTo({ url: url });
      } else if (
        button == '去付款' &&
        payTypeId == 1 &&
        order.tradePrice.totalPrice != 0 &&
        order.tradePrice.balancePrice != order.tradePrice.totalPrice
      ) {
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment/index?tid=${tid}`,
        });
      } else if (button == '取消订单') {
        this.props.actions.goodsAction.cancelOrder(tid);
      } else if (button == '确认收货') {
        Taro.navigateTo({
          url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=${0}`,
        });
      } else if (button === '申请退款' || button === '退货退款') {
        // goodsAction.applyRefund(tid);
        // 判断如果是电子卡券订单或者虚拟商品订单的话，跳转到联系商家页面
        if (order?.orderTag?.electronicCouponFlag || order?.orderTag?.virtualFlag) {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/virtual-goods-return/index?storeId=${order.supplier.storeId}`,
          });
        } else {
          goodsAction.applyRefund(tid);
        }
      } else if (button == '支付定金' && payTypeId == 0 && order.tradePrice.totalPrice != 0) {
        await Taro.navigateTo({
          url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}&isBookingSaleGoods=true`,
        });
      } else if (button == '支付尾款' && payTypeId == 0) {
        await Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${tid}` });
      } else if (button == '物流信息') {
        const isLinkedMall = order.thirdPlatformTypes && order.thirdPlatformTypes[0] === 0
        let flag;
        order.tradeDelivers.map(({ logistics }) => {
          if (logistics && logistics.logisticNo == order.tradeDelivers[0].logistics.logisticNo) {
            flag = true;
          } else {
            flag = false;
          }
        });

        (order.tradeItems.length == 1 &&
          order.tradeItems[0].num == 1 &&
          order.tradeDelivers.length == 1 &&
          order.tradeDelivers[0].logistics) ||
          (order.tradeItems.length == 1 && flag)
          ? isLinkedMall ? Taro.navigateTo({
            url: `/pages/package-C/order/logistics-info/index?oid=${order?.id}&tid=${order?.tradeDelivers[0]?.deliverId}&thirdPlatformType=0&thirdPlatformOrderId=${order.tradeDelivers[0].logistics.thirdPlatformOrderId}&buyerId=${order.tradeDelivers[0].logistics.buyerId}`,
          }) : Taro.navigateTo({
            url: `/pages/package-C/order/logistics-info/index?oid=${order?.id}&tid=${order?.tradeDelivers[0]?.deliverId}`,
          })
          : Taro.navigateTo({ url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=0` });
      } else if (button === '核销码') {
        Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${tid}` });
      }
    },
    500,
    { leading: true },
  );
  renderXuanKuaItem = (item, index) => {
    const xuanKuaFlag = item.xuanKuaDramaTrade ? 'Drama' : item.xuanKuaMovieTrade ? 'Movie' : item.xuanKuaLifeTrade ? 'Life' : null;
    // console.log('xuanKuaFlag', item.xuanKuaLifeTrade);

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
  getTongKaImg = (item) => {
    const type = item.tongKaShuKeTradeType === 2 ? 'dingdong' : item.tongKaShuKeTradeType === 1 ? 'meituan' : item.tongKaShuKeTradeType === 0 ? 'sam' : null;
    switch (type) {
      case 'dingdong':
        return dingdongIcon
      case 'meituan':
        return meituanIcon
      case 'sam':
        return samIcon
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

  renderRechargeStatus = (order, state) => {
    const isZhiChong = order.tradeItems.some(e => e.goodsType === 6)
    if (!isZhiChong) return <View />
    const kaGuanZhiChongStatus = order.tongKaShuKeTrade.kaGuanZhiChongStatus
    const iconName = kaGuanZhiChongStatus == '5' ? 'wancheng' : 'a-chongzhizhong_huaban1'
    const iconColor = kaGuanZhiChongStatus == '5' ? '#00C25A' : 'var(--themeColor)'
    return (
      <Text className='rechargeStatus' style={{ color: iconColor }}>
        <IconFont color={iconColor} size={14} className='iconfonts' value={iconName} />
        {order.tongKaShuKeTrade.kaGuanZhiChongStatusName || '待充值'}
      </Text>
    )
  }

  render() {
    let { main, order, index, inviteeShopName } = this.props;
    const { maxNum } = this.state;
    const opeBtnArr = this.getOpeBtnArr(immutable.fromJS(main.orders[index]));
    const gifts = (order && order.gifts) || [];
    gifts.forEach((gift) => {
      gift.isGift = true;
    });
    const endTime =
      order && order.orderTimeOut && !moment(order.orderTimeOut).isBefore(main.serverTime)
        ? moment(order.orderTimeOut)
        : null;
    //商品清单展示形式  0:普通 1: 明细
    order.type = main.orderListType;
    let state = flowState(order.tradeState.flowState, order.tradeState.payState, order.paymentOrder)
    const isZhiChongOrCoupon = order.tradeItems.some(e => [6, 7].includes(e.goodsType))
    if (isZhiChongOrCoupon) {
      if (['待发货', '已收货', '待收货', '已完成'].includes(state)) state = '已完成'
    }

    return (
      <View>
        <View className="user-box" key={order.id}>
          <View
            className="user-order-item"
            onClick={async() => {
              // 直冲 or 卡券 跳详情
              if ([3, 4].includes(order.tongKaShuKeTradeType)) {
                Taro.navigateTo({ url: `/pages/package-C/order/order-detail/index?id=${order.id}` });
              } else if (order.xuanKuaTradeFlag) {
                const url = order.orderQueryUrl || order.xuanKuaMovieTrade.orderQueryUrl
                if (__TARO_ENV === 'h5') {
                  window.location.href = url;
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
            <View className='order-info'>
              <Text className='order-info-text'>{dayjs(order.tradeState.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
              <Text className='order-info-text'>订单号: {order.id}</Text>
            </View>
            <View className="user-order-item-link">
              {WMkit.inviteeId() && WMkit.isShop() ? (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <View className="dinapu">
                    <Text className="name">
                      {order.storeBagsFlag == 1 ? inviteeShopName : `${order.distributorName}的${order.shopName}`}
                    </Text>
                  </View>
                  <Image className="icon" src={require('../img/jiantou.png')} />
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
                    {order.supplier.isSelf == true && !order.xuanKuaTradeFlag && !order.tongKaShuKeTrade ? <Label name="自营" type="gold" /> : null}
                    <View className="dian-pu">
                      <Text className="store-title">{this.renderStoreName(order)}</Text>
                    </View>
                    {this.getTag(order.deliverWay, order.pickupFlag, order.orderTag, order)}
                    {!order.xuanKuaTradeFlag && !order.tongKaShuKeTrade ? <Image className="icon" src={require('../img/jiantou.png')} /> : null}
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
                  {state}
                </View>
              )}
            </View>
            {order.type == 0 ? (
              <View className="middle">
                <View className="pic">
                  {order
                    ? order.tradeItems
                      .concat(gifts)
                      .filter((val, index) => index < 4)
                      .map((item, index) => (
                        <Image className="img-item" key={index} src={item.pic ? item.pic : order.tongKaShuKeTradeNo ? this.getTongKaImg(order) : noneImg} />
                      ))
                    : null}
                </View>
                <View className="right">
                  {order ? order.tradeItems.concat(gifts).length : null}
                  <Image className="icon" src={require('../img/jiantou.png')} />
                </View>
              </View>
            ) : (!order.xuanKuaTradeFlag && !order.tongKaShuKeTradeNo || [3, 4].includes(order.tongKaShuKeTradeType)) ? (
              <View className="middle-detail">
                {order
                  ? order.tradeItems
                    .concat(gifts)
                    .filter((val, index) => index < maxNum)
                    .map((item, index) => (
                      <View className="product-item" key={index}>
                        <Image className="img-item" src={item.pic ? item.pic : noneImg} />
                        <View style={{ maxWidth: '100%', alignItems: 'flex-start' }} className='cw'>
                          <View className="content">
                            <View className="content-detail">
                              <View className="name">{item.thirdPlatformType != null && (
                                <View className="marketing">
                                  <Text className="market-text">{Const.thirdPlatformTypeList[item.thirdPlatformType]}</Text>
                                </View>
                              )}{item.skuName}</View>
                              <View className="specDetails">{item.specDetails ? item.specDetails : ''}</View>
                            </View>
                            <View className="content-right">
                              {
                                !order.showGoodsPriceFlag && (
                                  <View className="price">
                                    <Price
                                      price={item.isGift ? 0 : _.addZero(item.price)}
                                      buyPoint={item.isGift ? 0 : item.buyPoint}
                                    />
                                  </View>
                                )
                              }

                              <View className="number">{'x' + item.num}</View>
                            </View>
                          </View>
                          {item.goodsType === 3 ? (
                            <View className="deliverWrap">
                              <Text className="deliverTag">配送时间</Text>
                              <Text className="deliverTime">
                                {getDeliverFormat(item.deliveryDate, item.deliveryStartTime, item.deliveryEndTime)}
                              </Text>
                            </View>
                          ) : null}
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
                {/* <View className="price">
                  <View style={{flexDirection: 'row'}}>
                    <PriceAll
                      price={_.addZero(order.tradePrice.totalPrice)}
                      sum={order.tradeItems.concat(gifts).length}
                    />
                  </View>
                </View> */}

                <View style={{ flexDirection: 'row' }}>
                  {endTime &&
                    order.tradeState.payState == 'NOT_PAID' &&
                    order.tradeState.flowState != 'VOID' &&
                    order.tradeState.auditState != 'NON_CHECKED' ? (
                      <View className="doajishi">
                        <Text className="count-text">支付倒计时：</Text>
                        <CountDown
                          timeStyle={{ margin: 0 }}
                          visibleSecond
                          visible={endTime && main.serverTime}
                          endHandle={() => {
                            let state = null;
                            //tab切换后返回需要重新选中之前的tab
                            const order_list_tab = Taro.getStorageSync('order_list_tab');
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

                <View className="price" style={{ marginLeft: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <PriceAll
                      price={_.addZero(order.tradePrice.totalPrice)}
                      sum={order.tradeItems.concat(gifts).length}
                    />
                  </View>
                </View>
              </View>
              <View className='footer'>
                {this.renderRechargeStatus(order, state)}
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
                              prelistFlag
                              showTimeDays
                              endHandle={() => {
                                let state = null;
                                //tab切换后返回需要重新选中之前的tab
                                const order_list_tab = Taro.getStorageSync('order_list_tab');
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
                          className={
                            availableButton == '去付款'
                              ? 'btn btn-warning'
                              : availableButton == '支付定金'
                                ? 'btn btn-warning'
                                : 'btn'
                          }
                          onClick={() => this._operationButtons(order.id, availableButton, order.payInfo.payTypeId)}
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
      </View>
    );
  }
}
