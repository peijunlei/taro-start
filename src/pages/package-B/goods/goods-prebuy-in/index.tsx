import {View, Button, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import gif from '@/assets/image/goods/rushQuene.gif';
import BuyList from './components/buy-list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GoodsBuyIn extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true,
    });
  }
  componentDidMount() {
    let {appointmentSaleId, num, skuId} = getCurrentInstance().router.params;
    this.props.actions.init(appointmentSaleId, num, skuId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="goodsBuyIn">
        <BuyList />
        {/* gif */}
        <Image src={gif} className="gif" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
