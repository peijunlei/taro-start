import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import RegisterCoupon from '../coupon-register/index';

import FormItem from './components/info';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageALoginIepRegisterInfo extends Component<Partial<T.IProps>, any> {
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
  componentDidMount() {
    let {customerAccount, customerPassword, verifyCode, inviteCode} = getCurrentInstance().router.params;
    this.props.actions.init(customerAccount, customerPassword, verifyCode, inviteCode);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main) return null;

    return (
      main && (
        <View className="packageALoginIepRegisterInfo">
          <View>
            <View className="showblock">
              <View className="content register-content">
                <View style={{overflowY: 'auto', position: 'relative', zIndex: 1000}}>
                  {/*<TipBox />*/}
                  <FormItem />
                </View>
                <View className="improve-btn">
                  <View className="submit-btn" onClick={() => action.submit()}>
                    提交
                  </View>
                </View>
              </View>
            </View>
          </View>
          <RegisterCoupon />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
