import {View, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {Button, Input, Modal} from '@wanmi/ui-taro';

import * as T from '../types';
import './credit-repay.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ReturnDetail from './returnDetail';
import {_} from 'wmkit';

type ICreditRepayingProps = T.IProps & T.ICreditRepayingProps;

@connect<Partial<ICreditRepayingProps>, T.ICreditRepayingState>(store2Props, actions)
export default class Info extends Component<Partial<ICreditRepayingProps>, T.ICreditRepayingState> {
  constructor(props: ICreditRepayingProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="online">
        <View className="online-state">
          <ReturnDetail title="订单状态" DetailState={'还款中'} isColor={true} />
        </View>
        <View className="online-state">
          <ReturnDetail
            title="授信额度"
            DetailState={_.addZero(main?.customerCreditRepayVO?.creditAmount)}
            isMoney={true}
          />
          <ReturnDetail
            title="剩余待还"
            DetailState={_.addZero(main?.customerCreditRepayVO?.totalRepayAmount)}
            isMoney={true}
          />
        </View>
        <View className="online-state">
          <ReturnDetail
            title="已经关联订单"
            DetailState={main?.tradeVOList?.length || 0}
            icon={true}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-A/customer/credit-associate-order/index?repayOrderCode=${main?.customerCreditRepayVO.repayOrderCode}`,
              });
            }}
          />
          <ReturnDetail
            title="订单还款金额"
            DetailState={_.addZero(main?.customerCreditRepayVO?.repayAmount)}
            isMoney={true}
            isColor={true}
          />
        </View>
        <View className="online-state">
          <ReturnDetail title="还款说明" />
          <View className="Repayment-instructions">
            <Text className="mess-text">{main?.customerCreditRepayVO?.repayNotes}</Text>
          </View>
        </View>
        <View className="bottom">
          <View className="bottom-center">
            <View className="left">
              <Button
                size="large"
                type="white"
                onClick={async () => {
                  action.commonChange('main.isCanceled', true);
                }}
              >
                取消还款
              </Button>
            </View>
            <View className="right">
              <Button
                size="large"
                onClick={() => {
                  action.checkRepay();
                }}
              >
                下一步
              </Button>
            </View>
          </View>
        </View>
        <Modal
          type="default"
          visible={main?.isCanceled}
          onCancel={async () => action.commonChange('main.isCanceled', false)}
          onOk={async () => {
            action.onCancelRepay();
          }}
          title="确认取消还款？"
          content="取消后本次还款信息将作废"
        />
      </View>
    );
  }
}
