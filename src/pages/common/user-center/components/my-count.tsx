import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {WMkit} from 'wmkit';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './my-count.less';

type IMyCountProps = T.IProps & T.IMyCountProps;

@connect<Partial<IMyCountProps>, T.IMyCountState>(store2Props, actions)
export default class MyCount extends Component<Partial<IMyCountProps>, T.IMyCountState> {
  static options = {addGlobalClass: true};

  constructor(props: IMyCountProps) {
    super(props);
  }

  /**

   */
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {goodsFollow, storeFollow, pointsIsOpen, isLogin},
    } = this.props;
    
    return (
      !WMkit.isShop() && (
        <View className="collection-box">
          <View className="collection-tab">
            <View
              className="collection-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin
                    ? `/pages/package-A/customer/user-collection/index`
                    : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="tab-num">{goodsFollow || '0'}</Text>
              <Text className="tab-name">收藏商品</Text>
            </View>

            {/* <View
              className="collection-item"
              onClick={() => {
                Taro.navigateTo({
                  url: isLogin ? `/pages/package-A/store/store-attention/index` : '/pages/package-A/login/login/index',
                });
              }}
            >
              <Text className="tab-num">{storeFollow || '0'}</Text>
              <Text className="tab-name">关注店铺</Text>
            </View> */}
          </View>
        </View>
      )
    );
  }
}
