import {Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class UserPay extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    //判断是忘记密码还是设置密码
    const forget = getCurrentInstance().router.params.forget ? getCurrentInstance().router.params.forget : false;
    this.props.actions.init(forget);
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
        <View className="top_2">
          <View className="wan_sh">
            <Text className={'text_img3'} onClick={() => this._next()}>
              下一步
            </Text>
          </View>
        </View>
        <Info />
      </View>
    );
  }
  _next = () => {
    this.props.actions.action.doNext();
  };
}

//create by moon https://github.com/creasy2010/moon
