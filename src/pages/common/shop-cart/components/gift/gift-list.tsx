import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import produce from 'immer';

import * as T from '../../types';
import GiftItem from './gift-item';
type IGiftListProps = T.IProps & T.IGiftListProps;

// @connect<Partial<IGiftListProps>, T.IGiftListState>(store2Props, actions)
export default class GiftList extends Component<Partial<IGiftListProps>, T.IGiftListState> {
  constructor(props: IGiftListProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {giftList, level, storeId, selectedMarketingGifts, changeSelectsState, main} = this.props;
    const {marketingId, giftLevelId, giftType} = level;
    return (
      <View>
        {giftList.map((item) => {
          const {goodsInfo, detail, productId, giftDetailId, productNum, checked, disabled} = item;
          return goodsInfo ? (
            <GiftItem
              main={main}
              key={detail.detailId}
              sku={goodsInfo}
              productNum={productNum}
              disabled={disabled}
              checked={checked}
              onCheck={async () => {
                if (goodsInfo.goodsStatus === 0) {
                  const selectedMarketingGiftsState = await this._chooseGift(
                    marketingId,
                    giftLevelId,
                    productId,
                    giftDetailId,
                    giftType,
                    storeId,
                    productNum,
                    selectedMarketingGifts,
                  );
                  await changeSelectsState(selectedMarketingGiftsState);
                }
              }}
            />
          ) : null;
        })}
      </View>
    );
  }

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
    // const {
    //   actions: {action},
    // } = this.props;
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
        const otherGifts = newSelectedMarketingGifts.filter((i) => i.marketingId !== marketingId);
        newSelectedMarketingGifts = newSelectedMarketingGifts.filter((i) => i.marketingId === marketingId);
        if (!selectDetailId && giftType) {
          newSelectedMarketingGifts.splice(index, 1);
          newSelectedMarketingGifts.push(selectedMarketingGift);
        } else {
          !bool ? newSelectedMarketingGifts.splice(index, 1) : newSelectedMarketingGifts.push(selectedMarketingGift);
        }
        newSelectedMarketingGifts.push(...otherGifts);
        return newSelectedMarketingGifts;
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
