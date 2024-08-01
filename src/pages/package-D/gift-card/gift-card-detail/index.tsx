/*
 * @Author: 何善万 heshanwan@qianmi.com
 * @Date: 2022-12-14 15:18:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-05 10:46:17
 * @FilePath: /sbc-front/mini-program/src/pages/package-D/gift-card/gift-card-detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image, Input } from '@tarojs/components';
import React, { Component, Fragment } from 'react';
import { getHashParam } from '@/utils/common-functions';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { WMLoading } from '@/pages/common';
import { fetchMock } from 'wmkit';

import { BackgroundType, CardStatus, InvalidStatus } from 'api/GiftCardController';

import GiftCardInfo from './components/gift-card-info';
import GiftCardTool from './components/gift-card-tool';
import GiftCardBottom from './components/gift-card-bottom';

import './index.less';
import { cache } from 'config';
import GoUserCenterBtn from './components/go-user-center-btn';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GiftCardDetail extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    // 主题色
  }
  componentDidShow() {
    const current = getCurrentInstance();
    const { onShow } = current.router;
    // 解决taro h5中 didshow偶发的无法获取路由传参的问题
    // 解决首页进入商品详情-点击商品数-点击商品进入详情-回退两次 页面一直加载；
    const param = current.router.params;
    const isCommLogin = param?.isCommLogin
    let id = param.id ?? this.props.main?.id;
    let type = param.type ?? this.props.main?.type;
    const preview = param.preview ?? this.props.main?.preview;
    this.props.actions.init(id, type, preview,isCommLogin);
    const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
    if (Taro.getEnv() === 'WEAPP' && singerCardLogin) {
      Taro.hideHomeButton();
    }
  }

  componentWillUnmount() {
    this.props.actions.action.cleanTimer();
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: { action },
    } = this.props;
    return (
      <View className="gift-card-detail _page">
        {main ? (
          <>
            {main?.isReady ? <WMLoading /> : null}
            <GiftCardInfo />
            <GiftCardTool />
            {
              // 可用&& 未激活： 展示按钮
              main?.invalidStatus === null && main?.type === '1' && <GiftCardBottom />
            }
            {
              main?.invalidStatus === 0 && main?.type === '1' && [3, 4].includes(main?.giftCardType) && <GoUserCenterBtn enterpriseId={main?.enterpriseId} isCommLogin={main?.isCommLogin} />
            }
          </>
        ) : null}
      </View>
    );
  }
}
