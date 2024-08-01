import {View, Button, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import '../less/price-wholesale.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import {toFixed2} from '@/utils/priceFormat';
type IPriceWholesaleProps = T.IProps & T.IPriceWholesaleProps;

@connect<Partial<IPriceWholesaleProps>, T.IPriceWholesaleState>(store2Props, actions)
export default class PriceWholesale extends Component<Partial<IPriceWholesaleProps>, T.IPriceWholesaleState> {
  constructor(props: IPriceWholesaleProps) {
    super(props);
  }

  /**
    批发类型价格
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail, goodsInfo},
    } = this.props;
    //设价类型（0：客户，1：订货量 3：市场价）
    const priceType = goodsDetail.goods.priceType;
    //是否允许独立设价
    const allowPriceSet = goodsDetail.goods.allowPriceSet;
    //划线价
    const lineShowPrice = this._wholeSalePriceInfo(goodsDetail.goods.linePrice, goodsDetail.goodsInfos);
    //最低,最高价格
    const {minPrice, maxPrice} = this._getMinMaxPrice(goodsDetail.goods, goodsDetail.goodsInfos);
    const unit = goodsDetail.goods.goodsUnit;
    return (
      <View className="priceWholesale">
        {/* 不允许独立设价 */}
        {priceType == 1 && allowPriceSet == 0 ? (
          <ScrollView scrollX className="scroll-view-box">
            <View className="no-price-box">
              {this._showSpuIntervalPrices().map((item, index) => {
                return (
                  <View className="no-goods-price" id={index} key={index}>
                    <View className="up-price">
                      <Text className="unit1">￥</Text>
                      <Text className="price1">{toFixed2(item.price)}</Text>
                    </View>
                    <View className="down-nums">
                      ≥{item.count}
                      {unit}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          //允许独立设价
          <View className="price">
            <Text className="now-price">
              <Text className="unit">￥</Text>
              {/* {minPrice == maxPrice ? toFixed2(minPrice) : toFixed2(minPrice) + '~' + toFixed2(maxPrice)} */}
              {toFixed2(goodsInfo.grouponPrice)}
            </Text>
            {Boolean(lineShowPrice) && <Text className="old-price">￥{lineShowPrice}</Text>}
          </View>
        )}
      </View>
    );
  }

  //批发销售类型，计算划线价
  _wholeSalePriceInfo = (linePrice, goodsInfos) => {
    let token = Taro.getStorageSync('authInfo:token');
    // if (linePrice) {
    //   return linePrice;
    // } else {
    if (token) {
      // 已登录时,找出最高的市场价
      let maxMarketPrice = null;
      goodsInfos.forEach((info, index) => {
        if (index === 0) {
          maxMarketPrice = info.marketPrice;
        } else {
          maxMarketPrice = info.marketPrice > maxMarketPrice ? info.marketPrice : maxMarketPrice;
        }
      });
      return maxMarketPrice;
    } else {
      return null;
    }
    // }
  };

  /**
   * 获取最低,最高价
   * @param goods
   * @param goodsInfos
   * @private
   */
  _getMinMaxPrice = (goods, goodsInfos) => {
    let minPrice = 0;
    let maxPrice = 0;
    if (goods.priceType == 1) {
      //是否有按订货量区间设价
      goodsInfos.forEach((info, index) => {
        if (index == 0) {
          minPrice = info.intervalMinPrice;
          maxPrice = info.intervalMaxPrice;
        } else {
          minPrice = info.intervalMinPrice < minPrice ? info.intervalMinPrice : minPrice;
          maxPrice = info.intervalMaxPrice > maxPrice ? info.intervalMaxPrice : maxPrice;
        }
      });
    } else {
      goodsInfos.forEach((info, index) => {
        if (index == 0) {
          minPrice = info.salePrice;
          maxPrice = info.salePrice;
        } else {
          minPrice = info.salePrice < minPrice ? info.salePrice : minPrice;
          maxPrice = info.salePrice > maxPrice ? info.salePrice : maxPrice;
        }
      });
    }
    return {minPrice, maxPrice};
  };
  /**
   * 不允许独立设价 展示阶梯价格
   * @param goodsIntervalPrices
   * @private
   */
  _showSpuIntervalPrices = () => {
    const {
      main: {
        goodsDetail: {goodsIntervalPrices},
      },
    } = this.props;
    //将type为0的数据筛选出来
    const price = goodsIntervalPrices.filter((item) => item.type == 0);
    return price;
  };
}

//create by moon https://github.com/creasy2010/moon
