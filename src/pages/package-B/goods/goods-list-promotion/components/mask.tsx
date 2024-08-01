import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import close from '@/assets/image/common/close.png';
import './mask.less';
import GiftMask from './gift/gift-mask';

type IMaskProps = T.IProps & T.IMaskProps;

@connect<Partial<IMaskProps>, T.IMaskState>(store2Props, actions)
export default class Mask extends Component<Partial<IMaskProps>, T.IConfirmMaskState> {
  constructor(props: IMaskProps) {
    super(props);
  }

  render() {
    let {
      actions: {activityAction},
      main: {},
    } = this.props;

    return (
      <View
        className="shop-cart-mask"
        catchMove onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <View className="mask-container">
          <View className="mask-header">
            <Text className="header-text">查看赠品</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await activityAction.commonChange([{paths: 'main.giftShow', value: false}]);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-con">
            <GiftMask />
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
