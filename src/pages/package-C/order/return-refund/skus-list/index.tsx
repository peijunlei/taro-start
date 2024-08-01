import {View, Text, Image} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component, useState, useEffect} from 'react';
import '../css/return-skus-box.less';
import check from '@/assets/image/shop-cart/check.png';
import uncheck from '@/assets/image/shop-cart/uncheck.png';
import ReturnSkusList from './components/return-skus-list';
import ReturnGiftsList from './components/return-gifts-list';
import {getHashParam} from '@/utils/common-functions';

const ReturnSkusBox = (props) => {
  const {main, action, step} = props;
  let skuId;
  if (__TARO_ENV === 'h5') {
    const href = window.location.href;
    const program = getHashParam<{id: string}>(href);
    skuId = program.skuId ? program.skuId : '';
  } else {
    skuId = getCurrentInstance().router.params.skuId ? getCurrentInstance().router.params.skuId : '';
  }
  const checkedAllQL = () => {
    let {skus, gifts} = main;
    if (skus && skus.length > 0 && gifts && gifts.length > 0) {
      return skus.every((sku) => sku.skuChecked) && gifts.every((sku) => sku.giftChecked);
    } else if (skus && skus.length > 0) {
      return skus.every((sku) => sku.skuChecked);
    } else {
      return false;
    }
  };
  const [refundState, setRefundState] = useState(true);
  const refund = async () => {
    if (step === 'one') {
      const res = await action.isRefund();
      setRefundState(!res);
    }
  };
  useEffect(() => {
    refund();
  }, []);

  return (
    main && (
      <View className="returnSkusBox" key={step}>
        <View className="check-box">
          {step === 'one' && skuId === '' && refundState ? (
            <Image
              className="checkImg"
              src={checkedAllQL() ? check : uncheck}
              onClick={() => action.checkAll(checkedAllQL())}
            />
          ) : null}
          <View className="c-tips">
            <Text className="mb16 fs28">退货商品</Text>
            <Text className="c999 fs24">如因退货导致满赠活动失效，您需要返还赠品哦</Text>
            {main.skus[0]?.pluginType === 1 && (
              <Text className="c999 fs24" style={{paddingTop: '5px'}}>
                保税商品不可退货，如需退货请联系客服！
              </Text>
            )}
          </View>
        </View>
        <ReturnSkusList skus={main.skus} step={step} action={action} refundState={refundState} deliverStatus={main.deliverStatus}/>
        <ReturnGiftsList
          gifts={step === 'one' ? main.gifts : main.giftSecond}
          checkGift={action.checkGift}
          step={step}
        />
      </View>
    )
  );
};

export default ReturnSkusBox;
