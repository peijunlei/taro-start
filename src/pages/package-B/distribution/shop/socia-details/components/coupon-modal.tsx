import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/coupon-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CommonCoupon from '@/pages/common/coupon/index';
import close from '@/assets/image/common/close.png';
import main from '@/pages/common/coupon/reducers/main';
type ICouponModalProps = T.IProps & T.ICouponModalProps;

@connect<Partial<ICouponModalProps>, T.ICouponModalState>(store2Props, actions)
export default class CouponModal extends Component<Partial<ICouponModalProps>, T.ICouponModalState> {
  constructor(props: ICouponModalProps) {
    super(props);
  }

  /**
    领券弹窗
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    return (
      <View className="couponModal">
        <View className="mask-container">
          <View className="mask-header">
            <Text className="header-text">领券</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await publicAction.commonChange([{paths: 'main.isCouponShow', value: false}]);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-con">
            <CommonCoupon goodsInfoIds={[main.skuId]} />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
