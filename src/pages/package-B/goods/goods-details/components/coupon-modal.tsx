import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import {PopupLayer} from '@wanmi/ui-taro';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/coupon-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CommonCoupon from '@/pages/common/coupon/index';
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
      <PopupLayer
        title="领券"
        scroll
        visible={main && main.isCouponShow}
        onClose={() => {
          publicAction.commonChange([{paths: 'main.isCouponShow', value: false}]);
        }}
      >
        <ScrollView className="commonCoupon" scrollY>
          <CommonCoupon
            closeModal={() => publicAction.commonChange([{paths: 'main.isCouponShow', value: false}])}
            goodsInfoIds={[main.skuId]}
          />
        </ScrollView>
      </PopupLayer>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
