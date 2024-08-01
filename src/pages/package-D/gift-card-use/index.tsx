import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';

import Header from './components/header';
import WMLoading from '@/pages/common/loading';
import Banner from './components/banner';
import AllAndUngrouped from './components/all-ungrouped';
import AllAndGrouped from './components/all-grouped';
import AllAndGrouped1 from './components/all-grouped1';
import OptAndUngrouped from './components/opt-ungrouped';
import OptAndGrouped from './components/opt-grouped';
import OptAndGrouped1 from './components/opt-grouped1';
import CashAndUngrouped from './components/cash-ungrouped';
import CashAndGrouped from './components/cash-grouped';
import CashAndGrouped1 from './components/cash-grouped1';
import CashAndAll from './components/cash-all';

import Footer from './components/footer';
import Footer1 from './components/footer1';
import Footer2 from './components/footer2';
import Details from './components/modal/detail';
import SelectedGoods from './components/modal/selected-goods';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GiftCardUse extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  componentDidShow() {
    this._initFun();
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }

  async componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let { main } = this.props;
    if (!main) return null;
    const { isLoading, useConfig, giftCard, selectedId, selectedGoodsModal, cardStatus, type } = (main as any) || {};
    const { giftCardType, openGroupType, scopeType } = giftCard || {};
    const { groupStyle, pageColor, pageImage } = useConfig || {};
    return (
      <View className="packageDGiftCardUse">
        <Header />
        <ScrollView
          scrollY
          scrollWithAnimation
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="scroll-content"
          onScrollToLower={[0, 1, 2].includes(giftCardType) && this._onScrollToLower}
        >
            <Banner />
            <View
              className="goods-content-cls"
              style={
                pageColor
                  ? { backgroundColor: pageColor }
                  : {
                    backgroundImage: `url(${pageImage})`,
                    backgroundSize: '100% 100%',
                  }
              }
            >
              {/* 全选不分组 */}
              {giftCardType == 1 && openGroupType == 0 && <AllAndUngrouped />}
              {/* 全选分组 横向 */}
              {giftCardType == 1 && openGroupType == 1 && groupStyle == 0 && <AllAndGrouped />}
              {/* 全选分组 纵向 */}
              {giftCardType == 1 && openGroupType == 1 && groupStyle == 1 && <AllAndGrouped1 />}
              {/* 任选不分组 */}
              {giftCardType == 2 && openGroupType == 0 && <OptAndUngrouped />}
              {/* 任选分组 横向 */}
              {giftCardType == 2 && openGroupType == 1 && groupStyle == 0 && <OptAndGrouped />}
              {/* 任选分组 纵向 */}
              {giftCardType == 2 && openGroupType == 1 && groupStyle == 1 && <OptAndGrouped1 />}
              {/* 福点卡不分组 */}
              {giftCardType == 0 && openGroupType == 0 && <CashAndUngrouped />}
              {/* 福点卡分组 横向 */}
              {giftCardType == 0 && openGroupType == 1 && groupStyle == 0 && <CashAndGrouped />}
              {/* 福点卡分组 纵向 */}
              {giftCardType == 0 && openGroupType == 1 && groupStyle == 1 && <CashAndGrouped1 />}
            </View>
        </ScrollView>
        {/* 全选提货卡 */}
        {giftCardType == 1 && cardStatus !== '0' && type === '1' && <Footer />}
        {/* 任选提货卡 */}
        {giftCardType == 2 && type === '1' && <Footer1 />}
        {/* 福点卡 */}
        {giftCardType == 0 && type === '1' && <Footer2 />}
        {isLoading && <WMLoading />}
        {selectedId !== undefined && <Details />}
        {selectedGoodsModal && <SelectedGoods />}
      </View>
    );
  }

  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };

  _initFun = async () => {
    let { userGiftCardId, type, cardStatus } = getCurrentInstance().router.params;
    this.props.actions.action.commonChange('main.pageNum',0)
    await this.props.actions.init(Number(userGiftCardId), type, cardStatus);
  };
}
