import {Text, View, Image, Button} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import Taro from '@tarojs/taro';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {BackgroundType, CardStatus, InvalidStatus} from 'api/GiftCardController';
import {_} from 'wmkit';
import {AtModal} from 'taro-ui';
import {Modal} from '@wanmi/ui-taro';
import './gift-card-bottom.less';

import arrow from '@/assets/image/customer/user-center/arrow.png';
import {ifLogin} from '@/utils/common-functions';

type IGiftCardBottomProps = T.IProps & T.IGiftCardBottomProps;

@connect<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState>(store2Props, actions)
export default class GiftCardBottom extends Component<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main) return null;
    const {contactPhone, scopeType, isOpen, giftCardType} = main;
    /** 是否展示“激活自用”按钮 */
    const isShowToActiveBtn = CardStatus.TO_ACTIVE === main?.cardStatus;
    /** 是否展示“去使用”按钮 */
    const isShowToUseBtn = [0, 1, 2].includes(giftCardType) && CardStatus.USABLE === main?.cardStatus;
    if (!isShowToActiveBtn && !isShowToUseBtn) return null;

    return (
      <View className="gift_card_bottom_height">
        <View className="gift_card_bottom">
          {isShowToActiveBtn ? (
            <>
              <Modal
                type="default"
                visible={isOpen}
                onCancel={() => {
                  action.commonChange('main.isOpen', false);
                }}
                onOk={() => {
                  action.activateGiftCard();
                }}
                cancelText="取消"
                content=""
                title="确认激活该卡券？"
              />
              {/* <AtModal
          isOpened={isOpen}
          content="确定激活"
          closeOnClickOverlay={false}
          confirmText="确定"
          cancelText="取消"
          onCancel={() => {
            action.commonChange('main.isOpen', false);
          }}
          onConfirm={async () => {
            // await Taro.setStorageSync('mini::invoice', undefined);
            // await Taro.navigateBack();
          }}
        /> */}
              <Button
                //disabled={showAdd}
                className="btn btn-primary"
                onClick={() => {
                  if (ifLogin()) {
                    action.commonChange('main.isOpen', true);
                  } else {
                    Taro.redirectTo({
                      url: '/pages/package-A/login/login/index',
                    });
                  }
                }}
              >
                激活自用
              </Button>
            </>
          ) : null}

          {isShowToUseBtn ? (
            <Button className="btn btn-primary" onClick={() => action?.onGoGiftCardListPromotionClick?.()}>
              去使用
            </Button>
          ) : null}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
