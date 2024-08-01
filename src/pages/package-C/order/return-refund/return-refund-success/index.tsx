import { Image, Text, View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import '../css/return-refund-success.less';
import * as T from './types';
import actions from './actions';
import { store2Props } from '../selectors';
import { _ } from 'wmkit';
import { getGlobalData } from '@/service/config';
import { getHashParam } from '@/utils/common-functions';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
import success from '@/assets/image/common/success.png';
import { cache } from 'config';
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ReturnRefundSuccess extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    let rid;
    if (__TARO_ENV === 'h5') {
      const href = window.location.href;
      const program = getHashParam<{ id: string }>(href);
      rid = program.rid;
    } else {
      rid = getCurrentInstance().router.params.rid;
    }
    this.props.actions.returnsOkInit(rid);
    if (__TARO_ENV === 'h5') {
      window.addEventListener('popstate', function (e) {
        Taro.setStorageSync('mini::returnSuccessBackFlag', { backFlag: '1' });
      });
    }
  }
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
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
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let rid;
    if (__TARO_ENV === 'h5') {
      const href = window.location.href;
      const program = getHashParam<{ id: string }>(href);
      rid = program.rid;
    } else {
      rid = getCurrentInstance().router.params.rid;
    }

    let {
      actions: { action },
      main,
    } = this.props;
    // 总额
    const isCommLogin = __TARO_ENV === 'h5' && sessionStorage.getItem('isCommLogin');
    const isIphoneX = getGlobalData('isIphoneX');
    const totalPrice = main?.returnsResult?.returnPrice.totalPrice || 0;
    // 改价金额
    const applyPrice = main?.returnsResult?.returnPrice.applyPrice;
    // 应退金额，如果对退单做了改价，使用applyPrice，否则，使用总额totalPrice
    const payPrice = applyPrice || totalPrice;

    return (
      <View className="ReturnRefundSuccess">
        <View className="returnS-info">
          <Image className="success" src={success} />
          <Text className="stext bold">退货退款申请提交成功！</Text>
          <Text className="stips">您的申请已提交审核，</Text>
          <Text className="stips">您可在我的-退货退款查看处理进度。</Text>
        </View>
        <View className="slist">
          <View className="sitem-text">退单编号：{main?.returnsResult?.id}</View>
          <View className="sitem sitem-text">
            退单金额：<Text className="price bold"> ￥{_.addZero(payPrice)}</Text>
          </View>
        </View>
        <View className={isIphoneX ? 'bt-box ipx-bt-box' : 'bt-box'}>
          <View className="bt-contain" style={{ position: 'relative', bottom: '-20px' }}>
            <View
              className="bt-item"
              onClick={() => {
                Taro.navigateTo({ url: `/pages/package-C/order/return-detail/index?id=${rid}` });
              }}
            >
              查看退货退款详情
            </View>
            {
              !isCommLogin && (
                <View
                  className="bt-item"
                  onClick={() => {
                    const singerCardLogin = Taro.getStorageSync(cache.SINGER_CARD_LOGIN);
                    const LOGIN_DATA = Taro.getStorageSync(cache.LOGIN_DATA);
                    if (singerCardLogin) {
                      Taro.redirectTo({
                        url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${LOGIN_DATA.userGiftCardId}&preview=false`,
                      });
                    } else {
                      Taro.switchTab({ url: '/pages/index/index' });
                    }
                  }}
                >
                  返回首页
                </View>
              )
            }

          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
