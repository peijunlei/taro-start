import {View, ScrollView, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '@/pages/shop-cart/types';
import actions from '@/pages/shop-cart/actions';
import {connect} from 'react-redux';
import {store2Props} from '@/pages/shop-cart/selectors';
import close from '@/assets/image/common/close.png';
import '../../css/mask.less';
import PromationMask from '../sku/promation-mask';
import GiftMask from '../gift/gift-mask';
import CouponMask from './coupon-mask';

type IMaskProps = T.IProps & T.IMaskProps;

@connect<Partial<IMaskProps>, T.IMaskState>(store2Props, actions)
export default class Mask extends Component<Partial<IMaskProps>, T.IConfirmMaskState> {
  static defaultProps = {
    shopCartMaskStyle: {},
  };

  constructor(props: IMaskProps) {
    super(props);
  }

  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main: {
        useStatus: {maskType, isMaskOpen},
      },
      shopCartMaskStyle,
      isSecondShopCart,
    } = this.props;

    return (
      <View
        className="shop-cart-mask"
        // style={shopCartMaskStyle}
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          // e.preventDefault();
        }}
        onClick={async () => {
          Taro.showTabBar();
          await action.loadingWML(false);
          action.commonChange([{paths: 'main.useStatus.isMaskOpen', value: false}]);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="mask-header">
            <Text className="header-text">{this._getMaskType(maskType)}</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await action.loadingWML(false);
                await action.commonChange([{paths: 'main.useStatus.isMaskOpen', value: false}]);
                Taro.showTabBar();
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <ScrollView
            scrollY
            className="mask-con"
            style={__TARO_ENV === 'h5' ? {paddingBottom: 'calc( 20px + env(safe-area-inset-bottom))'} : {}}
          >
            {maskType === 0 && <PromationMask />}
            {maskType === 4 ? <CouponMask /> : <GiftMask isSecondShopCart={isSecondShopCart} />}
          </ScrollView>
        </View>
      </View>
    );
  }

  _getMaskType = (maskType) => {
    //修改促销 查看赠品 领取赠品 赠品sku
    switch (maskType) {
      case 0:
        return '修改促销';
      case 1:
        return '查看赠品';
      case 2:
        return '领取赠品';
      case 3:
        return '查看赠品';
      case 4:
        return '领券';
    }
  };
}

//create by moon https://github.com/creasy2010/moon
