import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/deposit.less';
import '../css/index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import FormSwitch from '@/pages/common/form/form-switch';

type IDepositProps = T.IProps & T.IDepositProps;

@connect<Partial<IDepositProps>, T.IDepositState>(store2Props, actions)
export default class Deposit extends Component<Partial<IDepositProps>, T.IDepositState> {
  constructor(props: IDepositProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {isBookingSaleGoods, isCommit} = main;
    return (
      isBookingSaleGoods && (
        <View className="deposit">
          <View className="order-confirm-store-item">
            <View>
              <Text className="order-item-label ">同意支付定金</Text>
              <Text className="order-item-label deposit-tag">预售商品，定金不退噢</Text>
            </View>
            <FormSwitch
              title=""
              checked={isCommit}
              onChange={(bool) => {
                action.commonChange([{paths: 'main.isCommit', value: !isCommit}]);
              }}
            />
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
