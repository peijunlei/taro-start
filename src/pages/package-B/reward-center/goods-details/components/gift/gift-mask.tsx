import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import './gift-mask.less';
import actions from '../../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import GiftList from './gift-list';

type IGiftMaskProps = T.IProps & T.IGiftMaskProps;

@connect<Partial<IGiftMaskProps>, T.IGiftMaskState>(store2Props, actions)
export default class GiftMask extends Component<Partial<IGiftMaskProps>, T.IGiftMaskState> {
  constructor(props: IGiftMaskProps) {
    super(props);
  }

  componentDidMount(): void {
    const {
      main: {},
    } = this.props;

    this.setState({selectedMarketingGifts: []});
  }
  state = {
    selectedMarketingGifts: [],
  };
  render() {
    let {
      actions: {},
      main: {gift, fullGiftLevelList},
    } = this.props;
    const {selectedMarketingGifts} = this.state;
    return (
      <View>
        {fullGiftLevelList &&
          fullGiftLevelList.length &&
          fullGiftLevelList.map((level, key) => {
            const rule = level.fullAmount ? level.fullAmount + '元' : level.fullCount + '件';
            const giftList = this._giftListInit(level, gift, selectedMarketingGifts);

            return (
              <View key={key}>
                <View className="giftMask" key={level.giftLevelId}>
                  <View className="gift-header">
                    <Text className="header-title">满</Text>
                    <Text className="header-num">{rule}</Text>
                    <Text className="header-title">可获以下赠品，</Text>
                    <Text className="header-title">可选</Text>
                    {level.giftType === 0 ? (
                      <Text className="header-num">全部</Text>
                    ) : (
                      <Text className="header-num">1</Text>
                    )}
                    {level.giftType !== 0 && <Text className="header-title">种</Text>}
                  </View>
                  <GiftList
                    level={level}
                    giftList={giftList}
                    storeId={gift[0].storeId}
                    selectedMarketingGifts={selectedMarketingGifts}
                    changeSelectsState={async (selectedMarketingGifts) => {
                      this.setState({selectedMarketingGifts});
                    }}
                  />
                </View>
              </View>
            );
          })}
      </View>
    );
  }

  _giftListInit = (level, giftGoodsInfos, selectedMarketingGifts) => {
    return level.fullGiftDetailList.map((detail, key) => {
      const goodsInfo = giftGoodsInfos.find((item) => item.goodsInfoId == detail.productId);
      const productNum = detail.productNum;
      const disabled = goodsInfo.goodsStatus === 0 && goodsInfo.stock > 0;
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
        productId: detail.productId,
        giftDetailId: detail.giftDetailId,
      };
    });
  };

  _getMarketing = (marketings) => {
    let marketing: any = {};
    marketings.forEach((value) => {
      if (value.marketingType === 2) {
        marketing = value;
      }
    });

    return marketing;
  };
}

//create by moon https://github.com/creasy2010/moon
