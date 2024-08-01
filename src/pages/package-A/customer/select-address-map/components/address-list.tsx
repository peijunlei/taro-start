import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import './address-list.less';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { cache } from 'config';
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/empty/search-empty.png';
import { _, AMapService } from 'wmkit';
interface IProps {
  addressList: any[];
  isNearAddressList: boolean;
  searchWord?: string;
}
export default class AddressList extends Component<IProps, any> {


  // 点击地址的回调
  _onClickAddress = async (item) => {
    let location = item.location.split(',');
    let longitude;
    let latitude;
    longitude = Number(location[0]);
    latitude = Number(location[1]);
    const codeArr = {
      areaId: item.adcode,
      cityId: item.citycode,
      provinceId: item.pcode,
      streetId: item.towncode || '',
      longitude: longitude,
      latitude: latitude,
    };
    const res = await AMapService.geocoder({
      latitude,
      longitude,
    });
    console.log('res', item, res)
    // 省市区街道
    const pname = res.regeocode.addressComponent.province
    const cname = res.regeocode.addressComponent.city?.length === 0 ? '' : res.regeocode.addressComponent.city
    const aname = res.regeocode.addressComponent.district
    const sname = res.regeocode.addressComponent.township
    const selectAddress = res ? `${pname}${cname}${aname}${sname}` : _.getAddressStr(item);
    Taro.setStorageSync(cache.CODE_ARR, codeArr);
    Taro.setStorageSync(cache.SELECT_ADDRESS, selectAddress);
    Taro.setStorageSync(cache.SELECT_HOUSE_NUM, item.name);
    Taro.setStorageSync(cache.CACHE_CURRENT_CITY, { addrName: item.cityname, addrId: codeArr.cityId });
    const homeFlag = Taro.getStorageSync(cache.CACHE_HOME_FLAG)
    if (homeFlag) {
      Taro.setStorageSync(cache.CURRENT_POSITION, { latitude: codeArr.latitude, longitude: codeArr.longitude });
      Taro.setStorageSync(cache.CACHE_POSITION_CITY, { addrName: item.cityname, addrId: codeArr.cityId });
    }

    //跳转收货地址页
    await Taro.navigateBack({
      delta: 1, // 返回上一级页面。
    });

  };
  render() {
    let { addressList, isNearAddressList, searchWord } = this.props;
    return (
      <ScrollView className={`address ${isNearAddressList ? 'map' : 'search'}`} scrollY>
        {addressList?.map((item, i) => {
          return (
            <View
              key={i}
              className="address-item"
              onClick={() => {
                this._onClickAddress(item);
              }}
            >
              <View className="address-item-header">
                {item.name?.split(`${searchWord}`)[0]}
                <Text style={{ color: 'var(--themeColor)', fontSize: '14px' }}>
                  {item.name?.split(`${searchWord}`)?.length > 1 && searchWord}
                </Text>
                {item.name?.split(`${searchWord}`)[1]}
              </View>
              <View className="address-item-detail">{_.getAddressStr(item)}</View>
            </View>
          );
        })}
        {addressList?.length > 0 && (
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
