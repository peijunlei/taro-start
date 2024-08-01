import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../../types';
import actions from '../../actions';
import {connect} from 'react-redux';
import {store2Props} from '../../selectors';
import close from '@/assets/image/common/close.png';
import '../../css/gift-list.less';
import GiftMask from './gift-mask';

type IMaskProps = T.IProps & T.IMaskProps;

@connect<Partial<IMaskProps>, T.IMaskState>(store2Props, actions)
export default class GiftList extends Component<Partial<IMaskProps>, T.IConfirmMaskState> {
  constructor(props: IMaskProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main: {
        gifts: {selectedMarketingGifts},
      },
    } = this.props;

    const count = selectedMarketingGifts.length;

    return (
      <View
        className="shop-cart-mask"
        onClick={() => {
          action.commonChange([{paths: 'main.gifts.isMaskOpen', value: false}]);
        }}
      >
        <View
          className="mask-container"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <View className="mask-header">
            <Text className="header-text">领取赠品</Text>
            <View
              className="close-icon"
              onClick={async () => {
                await action.commonChange([{paths: 'main.gifts.isMaskOpen', value: false}]);
              }}
            >
              <Image src={close} className="close-img" />
            </View>
          </View>

          <View className="mask-con">
            <GiftMask />

            <View>
              <View className="gift-bottom-top" />

              <View className="gift-bottom">
                <View className="gift-num-con">
                  <Text className="gift-text">已选</Text>
                  <Text className="gift-num">{count + ''}</Text>
                  <Text className="gift-text">种</Text>
                </View>

                <View
                  className={['gift-confirm-btn', count ? '' : 'gift-confirm-btn-disabled'].join(' ')}
                  onClick={async () => {
                    if (!count) return;
                    await action.onChangeFullGiftConfirm();
                    await action.commonChange([{paths: 'main.gifts.isMaskOpen', value: false}]);
                  }}
                >
                  <Text className="gift-confirm-text">确定</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  //选中回调
  handleSelectedGifts = (params) => {};
}

//create by moon https://github.com/creasy2010/moon
