import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { _, WMkit } from 'wmkit';
import * as T from '../types';
import './order-sku-item.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import noneImg from '@/assets/image/coupon/empty.png';
import Price from '@/pages/common/goods/price';

const IS_ACCOUNT_STATUS = {
  0: '待入账',
  1: '已入账',
  2: '入账失败',
};

type IOrderSkuItemProps = T.IProps & T.IOrderSkuItemProps;
@connect<Partial<IOrderSkuItemProps>, T.IOrderSkuItemState>(store2Props, actions)
export default class OrderSkuItem extends Component<Partial<IOrderSkuItemProps>, T.IOrderSkuItemState> {
  constructor(props: IOrderSkuItemProps) {
    super(props);
  }
  static defaultProps = {
    //是否显示返利
    rebate: false,
    // 返利图标字样(0:赚 1:返)
    commissionStrType: 0,
    // 是否显示返利图标
    showCommissionStr: true,
  };
  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    const { rebate, commissionStrType, showCommissionStr } = this.props;
    const { tradeItems } = main;
    return (
      main?.order &&
      main?.order.skus.length > 0 && (
        <View className="goods_list">
          {main?.order.skus.map((item, index) => {
            const filterItems = tradeItems.filter(i => i.skuId = item.skuId)
            let commissionFlag = false;
            if (WMkit.isDistributorLogin() && item.distributionGoodsAudit == 2) {
              // 小b登录时，分销商品显示返利
              commissionFlag = true;
            }
            const packageGoodsRels = []
            return (
              <>
                <View
                  key={index}
                  className="orderSkuItem"
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.skuId}`,
                    })
                  }
                >
                  <Image className="Img" src={item.pic ? item.pic : noneImg} />
                  <View className="right_box">
                    <View className="right_box_top">
                      <View className="right_top">{item.skuName}</View>
                      {main.promotionOrder && (item.isAccountStatus || item.isAccountStatus == 0) && (
                        <View className="isAccountStatus">{IS_ACCOUNT_STATUS[item.isAccountStatus]}</View>
                      )}
                    </View>
                    <Text className="right_middle">{item.specDetails ? item.specDetails : ''}</Text>
                    {main.promotionOrder && (
                      <View className="marketing">
                        {commissionFlag && rebate && !item.pointsGoodsId && (
                          <View className="rebate">
                            <Text className="rebate-bg">{commissionStrType == 0 ? '赚' : '返'}</Text>
                            <Text className="price_zh">￥{item.distributionCommission.toFixed(2)}</Text>
                          </View>
                        )}
                      </View>
                    )}
                    <View className="right_bottom">
                      <View className="bottom_left">
                        <Price price={_.addZero(item.price)} buyPoint={item.buyPoint} />
                      </View>
                      <Text className="bottom_b">
                        ×{' '}
                        <Text className="bottom_a">
                          {item.num}
                          {item.unit ? item.unit : ''}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  {packageGoodsRels.length > 0 && (
                    <View className="packages-goodsxx">
                      {packageGoodsRels.map((item1, index) => {
                        return (
                          <>
                            <View className="package-top">
                              <View className="package-desc">套餐内包含以下商品</View>
                            </View>
                            <View className="goods-itemxx">
                              <View className="item-namexx">
                                <Text className="name-leftxx">·</Text>
                                <Text className="name-rightxx">{item1.skuName}</Text>
                              </View>
                              <Text className="item-numxx">×{item1.num}</Text>
                            </View>
                          </>
                        );
                      })}
                    </View>
                  )}
                </View>
              </>
            );
          })}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
