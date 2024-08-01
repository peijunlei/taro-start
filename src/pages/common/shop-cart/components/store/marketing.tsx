import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '@/pages/shop-cart/types';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import arrow from '@/assets/image/common/orange-arrow.png';

import {_} from 'wmkit';
import {Const} from 'config';

import '../../css/markeing.less';

type IMarketingProps = T.IProps & T.IMarketingProps;

@connect<Partial<IMarketingProps>, T.IMarketingState>(store2Props, actions)
export default class Marketing extends Component<Partial<IMarketingProps>, T.IGiftMaskState> {
  constructor(props: IMarketingProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions,
      actions: {action},
      main: {
        useStatus: {isEdit},
      },
      marketings,
    } = this.props;
    const initMarketings = this._marketingInit(marketings);
    return (
      <View className="store_marketing">
        {initMarketings.map((item, index) => {
          const showButton = !isEdit && item.isFullGift;
          return (
            <View className="store-activity" key={index}>
              <View className="act-type">
                <Text className="act-type-label">{item.tag}</Text>
              </View>
              <Text className="act-content">{item.title}</Text>

              {//领取赠品
              showButton && (
                <View
                  className="go-invalid"
                  onClick={async () => {
                    Taro.hideTabBar();
                    await action.commonChange([
                      {paths: 'main.useStatus.isMaskOpen', value: true},
                      {paths: 'main.useStatus.maskType', value: item.marketing.lack > 0 ? 1 : 2},
                      {paths: 'main.goods.marketing', value: item.marketing},
                    ]);
                  }}
                >
                  <Text className="coupon-text"> {item.buttonTitle}</Text>
                </View>
              )}

              <View
                className="collet-bills"
                onClick={() => {
                  actions.clean();
                  Taro.navigateTo({
                    url: `/pages/package-B/goods/goods-list-promotion/index?marketingId=${item.marketing.marketingId}`,
                  });
                }}
              >
                <Text className="coupon-text">去凑单</Text>
                <Image className="arrow-img" src={arrow} />
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  //我是搬运工 from H5
  _marketingInit = (marketings = []) => {
    const newMareting = [];
    marketings.forEach((marketing) => {
      let isFullGift = marketing.marketingType === 2;
      let isFullReduction = marketing.marketingType === 0;
      let isFullDiscount = marketing.marketingType === 1;
      let isfullPackage = marketing.marketingType === 3;
      let isHalfDiscount = marketing.marketingType === 4;
      const type = marketing.marketingType;
      marketing.buyoutPriceLevel = marketing.buyoutPriceLevel || {};
      marketing.halfPriceSecondPieceLevel = marketing.halfPriceSecondPieceLevel || {};
      let discountTag = '';
      if (type == 4) {
        if (marketing.halfPriceSecondPieceLevel.number > 0 && marketing.halfPriceSecondPieceLevel.discount == 0) {
          discountTag = `买${marketing.halfPriceSecondPieceLevel.number - 1}送1`;
        } else if (marketing.halfPriceSecondPieceLevel.number > 0 && marketing.halfPriceSecondPieceLevel.discount > 0) {
          discountTag = `第${marketing.halfPriceSecondPieceLevel.number}件${marketing.halfPriceSecondPieceLevel.discount}折`;
        }
      }
      let tag =
        type == 3
          ? `${marketing.buyoutPriceLevel.choiceCount}件${marketing.buyoutPriceLevel.fullAmount}元`
          : type == 4
          ? discountTag
          : `满${Const.marketingType[type]}`;
      let title = '';
      let buttonTitle = '';
      let rule = '';

      if (isFullGift) {
        rule = marketing.subType === 4 ? marketing.fullGiftLevel.fullAmount : marketing.fullGiftLevel.fullCount;

        title =
          marketing.lack > 0
            ? `满${rule}${marketing.subType === 4 ? '元' : '件'}获赠品，还差${marketing.lack}${
                marketing.subType === 4 ? '元' : '件'
              }`
            : `您已满足满${rule}获赠品`;

        buttonTitle = marketing.lack > 0 ? '查看赠品' : '领取赠品';
      } else if (isFullReduction) {
        rule =
          marketing.subType === 0
            ? marketing.fullReductionLevel.fullAmount + '元'
            : marketing.fullReductionLevel.fullCount + '件';
        let reduction = marketing.fullReductionLevel.reduction;
        title =
          marketing.lack > 0
            ? `满${rule}减${reduction}元，还差${marketing.lack}${marketing.subType === 0 ? '元' : '件'}`
            : `您已满足满${rule}减${reduction}`;
      } else if (isFullDiscount) {
        rule =
          marketing.subType === 2
            ? marketing.fullDiscountLevel.fullAmount
            : marketing.fullDiscountLevel.fullCount + '件';
        let discount = _.mul(marketing.fullDiscountLevel.discount, 10);

        title =
          marketing.lack > 0
            ? `满${rule}享${discount}折，还差${marketing.lack}${marketing.subType === 2 ? '元' : '件'}`
            : `您已满足满${rule}享${discount}折`;
      } else if (isfullPackage) {
        rule = marketing.buyoutPriceLevel.choiceCount + '件';
        // let reduction = marketing.fullReductionLevel.reduction;
        title =
          marketing.lack > 0 ? `还差${marketing.lack}${marketing.subType === 0 ? '元' : '件'}` : `您已满足满${rule}`;
      } else if (isHalfDiscount) {
        let num =
          marketing.subType === 7
            ? marketing.halfPriceSecondPieceLevel.number
            : marketing.halfPriceSecondPieceLevel.discount;
        rule = num + '件';

        if (marketing.halfPriceSecondPieceLevel.discount == 0) {
          // let reduction = marketing.fullReductionLevel.reduction;
          title =
            marketing.lack > 0
              ? `买${num - 1}送1，还差${marketing.lack}${marketing.subType === 7 ? '件' : '元'}`
              : `您已满足买${num - 1}送1`;
        } else {
          title =
            marketing.lack > 0
              ? `第${num}件${marketing.halfPriceSecondPieceLevel.discount}折，还差${marketing.lack}${
                  marketing.subType === 7 ? '件' : '元'
                }`
              : `您已满足第${num}件${marketing.halfPriceSecondPieceLevel.discount}折`;
        }
      }
      newMareting.push({title, tag, rule, isFullGift, buttonTitle, marketing});
    });
    return newMareting;
  };
}

//create by moon https://github.com/creasy2010/moon
