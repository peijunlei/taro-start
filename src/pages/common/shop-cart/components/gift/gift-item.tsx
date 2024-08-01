import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../../types';
import '../../css/gift-item.less';

import check from '@/assets/image/shop-cart/gift-check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import checkGift from '@/assets/image/shop-cart/check-gift.png';
import PictureCom from '@/pages/common/goods/picture-com';
import Price from '@/pages/common/goods/price';

type IGiftItemProps = T.IProps & T.IGiftItemProps;
let isH5 = __TARO_ENV === 'h5';

// @connect<Partial<IGiftItemProps>, T.IGiftItemState>(store2Props, actions)
export default class GiftItem extends Component<Partial<IGiftItemProps>, T.IGiftItemState> {
  constructor(props: IGiftItemProps) {
    super(props);
  }

  static defaultProps = {
    sku: {},
  };

  render() {
    if (!this.props.main) return <View />;
    let {
      checked,
      type,
      productNum,
      onCheck,
      sku: { goodsStatus, goodsInfoImg, goodsInfoName, specText, goodsUnit, stock },
      main: {
        useStatus: { maskType, isMaskOpen },
      },
      disabled,
    } = this.props;
    return (
      <View className="giftskuItem-skuItem">
        <View className="goods-item">
          {isMaskOpen && maskType === 2 && type !== 3 && (
            <View
              className="shopcart-gift-check-view"
              onClick={async () => {
                disabled ? {} : await onCheck();
              }}
            >
              {disabled ? (
                <View className="shopcart-gift-check-disabled" />
              ) : (
                  <Image className="shopcart-gift-check-image" src={checked ? check : uncheck} />
                )}
            </View>
          )}

          {type === 3 && (
            <View className="shopcart-gift-check-view">
              <Image className="shopcart-gift-check-image" src={checkGift} />
            </View>
          )}

          <View className="cart-to-good">
            {/*商品图片*/}
            <PictureCom
              type={goodsStatus}
              url={goodsInfoImg}
              stock={stock}
              appointmentSaleVOList={[]}
              bookingSaleVOList={[]}
              goodsInfoId=""
              onClick=""
            />
            <View className={['goods-info-sc', 'goods-info-', maskType === 2 ? 'goods-info-gift' : ''].join(' ')}>
              <View className="gift-con">
                {type === 3 && (
                  <View className="gift-sku-icon">
                    <View className="gift-sku-text">赠品</View>
                  </View>
                )}
                <Text className="goods-text" decode>
                  {goodsInfoName}
                </Text>
              </View>

              <View className="goods-spec">
                <View className="spec-text">{specText || ''}</View>
              </View>

              <View className="goods-price">
                {/* <View className="price-goods">
                    <Text className="price-icon">¥</Text>
                    <Text className="price-num">0.00</Text>
                  </View> */}
                <Price price={0} />

                <View className="produce-con">
                  <View className="product-icon">x</View>
                  <View className="product-num">
                    {productNum}
                    {/* {goodsUnit} */}
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
