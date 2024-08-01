import {View, Button, Text} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import OrderGiftItem from './components/order-gift-item';

import OrderSkuItem from './components/order-sku-item';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderSkuList extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {tid} = getCurrentInstance().router.params;
    this.props.actions.initReturn(tid);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;
    return (
      <View className="packageCOrderOrderSkuList">
        <OrderSkuItem />
        <OrderGiftItem />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
