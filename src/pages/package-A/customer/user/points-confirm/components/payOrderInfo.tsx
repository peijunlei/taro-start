import {Image, Input, Text, View} from '@tarojs/components';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/store.less';
import '../css/index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PictureCom from './picture-com';
import {_} from 'wmkit';

type IStoreItemProps = T.IProps & T.IStoreItemProps;

@connect<Partial<IStoreItemProps>, T.IStoreItemState>(store2Props, actions)
export default class Store extends Component<Partial<IStoreItemProps>, T.IStoreItemState> {
  constructor(props: IStoreItemProps) {
    super(props);
  }

  render() {
    let {
      main = {
        orderList: {
          isVirtualGoods: false,
        },
      },
    } = this.props;
    const orderList = main.orderList;
    return (
      <View className="confirm-store">
        <View className="order-store-item">
          <Text className="order-item-label">支付配送</Text>
          <View className="store-item-right">
            <Text className="item-text">在线支付</Text>
            <Text className="item-text">{orderList.isVirtualGoods ? '无需配送' : '快递配送'}</Text>
          </View>
        </View>

        {/* <View className="order-store-item">
          <Text className="order-item-label">发票信息</Text>
          <View className="store-item-right">
            <Text className="item-text">暂不支持</Text>
          </View>
        </View> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
