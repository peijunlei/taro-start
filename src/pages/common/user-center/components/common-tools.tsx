import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { WMkit } from 'wmkit';
import { connect } from 'react-redux';
import * as T from '../types';
import actions from '../actions/index';
import { store2Props } from '../selectors';
import './common-tools.less';
import api from 'api';
type ICommonToolsProps = T.IProps & T.ICommonToolsProps;

@connect<Partial<ICommonToolsProps>, T.ICommonToolsState>(store2Props, actions)
export default class CommonTools extends Component<Partial<ICommonToolsProps>, T.ICommonToolsState> {
  static options = { addGlobalClass: true };
  constructor(props: ICommonToolsProps) {
    super(props);
  }
  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
      main: {evaluateIsOpen, pointsIsOpen, isLogin, isServiceOpen, aliUrl, isWechatOpen},
    } = this.props;
    const isShop = WMkit.isShop();
    return (
      <View className="panels common-functions">
        <View className="title">
          <Text className="title-name">常用功能</Text>
        </View>
        <View className="panels-list tool-list cut-panels-list">
          {!isShop && (
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/coupon/coupon-center/index`,
                });
              }}
            >
              <Image className="item-img" src={require('@/assets/image/customer/user-center/coupon.png')} />
              <Text className="item-text">领券中心</Text>
            </View>
          )}
          {!isShop && pointsIsOpen && (
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/user/points-mall/index`,
                });
              }}
            >
              <Image className="item-img" src={require('@/assets/image/customer/user-center/integral-mall.png')} />
              <Text className="item-text">积分商城</Text>
            </View>
          )}
          {!isShop && evaluateIsOpen && (
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin
                    ? `/pages/package-A/customer/evaluate-center/index`
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Image className="item-img" src={require('@/assets/image/customer/user-center/evaluate.png')} />
              <Text className="item-text">评价中心</Text>
            </View>
          )}
          {/* {
            //@ts-ignore
            __TARO_ENV === 'h5' && (isServiceOpen || !!aliUrl) && (
              <View className="panels-item" onClick={() => action.choseService()}>
                <Image className="item-img" src={require('@/assets/image/customer/user-center/service.png')} />
                <Text className="item-text">商城客服</Text>
              </View>
            )
          } */}

          {isServiceOpen && (
            <View className="panels-item" onClick={() => action.choseService()}>
              <Image className="item-img" src={require('@/assets/image/customer/user-center/service.png')} />
              <Text className="item-text">商城客服</Text>
            </View>
          )}

          {!isShop && (
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin ? `/pages/package-B/preBuy-list/index` : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Image className="item-img" src={require('@/assets/image/customer/user-center/reservation-buy.png')} />
              <Text className="item-text">我的预约</Text>
            </View>
          )}
          <View
            className="panels-item"
            onClick={() => {
              Taro.navigateTo({
                url: isLogin ? '/pages/package-C/lottery/prize-list/index' : '/pages/package-A/login/login/index',
              });
            }}
          >
            <Image className="item-img" src={require('@/assets/image/customer/user-center/award.png')} />
            <Text className="item-text">我的奖品</Text>
          </View>
          <View
            className="panels-item"
            onClick={() => {
              Taro.navigateTo({
                url: isLogin ? '/pages/package-C/order/order-history-list/index' : '/pages/package-A/login/login/index',
              });
            }}
          >
            <Image className="item-img" src={require('@/assets/image/customer/user-center/history.png')} />
            <Text className="item-text">历史订单</Text>
          </View>
        </View>
      </View>
    );
  }

  wrapUrl = () => { };
  handleMovieTicket = async () => {
    let {
      actions: { action },
      main: { isLogin },
    } = this.props;
    if (isLogin) {
      //获取免登url
      if (Taro.getEnv() == 'WEAPP') {
        Taro.navigateTo({
          url: '/pages/package-B/x-site/movie-ticket/index',
        });
      } else {
        try {
          const { url } = await api.customerBaseController.getMovieTicketLoginUrl();
          window.location.href = url;
        } catch (error) {
          Taro.showToast({
            title: '获取免登url失败',
            icon: 'none',
          });
        }
      }
    } else {
      Taro.navigateTo({
        url: '/pages/package-A/login/login/index',
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
