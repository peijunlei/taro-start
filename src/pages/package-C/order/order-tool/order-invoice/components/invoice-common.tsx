import {Image, Input, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';

type IInvoiceCommonProps = T.IProps & T.IInvoiceCommonProps;

@connect<Partial<IInvoiceCommonProps>, T.IInvoiceCommonState>(store2Props, actions)
export default class InvoiceCommon extends Component<Partial<IInvoiceCommonProps>, T.IInvoiceCommonState> {
  constructor(props: IInvoiceCommonProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {
        commonCheck: {invoiceType, invoiceTitle, invoiceIdentification},
        commonProjects,
        commonCheckProjectId,
      },
    } = this.props;
    return (
      <View className="invoiceCommon">
        <View className="invoice-common-item">
          <Text className="invoice-title">发票信息</Text>
          <View className="invoice-item">
            <Text className="invoice-label">发票信息</Text>
            <View className="invoice-check-box">
              {['个人', '单位'].map((v, key) => {
                return (
                  <View
                    key={key}
                    className="invoice-check"
                    onClick={async () => {
                      action.commonChange('main.commonCheck.invoiceType', key);
                    }}
                  >
                    <Image className="check-image" src={invoiceType === key ? check : uncheck} />
                    <Text className="check-label">{v}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {//单位
          Boolean(invoiceType) && (
            <View>
              <View className="invoice-item">
                <Text className="invoice-label">发票抬头</Text>
                <Input
                  value={invoiceTitle}
                  placeholder="请填写单位全称"
                  className="invoice-input"
                  onInput={(e) => {
                    action.commonChange('main.commonCheck.invoiceTitle', e.detail.value);
                  }}
                />
              </View>

              <View className="invoice-item">
                <Text className="invoice-label">纳税人识别号</Text>
                <Input
                  value={invoiceIdentification}
                  placeholder="填写错误将不能作为税收凭证或无法报销"
                  className="invoice-input"
                  onInput={(e) => {
                    action.commonChange('main.commonCheck.invoiceIdentification', e.detail.value);
                  }}
                />
              </View>
            </View>
          )}
        </View>

        <View className="invoice-common-item">
          <Text className="invoice-title">开票项目</Text>
          {commonProjects.map((v, key) => {
            const bool = commonCheckProjectId === v.projectId || commonCheckProjectId === key;
            return (
              <View
                className="invoice-item"
                key={v.projectId}
                onClick={async () => {
                  await action.commonChange('main.commonCheckProjectId', v.projectId);
                }}
              >
                <Text className="invoice-label">{v.projectName}</Text>
                <View className="invoice-check-box">
                  <Image className="check-image" src={bool ? check : uncheck} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
