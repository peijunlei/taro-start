import 'taro-ui/dist/style/components/modal.scss';
import {View, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {AtModal} from 'taro-ui';

import Mask from './components/mask';
import Header from './components/header';
import PayList from './components/pay-list';
import PasswordMask from './components/password-mask';
import CreditPasswordMask from './components/credit-password-mask';
import {Modal} from '@wanmi/ui-taro';

import ServiceMask from './components/service-mask';
import { cache } from 'config';
const isH5 = __TARO_ENV === 'h5';
const isMini = isH5 && navigator.userAgent.toLowerCase().includes('miniprogram')
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderToolOrderPay extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    Taro.removeStorageSync(cache.ORDER_CONFIRM_PARAMS)
    if(isMini) return 
    // tradeno 轩跨的订单id
    const params = getCurrentInstance().router.params
    // console.log(decodeURIComponent(getCurrentInstance().router.params.param));
    const stringContext = decodeURIComponent(
      params.param ? params.param : '',
      ),
      tid = params.tid || params.tradeno,
      ordersource = params.ordersource,
      // 从订单列表和订详情页面过来支付的，要带上isBookingSaleGoods这个标识，没法依赖接口，返回的都是null
      isBookingSaleGoods = getCurrentInstance().router.params.isBookingSaleGoods,
      context = stringContext && JSON.parse(stringContext);
    await this.props.actions.init(tid, context, isBookingSaleGoods,ordersource);
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    if(isMini) return null
    const {main} = this.props;

    return (
      main && (
        <View className="packageCOrderOrderToolOrderPay">
          <Header />
          <PayList />
          <Mask />
          {main?.passwordMaskShow && <PasswordMask />}
          {main?.credit.passwordMaskShow && <CreditPasswordMask />}
          {main?.serviceShow && <ServiceMask />}
          <Modal
            type="warning"
            visible={main.credit.visible}
            onCancel={() => {
              this.props.actions.action.commonChange('main.credit.visible', false);
            }}
            onOk={() => {
              this.props.actions.action.commonChange('main.credit.visible', false);
              //点击去申请
              if (main.credit.showType === 2) Taro.navigateTo({url: '/pages/package-A/customer/credit-apply/index'});
            }}
            content={
              main.credit.showType === 1
                ? `${main?.credit.alias}额度不足，请确认剩余额度`
                : main.credit.showType === 2
                ? `您还未开启${main?.credit.alias}支付，是否现在去申请`
                : `${main?.credit.alias}支付方式当前不可用`
            }
            confirmText={main.credit.showType === 2 ? '去申请' : '知道了 '}
            cancelText="取消"
            showCancel={main.credit.showType === 2 ? true : false}
          />
          {main.paying && (
            <AtModal isOpened={main.paying} closeOnClickOverlay={false} className="paying-modal">
              <Image src={require('./img/loading.gif')} style="width:104px;height:104px;border-radius:8px" />
            </AtModal>
          )}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
