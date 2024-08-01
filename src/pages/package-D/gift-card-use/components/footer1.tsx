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
export default class Footer1 extends Component<any, any> {
  render() {
    let {main = {}, actions = {}} = this.props;
    const {selectedNum, totalPrice, totalBuyPoint, type, cardStatus, giftCard} = main;
    const {cardRuleTypes} = giftCard || {};
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
          <View className="left-desc" style={cardRuleTypes?.includes(4) ? {justifyContent: 'center'} : {}}>
            <Text className="price-key">
              已选
              <Text style={{color: '#ff6600', margin: '0 4px'}}>{selectedNum || '0'}</Text>份
            </Text>
            {!cardRuleTypes?.includes(4) && (
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text className="price-key">总价</Text>
                <Price price={totalPrice} buyPoint={totalBuyPoint} />
              </View>
            )}
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
