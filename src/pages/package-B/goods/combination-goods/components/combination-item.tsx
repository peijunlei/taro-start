import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './combination-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import rArrowIcon from '@/assets/image/goods/goods-detail/r-arrow.png';
import arrowDowm from '@/assets/image/goods/combination/arrow-down.png';
import arrowUp from '@/assets/image/goods/combination/arrow-up.png';
import plus from '@/assets/image/goods/combination/plus.png';
import defaultImg from '@/assets/image/common/default-img.png';
import Price from '@/pages/common/goods/price';
import {_, WMkit} from 'wmkit';
type ICombinationItemProps = T.IProps & T.ICombinationItemProps;

@connect<Partial<ICombinationItemProps>, T.ICombinationItemState>(store2Props, actions)
export default class CombinationItem extends Component<Partial<ICombinationItemProps>, T.ICombinationItemState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ICombinationItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {
        action: {changeCheck, immediateBuy},
      },
      main,
      orderItem,
    } = this.props;
    const mainGoods = orderItem.marketingSuitsGoodsInfoDetailVO;
    const mainImg = mainGoods.mainImage ? mainGoods.mainImage : defaultImg;
    const suitsRelationList = orderItem.suitsRelationGoodsInfoVOList;
    return (
      <View className="combination-item">
        <View className="cb-main">
          <View className="cb-block">
            <Image src={mainImg} className="cb-img" />
            <View className="cb-info">
              <Text className="cb-info-name">{mainGoods.marketingName}</Text>
              <View className="priceTwo">
                <Price price={_.addZero(mainGoods.suitsPrice)} />
                {mainGoods.suitsNoNeedPrice >= 0 ? (
                  <Text className="bottom-price">
                    最高省 <Text className="yellow">￥{_.addZero(mainGoods.suitsNoNeedPrice)}</Text>
                  </Text>
                ) : (
                  ' '
                )}
              </View>
            </View>
          </View>
          <Image
            src={orderItem.isOpen ? arrowUp : arrowDowm}
            className="arrow"
            onClick={() => {
              changeCheck(mainGoods.marketingId);
            }}
          />
        </View>
        {orderItem.isOpen ? (
          <View className="open-list">
            {suitsRelationList.map((item, index) => {
              return (
                <View
                  key={index}
                  className="cb-main "
                  onClick={() =>
                    Taro.navigateTo({
                      url: `/pages/package-B/goods/goods-details/index?skuId=${item.goodInfoId}`,
                    })
                  }
                >
                  <View className="cb-block">
                    <Image src={item.mainImage ? item.mainImage : defaultImg} className="cb-img" />
                    <View className="cb-info">
                      <Text className="cb-info-name">{item.goodsInfoName}</Text>
                      <Text className="cb-info-spec">{item.specDetail ? item.specDetail : ''}</Text>
                      <Text className="cb-info-num">×{item.goodsInfoNum}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View
              className="bug-btn"
              onClick={() => {
                WMkit.isLogin()
                  ? immediateBuy(mainGoods.marketingId)
                  : Taro.navigateTo({
                      url: '/pages/package-A/login/login/index',
                    });
              }}
            >
              立即购买
            </View>
          </View>
        ) : (
          <View className="close-list">
            {suitsRelationList.map((item, index) => {
              return (
                <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image src={item.mainImage ? item.mainImage : defaultImg} className="main-img" />
                  {((index + 1) % 4 == 0 && index != 0) || suitsRelationList.length - 1 == index ? null : (
                    <Image src={plus} className="plus-img" />
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
