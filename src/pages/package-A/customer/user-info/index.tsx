import {Image, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import Complete from './complete/index';
import {_} from 'wmkit';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class UserInfo extends Component<Partial<T.IProps>, any> {
  async componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    await _.addressInit();
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
    this.props.actions.action._clearLocal();
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  componentDidShow() {
    this.props.actions.action._getLoacl();
  }

  render() {
    let {
      main,
      actions: {action},
    } = this.props;
    return (
      main && (
        <View>
          <View className="user-info__wrapper">
            {main.isLoadingList && <WMLoading />}
            <View className="top_2">
              {!main?.perfectInfo &&
              main?.pointsIsOpen &&
              (main?.growthValues?.growthValue || main?.growthValues?.point) ? (
                <View
                  className="wan_sh"
                  onClick={() => {
                    action.commonChange('main.flag', !main?.flag);
                  }}
                >
                  <Image className="img" src={require('./img/present.png')} />
                  <Text className="text_img">完善有礼</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <Info />
            <View className="btn_box">
              <View className="register-btn">
                <View className="btn btn-primary" onClick={() => this._next()}>
                  保存
                </View>
              </View>
            </View>
          </View>
          <Complete />
        </View>
      )
    );
  }

  _next = () => {
    this.props.actions.action.submit();
  };
}

//create by moon https://github.com/creasy2010/moon
