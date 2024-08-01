/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:34:02
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-15 11:28:59
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/components/gift-card-info.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Text, View, Image, ScrollView } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { BackgroundType, CardStatus, InvalidStatus, calcExpirationValue } from 'api/GiftCardController';
import { _ } from 'wmkit';
import moment from 'moment';
import './gift-card-bill-info.less';
import Blank from '../../../../common/blank';

import emptyImage from '@/assets/image/gift-card/card-empty.png';
const BUSINESS_TYPE = {
  0: '订单抵扣',
  1: '订单退款',
  2: '激活卡包（发放）',
  3: '激活卡包（兑换）',
  4: '作废',
  5: '订单取消',
  6: '批量延期',
  7: '关联/更改卡包',
  8: '卡包作废恢复',
}

type IGiftCardBillInfoProps = T.IProps & T.IGiftCardBillInfoProps;

@connect<Partial<IGiftCardBillInfoProps>, T.IGiftCardBillInfoState>(store2Props, actions)
export default class GiftCardInfo extends Component<Partial<IGiftCardBillInfoProps>, T.IGiftCardBillInfoState> {

  handleClick = (item: any) => {
    const { businessType, businessId } = item
    // 跳转订单详情
    if (businessType === 0 && businessId) {
      Taro.navigateTo({
        url: `/pages/package-C/order/order-detail/index?id=${businessId}`,
      });
    }
  }

  render() {
    let {
      actions: { action },
      main,
    } = this.props;

    if (!main) return null;
    let {
      billList,
      balance,
      giftCardType,
    } = main;




    return (
      <View className="gift_card_bill_info">
        {billList && billList.length ?
          <ScrollView scrollY onScrollToLower={this._onScrollToLower} className="gift_card_bill_info_scroll_view">
            {billList.map((item, index) => {
              return (
                <>
                  <View className='gift_card_bill_info_item' key={`${item.giftCardBillId}_${index}`} >
                    <View className='gift_card_bill_info_item_top'>
                      <View className='gift_card_bill_info_item_top_left'>
                        <Text className='gift_card_bill_info_item_top_left_text'>{BUSINESS_TYPE[item.businessType] == '订单退款' ? `退单号：${item?.businessId ? item.businessId : '-'}` : `订单号：${item?.businessId ? item.businessId : '-'}`}</Text>
                        {item?.businessId && item.businessId && <View className='gift_card_bill_info_item_top_left_copy' onClick={(e) => {
                          e.stopPropagation();
                          // 复制
                          Taro.setClipboardData({
                            data: item.businessId,
                          }).then((res) => {
                            // web端手动提示，小程序端有默认提示
                            if (Taro.getEnv() == Taro.ENV_TYPE.WEB) {
                              Taro.showToast({
                                title: '复制成功',
                                icon: 'success',
                              });
                            }
                          });
                        }}>
                          <Text className='gift_card_bill_info_item_top_left_copy_text'>复制</Text></View>}
                        {
                          (item.businessType === 0 && item.businessId) && <View className='order-details' onClick={() => this.handleClick(item)} >查看订单</View>
                        }
                      </View>
                      {/* 订单抵扣、销卡是：-   其他的都是：+ */}
                      {giftCardType === 0 ? (
                        <Text className='gift_card_bill_info_item_top_right' style={(item.businessType === 0 || item.businessType === 4) ? { color: '#333333' } : undefined}>{`${(item.businessType === 0 || item.businessType === 4) ? '-' : '+'}${_.addZero(item.tradeBalance)}`}</Text>
                      ) : null}
                    </View>
                    <View className='gift_card_bill_info_item_middle'>
                      <Text className='gift_card_bill_info_item_middle_text'>{`变动类型：${this.renderBusinessTypeName(item?.businessType)}`}</Text>
                    </View>
                    <View className='gift_card_bill_info_item_bottom'>
                      <Text className='gift_card_bill_info_item_bottom_left'>{item?.tradeTime ? moment(item?.tradeTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</Text>
                      {giftCardType === 0 ? (
                        <Text className='gift_card_bill_info_item_bottom_right'>{`余额：￥${_.addZero(item?.afterBalance)}`}</Text>
                      ) : null}
                    </View>
                  </View>
                  {index + 1 === billList.length && <View className='gift_card_bill_info_item_noMore'>没有更多了</View>}
                </>

              )
            })}
          </ScrollView>
          : <View className="gift_card_bill_info_empty"><Blank content="暂无兑换记录哦" img={emptyImage} /></View>
        }
      </View>
    );
  }

  /**
   * 渲染”变动类型“ - 操作
   * @param businessType
   * @returns
   */
  renderBusinessTypeName = (businessType) => {
    const { giftCardType, } = this.props.main || {};
    let str = BUSINESS_TYPE[businessType] || "";
    const giftCardTypeName = {
      0: "福点卡",
      1: "提货卡",
    }[giftCardType];
    if (giftCardTypeName && str) {
      str = str.replace("卡包", giftCardTypeName);
    }

    return str;
  }

  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}

//create by moon https://github.com/creasy2010/moon
