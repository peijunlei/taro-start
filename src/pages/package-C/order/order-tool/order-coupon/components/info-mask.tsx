import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './info-mask.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import close from '@/assets/image/common/coupon-close.png';
type IInfoMaskProps = T.IProps & T.IInfoMaskProps;

@connect<Partial<IInfoMaskProps>, T.IInfoMaskState>(store2Props, actions)
export default class InfoMask extends Component<Partial<IInfoMaskProps>, T.IInfoMaskState> {
  constructor(props: IInfoMaskProps) {
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
      <View
        className="info-mask"
        catchMove onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <View className="info-mask-con">
          <View className="info-mask-title">
            <Text className="info-mask-title-text">优惠券使用说明</Text>
          </View>

          <View className="info-mask-content">
            <Text className="info-mask-content-text">1、优惠券有使用期限限制，过了有效期不能使用；</Text>
            <Text className="info-mask-content-text"> 2、每家店铺只能使用一张优惠券；</Text>
            <Text className="info-mask-content-text"> 3、每次提交的订单只能使用一张通用券；</Text>
            <Text className="info-mask-content-text"> 4、每次提交的订单只能使用一张运费券；</Text>
            <Text className="info-mask-content-text">
              {' '}
              5、商品需在排除满系营销活动的优惠金额后判断是否满足优惠券使用门槛；
            </Text>
            <Text className="info-mask-content-text">
              {' '}
              6、商品需在排除满系营销活动以及优惠券的优惠金额后判断是否满足通用券使用门槛；{' '}
            </Text>
            <Text className="info-mask-content-text">
              {' '}
              7、订单需在排除满系营销活动、优惠券以及通用券的优惠金额后判断是否满足运费券使用门槛；
            </Text>
          </View>
        </View>

        <View
          className="info-mask-close"
          onClick={async () => {
            await action.commonChange('main.maskOpen', false);
          }}
        >
          <Image src={close} className="info-mask-close-img" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
