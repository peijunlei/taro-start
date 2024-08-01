import {View, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import '../../css/return-gifts-list.less';
import {_} from 'wmkit';
import check from '@/assets/image/shop-cart/disable-checked.png';
import noneImg from '../img/none.png';
import Price from '@/pages/common/goods/price';
import uncheck from '@/assets/image/shop-cart/disabled-check.png';
import {getHashParam} from '@/utils/common-functions';

const ReturnGiftsList = (props) => {
  let skuId;
  if (__TARO_ENV === 'h5') {
    const href = window.location.href;
    const program = getHashParam<{id: string}>(href);
    skuId = program.skuId ? program.skuId : '';
  } else {
    skuId = getCurrentInstance().router.params.skuId ? getCurrentInstance().router.params.skuId : '';
  }
  const {gifts, checkGift, step} = props;
  return (
    <View className="returnSkusList returnGiftsList">
      {gifts.map((sku) => {
        return sku.num > 0 || skuId === '' ? (
          <View
            className="return-box-item"
            key={sku.oid}
            onClick={(e) => {
              e.stopPropagation();
              const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
              if (singerCardLogin) return;
              Taro.navigateTo({
                url: `/pages/package-B/goods/goods-details/index?skuId=${sku.skuId}`,
              });
            }}
          >
            {step === 'one' && skuId === '' ? (
              <Image
                className="checkImg"
                src={sku.num === 0 ? uncheck : check}
                onClick={() => {
                  checkGift(sku.skuId);
                }}
              />
            ) : null}
            <View className="right-box">
              <Image className="goods-img" src={sku.pic ? sku.pic : noneImg} />
              <View className="goods-cls">
                <Text className="name">
                  <Text className="gift-label">赠品</Text>
                  {sku.skuName}{' '}
                </Text>
                <Text className="goods-spec "> {sku.specDetails || ''}</Text>
                <View className="info-bottom">
                  <View style={{flex: 1}}>
                    <Price price={_.addZero(sku.price)} />
                  </View>
                  <Text className="gift-num">×{sku.num}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default ReturnGiftsList;
