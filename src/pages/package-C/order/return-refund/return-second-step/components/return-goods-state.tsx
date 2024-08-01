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
export default class GoodsState extends Component<Partial<IReturnRefundReasonProps>, T.IReturnRefundReasonState> {
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
      main: {returnGoodsStateList, selectReturnState, isShowGoodsStateBox},
    } = this.props;
    return (
      <BottomBox
        title="货物状态"
        isShow={isShowGoodsStateBox}
        onClose={() => {
          changeFromValue('isShowGoodsStateBox', false);
        }}
      >
        <View className="returnRefundReason">
          <RadioBox
            data={returnGoodsStateList}
            checked={selectReturnState}
            onCheck={(v) => {
              changeFromValue('selectReturnState', v);
            }}
          />
        </View>
      </BottomBox>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
