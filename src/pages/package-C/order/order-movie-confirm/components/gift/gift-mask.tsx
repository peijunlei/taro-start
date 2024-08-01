import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../../types';
import '../../css/gift-mask.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import GiftItem from './gift-item';
import produce from 'immer';

type IGiftMaskProps = T.IProps & T.IGiftMaskProps;

@connect<Partial<IGiftMaskProps>, T.IGiftMaskState>(store2Props, actions)
export default class GiftMask extends Component<Partial<IGiftMaskProps>, T.IGiftMaskState> {
  constructor(props: IGiftMaskProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {
        gifts: {fullGiftLevelList, selectedMarketingGifts},
        stores,
        initGiftMarketLevelId,
      },
    } = this.props;
    const {giftList, levelList, marketingSubType} = fullGiftLevelList;

    return (
      <View>
        {levelList &&
          levelList.length &&
          levelList.map((level, key) => {
            // 4：满金额赠  5：满数量赠
            const rule = marketingSubType == 4 ? level.fullAmount : level.fullCount;
            const gifts = this._giftListInit(
              level,
              giftList,
              selectedMarketingGifts,
              marketingSubType,
              stores,
              initGiftMarketLevelId,
            );
            return (
              <View className="giftMask" key={level.giftLevelId}>
                <View className="gift-header">
                  <Text className="header-title">满</Text>
                  <Text className="header-num">{rule}</Text>
                  <Text className="header-title">{`${marketingSubType == 4 ? '元' : '件'}可获以下赠品，`}</Text>
                  <Text className="header-title">可选</Text>
                  {level.giftType === 0 ? (
                    <Text className="header-num">全部</Text>
                  ) : (
                    <Text className="header-num">1</Text>
                  )}
                  {level.giftType !== 0 && <Text className="header-title">种</Text>}
                </View>

                {gifts.map((item) => {
                  return (
                    <GiftItem
                      key={item.goodsInfoId}
                      sku={item}
                      onCheck={async () => {
                        if (item.goodsInfo.goodsStatus === 0) {
                          const selectedMarketingGiftsState = await this._chooseGift(
                            level.marketingId,
                            level.giftLevelId,
                            item.productId,
                            item.giftDetailId,
                            level.giftType,
                            level.storeId,
                            item.productNum,
                            selectedMarketingGifts,
                          );
                          action.commonChange([
                            {paths: 'main.gifts.selectedMarketingGifts', value: selectedMarketingGiftsState},
                          ]);
                        }
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
      </View>
    );
  }

  _giftListInit = (level, giftGoodsInfos, selectedMarketingGifts, marketingSubType, stores, initGiftMarketLevelId) => {
    return level.fullGiftDetailList.map((detail, key) => {
      const goodsInfo = giftGoodsInfos.find((item) => item.goodsInfoId == detail.productId);
      const productNum = detail.productNum;
      const {tradeItems} = stores[0];

      //2021-11-02 禁用相关已转移后端处理
      let disabled = goodsInfo && goodsInfo.goodsStatus === 0 && goodsInfo.stock > 0;

      //满赠&&领取赠品 未达到级别 禁用
      if (marketingSubType === 5) {
        const fullCount = tradeItems[0].num;
        disabled = disabled && fullCount < level.fullCount;
      }

      if (marketingSubType === 4) {
        const fullAmount = tradeItems[0].num * tradeItems[0].price;
        disabled = disabled && fullAmount < level.fullAmount;
      }
      let checked;
      const selectedGift = selectedMarketingGifts.filter(
        (gift) =>
          gift.marketingId === detail.marketingId &&
          gift.giftLevelId === detail.giftLevelId &&
          gift.giftDetailId === detail.giftDetailId &&
          gift.goodsInfoId === detail.productId,
      )[0];

      checked = Boolean(selectedGift);
      return {
        goodsInfo,
        productNum,
        checked,
        detail,
        disabled,
        productId: detail.productId,
        giftDetailId: detail.giftDetailId,
      };
    });
  };

  /**
   * 领取赠品
   */
  _chooseGift = async (
    marketingId,
    giftLevelId,
    goodsInfoId,
    giftDetailId,
    giftType,
    storeId,
    goodsNum,
    selectedMarketingGifts,
  ) => {
    const {
      actions: {action},
    } = this.props;
    const selectedGift = selectedMarketingGifts.filter((gift) => gift.marketingId === marketingId)[0];
    // 选取赠品，且为不同等级
    if (selectedGift && selectedGift.giftLevelId !== giftLevelId) {
      // 赠一个，且已选了一个
      await Taro.showToast({
        title: `只可参加1个满赠活动哦`,
        icon: 'none',
        duration: 2000,
      });
      return selectedMarketingGifts;
    } else {
      let selectedMarketingGift = {
        marketingId: marketingId,
        giftDetailId: giftDetailId,
        giftLevelId: giftLevelId,
        goodsInfoId: goodsInfoId,
        storeId: storeId,
        goodsNum: goodsNum,
      };
      let index = selectedMarketingGifts.findIndex((gift) => {
        return (
          gift.marketingId === selectedMarketingGift.marketingId &&
          gift.giftLevelId === selectedMarketingGift.giftLevelId &&
          gift.giftDetailId === selectedMarketingGift.giftDetailId &&
          gift.goodsInfoId === selectedMarketingGift.goodsInfoId
        );
      });
      const bool = index === -1;
      const selectDetailId = ~selectedMarketingGifts.findIndex(
        (item) => item.giftDetailId === selectedMarketingGift.giftDetailId,
      );

      return produce(selectedMarketingGifts, (newSelectedMarketingGifts) => {
        if (!selectDetailId && giftType) {
          newSelectedMarketingGifts.splice(index, 1);
          newSelectedMarketingGifts.push(selectedMarketingGift);
        } else {
          !bool ? newSelectedMarketingGifts.splice(index, 1) : newSelectedMarketingGifts.push(selectedMarketingGift);
        }
        return newSelectedMarketingGifts;
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
