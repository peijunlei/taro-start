import 'taro-ui/dist/style/components/swipe-action.scss';
import {Image, View} from '@tarojs/components';
import {Button} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import List from './components/list';
import addIcon from '@/assets/image/common/add-white.png';
import WMButton from '@/pages/common/button';
import {getGlobalData} from '@/service/config';
//@ts-ignore
actions().actions.loadReducer();
const isIphoneX = getGlobalData('isIphoneX');
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class BankAccounts extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.init();
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
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      main && (
        <View className="bankAccounts">
          <List />
          <View className="bottom">
            <View className="info">最多可添加5条银行账户信息</View>
            <View
              className={isIphoneX ? 'submit-btn gray-btn ios-bottom' : 'submit-btn gray-btn'}
              onClick={() => {
                if (main.list.length < 5) {
                  Taro.redirectTo({
                    url: '/pages/package-A/customer/modify-bank-account/index',
                  });
                }
              }}
            >
              <Button type="primary" size="large" icon={addIcon} disabled={main.list.length >= 5}>
                {/* <Image src={addIcon} className="add-icon" /> */}
                新增银行账户
              </Button>
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
