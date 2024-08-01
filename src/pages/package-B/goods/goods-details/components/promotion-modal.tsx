import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
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
import {WMkit} from 'wmkit';
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
      main,
    } = this.props;
    // , goodsDetail
    if (main && main.goodsInfo) {
      let marketingLists = JSON.stringify(main.goodsInfo) == '{}' ? [] : this.marketAllByOne(main.goodsInfo);
      let marketLabels = '';
      let marketLabel = '';
      if (marketingLists.length > 1) {
        for (let a = 0; a < marketingLists.length; a++) {
          if (marketingLists[a].marketingType == 0) {
            marketLabels += '满减';
          } else if (marketingLists[a].marketingType == 1) {
            marketLabels += '满折/';
          } else if (marketingLists[a].marketingType == 2) {
            marketLabels += '满赠/';
          } else if (marketingLists[a].marketingType == 3) {
            marketLabels += '打包一口价/';
          }
        }
      } else if (marketingLists.length == 1) {
        for (let a = 0; a < marketingLists.length; a++) {
          if (marketingLists[a].marketingType == 0) {
            marketLabel = '满减';
          } else if (marketingLists[a].marketingType == 1) {
            marketLabel = '满折';
          } else if (marketingLists[a].marketingType == 2) {
            marketLabel = '满赠';
          } else if (marketingLists[a].marketingType == 3) {
            marketLabel = '打包一口价';
          }
        }
      }
    }

    //去重后的所有促销活动
    let marketingList = [];
    let isHaveGift = false;
    if (main && main.goodsInfo && main.goodsDetail.goods) {
      if (main.goodsDetail.goods.saleType == 1) {
        marketingList = JSON.stringify(main.goodsInfo) == '{}' ? [] : this.marketAllByOne(main.goodsInfo);
        if (marketingList.length > 0) {
          marketingList.forEach((label, index) => {
            if (label.marketingType == 2) {
              isHaveGift = true;
            }
          });
        }
      } else if (main && main.goodsDetail.goodsInfos.length > 0) {
        marketingList = this.marketAll(main.goodsDetail.goodsInfos);
        isHaveGift = true;
      }
    }

    marketingList = marketingList.reverse();

    // // 未登录时只展示joinLevel为null或-1的标签
    // if (!WMkit.isLogin()) {
    //   marketingList = marketingList.filter((v) => v.joinLevel == null || v.joinLevel == -1);
    // }

    return (
      <View
        className="promotionModal"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
        onClick={() => {
          publicAction.commonChange([{paths: 'main.isPromotionShow', value: false}]);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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

          <ScrollView scrollY className="mask-con">
            <View className="title-box">
              <Text className="title">促销活动仅可任选其一，可在购物车中修改</Text>
              {//展示所有促銷活動
              marketingList.length > 0 &&
                marketingList.map((label, index) => {
                  return (
                    <View
                      key={index}
                      className="active-box"
                      onClick={() => {
                        Taro.redirectTo({
                          url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${label.marketingId}`,
                        });
                        publicAction.commonChange([{paths: 'main.isPromotionShow', value: false}]);
                      }}
                    >
                      {label.marketingType == 3 ? (
                        <View className="l-content">
                          <View className="icon">{label.marketingDesc.split('，')[0]}</View>
                          <View className="text">{label.marketingDesc}</View>
                        </View>
                      ) : label.marketingType == 4 ? (
                        <View className="l-content">
                          <View className="icon">{label.marketingDesc}</View>
                          <View className="text">{label.marketingDesc}</View>
                        </View>
                      ) : (
                        <View className="l-content">
                          <View className="icon">满{marketingType[label.marketingType]}</View>
                          <View className="text">{label.marketingDesc}</View>
                        </View>
                      )}

                      <Image src={arrow} className="arrow" />
                    </View>
                  );
                })}
            </View>
            <GiftMask />
          </ScrollView>
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
