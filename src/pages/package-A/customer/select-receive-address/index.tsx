import React, { Component } from 'react';
import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import SearchHeader from './components/search-head';
import AddressMap from './components/address-map';
import { connect } from 'react-redux';
import actions from './actions';
import { store2Props } from './selectors';
import { msg } from 'wmkit';
import * as T from './type';
import AddressList from './components/address-list';

@connect(store2Props, actions)
export default class DeliveryProgress extends Component<Partial<T.IProps>, any> {

  constructor(props) {
    super(props);
    // msg.on({
    //   selectCityPage: async () => {
    //     let { address } = getCurrentInstance().router.params || {};
    //     await this.props.actions.init(address);
    //   },
    // });
  }
  async componentDidShow() {
    let { address, from } = getCurrentInstance().router.params || {};
    await this.props.actions.init(address, from);
  }
  componentDidHide() {
    this.props.actions.action.commonChange('main.searchAddressList',[])
  }
  render() {
    let { main } = this.props;
    if (!main) return null
    return (
      <View className="_page">
        <View>
          <SearchHeader />
          <AddressMap />
          <AddressList addressList={main.isShowMap ? main.nearAddressList : main.searchAddressList} isNearAddressList={main.isShowMap} />
        </View>
      </View>
    );
  }
}
