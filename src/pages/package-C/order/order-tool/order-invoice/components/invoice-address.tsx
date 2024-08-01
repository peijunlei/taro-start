import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FormSwitch from '@/pages/common/form/form-switch';
import FormSelect from '@/pages/common/form-select';
import address from '@/assets/image/shop-cart/address.png';
import arrow from '@/assets/image/common/arrow.png';
import {addressInfo} from '@/utils/location/area/area';

type IInvoiceAddressProps = T.IProps & T.IInvoiceAddressProps;

@connect<Partial<IInvoiceAddressProps>, T.IInvoiceAddState>(store2Props, actions)
export default class InvoiceAddress extends Component<Partial<IInvoiceAddressProps>, T.IInvoiceAddState> {
  constructor(props: IInvoiceAddressProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {customerInvoiceResponse, isAddressAlone, invoiceAddress = {}},
    } = this.props;

    const consigneeNumber = invoiceAddress.consigneeNumber;
    const phone = consigneeNumber
      ? consigneeNumber.toString().slice(0, 3) + '****' + consigneeNumber.toString().slice(7, 11)
      : '';

    let item = invoiceAddress.addressInfo;
    console.log('item', item);

    return (
      <View className="invoiceAdd">
        <View className="invoice-common-item cut-invoice-address">
          <View className="invoice-item" style={{height: 'auto'}}>
            <Text className="invoice-title cut-title">使用单独的发票收货地址</Text>
            <FormSwitch
              title=""
              checked={isAddressAlone}
              onChange={(bool) => {
                action.commonChange('main.isAddressAlone', bool);
              }}
              style={__TARO_ENV === 'h5' ? {marginRight: 0} : {marginRight: '-5px'}}
            />
          </View>

          <View
            onClick={async () => {
              await Taro.navigateTo({
                url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'invoiceAddress'}`,
              });
            }}
          >
            {//未选择收货地址
            isAddressAlone && !invoiceAddress.deliveryAddressId && (
              <View className="address-box">
                <View className="address-img">
                  <Image style={{width: 'inherit', height: 'inherit'}} src={address} />
                </View>
                <FormSelect
                  formStyle={__TARO_ENV === 'h5' ? {width: '100%'} : {width: '100%', marginRight: '-5px'}}
                  leftStyle={{fontSize: '12px'}}
                  labelName="选择发票收货地址"
                  placeholder=""
                />
              </View>
            )}

            {//选择了收货地址
            isAddressAlone && invoiceAddress.deliveryAddressId && (
              <View className="address-content">
                <View>
                  <Text className="address-val" decode={true}>
                    {invoiceAddress.consigneeName}&ensp;<Text style={{fontSize: '14px'}}>{phone}</Text>
                  </Text>
                  <Text className="address-name">{item}</Text>
                </View>
                <Image className="address-arrow" src={arrow} />
              </View>
            )}
          </View>
        </View>

        <View className="invoice-bottom" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
