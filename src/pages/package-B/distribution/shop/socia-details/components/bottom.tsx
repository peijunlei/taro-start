import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import customer from '@/assets/image/goods/goods-detail/customer.png';
import cart from '@/assets/image/goods/goods-detail/cart.png';
import store from '@/assets/image/goods/goods-detail/store.png';
import {_, WMkit} from 'wmkit';

type IBottomProps = T.IProps & T.IBottomProps;
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props: IBottomProps) {
    super(props);
  }

  /**
   去购物车
   */
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;

    const isBuyNow =
      main.goodsDetail &&
      main.goodsDetail.goods &&
      main.goodsDetail.goods.goodsBuyTypes &&
      main.goodsDetail.goods.goodsBuyTypes.indexOf('1') > -1;

    return (
      main && (
        <View className="goods-detail-bottom">
          <View className="l-content">
            {/*{isH5 && WMkit.isLogin() && main.isServiceOpen && WMkit.channelType()!='2' && (*/}
            {/*  <View*/}
            {/*    className="down-text"*/}
            {/*    onClick={() => {*/}
            {/*      Taro.navigateTo({*/}
            {/*        url: `/pages/package-A/customer/chose-service-webview/index?storeId=${main.storeInfo.storeId}`,*/}
            {/*      });*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Image className="dh" src={customer} />*/}
            {/*    <Text className="text">客服</Text>*/}
            {/*  </View>*/}
            {/*)}*/}
            <View
              className="down-text"
              onClick={() => {
                if (!main.storeInfo.storeId) {
                  return;
                }
                WMkit.inviteeId()
                  ? Taro.redirectTo({
                      url: `/pages/package-B/distribution/store/social-c/shop-index-c/index?inviteeId=${WMkit.inviteeId()}`,
                    })
                  : Taro.redirectTo({
                      url: `/pages/package-B/distribution/shop/shop-index/index`,
                    });
              }}
            >
              <Image className="dh" src={store} />
              <Text className="text">店铺</Text>
            </View>

            <View
              className="down-text"
              onClick={() =>
                WMkit.inviteeId()
                  ? Taro.redirectTo({
                      url: '/pages/package-B/distribution/store/social-c/shop-cart-c/index',
                    })
                  : Taro.switchTab({
                      url: '/pages/shop-cart/index',
                    })
              }
            >
              {main?.shopCarNum > 0 && (
                <View className="box">
                  <Text className="num">{main.shopCarNum}</Text>
                </View>
              )}
              <Image className="dh" src={cart} />
              <Text className="text">购物车</Text>
            </View>
          </View>
          {/* 按钮 */}
          <View className="btn-box">
            {[0, '0'].includes(main?.goodsDetail?.goods?.goodsType) && (
              <View
                className="btn-item btn-item-light"
                onClick={() => publicAction.openSpecModal(main.goodsDetail.goods.saleType, false)}
              >
                加入购物车
              </View>
            )}

            {isBuyNow && (
              <View
                className="btn-item"
                onClick={(e) => {
                  publicAction.openSpecModal(main.goodsDetail.goods.saleType, true);
                }}
              >
                立即购买
              </View>
            )}
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
