import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import '../../css/gift-mask.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import GiftList from './gift-list';

type IGiftMaskProps = T.IProps & T.IGiftMaskProps;

@connect<Partial<IGiftMaskProps>, T.IGiftMaskState>(store2Props, actions)
export default class GiftMask extends Component<Partial<IGiftMaskProps>, T.IGiftMaskState> {
  constructor(props: IGiftMaskProps) {
    super(props);
  }

  componentDidMount(): void {
    const {
      main: {
        goods: {selectedMarketingGifts},
      },
    } = this.props;

    this.setState({selectedMarketingGifts});
  }
  state = {
    selectedMarketingGifts: [],
  };
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      isSecondShopCart,
      main: {
        useStatus: {maskType},
        goods: {marketing, giftGoodsInfos, chooseMarketingSkuId, goodsMarketing},
      },
    } = this.props;

    const {selectedMarketingGifts} = this.state;
    const marketings = maskType
      ? //查看赠品 领取赠品
        marketing
      : //修改促销展示赠品
        this._getMarketing(goodsMarketing[chooseMarketingSkuId]);

    const fullGiftLevelList = marketings.fullGiftLevelList;

    const count = selectedMarketingGifts.filter((gift) => gift.marketingId === marketing.marketingId).length;
    const isSecondShopCartStyle = __TARO_ENV === 'h5' ? {bottom: 'env(safe-area-inset-bottom)'} : {};
    return (
      <View>
        {fullGiftLevelList &&
          fullGiftLevelList.length &&
          fullGiftLevelList.map((level, key) => {
            const rule = marketings.subType === 4 ? level.fullAmount : level.fullCount;
            const giftList = this._giftListInit(level, giftGoodsInfos, selectedMarketingGifts, marketings);
            return (
              <View className="giftMask" key={level.giftLevelId}>
                <View className="gift-header">
                  <Text className="header-title">满</Text>
                  <Text className="header-num">{rule}</Text>
                  <Text className="header-title">{`${marketings.subType === 4 ? '元' : '件'}可获以下赠品，`}</Text>
                  <Text className="header-title">可选</Text>
                  {level.giftType === 0 ? (
                    <Text className="header-num">全部</Text>
                  ) : (
                    <Text className="header-num">1</Text>
                  )}
                  {level.giftType !== 0 && <Text className="header-title">种</Text>}
                </View>

                <GiftList
                  main={this.props.main}
                  level={level}
                  giftList={giftList}
                  storeId={marketings.storeId}
                  selectedMarketingGifts={selectedMarketingGifts}
                  changeSelectsState={async (selectedMarketingGifts) => {
                    this.setState({selectedMarketingGifts});
                  }}
                />
              </View>
            );
          })}
        {maskType === 2 && (
          <View>
            <View className="gift-bottom-top" />

            <View className="gift-bottom" style={isSecondShopCartStyle}>
              <View className="gift-num-con">
                <Text className="gift-text">已选</Text>
                <Text className="gift-num">{count}</Text>
                <Text className="gift-text">种</Text>
              </View>

              <View
                className="gift-confirm-btn"
                onClick={async () => {
                  await action.commonChange([
                    {paths: 'main.useStatus.isMaskOpen', value: false},
                    {paths: 'main.goods.selectedMarketingGifts', value: selectedMarketingGifts},
                  ]);
                  Taro.showTabBar();
                }}
              >
                <Text className="gift-confirm-text">确定</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  _giftListInit = (level, giftGoodsInfos, selectedMarketingGifts, marketings) => {
    return level.fullGiftDetailList.map((detail, key) => {
      const goodsInfo = giftGoodsInfos[detail.marketingId+'_'+detail.productId];
      const productNum = detail.productNum;

      let disabled = goodsInfo && goodsInfo.goodsStatus === 0 && goodsInfo.stock > 0;

      //满赠&&领取赠品 未达到级别 禁用
      if (marketings.subType === 5 && this.props.main.useStatus.maskType === 2) {
        const fullCount = marketings.fullGiftLevel.fullCount;
        disabled = fullCount < level.fullCount;
      }

      if (marketings.subType === 4 && this.props.main.useStatus.maskType === 2) {
        const fullAmount = marketings.totalAmount;
        disabled = fullAmount < level.fullAmount;
      }

      const selectedGift = selectedMarketingGifts.filter(
        (gift) =>
          gift.marketingId === detail.marketingId &&
          gift.giftLevelId === detail.giftLevelId &&
          gift.giftDetailId === detail.giftDetailId &&
          gift.goodsInfoId === detail.productId,
      )[0];

      const checked = Boolean(selectedGift);

      return {
        goodsInfo,
        productNum,
        disabled,
        checked,
        detail,
        productId: detail.productId,
        giftDetailId: detail.giftDetailId,
      };
    });
  };

  _getMarketing = (marketings) => {
    let marketing: any = {};
    marketings &&
      marketings.forEach((value) => {
        if (value.marketingType === 2) {
          marketing = value;
        }
      });

    return marketing;
  };
}

//create by moon https://github.com/creasy2010/moon
