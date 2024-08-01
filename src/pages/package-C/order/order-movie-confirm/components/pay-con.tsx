import { Image, Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component, Fragment } from 'react';

import * as T from '../types';
import '../css/pay-con.less';
import '../css/index.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import FormSwitch from '@/pages/common/form/form-switch';
import { _, WMkit } from 'wmkit';
import WMFormInput from '@/pages/common/form-input';
import { getGlobalData } from '@/service/config';
import arrow from '@/assets/image/common/arrow.png';
const isIOS = getGlobalData('isIOS');

type IPayConProps = T.IProps & T.IPayConProps;

@connect<Partial<IPayConProps>, T.IPayConState>(store2Props, actions)
export default class PayCon extends Component<Partial<IPayConProps>, T.IPayConState> {
  constructor(props: IPayConProps) {
    super(props);
    this.state = {
      point: '',
    };
  }

  // componentDidMount(): void {
  //   let {main} = this.props;
  //   this.setState({
  //     inputPoints: main.points.usePoint,
  //   });
  // }

  render() {
    let {
      actions,
      actions: { action },
      main = {},
    } = this.props;
    const {
      points = {},
      localData = {},
      payWay,
      storeBagsFlag,
      price,
      isBookingSaleGoods,
      tailNoticeMobile,
      isPresale,
      canUseCouponsLength,
      offlineStatus,
      openGroupon,
      orderList
    } = (main as any) || {};
    const { deliverType, confirmCoupon = {} } = localData;
    const { totalPoint, pointConfig = {}, showPointInput, maxPoint, usePoint } = points;
    const couponTotalPrice = confirmCoupon.couponTotalPrice ? confirmCoupon.couponTotalPrice : 0;

    const opening = !(totalPoint ? _.sub(pointConfig.overPointsAvailable, totalPoint) > 0 : false);
    const payIndex = payWay.findIndex((f) => f.id == deliverType);
    const isH5 = __TARO_ENV === 'h5';
    return (
      <View className="payCon">
        <View
          className="order-confirm-store-item"
          onClick={async () => {
            if (orderList?.isVirtualGoods) return;
            if (!openGroupon && !isPresale && offlineStatus === 1) await action._urlChange(0, '');
          }}
        >
          <Text className="order-item-label">支付/配送</Text>
          <View className="store-item-right">
            <Text className="item-text">{deliverType >= 0 && payWay[payIndex] && payWay[payIndex].name}</Text>
            {!orderList?.isVirtualGoods && !openGroupon && offlineStatus === 1 && !isPresale && <Image className="arrow-img" src={arrow} />}
          </View>
        </View>
        {/*
        {!storeBagsFlag && (
          <View
            className="order-confirm-store-item"
            onClick={async () => {
              //根据积分参数 在使用优惠券时合并查询佣金
              if (!isBookingSaleGoods) await action._urlChange(1, usePoint);
            }}
          // style={{marginBottom: '10px'}}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text className={`order-item-label ${isH5 && 'order-item-pad'}`}>使用优惠券</Text>
              {canUseCouponsLength > 0 && (
                <View className="order-item-number">
                  <Text className="order-item-number-text">{canUseCouponsLength}张可用</Text>
                </View>
              )}
            </View>

            {isBookingSaleGoods ? (
              <Text className="item-text">尾款阶段可用</Text>
            ) : (
                <View className="store-item-right">
                  <Text className="item-text">
                    ¥{confirmCoupon.couponTotalPrice ? actions._addZero(confirmCoupon.couponTotalPrice) : '0.00'}
                  </Text>
                  <Image className="arrow-img" src={arrow} />
                </View>
              )}
          </View>
        )} */}

        {/**pointsUsageFlag 0 显示 1不显示 */}
        {pointConfig.status == 1 && opening && !(pointConfig.pointsUsageFlag == 1) && (
          <View className="order-confirm-store-item">
            <View className="order-store-point" style={{ marginBottom: 0, width: '80%', marginTop: 0 }}>
              <View className="point-con">
                <Text className="order-item-label">使用积分</Text>
                {/* 定金预售不可用 */}
                {isBookingSaleGoods ? (
                  <Text className="item-text">尾款阶段可用</Text>
                ) : showPointInput ? (
                  <View className="point-box">
                    <Input
                      //修复ios第三方键盘 number 类型 可输入的字符不确定的问题  ios的数字键盘类型改为 idcard
                      type={isIOS ? 'idcard' : 'number'}
                      value={this.state.point.toString()}
                      // 通过value无法控制输入最大值，达到最大依然能够输入，结合长度来控制，默认长度为140
                      maxlength={this.state.point >= maxPoint ? maxPoint.toString().length : 140}
                      onInput={(e) => {
                        const vla = e.detail.value.replace(/[^\d]/g, '');
                        const point = Number(vla) >= maxPoint ? maxPoint : vla ? Number(vla) : '';
                        // // 改变积分， 去除手动选择优惠券，运费券标记，重新调取自动选券接口
                        // await Taro.removeStorageSync('mini::isClickBtn');
                        this.setState({
                          point: point,
                        });
                      }}
                      onBlur={(e) => {
                        const vla = e.detail.value.replace(/[^\d]/g, '');
                        const point = vla >= maxPoint ? maxPoint : +vla;
                        action.commonChange('main.points.usePoint', point);
                        // action._calcFreight();
                        //根据积分查询佣金
                        this._changePoints(e.detail.value, 200);
                      }}
                      className="point-input"
                      placeholder="点击输入"
                    />
                    <Text className="order-item-label" decode>
                      积分&nbsp;&nbsp;&nbsp;抵扣
                    </Text>
                    <Text className="use-point-price">¥{actions._pointToMoney(usePoint)}</Text>
                  </View>
                ) : (
                      <View />
                    )}
              </View>
              {!isBookingSaleGoods && (
                <View
                  className="order-point-con"
                  style={{ flexWrap: 'wrap', lineHeight: '14px', fontSize: '12px', maxHeight: '28px' }}
                >
                  <Text className="item-input-text">共</Text>
                  <Text className="item-input-price">{totalPoint.toFixed(0)}</Text>
                  <Text className="item-input-text">积分，</Text>
                  {showPointInput ? (
                    <Fragment>
                      <Text className="item-input-text">最多可用</Text>
                      <Text className="item-input-price">{maxPoint}</Text>
                      <Text className="item-input-text">积分抵扣</Text>
                      <Text className="item-input-price">¥{actions._pointToMoney(maxPoint)}</Text>
                    </Fragment>
                  ) : (
                      <Fragment>
                        <Text className="item-input-text">达到</Text>
                        <Text className="item-input-price">{pointConfig.overPointsAvailable}</Text>
                        <Text className="item-input-text">积分后</Text>
                        <Text className="item-input-text">可用于</Text>
                        <Text className="item-input-text">下单抵扣</Text>
                      </Fragment>
                    )}
                </View>
              )}
            </View>
            {/* 定金预售不可用 */}
            {!isBookingSaleGoods && (
              <View>
                <FormSwitch
                  title=""
                  checked={showPointInput}
                  style={{ height: '24px' }}
                  disabled={
                    (_.sub(price.totalPrice, couponTotalPrice).toFixed(2) == '0.00' &&
                      confirmCoupon.couponTotalPrice &&
                      actions._addZero(confirmCoupon.couponTotalPrice) != '0.00') ||
                    maxPoint == 0
                  }
                  onChange={(bool) => {
                    action.commonChange([
                      { paths: 'main.points.showPointInput', value: bool },
                      { paths: 'main.points.usePoint', value: 0 },
                    ]);
                    //根据积分查询佣金
                    this._changePoints(0, 500);
                    // 清空输入框
                    this.setState({
                      point: '',
                    });
                  }}
                />
              </View>
            )}
          </View>
        )}
        {isBookingSaleGoods && (
          <View className="order-confirm-store-item" style={{ marginTop: '-25px', marginBottom: '-5px' }}>
            <Text className="order-item-label">尾款通知手机号</Text>
            <View className="store-item-right">
              <WMFormInput
                type="number"
                value={tailNoticeMobile}
                onChange={(e) => {
                  action.commonChange([{ paths: 'main.tailNoticeMobile', value: e }]);
                }}
                underline={false}
                maxlength={11}
                inputStyle={{ textAlign: 'right' }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }

  _changePoints = (value, time) => {
    let timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => this.props.actions.action.getCommission(value), time);
  };
}

//create by moon https://github.com/creasy2010/moon
