import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {debounce} from 'lodash';
import {OrderWrapper, immutable} from 'wmkit';
import * as T from '../types';
import './order-bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import moment from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
moment.extend(isSameOrBefore);
type OrderStatusProps = T.IProps & T.OrderStatusProps;
const DELIVERY_STATUS = {
  NOT_YET_SHIPPED: '未发货',
  PART_SHIPPED: '部分发货',
  SHIPPED: '全部发货',
  FAIL: '发货失败',
};

@connect<Partial<OrderStatusProps>, T.OrderStatusState>(store2Props, actions)
export default class OrderBottom extends Component<Partial<OrderStatusProps>, T.OrderStatusState> {
  constructor(props: OrderStatusProps) {
    super(props);
  }

  render() {
    return <View>{this.renderHtml()}</View>;
  }

  renderHtml = () => {
    if (!this.props.main) return;
    let {
      actions: {action},
      main,
      main: {tid, pointsOrder, promotionOrder, usePoint},
    } = this.props;
    const opeBtnArr = this.getOpeBtnArr(immutable.fromJS(main.detail));
    let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));

    let tailStartTime, tailEndTime;
    if (main.detail && JSON.stringify(main.detail) != '{}') {
      const tradeState = main.detail.tradeState;
      tailStartTime = tradeState.tailStartTime;
      tailEndTime = tradeState.tailEndTime;
    }
    let html: JSX.Element[] | JSX.Element;
    if (main.detail && opeBtnArr.available.length > 0) {
      if (!main.pointsOrder) {
        if (opeBtnArr != undefined) {
          html = opeBtnArr.available.map((availableButton) => {
            let buttonHtml;
            if (availableButton == '支付尾款') {
              if (!moment(tailStartTime).isSameOrBefore(main.serverTime)) {
                buttonHtml = (
                  <View
                    key={availableButton}
                    className="btn btn-disabled"
                    onClick={(e) => {
                      e.stopPropagation();
                      this._operationButtons1(orderWrapper.orderNo(), availableButton);
                    }}
                  >
                    <CountDown
                      allowFontScaling={false}
                      numberOfLines={1}
                      groupFlag={false}
                      prelistFlag
                      showTimeDays
                      endHandle={() => {
                        // this.props.actions.init(tid, pointsOrder, promotionOrder, usePoint)
                        //刷新当前页，解决同一页面有多个倒计时
                        Taro.redirectTo({url: `/pages/package-C/order/order-detail/index?id=${tid}`});
                      }}
                      timeOffset={moment(tailStartTime).diff(moment(main.serverTime), 's').toFixed(0)}
                    />
                    <View className="buyText">后支付尾款</View>
                  </View>
                );
              }
              if (moment(tailStartTime).isSameOrBefore(main.serverTime)) {
                buttonHtml = (
                  <View className="btn-deposit" key={availableButton}>
                    <CountDown
                      allowFontScaling={false}
                      numberOfLines={1}
                      groupFlag={false}
                      prelistFlag
                      showTimeDays
                      endHandle={() => {
                        this.props.actions.init(tid, pointsOrder, promotionOrder, usePoint);
                      }}
                      timeStyle={{color: '#ff6600'}}
                      timeOffset={moment(tailEndTime).diff(moment(main.serverTime), 's').toFixed(0)}
                    />
                    <View className="buyText">后关闭尾款支付通道</View>
                    <View
                      className="btn btn-countdown"
                      onClick={() =>
                        this._operationButtons(orderWrapper.orderNo(), availableButton, orderWrapper.payId())
                      }
                    >
                      {availableButton}
                    </View>
                  </View>
                );
              }
            }

            if (availableButton != '支付尾款') {
              buttonHtml = (
                <View
                  className="btn"
                  onClick={() => this._operationButtons(orderWrapper.orderNo(), availableButton, orderWrapper.payId())}
                >
                  {availableButton}
                </View>
              );
            }
            return buttonHtml;
          });
        }
      } else {
        if (opeBtnArr != undefined) {
          html = opeBtnArr.available.map((availableButton) => {
            return (
              <View
                key={availableButton}
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  this._operationButtons1(orderWrapper.orderNo(), availableButton);
                }}
              >
                {availableButton}
              </View>
            );
          });
        }
      }
    }
    return html ? (
      <View className="btn_height">
        <View className="btn_box">
          <View className="order-details-button">
            <View className="order-button-wrap ">{html}</View>
          </View>
        </View>
      </View>
    ) : null;
  };
  /**
   * 订单可用操作按钮
   */
  getOpeBtnArr(order) {
    let orderButtons = {
      available: [],
      id: '',
    };

    if (order?.size) {
      const flow = order.getIn(['tradeState', 'flowState']);
      const pay = order.getIn(['tradeState', 'payState']);

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
      ];
      //确认收货
      const confirmButtons = [
        ['DELIVERED', 'NOT_PAID'],
        ['DELIVERED', 'PAID'],
        ['DELIVERED', 'UNCONFIRMED'],
      ];

      // 是否可退标识
      let canReturnFlag = order.get('canReturnFlag') && ![1, 2].includes(order.getIn(['tradePrice', 'giftCardType']));
      const isDangaoss = order.getIn(['orderTag', 'dangaossOrderFlag']);
      

      //待支付定金
      const presaleDepositButtons = [['WAIT_PAY_EARNEST', 'NOT_PAID']];
      //待支付尾款
      const presaleBalanceButtons = [
        ['WAIT_PAY_TAIL', 'PAID_EARNEST'],
        ['AUDIT', 'PAID_EARNEST'],
      ];

      if (order.getIn(['tradeState', 'flowState']) == 'GROUPON') {
        // 待成团单，不展示退货退款
        canReturnFlag = false;
      } else {
        const tradeItems = order.get('tradeItems');
        if (tradeItems.every(e => e.get('goodsType') == 3) && tradeItems.every((e) => e.get('num') === e.get('deliveredNum') || e.get('canReturnNum') === 0)) {
          canReturnFlag = false;
        }
        // 卡券/直冲的不展示退货退款
        if (tradeItems.some(e => [6, 7].includes(e.get('goodsType')))) {
          canReturnFlag = false
        }
      }

      let availables = [];
      let showFirdeBtn =
        order.toJS()?.tradeState?.flowState == 'VOID' || order.toJS()?.tradeState?.flowState == 'COMPLETED';

      if (payButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('去付款');
      }
      if (presaleDepositButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('支付定金');
      }
      if (presaleBalanceButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('支付尾款');
      }

      if (cancelButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
        availables.push('取消订单');
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
      if(isDangaoss){
        canReturnFlag = false
      }
      const sameCity = [['AUDIT', 'PAID']];
      // 同城配送已付款未发货支持退货退款，已经发货未完成不支持退货退款，已完成状态支持退货退款
      const sameCityFlag =
        order.toJS().deliverWay != 2 ||
        order.toJS()?.tradeState?.flowState == 'COMPLETED' ||
        sameCity.filter((button) => this._calc(button)(flow, pay)).length > 0;
      if (order.toJS()?.orderTag?.virtualFlag) {
        if (
        canReturnFlag &&
          sameCityFlag &&
          virtualApplyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
          availables.push('退货退款');
        }
      } else {
        if (canReturnFlag &&
          sameCityFlag &&
          applyReturnButtons.filter((button) => this._calc(button)(flow, pay)).length > 0) {
          availables.push('退货退款');
        }
      }

      if (
        !(order.toJS()?.orderTag?.electronicCouponFlag || order.toJS()?.orderTag?.virtualFlag) &&
        (DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '部分发货' ||
          DELIVERY_STATUS[order.getIn(['tradeState', 'deliverStatus'])] == '全部发货')
      ) {
        !showFirdeBtn && getCurrentInstance().router.params.type !== 'pointsOrder' && availables.push('物流信息');
      }

      let confirmGoods = confirmButtons.filter((button) => this._calc(button)(flow, pay)).length > 0;
      if (confirmGoods && !(order.toJS()?.orderTag?.electronicCouponFlag || order.toJS()?.orderTag?.virtualFlag)) {
        availables.push('确认收货');
      }

      const pickupFlag = order.get('pickupFlag');
      if (pickupFlag && !(order.toJS()?.orderTag?.electronicCouponFlag || order.toJS()?.orderTag?.virtualFlag)) {
        availables.push('确认收货');
        availables = Array.from(new Set(availables));
      }
      if (pickupFlag && !this.checkOrderCanComfirn(order)) {
        const index = availables.indexOf('确认收货');
        if (index > -1) availables.splice(index, 1);
      }
      orderButtons['available'] = availables;
      orderButtons['id'] = order.get('id');
    }
    return orderButtons;
  }

  checkOrderCanComfirn = (order: any) => {
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
   * 订单操作按钮event handler
   */
  _operationButtons1 = async (tid, button) => {
    if (button == '确认收货') {
      Taro.navigateTo({
        url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=${0}`,
      });
    }
  };
  /**
   * 订单操作按钮event handler
   */
  _operationButtons = debounce(
    async (tid, button, payTypeId) => {
      const current = getCurrentInstance();
      const url = __TARO_ENV === 'h5' ? current?.page?.path : current?.router?.path;
      if (url.indexOf('/pages/package-C/order/order-detail/index') === -1) {
        return;
      }
      let {
        main,
        main: {isPayBalance},
        actions: {action},
      } = this.props;
      let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));
      let orderTag = orderWrapper.orderTag();
      //应付金额
      let actualPrice = orderWrapper.totalPrice();
      if (button == '取消订单') {
        this.props.actions.action.cancelOrder(tid);
      } else if (button == '确认收货') {
        Taro.navigateTo({
          url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=${0}`,
        });
      } else if (
        button == '去付款' &&
        (actualPrice == '0.00' || main.detail?.tradePrice?.balancePrice === main.detail?.tradePrice?.totalPrice)
      ) {
        //0元素订单直接调默认支付接口
        await action.defaultPay(tid);
      } else if (
        button == '去付款' &&
        payTypeId == '0' &&
        actualPrice != '0.00' &&
        main.detail?.tradePrice?.balancePrice != main.detail?.tradePrice?.totalPrice
      ) {
        Taro.navigateTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`});
      } else if (
        button == '去付款' &&
        payTypeId == '1' &&
        actualPrice != '0.00' &&
        main.detail?.tradePrice?.balancePrice != main.detail?.tradePrice?.totalPrice
      ) {
        Taro.navigateTo({
          url: `/pages/package-C/order/fill-payment/index?tid=${tid}`,
        });
      } else if (button === '退货退款') {
        // await action.applyRefund(tid);
        const isChangeAccountFlag = main.detail?.isChangeAccountFlag;
        if(isChangeAccountFlag){
          Taro.showToast({
            title: '手机号码已变更，如需退货退款请联系客服。',
            icon: 'none',
            duration: 2000,
          });
          return
        }
        if (orderTag?.toJS()?.electronicCouponFlag || orderTag?.toJS()?.virtualFlag) {
          Taro.navigateTo({
            url: `/pages/package-C/order/return-refund/virtual-goods-return/index?storeId=${main.detail.supplier.storeId}`,
          });
        } else {
          await action.applyRefund(tid);
        }
      } else if (button == '支付定金' && payTypeId == 0 && actualPrice != '0.00') {
        Taro.navigateTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}&isBookingSaleGoods=true`});
      } else if (button == '支付尾款' && payTypeId == 0) {
        if (isPayBalance) {
          Taro.navigateTo({url: `/pages/package-C/order/order-tool/order-pay/index?tid=${tid}`});
        } else {
          this.props.actions.action.payBalance(tid);
        }
      } else if (button == '物流信息') {
        const order = this.props.main.detail
        const isLinkedMall = order.thirdPlatformTypes&&order.thirdPlatformTypes[0]===0
        let flag;
        this.props.main.detail?.tradeDelivers.map(({logistics}) => {
          if (logistics && logistics.logisticNo == this.props.main.detail.tradeDelivers[0].logistics.logisticNo) {
            flag = true;
          } else {
            flag = false;
          }
        });
        // 不知道VOP场景这块会不会走/order/ship-record/index，后面走到这块场景的话把参数带上
        (this.props.main.detail.tradeItems.length == 1 &&
          this.props.main.detail.tradeItems[0].num == 1 &&
          this.props.main.detail.tradeDelivers.length == 1 &&
          this.props.main.detail.tradeDelivers[0].logistics) ||
        (this.props.main.detail.tradeItems.length == 1 && flag)
          ?isLinkedMall? Taro.navigateTo({
            url: `/pages/package-C/order/logistics-info/index?oid=${order?.id}&tid=${order?.tradeDelivers[0]?.deliverId}&thirdPlatformType=0&thirdPlatformOrderId=${order.tradeDelivers[0].logistics.thirdPlatformOrderId}&buyerId=${order.tradeDelivers[0].logistics.buyerId}`,
          }): Taro.navigateTo({
              url: `/pages/package-C/order/logistics-info/index?oid=${this.props.main.detail?.id}&tid=${this.props.main.detail?.tradeDelivers[0]?.deliverId}&thirdPlatformOrderId=${this.props.main.thirdPlatformOrderId}&thirdPlatformType=${this.props.main.thirdPlatformType}`,
            })
          : Taro.navigateTo({
              url: `/pages/package-C/order/ship-record/index?tid=${tid}&type=0&thirdPlatformOrderId=${this.props.main.thirdPlatformOrderId}&thirdPlatformType=${this.props.main.thirdPlatformType}`,
            });
      }
    },
    500,
    {leading: true},
  );
}
