import {View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import {_} from 'wmkit';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LinkedAccount extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let code = getCurrentInstance().router.params.code ? getCurrentInstance().router.params.code : '';
    this.props.actions.init(code);
  }

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

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    return (
      <View className="packageACustomerMySet">
        <Info />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
