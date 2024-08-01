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
import {mul} from '@/utils/priceFormat';
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
      flashsaleGoodsFlag,
      flashsaleGoods,
    } = this.props;
    let flashsalePrice;
    const selectdGoodsInfoId = main?.goodsInfo.goodsInfoId;
    if (flashsaleGoodsFlag) {
      main?.flashsaleGodos &&
        main.flashsaleGodos.length > 0 &&
        main.flashsaleGodos.map((v) => {
          if (v.goodsInfoId == selectdGoodsInfoId && v.stock >= v.minNum) {
            flashsalePrice = v.price;
          }
        });
    }

    return (
      <View className="goods-detail-bottom">
        <View className="l-content">
          {isH5 && WMkit.isLogin() && main.isServiceOpen && (
            <View
              className="down-text"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-A/customer/chose-service-webview/index?storeId=${main.storeInfo.storeId}`,
                });
              }}
            >
              <Image className="dh" src={customer} />
              <Text className="text">客服</Text>
            </View>
          )}
          <View
            className="down-text"
            onClick={() => {
              return
              if (!main.storeInfo.storeId) {
                return;
              }
              Taro.navigateTo({
                url: `/pages/package-A/store/store-main/index?storeId=${main.storeInfo.storeId}`,
              });
            }}
          >
            <Image className="dh" src={store} />
            <Text className="text">店铺</Text>
          </View>

          <View
            className="down-text"
            onClick={() =>
              Taro.switchTab({
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
        {/* 秒杀按钮 */}
        {flashsaleGoodsFlag ? (
          <View className="btn-box">
            <View
              className="btn-item"
              onClick={() => otherAction.rushToBuyingFlashSaleGoodsInfo(flashsaleGoods.id, flashsaleGoods.minNum)}
            >
              立即抢购
            </View>
          </View>
        ) : WMkit.isDistributor() && !flashsaleGoodsFlag && main.goodsInfo.distributionGoodsAudit == '2' ? (
          // 分销按钮
          <View className="btn-box">
            <View
              className="btn-item btn-item-light"
              onClick={() => publicAction.openSpecModal(main.goodsDetail.goods.saleType)}
            >
              加入购物车
            </View>
            {!isH5 && (
              <View className="btn-item" onClick={() => publicAction.commonChange('main.goodsShareVisible', true)}>
                <Text className="price">￥{_.addZero(main.goodsInfo.distributionCommission)}</Text>
                <Text className="name">分享赚</Text>
              </View>
            )}
          </View>
        ) : (
          //普通商品详情按钮
          <View className="btn-box">
            <View className="btn-item" onClick={() => publicAction.openSpecModal(main.goodsDetail.goods.saleType)}>
              加入购物车
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
