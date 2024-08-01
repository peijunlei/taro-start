import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../../types';
import '../../css/gift-item.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';

import check from '@/assets/image/shop-cart/gift-check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import PictureCom from '@/pages/common/goods/picture-com';
import Price from '@/pages/common/goods/price';
type IGiftItemProps = T.IProps & T.IGiftItemProps;
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IGiftItemProps>, T.IGiftItemState>(store2Props, actions)
export default class GiftItem extends Component<Partial<IGiftItemProps>, T.IGiftItemState> {
  constructor(props: IGiftItemProps) {
    super(props);
  }

  render() {
    let {sku = {}, onCheck} = this.props;
    const {goodsInfo = {}, productNum, checked, disabled} = sku;
    const {goodsStatus, goodsInfoImg, goodsInfoName, specText} = goodsInfo;
    return (
      <View className="skuItem">
        <View className="goods-item">
          {
            <View
              className="check-view"
              onClick={() => {
                !disabled && onCheck();
              }}
            >
              {disabled ? (
                <View className="check-disabled" />
              ) : (
                <Image className="check-image" src={checked ? check : uncheck} />
              )}
            </View>
          }

          <View className="cart-to-good">
            {/*商品图片*/}
            <PictureCom
              type={goodsStatus}
              url={goodsInfoImg}
              appointmentSaleVOList={[]}
              bookingSaleVOList={[]}
              goodsInfoId={''}
              onClick=""
            />
            <View className={['goods-info', 'goods-info-', 2 === 2 ? 'goods-info-gift' : ''].join(' ')}>
              <View className="gift-con">
                <Text className="goods-text" decode={true} space="ensp">
                  {goodsInfoName}
                </Text>
              </View>

              <View className="goods-spec">
                <Text className="spec-text">{specText || ''}</Text>
              </View>

              <View className="goods-price">
                <Price price={0} />

                <View className="produce-con">
                  <Text className="product-icon">x</Text>
                  <Text className="product-num">{productNum}</Text>
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
