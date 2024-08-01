import React, {Component} from 'react';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {connect} from 'react-redux';
import {View, Image, Text, ScrollView} from '@tarojs/components';
import PrizeContent from './components/prize-content';
import BottomBtn from './components/bottom-btn';
import {getHashParam, ifLogin} from '@/utils/common-functions';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import WMLoading from '@/pages/common/loading';

import './index.less';
import pdBg from '@/assets/image/prize-draw/draw-bg.png';
import noneImg from '@/assets/image/goods/goods-list/empty.png';
import prizeGift from '@/assets/image/prize-draw/btn-prize.png';
import arrow from '@/assets/image/common/arrow-white.png';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PrizeDraw extends Component<Partial<T.IProps>, any> {
  componentDidShow() {
    const current = getCurrentInstance().router;
    const onShow = __TARO_ENV == 'h5' ? (current.onShow as any) : current.params;
    const params = __TARO_ENV == 'h5' ? getHashParam<{id: string}>(onShow && onShow.split('.')[0]) : onShow;
    const id = params.id;
    this.props.actions.init(id);
  }
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  onShareAppMessage() {
    let wechatShareInfo = JSON.parse(Taro.getStorageSync('wechatShareInfo'));
    return {
      title: wechatShareInfo.title,
      imageUrl: wechatShareInfo.imgUrl[0].url,
    };
  }
  onShareTimeline() {
    // 默认分享内容
  }

  render() {
    const {main = {} as any, actions} = this.props;
    const {prizeList, formType} = main;
    const isLogin = ifLogin();
    if (!main?.isReady) return <WMLoading />;
    return (
      <View className="packageAPrizeDrawMain">
        {prizeList.length ? (
          <View>
            <View className="draw_to_home">
              <Image src={arrow} className="draw-arrow-left" />
              <Text
                className="draw_to_home_title"
                onClick={() => {
                  Taro.switchTab({
                    url: '/pages/index/index',
                  });
                }}
              >
                商城首页
              </Text>
            </View>
            <Image mode="widthFix" className="pd-container-bg" src={pdBg} />
            <View className="pd-block">
              <Image mode="aspectFit" className="pd-block-title" src="" />
              <PrizeContent />
              <BottomBtn />
            </View>
          </View>
        ) : (
          <View className="prize-draw-no">
            <Image mode="aspectFit" src={noneImg} className="img" />
            <Text className="prize-draw-not-text">暂无抽奖活动</Text>
            <View
              className="prize-draw-btn"
              onClick={() => {
                if (!isLogin) {
                  Taro.navigateTo({
                    url: '/pages/package-A/login/login/index',
                    complete: () => {
                      actions?.clean();
                    },
                  });
                  return;
                }
                Taro.navigateTo({
                  url: `/pages/package-C/lottery/prize-list/index`,
                  complete: () => {
                    actions?.clean();
                  },
                });
              }}
            >
              <Image mode="aspectFit" src={prizeGift} className="prize-draw-img" />
              <Text className="prize-draw-text">我的奖品</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
