import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './bottom.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dhIcon from '@/assets/image/goods/goods-list/dh.png';
import {mul} from '@/utils/priceFormat';
type IBottomProps = T.IProps & T.IBottomProps;

@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  constructor(props: IBottomProps) {
    super(props);
  }

  /**
    去购物车
*/
  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;
    return (
      <View className="coupon-list-promotion-bottom">
        <View
          className="r-go-btn"
          onClick={() =>
            Taro.navigateTo({
              url: '/pages/package-B/goods/shop-cart-without-bottom/index',
            })
          }
        >
          去购物车
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
