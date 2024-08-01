import {View, Button, Text, Image, WebView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './sku.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import PictureCom from '@/pages/common/goods/picture-com';
import Price from '@/pages/common/goods/price';

type ISkuProps = T.IProps & T.ISkuProps;

@connect<Partial<ISkuProps>, T.ISkuState>(store2Props, actions)
export default class Sku extends Component<Partial<ISkuProps>, T.ISkuState> {
  constructor(props: ISkuProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      isGift,
      sku,
      sku: {pic, skuName, buyPoint, specDetails, price, num, unit},
    } = this.props;
    console.log(sku);
    return (
      <View
        className="skuItem"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-details/index?skuId=${sku.skuId}`,
          })
        }
      >
        <View className="goods-item">
          <View>
            <View className="cart-to-good">
              <PictureCom type={0} url={pic} />

              <View className={['goods-info', 'goods-info-'].join(' ')}>
                <View className="gift-con">
                  {isGift && (
                    <View className="gift-sku-icon">
                      <Text className="gift-sku-text">赠品</Text>
                    </View>
                  )}

                  <Text className="goods-text" decode={true}>
                    {isGift ? '&ensp;&ensp;&ensp;&ensp;&ensp;' : ''}
                    {skuName}
                  </Text>
                </View>

                <View className="goods-spec">
                  <Text className="spec-text">{specDetails || ''}</Text>
                </View>

                <View className="goods-price">
                  <View className="price-goods">
                    <Price price={this._addZero(price)} buyPoint={buyPoint} />
                  </View>

                  <View className="produce-con">
                    <Text className="product-icon">x</Text>
                    <Text className="product-num">
                      {num}
                      {unit}
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
