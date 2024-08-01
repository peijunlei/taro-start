import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './top-status.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import statusSuccess from '@/assets/image/common/success.png';
import statusWait from '@/assets/image/common/status-wait.png';
import statusError from '@/assets/image/common/status-error.png';

type ITopStatusProps = T.IProps & T.ITopStatusProps;

@connect<Partial<ITopStatusProps>, T.ITopStatusState>(store2Props, actions)
export default class TopStatus extends Component<Partial<ITopStatusProps>, T.ITopStatusState> {
  constructor(props: ITopStatusProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      // main: {invoiceForm, reviewStatus},
      main,
    } = this.props;
    return (
      <View className="topStatus">
        {main?.invoiceForm.checkState == 0 ? (
          <View className="status">
            <Image src={statusWait} className="status-icon" />
            <View className="status-name">审核中</View>
            <View className="status-info">您无法编辑审核中增票资质</View>
          </View>
        ) : (
          ''
        )}
        {main?.invoiceForm.checkState == 1 ? (
          <View className="status">
            <Image src={statusSuccess} className="status-icon" />
            <View className="status-name">审核通过</View>
            <View className="status-info">您的增票资质已通过审核，可正常使用</View>
          </View>
        ) : (
          ''
        )}
        {main?.invoiceForm.checkState == 2 ? (
          <View className="status">
            <Image src={statusError} className="status-icon" />
            <View className="status-name">审核未通过</View>
            <Text className="status-info">
              原因是：
              {main?.invoiceForm.invalidFlag == '1' ? (
                <Text className="status-info">已作废</Text>
              ) : (
                <Text className="status-info-reason">{main?.invoiceForm.rejectReason}</Text>
              )}
            </Text>
          </View>
        ) : (
          ''
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
