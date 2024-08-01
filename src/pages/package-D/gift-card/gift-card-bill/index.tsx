/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:18:48
 * @LastEditors: 何善万 heshanwan@qianmi.com
 * @LastEditTime: 2022-12-15 10:38:10
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View, Text, Image, Input} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import {getHashParam} from '@/utils/common-functions';
import classNames from 'classnames';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMLoading from '@/pages/common/loading';
import {fetchMock} from 'wmkit';

import {BackgroundType, CardStatus, InvalidStatus} from 'api/GiftCardController';

import GiftCardBillInfo from './components/gift-card-bill-info';

import './index.less';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GiftCardBill extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    // 主题色
  }

  componentDidShow() {
    const current = getCurrentInstance();
    const {onShow} = current.router;
    // 解决taro h5中 didshow偶发的无法获取路由传参的问题
    // 解决首页进入商品详情-点击商品数-点击商品进入详情-回退两次 页面一直加载；
    const param = current.router.params;
    // const param = getHashParam<{id: string, balance: number | string, giftCardType: number | string;}>(onShow.split('.')[0]);
    let id = param.id ?? this.props.main?.id;
    let balance = param.balance ?? this.props.main?.balance;
    const giftCardType = param.giftCardType;
    const giftCardId = param.giftCardId;
    this.props.actions.init(id, balance, giftCardType,giftCardId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;
    if (!main) return null;
    const {isReady} = main;
    return (
      <View className="gift-card-bill _page">
        {isReady ? <WMLoading /> : null}
        <GiftCardBillInfo />
      </View>
    );
  }
}
