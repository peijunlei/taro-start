import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
import {_} from 'wmkit';
type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  /**

*/
  render() {
    let {main} = this.props;
    let returnPrice = 0;
    main &&
      main.refundOrderResponseList &&
      Object.keys(main.refundOrderResponseList).length > 0 &&
      main.refundOrderResponseList.map((item) => {
        returnPrice += item.returnPrice;
      });

    return (
      main && (
        <View className="finance-info">
          <View className="info-item mt24 mb24">
            应退金额
            <Text className="item-right" style={{color: '#FF6600'}}>
              ￥{this._addZero(returnPrice)}
            </Text>
          </View>

          {main.refundOrderResponseList &&
            main.refundOrderResponseList.map((item) => {
              return (
                <View className="mb24">
                  <View className="info-item">
                    退款方式
                    <Text className="item-right">{item.payType == 0 ? '在线支付' : '线下支付'}</Text>
                  </View>
                  <View className="info-item">
                    收款账户
                    <Text className="item-right">
                      {item.returnAccount == null || item.returnAccount == '' ? '无' : item?.returnAccount}
                    </Text>
                  </View>
                  <View className="info-item">
                    实退金额
                    <Text className="item-right">
                      {main.returnFlowState == 'COMPLETED' ? '￥' + this._addZero(item?.actualReturnPrice) : '无'}
                    </Text>
                  </View>
                  <View className="info-item">
                    退款时间
                    <Text className="item-right">
                      {item.refundBillTime == null || item.refundBillTime == ''
                        ? '无'
                        : moment(item?.refundBillTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Text>
                  </View>
                  <View className="info-item">
                    备注
                    <Text className="item-right">
                      {item?.comment == null || item.comment == '' ? '无' : item?.comment}
                    </Text>
                  </View>
                  <View className="info-item">
                    流水号
                    <Text className="item-right">
                      {main?.returnFlowState == 'COMPLETED' ? item.refundBillCode : '无'}
                    </Text>
                  </View>
                  {main?.pointsIsOpen && (
                    <View className="info-item ">
                      应退积分
                      {item.returnPoints === 0 ? (
                        <Text className="item-right">0</Text>
                      ) : (
                        <Text className="item-right">{item.returnPoints}</Text>
                      )}
                    </View>
                  )}
                  {main?.pointsIsOpen && (
                    <View className="info-item">
                      实退积分
                      <Text className="item-right">
                        {main?.returnFlowState == 'COMPLETED' ? item.actualReturnPoints?.toString() : '无'}
                      </Text>
                    </View>
                  )}
                  <View className="info-item ">
                    应退卡包
                    <Text className="item-right">{'￥' + this._addZero(item?.giftCardPrice)}</Text>
                  </View>
                  <View className="info-item">
                    实退卡包
                    <Text className="item-right">
                      {main?.returnFlowState == 'COMPLETED' ? '￥' + this._addZero(item?.giftCardPrice) : '无'}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      )
    );
  }

  _addZero = (num) => {
    return new Number(num ? num : 0).toFixed(2);
  };
}

//create by moon https://github.com/creasy2010/moon
