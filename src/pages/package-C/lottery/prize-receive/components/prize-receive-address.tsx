import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './prize-receive-address.less';
import header from '../img/address-header.png';
import arrow from '@/assets/image/common/arrow.png';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {addressInfo} from '@/utils/location/area/area';

type IPrizeReceiveAddressProps = T.IProps & T.IPrizeReceiveAddressProps;

@connect<Partial<IPrizeReceiveAddressProps>, T.IPrizeReceiveAddressState>(store2Props, actions)
export default class PrizeReceiveAddress extends Component<
  Partial<IPrizeReceiveAddressProps>,
  T.IPrizeReceiveAddressState
> {
  constructor(props: IPrizeReceiveAddressProps) {
    super(props);
  }

  render() {
    let {
      main,
      actions: {action},
      main: {detail, phone, prizeInfo},
    } = this.props;
    const {provinceName = '', cityName = '', areaName = '', streetName = '', deliveryAddress = '', consigneeName = ''} =
      main?.address || {};
    return (
      prizeInfo?.prizeType === 2 && (
        <View className="address">
          <Image mode="aspectFit" className="address-header" src={header} />
          <View
            className="address-con"
            onClick={async () => {
              await action._savaLocal();
              await Taro.navigateTo({
                url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=prize-recevice-address`,
              });
            }}
          >
            <View className="address-content">
              <View style={{flexDirection: 'column'}}>
                <Text className="address-name" decode>
                  {deliveryAddress
                    ? `${
                        (provinceName + provinceName != cityName ? cityName : '') +
                        ( areaName + streetName + deliveryAddress)
                      }`
                    : '点击新增收货地址'}
                </Text>
                <Text className="address-val" decode>
                  {deliveryAddress ? `${consigneeName}  ${phone}` : ''}
                </Text>
              </View>
              <Image mode="aspectFit" className="address-arrow" src={arrow} />
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
