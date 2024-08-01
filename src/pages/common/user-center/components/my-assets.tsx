import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit, _} from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {Price} from '@wanmi/ui-taro';

type IMyAssetsProps = T.IProps & T.IMyAssetsProps;

@connect<Partial<IMyAssetsProps>, T.IMyAssetsState>(store2Props, actions)
export default class MyAssets extends Component<Partial<IMyAssetsProps>, T.IMyAssetsState> {
  static options = {addGlobalClass: true};
  constructor(props: IMyAssetsProps) {
    super(props);
  }

  /**

*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
      main: {
        customer,
        accountBalanceTotal,
        unUseCount,
        isLogin,
        pointsIsOpen,
        alias,
        balanceAlias,
        usableAmount,
        enabled,
        isOpen,
        changeRecordId,
        goodsFollow,
        enterpriseList,
        giftCardNum,
      },
    } = this.props;
    return (
      main && (
        <View className="panels my-assets">
          <View className="title">
            <Text className="title-name">我的资产</Text>
          </View>
          <View className="panels-list" style={WMkit.isShop() ? {justifyContent: 'center'} : {}}>
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin ? '/pages/package-A/customer/balance/home/index' : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="wm-price-style-small wm-price" style={{fontWeight: 500}}>
                {accountBalanceTotal ? _.addZero(accountBalanceTotal) : '0.00'}
              </Text>
              <Text className="item-text">{balanceAlias}</Text>
            </View>
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin ? '/pages/package-D/gift-card/my-gift-card/index' : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="wm-price-style-small wm-price" style={{fontWeight: 500}}>
                {giftCardNum || '0'}
              </Text>
              <Text className="item-text">卡包</Text>
            </View>

            {!WMkit.isShop() && (
              <View
                className="panels-item "
                onClick={() => {
                  Taro.navigateTo({
                    url: isLogin ? '/pages/package-A/customer/my-coupon/index' : '/pages/package-A/login/login/index',
                  });
                }}
              >
                <Text className="assets-num ">{unUseCount || '0'}</Text>
                <Text className="item-text">优惠券</Text>
              </View>
            )}
            {!WMkit.isShop() && pointsIsOpen && (
              <View
                className="panels-item"
                onClick={() => {
                  Taro.navigateTo({
                    url: isLogin
                      ? '/pages/package-A/customer/user-integral/index'
                      : '/pages/package-A/login/login/index',
                  });
                }}
              >
                <Text className="assets-num">{customer.pointsAvailable ? customer.pointsAvailable : '0'}</Text>
                <Text className="item-text">积分</Text>
              </View>
            )}
            {main?.enterpriseId === '-1' && WMkit.isMall() && (
              <View
                className="panels-item"
                onClick={() => {
                  Taro.navigateTo({
                    url: isLogin
                      ? `/pages/package-A/customer/user-collection/index`
                      : '/pages/package-A/login/login/index',
                  });
                }}
              >
                <Text className="assets-num">{goodsFollow || '0'}</Text>
                <Text className="item-text">收藏商品</Text>
              </View>
            )}
            {main?.enterpriseId === '-1' && isOpen && (
              <View
                className="panels-item"
                onClick={() => {
                  let url = '';
                  if (isLogin) {
                    if (enabled == '1') {
                      url = '/pages/package-A/customer/credit-center/index';
                    } else {
                      if (changeRecordId) {
                        url = '/pages/package-A/customer/credit-center/index';
                      } else {
                        url = '/pages/package-A/customer/credit-apply/index';
                      }
                    }
                  } else {
                    url = '/pages/package-A/login/login/index';
                  }
                  Taro.navigateTo({
                    url,
                  });
                }}
              >
                {/*<Price price={usableAmount} decimalSize="small" />*/}
                <Text className="wm-price-style-small wm-price" style={{fontWeight: 500}}>
                  {usableAmount ? _.addZero(usableAmount) : '0.00'}
                </Text>
                <Text className="item-text">{alias || '授信'}</Text>
              </View>
            )}
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
