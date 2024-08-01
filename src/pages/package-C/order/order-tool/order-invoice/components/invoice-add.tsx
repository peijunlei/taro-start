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
import InvoiceAddress from '@/pages/package-C/order/order-tool/order-invoice/components/invoice-address';

type IInvoiceAddProps = T.IProps & T.IInvoiceAddProps;

@connect<Partial<IInvoiceAddProps>, T.IInvoiceAddState>(store2Props, actions)
export default class InvoiceAdd extends Component<Partial<IInvoiceAddProps>, T.IInvoiceAddState> {
  constructor(props: IInvoiceAddProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {customerInvoiceResponse},
    } = this.props;

    return (
      <View className="invoiceAdd">
        <View className="invoice-common-item">
          <Text className="invoice-title">发票信息</Text>
          {[
            ['单位全称', 'companyName'],
            ['纳税人识别号', 'taxpayerNumber'],
            ['注册电话', 'companyPhone'],
            ['注册地址', 'companyAddress'],
            ['银行基本户号', 'bankNo'],
            ['开户行', 'bankName'],
          ].map((item, index) => {
            const [name, val] = item;
            return (
              <View className="invoice-item" key={index}>
                <Text className="invoice-label">{name}</Text>
                <Text className="invoice-value">{customerInvoiceResponse[val]}</Text>
              </View>
            );
          })}
        </View>

        <View className="invoice-common-item" style={{paddingTop: 0}}>
          <View>
            <View className="invoice-little-box">
              <Text className="invoice-title" style={{paddingBottom: 0}}>
                开票项目
              </Text>
              <Text className="invoice-little">增值税专用发票只支持明细</Text>
            </View>
            <View className="invoice-item">
              <Text className="invoice-label">明细</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
