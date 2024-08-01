import { View, Image, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { OrderWrapper, immutable } from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import './header.less'

@connect(store2Props, actions)
export default class Header extends Component<any, any> {


  state = {
    keywords: '',
  };


  render() {
    let { main = {}, actions = {} } = this.props;
    const {
      defaltAddress
    } = main;
    const { action } = actions;

    return (
      <View className="gift-card-header">
        <View
          className="address"
          onClick={async () => {
            await action._savaLocal();
            await Taro.navigateTo({
              url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'shopCardAddress'}`,
            });
          }}
        >
          <Image className="addressIcon" src={require('@/assets/image/gift-card/map.png')} />
          <Text
            // className={defaltAddress && defaltAddress.needComplete ? 'acceptAddressSmall' : 'addressText'}
            className="addressText"
          >
            {defaltAddress ? defaltAddress.addressInfo || defaltAddress.deliveryAddress : '点击新增收货地址'}
          </Text>
        </View>

        <View className="search">
          <View className="content">
            <Image src={require('@/assets/image/gift-card/search.png')} className="searchImg" />
            <Input
              className="searchText"
              type="text"
              placeholder="搜索活动内商品"
              value={decodeURI(this.state.keywords)}
              maxlength={100}
              onInput={(e) => {
                this.setState({ keywords: e.detail.value });
              }}
              onConfirm={(e) => {
                action.searchGoodsList(e.detail.value);
                // action._search(e.detail.value);
              }}
            />
            <View
              onClick={() => {
                action.searchGoodsList(this.state.keywords);
              }}
            >
              <Text className="search-text">搜索</Text>
            </View>
          </View>

        </View>



        {/* {defaltAddress && defaltAddress.needComplete && (
          <View className="remindTip" style={{ flexDirection: 'row' }}>
            <Text className="remindText">请完善收货地址</Text>
          </View>
        )} */}
      </View>
    );
  }
}
