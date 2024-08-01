import {QRCode} from 'taro-code';
import React, {Component} from 'react';
import Taro from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {_} from 'wmkit';
import Phone from '../img/phone.png';
import Time from '../img/time.png';
import Location from '../img/location2.png';
import './order-zt-location.less';

type POJO<T = any> = {[key: string]: T};

export interface IOrderZTLocation {
  distance: number;
  pickSettingInfoVo?: POJO;
  consignee?: POJO;
}

export default class OrderZTLocation extends Component<IOrderZTLocation> {
  getFullAddress = () => {
    const {pickSettingInfoVo} = this.props;
    const {provinceName = '', cityName = '', areaName = '', streetName = '', pickupAddress = ''} = pickSettingInfoVo;
    return `${provinceName}${cityName}${areaName}${streetName || ''}${pickupAddress}`;
  };

  getConsigneer = () => {
    const {consignee} = this.props;
    if (!consignee) return '';
    const {phone = ''} = consignee;
    const displayPhone = `${phone.substr(0, 3)}****${phone.substr(7)}`;
    return `${consignee.name}   ${displayPhone}`;
  };

  phoneClick = () => {
    const {pickSettingInfoVo} = this.props;
    const {areaCode, phone} = pickSettingInfoVo;
    const next = _.isPhoneNumber(phone) ? phone : `${areaCode}${phone}`;
    if (!next) return;
    Taro.makePhoneCall({
      phoneNumber: next,
      fail: (e) => {
        if (e?.errMsg?.includes('makePhoneCall:fail cancel')) {
          return;
        }
        Taro.showToast({
          title: e.errMsg,
          duration: 1500,
          icon: 'none',
        });
      },
    });
  };

  render() {
    const {pickSettingInfoVo, distance} = this.props;
    const distanceNew = pickSettingInfoVo.distance || distance;
    if (!pickSettingInfoVo) return null;
    return (
      <View className="zt-location-cover">
        <View className="location-row location-address-row ">
          <Text className="location-address">
            <Text className="pickupLocaiton">自提点</Text>
            {pickSettingInfoVo.name}
          </Text>
          <View className="location-phone-cover" onClick={this.phoneClick}>
            <Image mode="aspectFit" className="location-phone" src={Phone} />
          </View>
        </View>
        <View className="location-row-box-address">
          <View className="location-row">
            <Image mode="aspectFit" className="icon" src={Location} />
            <Text className="location-detail">{this.getFullAddress()}</Text>
            {!!distanceNew && !isNaN(distanceNew) && (
              <Text className="distance-detail">
                距您{distanceNew > 1000 ? (distanceNew / 1000).toFixed(1) + 'km' : distanceNew + 'm'}
              </Text>
            )}
          </View>
        </View>
        <View className="location-row location-time-box">
          <Image mode="aspectFit" className="icon" src={Time} />
          {/* <Text className="location-title">自提时间</Text>
          <View className="detail">
            <Text className="location-detail2">{pickSettingInfoVo.remark}</Text>
          </View> */}
          <Text className="time-detail">自提时间: {pickSettingInfoVo.remark}</Text>
        </View>
      </View>
    );
  }
}
