import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './gift-item.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';

import check from '@/assets/image/shop-cart/gift-check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import checkGift from '@/assets/image/shop-cart/check-gift.png';
import PictureCom from '@/pages/common/goods/picture-com';

type IGiftItemProps = T.IProps & T.IGiftItemProps;

@connect<Partial<IGiftItemProps>, T.IGiftItemState>(store2Props, actions)
export default class GiftItem extends Component<Partial<IGiftItemProps>, T.IGiftItemState> {
  constructor(props: IGiftItemProps) {
    super(props);
  }

  render() {
    let {
      checked,
      type,
      productNum,
      onCheck,
      sku: {goodsStatus, goodsInfoImg, goodsInfoName, specText},
      main: {},
    } = this.props;
    return (
      <View className="skuItem">
        <View className="goods-item">
          {/* {isMaskOpen && maskType === 2 && (
            <View
              className="check-view"
              onClick={async () => {
                await onCheck();
              }}
            >
              <Image className="check-image" src={checked ? check : uncheck} />
            </View>
          )} */}

          {type === 3 && (
            <View className="check-view">
              <Image className="check-image" src={checkGift} />
            </View>
          )}

          <View>
            <View className="cart-to-good">
              {/*商品图片*/}
              <PictureCom type={goodsStatus} url={goodsInfoImg} />

              <View className={['goods-info', 'goods-info-'].join(' ')}>
                <View className="gift-con">
                  {type === 3 && (
                    <View className="gift-sku-icon">
                      <Text className="gift-sku-text">赠品</Text>
                    </View>
                  )}

                  <Text className="goods-text" decode={true}>
                    {type === 3 ? '&ensp;&ensp;&ensp;&ensp;&ensp;' : ''}
                    {goodsInfoName}
                  </Text>
                </View>

                <View className="goods-spec">
                  <Text className="spec-text">{specText || ''}</Text>
                </View>

                <View className="goods-price">
                  <View className="price-goods">
                    <Text className="price-icon">¥</Text>
                    <Text className="price-num">0.00</Text>
                  </View>

                  <View className="produce-con">
                    <Text className="product-icon">x</Text>
                    <Text className="product-num">{productNum}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
