import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import '../../css/promation-mask.less';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';

type IPromationMaskProps = T.IProps & T.IPromationMaskProps;

@connect<Partial<IPromationMaskProps>, T.IPromationMaskState>(store2Props, actions)
export default class PromationMask extends Component<Partial<IPromationMaskProps>, T.IPromationMaskState> {
  constructor(props: IPromationMaskProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {
        goods: {chooseMarketingSkuId, skuMarketingDict, selectedMarketingGifts},
      },
    } = this.props;

    const skuMarketings = skuMarketingDict[chooseMarketingSkuId] || [];
    skuMarketings.sort((a, b) => a.marketingType - b.marketingType);

    return (
      <View className="promationMask">
        <Text className="promation-title"> 促销活动仅可任选其一</Text>
        {skuMarketings.map((item, key) => {
          return (
            <View key={key}>
              <View
                className="promation-item"
                onClick={async () => {
                  await action._chooseSkuMarketing(chooseMarketingSkuId, item.marketingId);
                }}
              >
                <Image className="check-image" src={item.checked ? check : uncheck} />

                <View className="store-activity">
                  <View className="act-type">
                    {item.marketingType != 3 && item.marketingType != 4 ? (
                      <Text className="act-text">满{this._getType(item.marketingType)}</Text>
                    ) : (
                      <Text className="act-text">{this.getMarketingName(item)}</Text>
                    )}
                  </View>
                  <Text className="act-content">{this.getMarketingName(item)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  _getType = (type) => {
    if (type === 0) {
      return '减';
    } else if (type === 1) {
      return '折';
    } else if (type === 2) {
      return '赠';
    }
  };
  getMarketingName(selectedMarketing) {
    let marketingName;
    if (selectedMarketing && selectedMarketing.marketingType == 4) {
      // 判断存不存在第二件打折商品为0折
      let isExitDiscountZero = selectedMarketing.halfPriceSecondPieceLevel.some((item) => item.discount == 0);
      if (isExitDiscountZero) {
        marketingName = `买${selectedMarketing.halfPriceSecondPieceLevel[0].number - 1}送1`;
      } else {
        marketingName = selectedMarketing.alllevelDesc;
      }
    } else {
      marketingName = selectedMarketing.alllevelDesc;
    }
    return marketingName;
  }
}

//create by moon https://github.com/creasy2010/moon
