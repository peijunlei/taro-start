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
      main = {},
    } = this.props;
    const {goodsDetail} = main;

    // 商品标签
    let goodsLabels = goodsDetail?.goods && goodsDetail?.goods?.goodsLabelList ? goodsDetail.goods.goodsLabelList : [];
    goodsLabels = goodsLabels.filter((v) => v.labelVisible);

    return (
      <View className="goodsInfo">
        {/* 价格  收藏*/}
        <View className="price-collect">
          {/* 0:批发的价格 1:零售的价格 */}
          {goodsDetail?.goods?.saleType == 0 ? (
            <View style={{width: 'calc(100% - 90px)'}}>
              <PriceWholesale />
            </View>
          ) : (
            <View style={{width: 'calc(100% - 90px)'}}>
              <Price />
            </View>
          )}
          <Collect />
        </View>

        <View className="goods-label-box">
          {goodsLabels &&
            goodsLabels.map((item, index) => {
              return (
                <View className="goods-label" id={'item.goodsLabelId'} key={index}>
                  {item.labelName}
                </View>
              );
            })}
          {/* 阶梯价 折扣 */}
          {goodsDetail?.goods?.priceType == 1 && (
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
        </View>
        <Title />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
