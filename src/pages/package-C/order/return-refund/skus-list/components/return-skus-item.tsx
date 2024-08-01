import { View, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import '../../css/return-skus-list.less';
import { _ } from 'wmkit';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import disabled from '@/assets/image/shop-cart/disabled-check.png';
import Price from '@/pages/common/goods/price';
import CartCount from '@/pages/common/goods/cart-count';
import noneImg from '../img/none.png';
import { getHashParam } from '@/utils/common-functions';
import { Const, cache } from 'config';

const ReturnSkusItem = (props) => {
  const {sku, action, step, refundState, deliverStatus} = props;
  const [isShowTip, setIsShowTip] = useState(false);
  const [tipValue, setTipValue] = useState('');
  let skuId;
  if (__TARO_ENV === 'h5') {
    const href = window.location.href;
    const program = getHashParam<{ id: string }>(href);
    skuId = program.skuId ? program.skuId : '';
  } else {
    skuId = getCurrentInstance().router.params.skuId ? getCurrentInstance().router.params.skuId : '';
  }

  const _handleChange = (value, skus) => {
    setIsShowTip(false);
    if (value === skus.canReturnNum) {
      setTipValue(`可退${value}`);
      setIsShowTip(true);
    } else if (value == 0) {
      setTipValue(`退货数量不可小于1`);
      setIsShowTip(true);
      // skus.skuChecked && checkOne(sku.skuId);
    }
    action.changeNum(skus.skuId, value);
  };
  return (
    <View className="return-box-item" key={sku.oid}>
      {step === 'one' && skuId === '' && refundState ? (
        <Image
          className="checkImg"
          src={sku.skuChecked ? check : deliverStatus === 'NOT_YET_SHIPPED' ? disabled : uncheck}
          onClick={() => {
            //未发货 只能全选
            if (deliverStatus === 'NOT_YET_SHIPPED') return;
            action.checkOne(sku.skuId);
          }}
        />
      ) : null}
      <View
        className="right-box"
        onClick={(e) => {
          e.stopPropagation();
          const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
          if (singerCardLogin) return;
          Taro.navigateTo({
            url: `/pages/package-B/goods/goods-details/index?skuId=${sku.skuId}`,
          });
        }}
      >
        <Image className="goods-img" src={sku.pic ? sku.pic : noneImg} />
        <View className="goods-cls">
          <Text className="name">{sku.thirdPlatformType != null && (
            <View className="marketing">
              <Text className="market-text">{Const.thirdPlatformTypeList[sku.thirdPlatformType]}</Text>
            </View>
          )}{sku.skuName}</Text>
          <Text className="goods-spec ">{sku.specDetails || ''}</Text>
          <View className="info-bottom">
            <View style={{ flex: 1 }}>
              <Price price={(sku.price || 0).toFixed(2)} buyPoint={sku.buyPoint} />
            </View>
            {step === 'one' && refundState ? (
              <View className="cart-count-con">
                <CartCount
                  disabled={deliverStatus === 'NOT_YET_SHIPPED'}
                  count={sku.canReturnNum}
                  inventory={sku.canReturnNum}
                  getNum={async (index) => {
                    _handleChange(index, sku);
                  }}
                />
                {sku.skuChecked && isShowTip && <Text className="valid-text">{tipValue}</Text>}
              </View>
            ) : (
                <Text className="gift-num">×{sku.num}</Text>
              )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReturnSkusItem;
