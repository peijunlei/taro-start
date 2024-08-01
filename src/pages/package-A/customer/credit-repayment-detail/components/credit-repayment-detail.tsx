import {View, Button, Text, Image, Textarea} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import moment from 'dayjs';
import * as T from '../types';
import './credit-repayment-detail.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
type ICreditRepaymentDetailProps = T.IProps & T.ICreditRepaymentDetailProps;

@connect<Partial<ICreditRepaymentDetailProps>, T.ICreditRepaymentDetailState>(store2Props, actions)
export default class CreditRepaymentDetail extends Component<
  Partial<ICreditRepaymentDetailProps>,
  T.ICreditRepaymentDetailState
> {
  constructor(props: ICreditRepaymentDetailProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {key, status, creditDetailInfo} = main;
    return (
      main && (
        <View className="credit-repayment-detail">
          <View className="credit-repayment-status">
            <View className="credit-repayment-font">还款状态</View>
            <View className={creditDetailInfo?.repayStatus == 2 ? '' : 'credit-repayment-status-font'}>
              {creditDetailInfo?.repayStatus == 0 ? '还款中' : creditDetailInfo?.repayStatus == 1 ? '已还款' : '已作废'}
            </View>
          </View>

          <View className="credit-repayment-detail-order">
            <View className="credit-repayment-row">
              <View className="credit-repayment-font">还款单号</View>
              <View className="credit-repayment-font">{creditDetailInfo?.repayOrderCode}</View>
            </View>
            <View className="credit-repayment-row">
              <View className="credit-repayment-font">还款方式</View>
              <View className="credit-repayment-font">
                {creditDetailInfo?.repayType == 'UNIONPAY'
                  ? '银联'
                  : creditDetailInfo?.repayType == 'WECHAT'
                  ? '微信'
                  : creditDetailInfo?.repayType == 'ALIPAY'
                  ? '支付宝'
                  : '-'}
              </View>
            </View>
            <View className="credit-repayment-row">
              <View className="credit-repayment-font">还款时间</View>
              {creditDetailInfo?.repayTime ? (
                <View className="credit-repayment-font">
                  {moment(creditDetailInfo?.repayTime).format('YYYY-MM-DD')}
                </View>
              ) : (
                <View style={{color: '#999999'}}>-</View>
              )}
            </View>
          </View>

          <View className="credit-repayment-detail-order">
            <View
              className="credit-repayment-row"
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/package-A/customer/credit-associate-order/index?repayOrderCode=${creditDetailInfo.repayOrderCode}`,
                })
              }
            >
              <View className="credit-repayment-font">已经关联订单</View>
              <View className="credit-repayment-img">
                <Text className="credit-repayment-font">{creditDetailInfo?.orderNum}</Text>
                <Image src={require('../img/right.png')} style={{width: '12px', height: '12px'}} />
              </View>
            </View>
            <View className="credit-repayment-row">
              <View className="credit-repayment-font">订单还款金额</View>
              <View className="credit-repayment-status-font">￥{_.addZero(creditDetailInfo?.repayAmount)}</View>
            </View>
          </View>

          <View className="credit-repayment-detail-order">
            <View className="credit-repayment-explain">还款说明</View>
            <View className="credit-repayment-explain-detail">{creditDetailInfo?.repayNotes || '无'}</View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
