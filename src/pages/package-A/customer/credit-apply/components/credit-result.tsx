import {View, Textarea, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './credit-result.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import creditFail from '@/assets/image/customer/credit/credit-fail.png';
import creditIng from '@/assets/image/customer/credit/credit-ing.png';
type IApplyCreditProps = T.IProps & T.IApplyCreditProps;

@connect<Partial<IApplyCreditProps>, T.IApplyCreditState>(store2Props, actions)
export default class CreditResult extends Component<Partial<IApplyCreditProps>, T.IApplyCreditState> {
  constructor(props: IApplyCreditProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const {applyInfo, auditStatus, effectStatus, rejectReason} = main;
    return (
      <View className="CreditResult">
        {auditStatus == '1' && (
          <View className="fail">
            <View className="credit-icon">
              <Image className="credit-image" src={creditFail} />
            </View>
            <View className="credit-result">审核未通过</View>
            <View className="credit-reason">原因是：{rejectReason}</View>
            <View className="credit-desc-state">
              <View className="credit-desc-name">申请说明</View>
              <View className="credit-desc-detail">{applyInfo}</View>
            </View>
          </View>
        )}
        {(auditStatus == '0' || auditStatus == '3') && (
          <View className="credit-wait">
            <View className="credit-icon">
              <Image className="credit-image" src={creditIng} />
            </View>
            <View className="credit-result">审核中</View>
            <View className="credit-reason-ing">您的信息正在审核 请您耐心等待</View>
            <View className="credit-desc-state">
              <View className="credit-desc-name">申请说明</View>
              <View className="credit-desc-detail">{applyInfo}</View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
