import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import Price from '@/pages/common/goods/price';
import * as T from '../types';
import '../css/price-footer.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';

type IPriceFooterProps = T.IProps & T.IPriceFooterProps;

@connect<Partial<IPriceFooterProps>, T.IPriceFooterState>(store2Props, actions)
export default class PriceFooter extends Component<Partial<IPriceFooterProps>, T.IPriceFooterState> {
  constructor(props: IPriceFooterProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;

    if (!main?.myStore) {
      return;
    }

    return (
      <View className="priceFooter">
        <View className="price-left">
          <Text className="price-key">
            订单金额：
            <Text className="points-icon">{main.myStore?.totalPoints}</Text>
            <Text className='point-test-bug'>积分</Text>
          </Text>
        </View>

        <View
          className="confirm-btn"
          onClick={async () => {
            await action._checkIsPayPwdValid();
          }}
        >
          <Text className="confirm-text">提交订单</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
