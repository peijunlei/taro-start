import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-refund-reason.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import RadioBox from '@/pages/common/form/radio-box';
import BottomBox from '../../bottom-box';
type IReturnRefundReasonProps = T.IProps & T.IReturnRefundReasonProps;

@connect<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState>(store2Props, actions)
export default class ReturnRefundReason extends Component<
  Partial<IReturnRefundReasonProps>,
  T.IReturnRefundReasonState
> {
  constructor(props: IReturnRefundReasonProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  /**  * 退货退款原因  */
  render() {
    let {
      actions: {
        action: {changeFromValue},
      },
      main,
    } = this.props;
    return (
      <BottomBox
        title="选择退货原因"
        isShow={main.isShowRefundReasonBox}
        onClose={() => {
          changeFromValue('isShowRefundReasonBox', false);
        }}
      >
        <ScrollView className="returnRefundReason">
          {main?.returnReasonList && main?.returnReasonList.length > 0 && (
            <RadioBox
              data={main?.returnReasonList}
              checked={main?.selectedReturnReason}
              onCheck={(v) => {
                changeFromValue('selectedReturnReason', v);
              }}
            />
          )}
        </ScrollView>
      </BottomBox>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
