import {View, ScrollView, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../../types';
import actions from '../../actions';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import close from '@/assets/image/common/close.png';
import GoodsItem from '../goods-item';
import Price from '@/pages/common/goods/price';
import Footer from '../footer';
import './selected-goods.less';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class SelectedGoods extends Component<any, any> {
  render() {
    let {main = {}, actions = {}} = this.props;
    const {selectGoodsList, selectedNum, totalPrice, totalBuyPoint, giftCard} = main;
    const hidePrice = giftCard.cardRuleTypes?.includes(4);
    console.log('asd: ', main);
    return (
      <View
        className="selected-goods-mask"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
        onClick={() => {
          actions.action.showSelectedGoodsModal(false);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="mask-header">
            <Text className="header-text">已选商品</Text>
            <View
              className="close-icon"
              onClick={async () => {
                actions.action.showSelectedGoodsModal(false);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-top">
            <View className="mast-top-left">
              <Text className="top-left-text">已选</Text>
              <Text className="text-left-num">{selectedNum || '0'}</Text>
              <Text className="top-left-text">{hidePrice ? '份' : '份，'}</Text>
              {!hidePrice && <Text className="top-left-text">总价</Text>}
              {!hidePrice && <Price price={totalPrice} buyPoint={totalBuyPoint} />}
            </View>
            <View
              className="mask-top-right"
              onClick={() => {
                actions.action.clearSelectedGoods();
              }}
            >
              <Image src={require('@/assets/image/gift-card/clear.png')} className="top-right-img" />
              <Text className="top-right-text">清空</Text>
            </View>
          </View>

          <ScrollView
            scrollY
            className="mask-con"
            style={__TARO_ENV === 'h5' ? {paddingBottom: 'calc( 92px + env(safe-area-inset-bottom))'} : {}}
          >
            {selectGoodsList.map((item) => {
              return (
                <GoodsItem
                  goodsInfo={item}
                  isStepper
                  key={item?.goodsInfoId}
                  groupId={item.groupId}
                  canTodesc={false}
                />
              );
            })}
          </ScrollView>
          <View className="mask-footer">
            <View
              className={!selectedNum ? 'confirm-btn-disable confirm-btn' : 'confirm-btn'}
              onClick={() => {
                selectedNum && actions.action.submitOrder();
              }}
            >
              <Text className="confirm-text">提交订单</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
