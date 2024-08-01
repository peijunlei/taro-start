import 'taro-ui/dist/style/components/modal.scss';
import { View, Image, Text } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import './css/index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { msg } from 'wmkit';
import Address from './components/address';
import Store from './components/store';
import PayCon from './components/pay-con';
import PriceFooter from './components/price-footer';
import PriceCon from './components/price-con';
import ConfirmMask from './components/confirm-mask';
import Presale from './components/presale';
import Deposit from './components/deposit';
import Gifts from './components/gift/gift-list';
import tip from './img/presale.png';
import WMLoading from '@/pages/common/loading';
const isH5 = __TARO_ENV==='h5'
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderConfirm extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    let { type, tradeno, source } = getCurrentInstance().router.params;
    // if(source==='webview'&&isH5) return
    this.props.actions.action.commonChange('main.tradeno', tradeno);
    //电影票对接，根据订单号初始化订单
    await this.props.actions.action._clearLocal();
    await this.props.actions.init(tradeno);
    //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
    await this.props.actions.action._switchInit();
    //算运费
    // await this.props.actions.action._calcFreight();
    //积分初始化
    await this.props.actions.action._pointInit();

    //只有立即购买库存初始化
    if (type) {
      await this.props.actions.action._stockInit();
    }
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
  async componentDidHide() {
    await this.props.actions.action._savaLocal();
  }

  async componentDidShow() {
    let { source } = getCurrentInstance().router.params;

    // if(source==='webview'&&isH5) return


    //页面初始化后 去查询一些开关设置 积分设置在积分组件做查询
    await this.props.actions.action._switchInit();

    await this.props.actions.action._getLoacl();
    // //算运费
    // await this.props.actions.action._calcFreight();
    //积分初始化
    await this.props.actions.action._pointInit();
    // //地址初始化
    // var address = await this.props.actions.action._addressInit();
    // await this.props.actions.action.commonChange('main.orderList.address', address);
  }

  async componentWillUnmount() {
    Taro.removeStorage({ key: 'mini::confirmAddress' });
    await this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    const { stores, isThirdPlatform, isPresale, gifts, isLoading } = main || {};
    let { source } = getCurrentInstance().router.params;
    // if(source==='webview'&&isH5) return

    return (
      <View>
        {isLoading && <WMLoading />}
        {stores && Boolean(stores.length) && (
          <View className="packageCOrderOrderConfirm">
            {isThirdPlatform && (
              <View className="tip-info">
                <Image src={tip} className="tip-info-image"></Image>
                <Text className="tip-info-text">订单包含需要向供应商采购的商品，如采购失败会进行自动退款</Text>
              </View>
            )}
            {isPresale && <Presale />}
            <View className="confirm-con">
              {/*收货地址*/}
              {/* <Address /> */}

              {/*店铺商品详情*/}
              {stores &&
                Boolean(stores.length) &&
                stores.map((store, key) => (
                  <Store key={store.supplier.storeId} myStore={store} single={store.length === 1} />
                ))}

              {/*支付 配送*/}
              <PayCon />

              {/*订单金额*/}
              <PriceCon />
              {/* 定金支付 */}
              <Deposit />
            </View>

            {/*提交订单*/}
            <PriceFooter />

            {/* 赠品列表 */}
            {gifts?.isMaskOpen && <Gifts />}
          </View>
        )}
        {/*商品失效之类弹窗*/}
        <ConfirmMask />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
