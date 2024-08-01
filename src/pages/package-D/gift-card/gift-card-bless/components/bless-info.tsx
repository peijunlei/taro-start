import {Text, View, Image, Button, Video} from '@tarojs/components';
import React, {Component} from 'react';
import Taro from '@tarojs/taro';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {BackgroundType, CardStatus, InvalidStatus} from 'api/GiftCardController';
import {_} from 'wmkit';
import {AtModal} from 'taro-ui';
import {Modal} from '@wanmi/ui-taro';
import './bless-info.less';

import arrow from '@/assets/image/customer/user-center/arrow.png';
import loginImg from '@/assets/image/gift-card/login-img.png';
import {cache} from 'config';

type IGiftCardBottomProps = T.IProps & T.IGiftCardBottomProps;

@connect<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState>(store2Props, actions)
export default class BlessInfo extends Component<Partial<IGiftCardBottomProps>, T.IGiftCardBottomState> {
  render() {
    let {
      actions: {action},
      main,
      main: {cardBlessingForm, id},
    } = this.props;

    if (!id) return null;
    console.log('cardBlessingForm', cardBlessingForm);

    return (
      <View
        className="gift_card_bless"
        style={cardBlessingForm.pageColor ? {background: `${cardBlessingForm.pageColor}`} : {}}
      >
        {cardBlessingForm.pageImageUrl && <Image src={cardBlessingForm.pageImageUrl} className="backgroundImage" />}
        {cardBlessingForm.videoUrl && (
          <Video
            autoplay={false} //是否自动播放
            src={cardBlessingForm.videoUrl}
            className="video"
            showFullscreenBtn
          />
        )}
        <View className="btn-box">
          <Button
            className="btn btn-primary"
            onClick={() => {
              const login = Taro.getStorageSync(cache.LOGIN_DATA);
              const id = login.userGiftCardId || this.props.main.userGiftCardId
              Taro.redirectTo({
                url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${id}&preview=false`,
              });
            }}
          >
            {cardBlessingForm.buttonCopywriter}
          </Button>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
