/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:34:02
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-15 11:28:59
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/components/gift-card-info.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Text, View, Image} from '@tarojs/components';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {BackgroundType, CardStatus, InvalidStatus, calcExpirationValue} from 'api/GiftCardController';
import {_} from 'wmkit';
import moment from 'moment';
import './gift-card-info.less';
import cancelImage from '@/assets/image/gift-card/gift-card-cancel.png';
import expImage from '@/assets/image/gift-card/gift-card-exp.png';
import useUpImage from '@/assets/image/gift-card/gift-card-useup.png';
import textureImage from '@/assets/image/gift-card/card-texture.png';
import Taro from '@tarojs/taro';

type IGiftCardInfoProps = T.IProps & T.IGiftCardInfoProps;
// // 全部
// ALL = null,
// // 已用完
// USE_UP = 0,
// // 已过期
// EXPIRATION = 1,
// // 已销卡
// CANCEL = 2

const imgMap = {
  [InvalidStatus.CANCEL]: cancelImage,
  [InvalidStatus.EXPIRATION]: expImage,
  [InvalidStatus.USE_UP]: useUpImage,
};

@connect<Partial<IGiftCardInfoProps>, T.IGiftCardInfoState>(store2Props, actions)
export default class GiftCardInfo extends Component<Partial<IGiftCardInfoProps>, T.IGiftCardInfoState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main) return null;
    let {
      name,
      parValue,
      rangeMonth,
      activationTime,
      expirationTime,
      expirationStartTime,
      expirationEndTime,
      expirationType,
      backgroundType,
      backgroundDetail,
      status,
      balance,
      cardStatus,
      giftCardNo,
      invalidStatus,
      giftCardType,
      totalGoodsNum,
      type,
      foregroundColor,
    } = main;

    let bgGradient = '',
      bgImage = null;
    if (backgroundType === BackgroundType.COLOR) {
      const colors = backgroundDetail.split(',').map((i) => i.trim());
      bgGradient = `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
      bgImage = textureImage;
    } else {
      bgImage = backgroundDetail;
    }
    /**
     * invalidStatus 不为null 为不可用状态
     */
    if (invalidStatus != InvalidStatus.ALL) {
      bgGradient = 'linear-gradient(90deg, #A2ABBA 0%, #A2ABBA 100%)';
      bgImage = textureImage;
    }
    // backgroundType 为0 背景为颜色的，|| 不可用背景为黑色的
    const backgroundIsColor = backgroundType === BackgroundType.COLOR || invalidStatus != InvalidStatus.ALL;
    return (
      <View className="gift_card_info">
        <View className="gift_card_info_container">
          <View className="gift_card_info_content" style={{background: bgGradient, zIndex: backgroundIsColor ? 1 : 3}}>
            <View className="gift_card_info_top">
              <Text className="gift_card_info_name" style={{textAlign: 'left', color: foregroundColor}}>
                {name}
              </Text>
              <Text className="gift_card_info_parValue" style={{color: foregroundColor}}>
                {this.renderCardDescription(parValue ?? 0, totalGoodsNum)}
              </Text>
              {
                // 已激活： 展示余额
                activationTime != null && giftCardType === 0 && (
                  <Text className="gift_card_info_value" style={{color: foregroundColor}}>
                    {`￥${balance ? _.addZero(balance) : '0.00'}`}{' '}
                    <Text className="gift_card_info_value_text" style={{color: foregroundColor}}>
                      余额
                    </Text>
                  </Text>
                )
              }
            </View>
            <View className="gift_card_info_bottom">
              <Text className="gift_card_info_code" style={{color: foregroundColor}}>
                {giftCardNo}
              </Text>
              <View>
                <view className="card-bottom">
                  <Text className="gift_card_info_name" style={{color: foregroundColor}}>
                    {this.renderCardTypeDescription(giftCardType)}
                  </Text>
                </view>
                <Text className="gift_card_info_time" style={{color: foregroundColor}}>
                  {calcExpirationValue({expirationType, expirationTime, expirationStartTime, expirationEndTime,rangeMonth, expirationValue: ''}, true)
                    ?.expirationValue || ''}
                </Text>
              </View>
            </View>
          </View>

          {invalidStatus != InvalidStatus.ALL && (
            <Image src={imgMap[invalidStatus]} className="gift_card_info_content_card_seal" />
          )}
          {bgImage && <Image src={bgImage} className="gift_card_info_content_card_texture" />}
        </View>
      </View>
    );
  }

  /**
   * 动态渲染 - 卡描述
   * @param parValue
   * @param num
   * @returns
   */
  renderCardDescription = (parValue, num) => {
    const {giftCardType} = this.props.main;
    const result = {
      0: `面值${parValue ?? 0}元`,
      1: null,
      2: null,
      3: `面值${parValue ?? 0}元`,
      4: `面值${parValue ?? 0}元`,
    };

    return result[giftCardType ?? 0] || '';
  };

  renderCardTypeDescription = (giftCardType) => {
    const result = {
      0: `福点`,
      1: `提货`,
      2: `提货`,
      3: `储值`,
      4: `储值`,
    };
    return result[giftCardType] || '-';
  };
}

//create by moon https://github.com/creasy2010/moon
