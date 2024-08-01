import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

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
      main: {customer, accountBalanceTotal, unUseCount, isLogin, pointsIsOpen},
    } = this.props;
    const isShop = WMkit.isShop();

    return (
      main && (
        <View className="panels my-assets">
          <View className="title">
            <Text className="title-name">我的资产</Text>
          </View>
          <View className="panels-list">
            <View
              className="panels-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin ? '/pages/package-A/customer/balance/home/index' : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="assets-num">￥{accountBalanceTotal}</Text>
              <Text className="item-text">余额222</Text>
            </View>

            {!isShop && pointsIsOpen && (
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
                {/*<Text className="assets-num">{customer.pointsAvailable ? customer.pointsAvailable : 0}</Text>*/}
                <Text className="item-text">积分1111</Text>
              </View>
            )}
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
