import {View} from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import {_} from 'wmkit';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
const windowHeight = Taro.getSystemInfoSync().windowHeight;
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LinkedAccount extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {enterpriseId=''} = getCurrentInstance().router.params;
    this.props.actions.init(enterpriseId);
  }

  async componentWillMount() {
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

  componentWillUnmount() {
    this.props.actions.clean();
    if (__TARO_ENV === 'h5') {
      console.log('---------*---------  ');
      let routers = Taro.getCurrentPages();
      if (routers.length <= 1) {
        Taro.switchTab({url: '/pages/user-center/index'});
      }
    }
  }

  render() {
    let {main} = this.props;
    return (
      main && (
        <View className="packageACustomerBalanceHome" style={{height: windowHeight + 'px'}}>
          {main.isLoadingFlag && <WMLoading />}
          <Info />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
