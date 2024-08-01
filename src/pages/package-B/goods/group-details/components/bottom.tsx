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
let isH5 = __TARO_ENV === 'h5';

@connect<Partial<IBottomProps>, T.IBottomState>(store2Props, actions)
export default class Bottom extends Component<Partial<IBottomProps>, T.IBottomState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IBottomProps) {
    super(props);
  }

  // 永远展示市场价
  _originPriceInfo = (goodsInfoIm) => {
    return goodsInfoIm?.marketPrice;
  };
  /**
    去购物车
*/
  render() {
    let {
      actions: {publicAction},
      main,
    } = this.props;
    //划线价
    const lineShowPrice = this._originPriceInfo(main?.goodsInfo);

    //判断是否为积分价商品
    const isBuyPoint = main && main?.goodsInfo && main?.goodsInfo?.buyPoint;

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
              return;
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
                <Text className="num">{main?.shopCarNum}</Text>
              </View>
            )}
            <Image className="dh" src={cart} />
            <Text style={{whiteSpace: 'nowrap'}} className="text">
              购物车
            </Text>
          </View>
        </View>
        <View className="btn-box">
          <View
            className="btn-item btn-item-o"
            style={{flexDirection: 'column'}}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-details/index?skuId=${main?.goodsInfo?.goodsInfoId}`,
              });
            }}
          >
            {isBuyPoint ? (
              <Text className="price">
                {isBuyPoint}积分+￥{lineShowPrice}
              </Text>
            ) : (
              <Text className="price">￥{_.addZero(lineShowPrice)}</Text>
            )}

            <Text className="name">单独购买</Text>
          </View>
          {main?.grouponDetailOptStatus == 2 && <View className="btn-item btn-item-disable">拼团已结束</View>}
          {main?.grouponDetailOptStatus == 1 && (
            <View
              className="btn-item"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${main.goodsDetail.grouponDetails.tradeGroupon.grouponNo}`,
                });
              }}
            >
              查看拼团详情
            </View>
          )}
          {main?.grouponDetailOptStatus == 0 && (
            <View
              className="btn-item"
              style={{flexDirection: 'column'}}
              onClick={() => {
                publicAction.openSpecModal(main.goodsDetail.goods.saleType);
              }}
            >
              <Text className="price">￥{_.addZero(main?.goodsInfo?.grouponPrice)}</Text>
              <Text className="name">{main.grouponActivity.grouponNum}人拼</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
