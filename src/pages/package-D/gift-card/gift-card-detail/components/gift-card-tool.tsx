/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:34:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-05 10:56:00
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/components/gift-card-info.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Text, View, Image, RichText} from '@tarojs/components';
import React, {Component} from 'react';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import Taro from '@tarojs/taro';
import {store2Props} from '../selectors';
import {BackgroundType, CardStatus, InvalidStatus} from 'api/GiftCardController';
import {_} from 'wmkit';
import {debounce} from 'lodash';
import './gift-card-tool.less';

import arrow from '@/assets/image/customer/user-center/arrow.png';
import {cache} from 'config';

type IGiftCardToolProps = T.IProps & T.IGiftCardToolProps;

@connect<Partial<IGiftCardToolProps>, T.IGiftCardToolState>(store2Props, actions)
export default class GiftCardTool extends Component<Partial<IGiftCardToolProps>, T.IGiftCardToolState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main) return null;
    const {
      contactPhone,
      balance,
      scopeType,
      userGiftCardId,
      contactType,
      cardStatus,
      invalidStatus,
      giftCardId,
      activationTime,
      giftCardType,
      totalGoodsNum,
      useDesc,
      preview,
    } = main;

    return (
      <View className="gift_card_tool">
        {/*</View>*/}
        {invalidStatus === null && [0, 1, 2].includes(giftCardType) ? (
          <View className="gift_card_tool_item" onClick={() => action?.onGoGiftCardListPromotionClick?.()}>
            <Text className="gift_card_tool_item_left">可用商品</Text>
            <View className="gift_card_tool_item_right">
              {/*<Text className="gift_card_tool_item_right_text">*/}
              {/*  {giftCardType == 0 ? scopeType === 0 ? '全部商品可用' : scopeType === 4 ? '指定商品可用' : '部分商品可用' : `可兑换${ totalGoodsNum ?? 0 }种商品`}*/}
              {/*</Text>*/}
              <Image src={arrow} className="gift_card_tool_item_right_img" />
            </View>
          </View>
        ) : null}
        {
          // 已激活： 展示使用记录
          [0, 1, 2].includes(giftCardType) && preview === 'false' && (
            <View
              className="gift_card_tool_item"
              onClick={debounce(
                () => {
                  const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                  if (false) {
                    Taro.navigateTo({url: `/pages/package-C/order/order-list/index`});
                  } else {
                    Taro.navigateTo({
                      url: `/pages/package-D/gift-card/gift-card-bill/index?id=${userGiftCardId}&balance=${balance}&giftCardType=${giftCardType}`,
                    });
                  }
                },
                2000,
                {leading: true, trailing: false},
              )}
            >
              <Text className="gift_card_tool_item_left">使用记录</Text>
              <View className="gift_card_tool_item_right">
                {/*<Text className="gift_card_tool_item_right_text">查看</Text>*/}
                <Image src={arrow} className="gift_card_tool_item_right_img" />
              </View>
            </View>
          )
        }
        <View
          className="gift_card_tool_item"
          onClick={() => {
            if (contactType === 2) {
              // 微信
              Taro.setClipboardData({
                data: contactPhone,
              }).then((res) => {
                // web端手动提示，小程序端有默认提示
                if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                  Taro.showToast({
                    title: '微信号已复制',
                    icon: 'success',
                  });
                }
              });
            } else {
              // 唤起电话手机
              Taro.makePhoneCall({
                phoneNumber: contactPhone,
              });
            }
          }}
        >
          <Text className="gift_card_tool_item_left">{contactType === 2 ? '客服微信' : '联系客服'}</Text>
          <View className="gift_card_tool_item_right">
            <Text className="gift_card_tool_item_right_text">{contactPhone}</Text>

            <Image src={arrow} className="gift_card_tool_item_right_img" />
          </View>
        </View>
        <View className="gift_card_tool_info">
          <view className="gift_card_tool_item_left">使用须知</view>
          <RichText style={{fontSize: '16px', fontFamily: 'sans-serif'}} nodes={_.formatRichText(useDesc)} />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
