import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './css/index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Address from './components/address';
import Store from './components/store';
import PayCon from './components/pay-con';
import PriceFooter from './components/price-footer';
import PriceCon from './components/price-con';
import ConfirmMask from '@/pages/package-C/order/flash-sale-order-confirm/components/confirm-mask';
import {Modal} from '@wanmi/ui-taro';
import { cache } from 'config';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderConfirm extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    await this.props.actions.action.commonChange('main.mask',{});
    await this.props.actions.action._clearLocal();
    await this.props.actions.init();
    //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
    await this.props.actions.action._switchInit();
    //算运费
    await this.props.actions.action._calcFreight();
  }
  async componentDidHide() {
    // await this.props.actions.action._savaLocal();
    const dangaoPhone = this.props.main.orderList.dangaoPhone
    Taro.setStorageSync(cache.DANGAO_PHONE,dangaoPhone)
  }

  // async componentDidMount() {
  //   Taro.removeStorageSync(cache.MINI_CHOOSE_ADDRESS)
  //   const address = await this.props.actions.action._addressInit();
  //   await this.props.actions.initConfirm(address)
  // }

  async componentDidShow() {
    const flag = Taro.getStorageSync(cache.MINI_CHOOSE_ADDRESS)
    Taro.removeStorageSync(cache.MINI_CHOOSE_ADDRESS)
    if (flag) {
      const address = await this.props.actions.action._addressInit();
      await this.props.actions.initConfirmRefresh(address)
      await this.props.actions.init();
      const dangaoPhone = Taro.getStorageSync(cache.DANGAO_PHONE)||{}
      this.props.actions.action.commonChange('main.orderList.dangaoPhone', dangaoPhone)
    }
    //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
    await this.props.actions.action._switchInit();

    await this.props.actions.action._getLoacl();
    //算运费
    await this.props.actions.action._calcFreight();
    this.props.actions.action.calcSplitInfo();
  }

  async componentWillUnmount() {
    Taro.removeStorageSync(cache.DANGAO_PHONE);
    await this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="flashSaleOrderConfirm">
        <View className="flashSaleOrderConfirm-confirm-con">
          {/*收货地址*/}
          <Address />

          {/*店铺商品详情*/}
          {Boolean(main?.stores && main?.stores.length) &&
            main?.stores.map((store, key) => (
              <Store key={store.supplier.storeId} myStore={store} single={store.length === 1} />
            ))}

          {/*支付 配送*/}
          <PayCon />

          {/*订单金额*/}
          <PriceCon />
        </View>

        {/*提交订单*/}
        <PriceFooter />

        {/*商品失效之类弹窗*/}
        <ConfirmMask />

        <Modal
          type="warning"
          visible={main?.visible}
          onOk={() => {
            action.commonChange('main.visible', false);
            Taro.navigateTo({
              url: `/pages/package-A/customer/receive-address-edit/index?addressId=${
                main.orderList.address.deliveryAddressId
              }&mode=1&localKey=${'confirmAddress'}`,
            });
          }}
          onCancel={() => {
            action.commonChange('main.visible', false);
          }}
          content="收货地址需完善，请重新填写"
          confirmText="立即完善"
          showCancel={false}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
