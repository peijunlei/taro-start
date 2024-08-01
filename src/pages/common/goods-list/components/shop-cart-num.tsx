import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './shop-cart-num.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import shopCar from '@/assets/image/goods/goods-list/shop-car.png';
type IShopCartNumProps = T.IProps & T.IShopCartNumProps;

@connect<Partial<IShopCartNumProps>, T.IShopCartNumState>(store2Props, actions)
export default class ShopCartNum extends Component<Partial<IShopCartNumProps>, T.IShopCartNumState> {
  constructor(props: IShopCartNumProps) {
    super(props);
  }

  /**
    购物车角标
*/
  render() {
    let {
      actions: {goodsAction},
      main,
      style,
    } = this.props;
    return (
      <View
        className="shop-car"
        style={style || {}}
        onClick={() =>
          Taro.navigateTo({
            url: '/pages/package-B/goods/shop-cart-without-bottom/index',
          })
        }
      >
        <Image src={shopCar} className="car" />
        {main?.shopCarNum > 0 && (
          <View className="box">
            <Text className="num">{main.shopCarNum}</Text>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
