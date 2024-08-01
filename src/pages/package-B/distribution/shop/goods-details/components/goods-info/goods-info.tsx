import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import '../less/goods-info.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
//零售价格
import Price from '../goods-info/price';
//批发价格
import PriceWholesale from '../goods-info/price-wholesale';
//收藏
import Collect from '../goods-info/collect';
//标题
import Title from '../goods-info/title';
import {_} from 'wmkit';
type IGoodsInfoProps = T.IProps & T.IGoodsInfoProps;

@connect<Partial<IGoodsInfoProps>, T.IGoodsInfoState>(store2Props, actions)
export default class GoodsInfo extends Component<Partial<IGoodsInfoProps>, T.IGoodsInfoState> {
  constructor(props: IGoodsInfoProps) {
    super(props);
  }

  /**
    价格 标题 副标题 收藏
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsDetail},
    } = this.props;
    const {flashsaleGoods, flashsaleGoodsFlag} = this.props;
    let stock: number = 0;
    let volume: number = 0;
    let total: number = 0;
    let num: number = 0;
    if (flashsaleGoodsFlag) {
      stock = flashsaleGoods.stock;
      volume = flashsaleGoods.salesVolume;
      total = _.add(stock, volume);
      num = _.div(volume, total);
    }

    return (
      <View className="goodsInfo">
        {/* 价格  收藏*/}
        <View className="price-collect">
          {/* 0:批发的价格 1:零售的价格 */}
          {goodsDetail.goods.saleType == 0 ? (
            <View style={{width: 'calc(100% - 90px)'}}>
              <PriceWholesale />
            </View>
          ) : (
            <View style={{width: 'calc(100% - 90px)'}}>
              <Price flashsaleGoodsFlag={flashsaleGoodsFlag} />
            </View>
          )}
          <Collect />
        </View>

        {/* 秒杀 已抢 */}
        {flashsaleGoodsFlag && (
          <View className="seckill">
            <Text className="text">
              已抢<Text className="num">{_.mul(num, 100).toFixed(0)}%</Text>
            </Text>
            <View className="progress">
              <View className="high" style={{width: 110 * num}}></View>
            </View>
          </View>
        )}

        {/* 阶梯价 折扣 */}
        {goodsDetail.goods.priceType == 1 && (
          <View className="vip-content">
            <View className="l-tag">
              <Text className="tag-text">阶梯价</Text>
            </View>
            {/* <View className="vip-info">
              <View className="svip">
                <Text className="svip-text">SVIP</Text>
              </View>
              <View className="dist">
                <Text className="dist-text">8.5折</Text>
              </View>
            </View> */}
          </View>
        )}
        <Title />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
