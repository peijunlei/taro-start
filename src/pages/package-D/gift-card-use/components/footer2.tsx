import {View, Image, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';
import GoodsItem from './goods-item';

import './footer1.less';

@connect(store2Props, actions)
export default class Footer2 extends Component<any, any> {
  render() {
    let {main = {}, actions = {}} = this.props;
    const {selectedNum, totalPrice, totalBuyPoint, giftCard, type, cardStatus} = main;
    const {balance} = giftCard;

    return (
      <View className="footer1-cls">
        <View className="footer-left">
          <View
            className="left-icon"
            onClick={() => {
              actions.action.showSelectedGoodsModal(true);
            }}
          >
            <Image src={require('@/assets/image/gift-card/shop.png')} className="img" />
          </View>
          <View>
            <View className="left-desc1">
              <Text className="price-key">
                已选
                <Text style={{color: '#ff6600', margin: '0 4px'}}>{selectedNum || '0'}</Text>份,
              </Text>
              <Text className="price-key">总价</Text>
              <Price price={totalPrice} buyPoint={totalBuyPoint} />
            </View>
            <View className="price-left">当前剩余福点：￥{balance || '0.00'}</View>
          </View>
        </View>
        <View
          className={
            !selectedNum || type === '0' || cardStatus === '0' ? 'confirm-btn-disable confirm-btn' : 'confirm-btn'
          }
          onClick={() => {
            selectedNum && actions.action.submitOrder();
          }}
        >
          <Text className="confirm-text">提交订单</Text>
        </View>
      </View>
    );
  }
}
