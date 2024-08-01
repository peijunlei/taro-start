import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './order-sku-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import noneImg from '@/assets/image/coupon/empty.png';
import Price from '@/pages/common/goods/price';

type IOrderGiftItemProps = T.IProps & T.IOrderGiftItemProps;

@connect<Partial<IOrderGiftItemProps>, T.IOrderGiftItemState>(store2Props, actions)
export default class OrderGiftItem extends Component<Partial<IOrderGiftItemProps>, T.IOrderGiftItemState> {
  constructor(props: IOrderGiftItemProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      main?.order &&
      main?.order.gifts.length > 0 && (
        <View className="goods_list" style={{marginTop: '24px'}}>
          {main?.order.gifts.map((item, index) => {
            return (
              <View className="orderSkuItem" key={index}>
                <Image className="Img" src={item.pic ? item.pic : noneImg} />
                <View className="right_box">
                  <View className="right_top">
                    <Text className="zen">赠品</Text>
                    {item.skuName}
                  </View>
                  <Text className="right_middle">{item.specDetails ? item.specDetails : ''}</Text>
                  <View className="right_bottom">
                    <View className="bottom_left">
                      <Price price={item.price} />
                    </View>
                    <Text className="bottom_b">
                      ×{' '}
                      <Text className="bottom_a">
                        {item.num}
                        {item.unit ? item.unit : ''}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
