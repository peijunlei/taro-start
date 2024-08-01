import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './invoice-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IInvoiceTabProps = T.IProps & T.IInvoiceTabProps;
const INVOICETAB = {
  '0': '不需要发票',
  '1': '普通发票',
  '2': '增值税专用发票',
};

@connect<Partial<IInvoiceTabProps>, T.IInvoiceTabState>(store2Props, actions)
export default class InvoiceTab extends Component<Partial<IInvoiceTabProps>, T.IInvoiceTabState> {
  constructor(props: IInvoiceTabProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main: {tabType, tabInit},
    } = this.props;

    return (
      <View className="invoiceTab">
        {tabInit.map((v, key) => {
          const isSelect = key + 1 === tabType;
          const [tabItem, tabItemText] = this._getItemStyle(isSelect);
          return v ? (
            <View
              key={key}
              className={tabItem}
              onClick={async () => {
                // action.commonChange('main.tabType', key + 1);
                action.changeInvoiceTab(key + 1);
              }}
            >
              <Text className={tabItemText}>{INVOICETAB[key]}</Text>
            </View>
          ) : null;
        })}
        <View />
      </View>
    );
  }

  _getItemStyle = (isSelect) => {
    return [
      ['invoice-tab-item', isSelect ? 'invoice-tab-item-active' : ''].join(' '),
      ['invoice-tab-item-text', isSelect ? 'invoice-tab-item-text-active' : ''].join(' '),
    ];
  };
}

//create by moon https://github.com/creasy2010/moon
