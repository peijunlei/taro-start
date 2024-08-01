import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import ShopCart from '@/pages/common/shop-cart';
import {msg} from 'wmkit';
import { cache } from 'config';

// import './index.less';

export default class PackageBsecondShopCartC extends React.Component<any, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }

  componentDidMount() {
    msg.emit('shopCart-C');
  }

  componentDidShow() {
    Taro.removeStorageSync(cache.ORDER_CONFIRM_PARAMS)
    msg.emit('shopCart-C');
  }

  render() {
    return (
      <View className="social-index">
        <ShopCart
          isSecondShopCart
          changeCommonModalProps={{
            chooseStyle: {
              bottom: 0,
            },
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
