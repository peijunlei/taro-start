import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/promotion-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import close from '@/assets/image/common/close.png';
import arrow from '@/assets/image/goods/goods-detail/r-arrow.png';
import GiftMask from './gift/gift-mask';
//促销类型
const marketingType = {
  0: '减',
  1: '折',
  2: '赠',
};
type IPromotionModalProps = T.IProps & T.IPromotionModalProps;

@connect<Partial<IPromotionModalProps>, T.IPromotionModalState>(store2Props, actions)
export default class PromotionModal extends Component<Partial<IPromotionModalProps>, T.IPromotionModalState> {
  constructor(props: IPromotionModalProps) {
    super(props);
  }

  /**
    促销弹窗
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main: {goodsInfo, goodsDetail},
    } = this.props;

    //去重后的所有促销活动
    let marketingList = [];
    let isHaveGift = false;
    if (goodsInfo && goodsDetail.goods) {
      if (goodsDetail.goods.saleType == 1) {
        marketingList = JSON.stringify(goodsInfo) == '{}' ? [] : this.marketAllByOne(goodsInfo);
        if (marketingList.length > 0) {
          marketingList.forEach((label, index) => {
            if (label.marketingType == 2) {
              isHaveGift = true;
            }
          });
        }
      } else if (goodsDetail.goodsInfos.length > 0) {
        marketingList = this.marketAll(goodsDetail.goodsInfos);
        isHaveGift = true;
      }
    }

    return (
      <View className="promotionModal">
        <View className="mask-container">
          <View className="mask-header">
            <Text className="header-text">促销</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await publicAction.commonChange([{paths: 'main.isPromotionShow', value: false}]);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-con">
            <View className="title-box">
              <Text className="title">满减/满折/满赠仅可任选其一</Text>
              {//展示所有促銷活動
              marketingList.length > 0 &&
                marketingList.map((label, index) => {
                  return (
                    <View
                      key={index}
                      className="active-box"
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${label.marketingId}`,
                        })
                      }
                    >
                      <View className="l-content">
                        <View className="icon">满{marketingType[label.marketingType]}</View>
                        <View className="text">{label.marketingDesc}</View>
                      </View>
                      <Image src={arrow} className="arrow" />
                    </View>
                  );
                })}
            </View>

            <GiftMask />
          </View>
        </View>
      </View>
    );
  }

  /**
   * 展示某个规格下的促销活动
   * @param goodsInfos
   */
  marketAllByOne = (goodsInfo) => {
    let hash = {};
    let allSkuMarketings = [];
    goodsInfo &&
      goodsInfo.marketingLabels
        .sort((marketing) => marketing.marketingType)
        .map((marketing) => {
          allSkuMarketings.push(marketing);
        });
    const newArr = allSkuMarketings.reduce((item, next) => {
      hash[next.marketingId] ? '' : (hash[next.marketingId] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  };

  /**
   * 展示所有规格下的促销活动，并去重
   * @param goodsInfos
   */
  marketAll = (goodsInfos) => {
    let hash = {};
    let allSkuMarketings = [];
    goodsInfos.length > 0 &&
      goodsInfos.map((goodsInfo) => {
        goodsInfo.marketingLabels.map((marketing) => {
          allSkuMarketings.push(marketing);
        });
      });
    const newArr = allSkuMarketings.reduce((item, next) => {
      hash[next.marketingId] ? '' : (hash[next.marketingId] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  };
}

//create by moon https://github.com/creasy2010/moon
