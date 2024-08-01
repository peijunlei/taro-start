import React from 'react';
import Taro from '@tarojs/taro';
import {debounce} from 'lodash';
import {View, Text, Image} from '@tarojs/components';
import arrowImg from '@/assets/image/common/arrow.png';
import '../../css/return-way.less';

const ReturnWay = (props) => {
  return (
    <View className="mySet__info">
      <View className="mb24 border-all">
        <View
          className="set-item1"
          onClick={() => {
            setTimeout(() => {
              Taro.removeStorageSync('mini::returnSuccessBackFlag');
              props.returnSkuSecond('REFUND');
            }, 100);
          }}
        >
          <Text className="set-title fs28">仅退款</Text>
          <Text className="return-ins fs24">拒收/未收到货/或与商家协商不需要退货</Text>
          <Image className="set-arrow" src={arrowImg} />
        </View>
        <View
          className="set-item1 setItem__border_top"
          onClick={() => {
            setTimeout(() => {
              Taro.removeStorageSync('mini::returnSuccessBackFlag');
              props.returnSkuSecond('RETURN');
            }, 100);
          }}
        >
          <Text className="set-title fs28">退货退款</Text>
          <Text className="return-ins fs24">需要退还已收到的货品</Text>
          <Image className="set-arrow" src={arrowImg} />
        </View>
      </View>
    </View>
  );
};

export default ReturnWay;
