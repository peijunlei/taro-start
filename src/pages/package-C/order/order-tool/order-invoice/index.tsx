import 'taro-ui/dist/style/components/modal.scss';
import {Image, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import InvoiceTab from './components/invoice-tab';
import InvoiceCommon from './components/invoice-common';

import InvoiceAdd from './components/invoice-add';

import NoMask from './components/no-mask';
import InvoiceAddress from '@/pages/package-C/order/order-tool/order-invoice/components/invoice-address';
import {getGlobalData} from '@/service/config';

import InvoiceIcon from '@/assets/image/common/remind.png';
//@ts-ignore
actions().actions.loadReducer();

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderToolOrderInvoice extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    const storeId = getCurrentInstance().router.params.param;
    await this.props.actions.init(storeId);
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }
  async componentDidShow() {
    //地址缓存处理
    await this.props.actions.action._loaclInvoiceAddress();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    const isIphoneX = getGlobalData('isIphoneX');
    return (
      <View className="packageCOrderOrderToolOrderInvoice">
        {main?.configFlag && (
          <View className="invoice-header">
            <Image className="invoice-icon" src={InvoiceIcon} />
            <Text className="invoice-tips">如需增值税专用发票，需提前提交增票资质给工作人员审核</Text>
          </View>
        )}

        <InvoiceTab />

        {main?.tabType === 2 && <InvoiceCommon />}
        {main?.tabType === 3 && <InvoiceAdd />}

        {main?.tabType !== 1 && <InvoiceAddress />}

        <NoMask />

        <View className={isIphoneX ? 'pay-order-con cut-pay-order' : 'pay-order-con'}>
          <View
            className="pay-order-con-btn"
            onClick={async () => {
              await action._saveInvoice();
            }}
          >
            <Text className="pay-order-con-text">保存</Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
