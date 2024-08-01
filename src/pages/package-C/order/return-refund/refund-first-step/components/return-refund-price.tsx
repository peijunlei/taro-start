import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import '../../css/return-refund-price.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMButton from '@/pages/common/button';
import Price from '@/pages/common/goods/price';

type IReturnRefundPriceProps = T.IProps & T.IReturnRefundPriceProps;

@connect<Partial<IReturnRefundPriceProps>, T.IReturnRefundPriceState>(store2Props, actions)
export default class ReturnRefundPrice extends Component<Partial<IReturnRefundPriceProps>, T.IReturnRefundPriceState> {
  constructor(props: IReturnRefundPriceProps) {
    super(props);
  }

  /**  * 退货退款底部  */
  render() {
    let {
      actions: {
        action: {applyReturns},
      },
      main,
    } = this.props;

    return (
      <View className="returnRefundPrice">
        <View className="price-row">
          应退金额:
          <Price price={main?.totalPrice} />
        </View>
        <View className="price-row">
          应退积分:
          {main?.tradePoints === 0 ? (
            <Text className="integral-text">0</Text>
          ) : (
            <Text className="integral-text">{main?.tradePoints}</Text>
          )}
        </View>
        <WMButton
          theme="primary"
          style={{marginRight: '8px', color: '#ffffff', padding: '8px 30px'}}
          size="small"
          onClick={() => {
            applyReturns();
          }}
          checked={false}
        >
          提交
        </WMButton>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
