import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import OrderStatus from './components/order-status';
import OrderBuyerInfo from './components/order-buyer-info';
import OrderBody from './components/order-body';
import OrderBottom from './components/order-bottom';
import tip from '../order-confirm/img/presale.png';
import { immutable, msg, OrderWrapper } from 'wmkit';
import WMLoading from '@/pages/common/loading';
import { getHashParam } from '@/utils/common-functions';
import ZTCode from './components/order-zt-code';
import OrderZTLocation from './components/order-zt-location';
import { PrivacyModal } from '@/pages/common';
import ConfirmMask from './components/confirm-mask';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class OrderDetail extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    msg.on({
      'payment-leave': () => {
        this._initFun();
      },
    });
  }

  componentWillMount(): void {
    Taro.removeStorageSync('mini::returnSuccessBackFlag');
  }

  componentDidShow() {
    this._initFun();
  }


  async componentWillUnmount() {
    this.props.actions.clean();
    getCurrentInstance().router;
    Taro.removeStorageSync('confirm:split:info');
    //清空缓存
    await this.props.actions.action._cleanLoacl();
  }

  render() {
    let { main, actions } = this.props;
    if (!main) return null;
    let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));
    let orderTag = orderWrapper.orderTag();
    let thirdObsoleteReason = orderWrapper.thirdObsoleteReason();
    return (
      <View className="packageCOrderDetail">
        {main?.isThirdPlatform && (
          <View className="tip-info">
            <Image src={tip} className="tip-info-image"></Image>
            <Text className="tip-info-text">订单包含需要向供应商采购的商品，如采购失败会进行自动退款</Text>
          </View>
        )}
        {thirdObsoleteReason && (
          <View className="tip-info">
            <Text className="tip-info-text">订单推送失败原因：{thirdObsoleteReason}</Text>
          </View>
        )}
        <View className="orderDetailScroll">
          {/*订单状态*/}
          <OrderStatus />
          {/* 自提码 */}
          {this.renderZTCode()}
          {/* 自提点信息 */}
          {this.renderZTLocation()}

          {/*收货人信息*/}
          <OrderBuyerInfo />

          {/*订单主体*/}
          <OrderBody />
        </View>
        {/*操作按钮,推广订单详情不展示操作按钮*/}
        {!main?.promotionOrder && <OrderBottom />}
        {main?.isLoadingFlag && <WMLoading />}
        <PrivacyModal />
        <ConfirmMask maskInfo={main.maskInfo} onConfirm={() => {
          actions.action.commonChange('main.maskInfo', null)
          actions.action.getRestrictedGoodsList()
        }} />

      </View>
    );
  }

  renderZTCode = () => {
    let { main } = this.props;
    let orderWrapper = OrderWrapper(immutable.fromJS(main.detail));
    let orderTag = orderWrapper.orderTag();
    if (!main || !main.detail) return null;
    if (!main.detail.pickupFlag && !orderTag?.toJS()?.virtualFlag) return null;
    const detail = immutable.fromJS(main.detail);
    if (detail.get('isReturn')) return null;
    const writeOffInfo = detail.get('writeOffInfo');
    if (!writeOffInfo) return null;
    const writeOffCode = writeOffInfo.get('writeOffCode');
    if (!writeOffCode) return null;

    let isInWaitSendOrWaitReceive = false;
    const status = detail.getIn(['tradeState', 'flowState']);
    const payState = detail.getIn(['tradeState', 'payState']);
    const writeOffStatus = detail.getIn(['writeOffInfo', 'writeOffStatus']);
    if (status == 'GROUPON') {
      if (payState == 'PAID') isInWaitSendOrWaitReceive = true;
    } else if (status == 'AUDIT' || status == 'DELIVERED_PART') {
      isInWaitSendOrWaitReceive = true;
    } else if (status == 'DELIVERED') {
      isInWaitSendOrWaitReceive = true;
    }
    if (writeOffStatus == 1) isInWaitSendOrWaitReceive = false;
    if (detail.get('paymentOrder') === 'PAY_FIRST' && ['UNCONFIRMED', 'NOT_PAID'].includes(payState)) return null;
    if (detail.get('tradeGroupon')) {
      if (detail.getIn(['tradeGroupon', 'grouponOrderStatus']) != 2) return null;
    }
    const tradeItems = detail.get('tradeItems');
    const pluginType = tradeItems.first().get('pluginType'); //跨境直邮商品只有 0，1，o2o商品为2
    if (pluginType == 2) {
      // o2o
      if (payState == 'PAID' && isInWaitSendOrWaitReceive)
        return <ZTCode text={writeOffCode} isVirtualFlag={orderTag?.toJS()?.virtualFlag} />;
    } else {
      if (isInWaitSendOrWaitReceive)
        return <ZTCode text={writeOffCode} isVirtualFlag={orderTag?.toJS()?.virtualFlag} />;
    }
    return null;
  };

  renderZTLocation = () => {
    let { main } = this.props;
    if (!main || !main.detail) return null;
    if (main.detail.pickupFlag) {
      const pickSettingInfo = main.detail.pickSettingInfo;
      const consignee = main.detail.consignee;
      const distance = main.distance;
      return <OrderZTLocation distance={distance} pickSettingInfoVo={pickSettingInfo} consignee={consignee} />;
    }
    return null;
  };

  _initFun = async () => {
    let { main } = this.props;
    let tid = getCurrentInstance().router.params
      ? getCurrentInstance().router.params.id
      : main?.param
      ? main?.param.id
      : '';
    let pointsOrder = getCurrentInstance().router.params
      ? getCurrentInstance().router.params.type == 'pointsOrder'
      : main?.param.type == 'pointsOrder'; //积分商城的兑换列表的订单进入
    let promotionOrder = getCurrentInstance().router.params
      ? getCurrentInstance().router.params.type == 'promotionOrder'
      : main?.param.type == 'promotionOrder'; //推广订单进入
    if (__TARO_ENV === 'h5' && getCurrentInstance().router.params) {
      this.props.actions.action.commonChange('main.param', getCurrentInstance().router.params);
    }
    let usePoint = main?.points?.usePoint;
    await this.props.actions.init(tid, pointsOrder, promotionOrder, usePoint);

    await this.props.actions.action.saveTid(tid);
    //缓存处理
    await this.props.actions.action._getLoacl();
    //积分初始化
    await this.props.actions.action._pointInit();
    this.props.actions.action.calcSplitInfo();
  };
}
