import React, { Component } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components';
import AddressList from './components/address-list';
import SelectMap from './components/select-map';
import { connect } from 'react-redux';
import actions from './actions';
import { cache } from 'config';
import { store2Props } from './selectors';
import SearchHeader from './components/seach-header';
import { msg } from 'wmkit';
import * as T from './type';
@connect(store2Props, actions)
export default class SelectAddressMap extends Component<Partial<T.IProps>, any> {
  constructor(props){
    super(props);
    msg.on({
      selectCityPage: async () => {
        // let { address,from } = getCurrentInstance().router.params || {};
        // console.log('---address---2>', from);
        // address = address && JSON.parse(address);
        // await this.props.actions.init(address,from);
        // msg.emit('change-map-location');
      },
    });
  }
  async componentDidShow() {
    let { address,from } = getCurrentInstance().router.params || {};
    address = address && JSON.parse(address);
    await this.props.actions.init(address,from);
  }

  render() {
    let { main } = this.props;
    if (!main) return null
    return (
      <View className="_page">
        <View style={{ height: '100vh', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <SearchHeader />
          <SelectMap />
          <AddressList addressList={main.isShowMap ? main.nearAddress : main.selectNearAddress} isNearAddressList={main.isShowMap} />
        </View>
      </View>
    );
  }
}
