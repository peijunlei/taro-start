import {Image, View, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import InfoList from './components/info';
import Search from './components/search';
import userImg from '@/assets/image/customer/user-center/default.png';
import {WMkit} from 'wmkit';
import ScreenModal from './components/screen-modal';
import Footer from './footer';
import 'taro-ui/dist/style/components/tab-bar.scss';
import 'taro-ui/dist/style/components/badge.scss';
const regexTel = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[1,3,5,8,9]\d{8}$/;
//@ts-ignore
actions().actions.loadReducer();

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ShopIndexC extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.initShare();
  }
  componentDidShow() {
    //隐藏homeButton
    if (Taro.getEnv() === 'WEAPP') {
      Taro.hideHomeButton();
    }
    this.props.actions.init1(getCurrentInstance().router.params);
  }
  initShare() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    if (wechatShareInfo.imgUrl.length > 0) {
      return {
        title: wechatShareInfo.title,
        imageUrl: wechatShareInfo.imgUrl[0].url,
      };
    }
  }
  onShareTimeline() {
    // 默认分享内容
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    if (!this.props.main) {
      return false;
    }
    const {
      main: {isReady, shopName, headImg, navToolsObj},
      actions: {action},
    } = this.props;

    let backToOrginHome = false; //通过链接分享进入精选页提供按钮跳转到原来首页
    if (WMkit.isDistributorLoginForShare()) {
      backToOrginHome = true;
    }
    let headImsg = headImg ? headImg : userImg;

    let name = shopName;
    if (shopName && shopName.length > 8) {
      // 如果是手机号
      if (regexTel.test(shopName.slice(0, 11))) {
        name = '*' + shopName.slice(7, shopName.length);
      } else {
        name = shopName.slice(0, 8) + '...';
      }
    }
    return (
      isReady && (
        <View className="packageBShopIndexC">
          <ScrollView className="shop-box">
            <View className="shop-head">
              <View className="shop-body-c">
                <View className="head-left">
                  <Image src={headImsg} className="shop-img" />
                  <View>
                    <View className="left-top">{name}</View>
                    {/*<View className="left-bottom">*/}
                    {/*<View className="left-bottom-text">*/}
                    {/*{customerInfo.distributorLevelName ? customerInfo.distributorLevelName : '达人店主'}*/}
                    {/*</View>*/}
                    {/*</View>*/}
                  </View>
                </View>

                {backToOrginHome && (
                  <View className="head-right">
                    <View className="left-bottom" onClick={() => action.toMainPageAndClearInviteCache()}>
                      <View className="left-bottom-text">返回自己店铺</View>
                    </View>
                  </View>
                )}
              </View>
              <Search />
            </View>

            <InfoList />
          </ScrollView>

          <Footer current={0} />

          {/* 筛选弹框 */}
          {navToolsObj.screenIsShow && <ScreenModal />}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
