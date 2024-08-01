import {View, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import './index.less';
import Footer from './footer';
import {msg} from 'wmkit';
import ShopCart from '@/pages/common/shop-cart';

export default class PackageBDistributionStoreSocialCShopCartC extends React.Component<any, any> {
  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true,
    });
    msg.emit('shopCart-C');
  }

  componentDidShow() {
    msg.emit('shopCart-C');
  }

  render() {
    let {main} = this.props;

    return (
      <View className="social-index">
        <ScrollView className="shopCartBox">
          <ShopCart isFromC />
        </ScrollView>
        <Footer current={1} />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
