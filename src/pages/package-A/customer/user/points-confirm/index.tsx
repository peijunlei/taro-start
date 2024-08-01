import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import 'taro-ui/dist/style/components/modal.scss';

import {connect} from 'react-redux';
import './css/index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import Address from './components/address';
import Store from './components/store';
import PriceFooter from './components/price-footer';
import PasswordMask from './components/password-mask';
import ConfirmMask from './components/confirm-mask';

import PayOrderInfo from './components/payOrderInfo';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageCOrderOrderConfirm extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
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

  async componentDidMount() {
    const strParams = getCurrentInstance().router.params.params;
    const params = JSON.parse(decodeURI(strParams));
    await this.props.actions.init(params);
    await this.props.actions.action._savaLocal();
  }

  async componentDidHide() {
    await this.props.actions.action._savaLocal();
  }

  async componentDidShow() {
    // const strParams = getCurrentInstance().router.params.params;
    // const params = JSON.parse(strParams);
    // await this.props.actions.init(params);
    await this.props.actions.action._getLoacl();
  }

  async componentWillUnmount() {
    await this.props.actions.clean();
  }

  render() {
    let {
      // actions: {action},
      main,
    } = this.props;
    return (
      <View className="pointsConfirm">
        {main?.isLoadingFlag ? (
          <WMLoading />
        ) : (
          <View>
            <View className="confirm-con">
              {/*收货地址*/}
              <Address />
              {/*店铺商品详情*/}
              <Store />
              <PayOrderInfo />
            </View>

            {/*提交订单*/}
            <PriceFooter />

            

            {main?.passwordMaskShow && <PasswordMask />}
          </View>
        )}
        <ConfirmMask />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
