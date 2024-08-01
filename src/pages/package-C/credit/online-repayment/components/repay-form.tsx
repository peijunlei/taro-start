import {View, Text, Image, Textarea} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {Button} from '@wanmi/ui-taro';
import React, {Component} from 'react';

import * as T from '../types';
import './repay-form.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import arrowIcon from '@/assets/image/common/arrow.png';
import {_} from 'wmkit';

type IRepayFormProps = T.IProps & T.IRepayFormProps;

@connect<Partial<IRepayFormProps>, T.IRepayFormState>(store2Props, actions)
export default class RepayForm extends Component<Partial<IRepayFormProps>, T.IRepayFormState> {
  constructor(props: IRepayFormProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main) {
      return;
    }
    let {customerCreditRepayVO, onlineRepay} = main;

    return (
      <View className="repay-form">
        <View className="block-view">
          <View className="repay-form-item">
            <View className="inner-item">
              <View className="left">授权额度</View>
              <View className="price">￥{_.addZero(customerCreditRepayVO.creditAmount)}</View>
            </View>
          </View>
          <View className="repay-form-item">
            <View className="inner-item">
              <View className="left">剩余待还</View>
              <View className="price">￥{_.addZero(customerCreditRepayVO.totalRepayAmount)}</View>
            </View>
          </View>
        </View>

        <View className="block-view">
          <View className="repay-form-item">
            <View className="inner-item">
              <View className="left">关联订单</View>
              <View
                className={onlineRepay?.orderIds?.length > 0 ? 'select-center' : 'select-center select-center-none'}
                onClick={() => action.toRelatedOrder()}
              >
                {onlineRepay?.orderIds?.length > 0 ? onlineRepay.orderIds.length : '请选择'}
              </View>
              <Image src={arrowIcon} className="select-right" />
            </View>
          </View>
          <View className="repay-form-item">
            <View className="inner-item">
              <View className="left">订单还款金额</View>
              <View className="price-a">￥{_.addZero(onlineRepay.repayAmount)}</View>
            </View>
          </View>
        </View>

        <View className="repay-form-item-pad">
          <View className="item-title">还款说明</View>

          <Textarea
            placeholderStyle="font-weight:400"
            className="wm-textarea"
            value={onlineRepay.repayNotes}
            placeholder="请输入，500字以内"
            maxlength={500}
            onInput={(e) => {
              action.commonChange('main.onlineRepay.repayNotes', e.detail.value);
            }}
          />
        </View>

        <View className="btn_box">
          <View className="register-btn">
            <View className="btn btn-primary" onClick={() => action.saveOnlineRepay()}>
              下一步
            </View>
          </View>
        </View>
      </View>
    );
  }
}
