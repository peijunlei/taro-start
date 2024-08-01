import React, { Component } from 'react';
import { View, Map, Text, ScrollView } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import './address-list.less';
import { connect } from 'react-redux';
import actions from '../actions';
import { store2Props } from '../selectors';
import { cache } from 'config';
import noneImg from '@/assets/image/empty/search-empty.png';
import Blank from '@/pages/common/blank';

import { _, AMapService } from 'wmkit'


//@ts-ignore
@connect(store2Props, actions)
export default class AddressList extends Component<any, any> {
  // 点击地址的回调
  _onClickAddress = async (item) => {
    let {
      actions: { action },
    } = this.props;
    action.showSearchWord(null);
    const codeArr = {
      areaId: item.adcode,
      cityId: item.adcode.substring(0, 4) + '00',
      provinceId: item.pcode,
      streetId: item.towncode || '',
      latitude: item.location.lat,
      longitude: item.location.lng
    };
    const res = await AMapService.geocoder({
      latitude: item.location.lat,
      longitude: item.location.lng,
    });
    console.log('res', item, res)
    // 省市区街道
    const pname = res.regeocode.addressComponent.province
    const cname = res.regeocode.addressComponent.city?.length === 0 ? '' : res.regeocode.addressComponent.city
    const aname = res.regeocode.addressComponent.district
    const sname = res.regeocode.addressComponent.township
    const address = res ? `${pname}${cname}${aname}${sname}` : _.getAddressStr(item);
    Taro.setStorageSync(cache.CODE_ARR, codeArr);
    Taro.setStorageSync(cache.SELECT_ADDRESS, address);
    Taro.setStorageSync(cache.SELECT_HOUSE_NUM, item.name);
    Taro.setStorageSync(cache.CACHE_CURRENT_CITY, { addrName: item.cityname, addrId: codeArr.cityId });
    const homeFlag = Taro.getStorageSync(cache.CACHE_HOME_FLAG)
    if (homeFlag) {
      Taro.setStorageSync(cache.CURRENT_POSITION, { latitude: codeArr.latitude, longitude: codeArr.longitude });
      Taro.setStorageSync(cache.CACHE_POSITION_CITY, { addrName: item.cityname, addrId: codeArr.cityId });
    }

    //跳转收货地址页
    Taro.navigateBack({
      delta: 1, // 返回上一级页面。
    });
  };
  // 北京市 110000 上海市 310000 天津市 120000 重庆市 500000       
  render() {
    let { addressList, isNearAddressList, searchWord } = this.props;
    const elements = [];
    addressList.forEach((item) => {
      elements.push(
        <View
          className="address-container"
          onClick={() => {
            this._onClickAddress(item);
          }}
        >
          <View className="address-name">
            {item.name?.split(`${searchWord}`)[0]}
            <Text className="address-name" style={{ color: 'var(--themeColor)' }}>
              {item.name?.split(`${searchWord}`)?.length > 1 && searchWord}
            </Text>
            {item.name?.split(`${searchWord}`)[1]}
          </View>
          <View className="address-address">{_.getAddressStr(item)}</View>
        </View>,
      );
    });

    return (
      //搜索框和地图固定，地址信息列表滚动，需添加高度
      <ScrollView className={`address-list ${isNearAddressList ? 'map' : 'search'}`} scrollY>
        <View>{elements}</View>
        {addressList.length > 0 && (
          <View style={{ color: '#939497', fontSize: '12px', textAlign: 'center', margin: '12px' }}>没有更多了</View>
        )}
        {
          !isNearAddressList&&addressList.length === 0 && (
            <Blank
              style={{ paddingTop: 0, position: 'absolute', top: '30%', width: '100%' }}
              content="暂无数据"
              img={noneImg}
            />
          )
        }
      </ScrollView>
    );
  }
}
