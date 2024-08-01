import {Text, View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import '../css/pay-con.less';
import '../css/index.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import arrow from '@/assets/image/common/arrow.png';
const DELIVERY_TYPE = {
  2: '快递配送',
  3: '送货上门',
  4: '到店自提',
};
type IPayConProps = T.IProps & T.IPayConProps;

@connect<Partial<IPayConProps>, T.IPayConState>(store2Props, actions)
export default class PayCon extends Component<Partial<IPayConProps>, T.IPayConState> {
  constructor(props: IPayConProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if(!main) return
    const {orderList, giftCardNum, giftCardPrice, price,stores} = main;
    const payIndex = main?.payWay.findIndex((f) => f.id == main?.localData.deliverType);
    const isH5 = __TARO_ENV === 'h5';
    // 非直接0元单时显示礼品卡
    const showGiftCard = price.goodsTotalPrice > 0;
    const isDangaoss =stores.length===1 && stores?.map(e => e.tradeItems).flat().some(e => (e.goodsType === 8))
    const dangaoDeliverWay = orderList.dangaoDeliverWay
    const storeId = stores[0]?.supplier.storeId

    return (
      <View className="payCon">
        <View className="order-store-item">
          <Text className="order-item-label">支付/配送</Text>
          <View className="store-item-right">
            <Text className="item-text">
              {main?.localData.deliverType >= 0 && main?.payWay[payIndex] && main?.payWay[payIndex].name}
              {orderList?.isVirtualGoods ? '无需配送' : isDangaoss ? `/${DELIVERY_TYPE[dangaoDeliverWay[storeId]]||'请选择配送方式'}` : '/快递配送'}
            </Text>
          </View>
        </View>
        {showGiftCard && (
          <View
            className="order-store-item"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/package-D/gift-card/use-gift-card/index',
              });
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text className={`order-item-label ${isH5 && 'order-item-pad'}`}>使用卡包</Text>
              {giftCardNum > 0 && (
                <View className="order-item-number">
                  <Text className="order-item-number-text">{giftCardNum}张可用</Text>
                </View>
              )}
            </View>
            <View className="store-item-right">
              <Text className="item-text">¥{giftCardPrice ? this.props.actions._addZero(giftCardPrice) : '0.00'}</Text>
              <Image className="arrow-img" src={arrow} />
            </View>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
