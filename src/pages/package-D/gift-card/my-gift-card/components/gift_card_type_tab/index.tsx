import {View, Text} from '@tarojs/components';
import React from 'react';
import {IGiftCardType} from '../../types';
import './index.less';

interface IProps {
  /** 卡类型 - 0福点，1提货 */
  giftCardType: IGiftCardType;
  /** 监听 - 切换卡类型Tab - 操作 */
  onGiftCardTypeTabChange: Function;
}

/** 卡类型Tab */
const GIFTCARDTYPETABS = [
  {type: null, title: '全部类型'},
  {type: 0, title: '福点'},
  {type: 1, title: '提货'},
  {type: 2, title: '积分'},
];

/**
 * 卡类型Tab - 福点、提货
 * @param props
 */
export default function GiftCardTypeTab(props: IProps) {
  return (
    <View className="gift_card_type_tab">
      {GIFTCARDTYPETABS.map((item) => {
        return (
          <View
            key={item.type}
            className={`gift_card_type_tab__item${props?.giftCardType === item.type ? '_active' : ''}`}
            onClick={() => props?.onGiftCardTypeTabChange?.(item.type)}
          >
            <Text className="gift_card_type_tab__item--title">{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
