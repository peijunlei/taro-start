import {Image, Text, View, ScrollView} from '@tarojs/components';
import Taro, {getStorageSync} from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import '../css/login-header.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import {WMkit} from 'wmkit';
import remind from '@/assets/image/common/remind.png';
import address from '@/assets/image/shop-cart/address.png';
import shop_cart_empty from '@/assets/image/empty/shop_cart_empty.png';

const cartEmpty = shop_cart_empty;

type ILoginHeaderProps = T.IProps & T.ILoginHeaderProps;

// @connect<Partial<ILoginHeaderProps>, T.ILoginHeaderState>(store2Props, actions)
export default class LoginHeader extends Component<Partial<ILoginHeaderProps>, T.ILoginHeaderState> {
  render() {
    if (!this.props.main) return <View />;
    let isLogin = WMkit.isLogin();
    let {
      actions: {action},
      main: {
        useStatus: {isEdit, isEmpty},
        messNum,
        defaltAddress,
      },
      onScrollToLower,
      isHideModule,
      _getShopCartHeight,
    } = this.props;
    let storeId = getStorageSync('mini::storeId');

    return (
      <View
        className="loginHeader"
        style={isEmpty ? {height: '100%'} : {height: 'auto'}}
        onTouchEnd={() => {
          if (isHideModule) return;
          typeof onScrollToLower === 'function' && onScrollToLower();
        }}
      >
        {isLogin && (
          <View className="edit-icon-con">
            {!isEdit && (
              <View className="edit-wrap"
              onClick={async () => {
                await action._savaLocal();
                await Taro.navigateTo({
                  url: `/pages/package-A/customer/receive-address/index?mode=${1}&localKey=${'shopCardAddress'}`,
                });
              }}
              >
                <View
                  className="edit-address"
                  
                >
                  <Image src={address} className="acceptIcon" />
                  <Text className="acceptName">收货</Text>
                  <Text
                    className={defaltAddress && defaltAddress.needComplete ? 'acceptAddressSmall' : 'acceptAddress'}
                  >
                    {defaltAddress ? (defaltAddress.houseNum || defaltAddress.deliveryAddress ): '点击新增收货地址'}
                  </Text>
                </View>
                {defaltAddress && defaltAddress.needComplete && (
                  <View className="remindTip" style={{flexDirection: 'row'}}>
                    <Image src={remind} className="remindIcon" />
                    <Text className="remindText">请完善收货地址</Text>
                  </View>
                )}
              </View>
            )}
            {!isEmpty && (
              <View className="edit-text-box">
                <Text className="edit-text" onClick={() => this._edit()}>
                  {isEdit ? '完成' : '编辑'}
                </Text>
              </View>
            )}
          </View>
        )}
        <View className="user-con">
          {!isLogin && (
            <View className="header">
              <View
                className="cart-login"
                onClick={async () => {
                  await Taro.navigateTo({
                    url: '/pages/package-A/login/login/index',
                  });
                }}
              >
                <Text className="cart-login-text">登录</Text>
              </View>
              <Text className="login-text">登录后自动同步购物车已有商品</Text>
            </View>
          )}

          {isEmpty && (
            <ScrollView
              scrollY
              scrollWithAnimation
              lowerThreshold={20}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              style={{height: _getShopCartHeight()}}
              onScrollToLower={() => typeof onScrollToLower === 'function' && onScrollToLower()}
            >
              <View className="empty-cart" style={{height: this._getEmptyHeight()}}>
                <Image className="empty-image" src={cartEmpty} />
                <Text className="empty-text">您的购物车是空的呀</Text>
                <View
                  className="goods-btn"
                  onClick={async () => {
                    WMkit.channelType() != '2'
                      ? await Taro.navigateTo({
                          url: `/pages/package-B/goods/goods-list/index?storeId=${storeId}`,
                        })
                      : await Taro.navigateTo({
                          url: `/pages/package-B/distribution/store/social-c/shop-index-c/index`,
                        });
                  }}
                >
                  <Text className="goods-btn-text">逛逛商品</Text>
                </View>
              </View>

              {/* 热门商品推荐展示坑位 */}
              {this.props.renderRecommendGoodsList({
                recommendListCOMStyle: {
                  padding: '16px 12px 0',
                },
              })}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
  _getEmptyHeight = () => {
    if (__TARO_ENV === 'h5') {
      return 'calc(100vh - 96px - 38px - env(safe-area-inset-bottom))';
    } else {
      return 'calc(100vh - 96px - 38px)';
    }
  };

  _edit = async () => {
    const {
      actions: {action},
      main: {
        goods: {checkSku},
        purInfo: {goodsInfos},
        useStatus: {isEdit},
      },
    } = this.props;
    if (isEdit) {
      action.removeSku(goodsInfos);
    }
    action.commonChange('main.useStatus.isEdit', !isEdit);
  };
}
//create by moon https://github.com/creasy2010/moon
