import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/combination-goods.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';
import {_} from 'wmkit';

import moreIcon from '@/assets/image/goods/goods-detail/more.png';
import defaultImg from '@/assets/image/common/default-img.png';

type ICombinationGoodsProps = T.IProps & T.ICombinationGoodsProps;
@connect<Partial<ICombinationGoodsProps>, T.ICombinationGoodsState>(store2Props, actions)
export default class CombinationGoods extends Component<Partial<ICombinationGoodsProps>, T.IGoodsEvaluationState> {
  constructor(props: ICombinationGoodsProps) {
    super(props);
  }

  /**
    组合商品
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main = {},
    } = this.props;
    const {marketingSuits, skuId, storeInfo} = main;
    const num = marketingSuits?.length;

    const suitInfo = num > 0 && marketingSuits?.[0]?.marketingSuitsGoodsInfoDetailVO;
    const cbImg = suitInfo.mainImage ? suitInfo.mainImage : defaultImg;
    console.warn('suitInfo', suitInfo);

    return (
      main &&
      num > 0 && (
        <View
          className="combination-goods"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/package-B/goods/combination-goods/index?skuId=${skuId}&storeId=${storeInfo.storeId}`,
            });
          }}
        >
          <View className="combination-title">
            <Text className="title-text">该商品有{num}个优惠套装</Text>
            <Image src={moreIcon} className="more-icon" />
          </View>
          <View className="combination-block">
            <Image src={cbImg} className="combination-img" />
            <View className="com-info">
              <Text className="com-info-name">{suitInfo.marketingName} </Text>
              <Price price={_.addZero(suitInfo.suitsPrice)} />
              {suitInfo.suitsNoNeedPrice >= 0 ? (
                <Text className="bottom-price">
                  最高省 <Text className="yellow">￥{_.addZero(suitInfo.suitsNoNeedPrice)}</Text>
                </Text>
              ) : (
                ' '
              )}
            </View>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
