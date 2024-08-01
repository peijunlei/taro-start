import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import '../../css/return-skus-list.less';
import ReturnSkusItem from './return-skus-item';

const ReturnSkusList = (props) => {
  const {skus, step, action, refundState,deliverStatus} = props;
  return (
    <View className="returnSkusList">
      {skus.map((sku, index) => {
        console.log('sku',sku);
        return <ReturnSkusItem key={index} sku={sku} action={action} step={step} refundState={refundState}  deliverStatus={deliverStatus}/>;
      })}
    </View>
  );
};

export default ReturnSkusList;
