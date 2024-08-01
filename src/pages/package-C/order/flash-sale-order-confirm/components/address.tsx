import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '@/pages/package-C/order/flash-sale-order-confirm/css/address.less';
import header from '../img/address-header.png';
import arrow from '@/assets/image/common/arrow.png';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import remind from '@/assets/image/common/remind.png';

type IAddressProps = T.IProps & T.IAddressProps;

@connect<Partial<IAddressProps>, T.IAddressState>(store2Props, actions)
export default class Address extends Component<Partial<IAddressProps>, T.IAddressState> {
  constructor(props: IAddressProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    const consigneeNumber = main?.orderList.address && main?.orderList.address.consigneeNumber;
    const phone = consigneeNumber
      ? consigneeNumber.toString().slice(0, 3) + '****' + consigneeNumber.toString().slice(7, 11)
      : '';
    const detail = main?.orderList.address.addressInfo;
    return (
      <View className="falshSaleOrderConfirm__address order-confirm__address">
        <Image className="address-header" src={header} />

        <View
          className="address-con"
          onClick={async () => {
            await action._savaLocal();
            await Taro.navigateTo({
              url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'confirmAddress'}`,
            });
          }}
        >
          <View className="address-content">
            <View>
              <Text className="address-name">
                {main?.orderList.address && main?.orderList.address.deliveryAddress
                  ? main?.orderList.address.deliveryAddress
                  : '地址为空'}
              </Text>
              <Text className="address-val" decode={true}>
                {main?.orderList.address && main?.orderList.address.deliveryAddress
                  ? `${detail} ${phone}`
                  : '点击新增收货地址'}
              </Text>
              {main?.orderList.address && main?.orderList.address.needComplete && (
                <View className="remindTip">
                  <Image src={remind} className="remindIcon" />
                  <Text className="remindText">请完善收货地址</Text>
                </View>
              )}
            </View>
            <Image className="address-arrow" src={arrow} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
