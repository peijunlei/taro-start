import {View, Button, Text, Image, WebView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './sku.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PictureCom from '@/pages/common/goods/picture-com';

type ISkuProps = T.IProps & T.ISkuProps;

@connect<Partial<ISkuProps>, T.ISkuState>(store2Props, actions)
export default class Sku extends Component<Partial<ISkuProps>, T.ISkuState> {
  constructor(props: ISkuProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {isSelf},
      sku: {pic, skuName, specDetails, points, num, unit},
    } = this.props;
    return (
      <View className="skuItem">
        <View className="goods-item">
          <View>
            <View className="cart-to-good">
              <PictureCom type={0} url={pic} />

              <View className={['goods-info', 'goods-info-'].join(' ')}>
                <View className="gift-con">
                  {isSelf && (
                    <View className="gift-sku-icon">
                      <Text className="gift-sku-text">自营</Text>
                    </View>
                  )}

                  <Text className="goods-text" decode={true}>
                    {skuName}
                  </Text>
                </View>

                <View className="goods-spec">
                  <Text className="spec-text">{specDetails || ''}</Text>
                </View>

                <View className="goods-price">
                  <View className="price-goods">
                    <Text className="points-icon">{points}积分</Text>
                  </View>

                  <View className="produce-con">
                    <Text className="product-icon">x</Text>
                    <Text className="product-num">
                      {num}
                      {unit ? unit : ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _addZero = (num) => {
    return new Number(num ? num : 0).toFixed(2);
  };
}

//create by moon https://github.com/creasy2010/moon
