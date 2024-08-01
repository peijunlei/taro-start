import { View, Button, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import FormSelect from '@/pages/common/form-select';
import api from 'api';
import moment from 'dayjs';
type IInfoProps = T.IProps & T.IInfoProps;
const FUNDS_TYPE = {
  1: '推广返利',
  2: '余额提现',
  3: '邀新奖励',
  4: '自购返利',
  5: '推广提成',
  6: '余额支付',
  7: '余额支付退款',
  8: '手动增加',
  9: '手动减少',
  10: '手动调整',
  11: '领取红包',
  12: '余额转赠',
  13: '转赠退回',
  14: '积分卡充值',
  15: '储值卡储值',
  16: '积分迁移'
};

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = { addGlobalClass: true };

  render() {
    let { item } = this.props;
    return (
      <View className="detail">
        <View className="detail_box">
          <View className="left-spn">
            <View className="black-text">{FUNDS_TYPE[item.subType]}</View>
            {/*{item.subType == 6 || item.subType == 7 ? (*/}
            {/*<Text className="black-text">{item.businessId}</Text>*/}
            {/*) : null}*/}
            <View className={[2, 6, 9,12].includes(item.subType) ? 'money' : 'red-color'}>
              {this._handReceiptPaymentAmount(item.subType, item.receiptPaymentAmount)}
            </View>
          </View>
          <View className="right-spn">
            <View className="gray-text">{item.businessId || ''}</View>
            <View className="gray-text">{item ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</View>
          </View>
        </View>
      </View>
    );
  }
  _handReceiptPaymentAmount = (subType, receiptPaymentAmount) => {
    let sign = '+';
    if ([2, 6, 9,12].includes(subType)) {
      sign = '-';
    }
    if ([10].includes(subType)) {
      sign = '';
    }
    return sign + '￥' + receiptPaymentAmount.toFixed(2);
  };
}

//create by moon https://github.com/creasy2010/moon
