import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-refund-reason.less';
import actions from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import RadioBox from '@/pages/common/form/radio-box';
import BottomBox from '../../bottom-box';
type IReturnRefundReasonProps = T.IProps & T.IReturnRefundReasonProps;

@connect<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState>(store2Props, actions)
export default class ReturnType extends Component<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState> {
  constructor(props: IReturnRefundReasonProps) {
    super(props);
  }
  static options = {addGlobalClass: true};

  /**
   * 退货方式
   */
  render() {
    let {
      actions: {
        action: {changeFromValue},
      },
      main: {returnWayList, selectedReturnWay, isShowReturnWayBox},
    } = this.props;
    return (
      <BottomBox
        title="退货方式"
        isShow={isShowReturnWayBox}
        onClose={() => {
          changeFromValue('isShowReturnWayBox', false);
        }}
      >
        <View className="returnRefundReason">
          <RadioBox
            data={returnWayList}
            checked={selectedReturnWay}
            onCheck={(v) => {
              changeFromValue('selectedReturnWay', v);
            }}
          />
        </View>
      </BottomBox>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
