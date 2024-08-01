import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMButton from '@/pages/common/button';

type IBottomProps = T.IProps & T.IBottomProps;

@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, any> {
  constructor(props: IBottomProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      // main: { invoiceForm, isEdit },
      main,
    } = this.props;
    return (
      <View className="user_invoice_bottom">
        {main?.invoiceForm.checkState === 0 ? (
          <View className="bottom">
            <WMButton size="large" theme="primary" disabled>
              提交
            </WMButton>
          </View>
        ) : main?.isEdit || main?.invoiceForm.checkState === null ? (
          <View
            className="bottom"
            onClick={() => {
              action.saveCustomerInvoice();
            }}
          >
            <WMButton size="large" theme="primary">
              提交
            </WMButton>
          </View>
        ) : (
          <View
            className="bottom"
            onClick={() => {
              action.changeIsEdit();
            }}
          >
            <WMButton size="large" theme="primary">
              编辑
            </WMButton>
          </View>
        )}
        {/*{invoiceForm.checkState!==0 && isEdit?*/}
        {/*<View className="bottom"  onClick={()=>{action.saveCustomerInvoice()}}>*/}
        {/*<WMButton size="large" theme="primary">*/}
        {/*提交*/}
        {/*</WMButton>*/}
        {/*</View>*/}
        {/*:*/}
        {/*<View className="bottom"  onClick={()=>{action.changeIsEdit()}}>*/}
        {/*<WMButton size="large" theme="primary">*/}
        {/*编辑*/}
        {/*</WMButton>*/}
        {/*</View>*/}
        {/*}*/}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
