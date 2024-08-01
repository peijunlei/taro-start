import { Image, Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';

import * as T from '../types';
import '../css/store.less';
import '../css/index.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import PictureCom from './picture-com';
import Enclosure from './enclosure';

import Price from '@/pages/common/goods/price';
import plus from '../img/plus.png';
import { WMkit, immutable } from 'wmkit';

const noneImg = require('../img/none.png');

import arrow from '@/assets/image/common/arrow.png';
import CountDown from '@/pages/common/count-down';
import moment from 'moment';

type IStoreItemProps = T.IProps & T.IStoreItemProps;


@connect<Partial<IStoreItemProps>, T.IStoreItemState>(store2Props, actions)
export default class Store extends Component<Partial<IStoreItemProps>, T.IStoreItemState> {
  constructor(props: IStoreItemProps) {
    super(props);
    this.state = {
      newTime: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  }

  /**
   * 去重
   * @param marketings
   */
  _distinct = (marketings) => {
    let newMarketings = [marketings[0]];
    marketings.map((marketing) => {
      let m = newMarketings.find((newMarketing) => newMarketing && newMarketing.marketingId == marketing.marketingId);
      if (!m) {
        newMarketings.push(marketing);
      }
    });
    return newMarketings;
  };

  render() {
    let {
      actions: { action },
      actions,
      myStore = {},
      main = {},
    } = this.props;
    const { tradeItems, tradeConfirmMarketingList } = myStore;
    const { isExpired } = main;
    //电影票订单信息只会有一条
    const allSkus = tradeItems[0];
    let xuanKuaMovieTrade = allSkus.xuanKuaMovieTrade
    if (moment(xuanKuaMovieTrade.expiretime)
      .diff(moment(this.state.newTime), 's')
      <= 0) {
      action.commonChange('main.isExpired', false)
    }
    return (
      <View className="confirm-store">
        <View className="end-time">
          {isExpired ? <CountDown
            hourFlag
            serverTime={this.state.newTime}
            endTime={moment(xuanKuaMovieTrade.expiretime)}
            timeOffset={moment(xuanKuaMovieTrade.expiretime)
              .diff(moment(this.state.newTime), 's')
              .toFixed(0)}
            endHandle={async () => {
              action.commonChange('main.isExpired', false)
            }}
          /> : <View>已失效</View>}
        </View>
        <View
          className="order-confirm-middle-detail"
          style={tradeConfirmMarketingList?.length > 0 ? { paddingTop: '20px' } : { paddingTop: '10px' }}
        >
          <View
            className="product-item"
          >
            <Image className="img-item" key={allSkus.oid} src={allSkus.pic ? allSkus.pic : noneImg} />
            <View className="good-info">
              <View className="good-info-detail">
                <View className="name">{allSkus.skuName ? allSkus.skuName : '-'}</View>
                <View className='saleInfo'>共{allSkus.num}张，原价¥{allSkus.price}</View>
              </View>
              <View className="good-info-detail-list">{xuanKuaMovieTrade.playtime}（{xuanKuaMovieTrade.edition}）</View>
              <View className="good-info-detail-list">{xuanKuaMovieTrade.roomname}  {xuanKuaMovieTrade.seats}</View>
              <View className="good-info-detail-list">{xuanKuaMovieTrade.cinemaname}</View>
              <View className="good-info-detail-list">{xuanKuaMovieTrade.cinemaAddr}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
