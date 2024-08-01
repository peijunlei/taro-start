import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './menu-box.less';
import MenuIndex from '@/assets/image/common/menu-index.png';
import MenuClass from '@/assets/image/common/menu-class.png';
import MenuSearch from '@/assets/image/common/menu-search.png';
import MenuShopcart from '@/assets/image/common/menu-shopcart.png';
import MenuMy from '@/assets/image/common/menu-my.png';
import MenuDefault from '@/assets/image/common/menu-default.png';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type IMenuBoxProps = T.IProps & T.IMenuBoxProps;

@connect<Partial<IMenuBoxProps>, T.IMenuBoxState>(store2Props, actions)
export default class MenuBox extends Component<Partial<IMenuBoxProps>, T.IMenuBoxState> {
  constructor(props: IMenuBoxProps) {
    super(props);
  }

  /**
    搜索
*/
  render() {
    let {
      actions: {goodsAction},
      main: {isMenuBoxFlag},
    } = this.props;
    return (
      <View className="menu-box">
        {isMenuBoxFlag && (
          <View className="menu-state">
            <View
              className="menu-state-child"
              onClick={() => {
                Taro.switchTab({url: '/pages/index/index'});
              }}
            >
              <Image src={MenuIndex} className="icon" />
              <Text className="menu-title">首页</Text>
            </View>
            <View className="menu-state-child">
              <Image src={MenuClass} className="icon" />
              <Text className="menu-title">全部分类</Text>
            </View>
            <View
              className="menu-state-child"
              onClick={() => {
                Taro.navigateTo({url: '/pages/package-B/goods/search/index'});
              }}
            >
              <Image src={MenuSearch} className="icon" />
              <Text className="menu-title">搜索</Text>
            </View>
            <View
              className="menu-state-child"
              onClick={() => {
                Taro.switchTab({url: '/pages/shop-cart/index'});
              }}
            >
              <Image src={MenuShopcart} className="icon" />
              <Text className="menu-title">购物车</Text>
            </View>
            <View
              className="menu-state-child"
              onClick={() => {
                Taro.switchTab({url: '/pages/user-center/index'});
              }}
            >
              <Image src={MenuMy} className="icon" />
              <Text className="menu-title">我的</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
