import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View, Text, Image, Input} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import exchangeBg from '@/assets/image/gift-card/card-ex-bg.png';
import iconSuccess from '@/assets/image/gift-card/icon-success.png';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import {Modal} from '@wanmi/ui-taro';

import './index.less';
import {msg, WMkit} from 'wmkit';
import {BackgroundType} from 'api/GiftCardController';
import textureImage from '@/assets/image/gift-card/card-texture.png';
import IconFont from '@/wmkit/common/iconfont';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ExchangeCard extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    // 主题色
    this.props.actions.init();
    let params = getCurrentInstance().router.params;
    let giftCardNo = params && params.giftCardNo;
    let share = params && params.share;
    if (share == '1') {
      if (WMkit.isLogin()) {
        this.props.actions.action.getCardDetail(giftCardNo);
      } else {
        // 显示登录弹框
        Taro.redirectTo({
          url: `/pages/package-A/login/login/index?`,
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;

    let bgGradient = '',
      bgImage = null;
    if (main?.cardInfo) {
      if (main?.cardInfo?.backgroundType === BackgroundType.COLOR) {
        const colors = main.cardInfo.backgroundDetail.split(',').map((i) => i.trim());
        bgGradient = `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
        bgImage = textureImage;
      } else {
        bgImage = main.cardInfo.backgroundDetail;
      }
    }
    const foregroundColor = main?.cardInfo?.foregroundColor;
    return (
      <View className="exchange-card _page">
        {main ? (
          <>
            <View className="exchange-top">
              <Image src={exchangeBg} className="top-img" />
            </View>
            <View className="exchange-form">
              <View className="form-title">
                <Text className="title-text">卡密兑换</Text>
              </View>
              <Text className="form-label">卡号</Text>
              <View className="form-input-wrap ccc">
                <Input
                  onInput={(e) => {
                    action.commonChange('main.giftCardNo', e.detail.value);
                  }}
                  className="form-input"
                  placeholder="请输入卡号"
                  value={main.giftCardNo}
                />
                <IconFont onClick={() => action.onScan()} value='saomahexiao' size={20} style={{ marginLeft: 10 }} />
              </View>
              <Text className="form-label">兑换码</Text>
              <View className="form-input-wrap">
                <Input
                  onInput={(e) => {
                    action.commonChange('main.exchangeCode', e.detail.value);
                  }}
                  className="form-input"
                  placeholder="请输入兑换码"
                  value={main.exchangeCode}
                />
              </View>
              <View onClick={action.check} className="form-button">
                <Text className="button-txt">兑换</Text>
              </View>
            </View>
            {main.failModal && (
              <Modal
                type="warning"
                visible
                onOk={() => action.commonChange('main.failModal', false)}
                content={main.failMsg}
                showCancel={false}
              />
            )}
            {main.successModal && (
              <Modal
                type="warning"
                visible
                onCancel={async () => {
                  Taro.showLoading()
                  action.commonChange('main.successModal', false);
                  await action.handleChangeEnterprise();
                  Taro.hideLoading()
                  Taro.navigateBack();
                  msg.emit('myCardRefresh');
                }}
                onOk={async() => {
                  Taro.showLoading()
                  action.commonChange('main.successModal', false);
                  await action.handleChangeEnterprise();
                  Taro.hideLoading()
                  Taro.navigateTo({
                    url: `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${main.cardId}&preview=false`,
                  });
                }}
                content="卡券兑换成功，激活后即可使用"
                title="兑换成功"
                confirmText="去激活"
                icon={iconSuccess}
              />
            )}
            {main.confirmModal && (
              <Modal
                type="default"
                visible
                onCancel={() => action.commonChange('main.confirmModal', false)}
                onOk={action.exchange}
                title="确认兑换"
                confirmText="确认"
                content={
                  <View className="gift-card" style={{background: bgGradient}}>
                    <View className="card-texture" style={{backgroundImage: `url(${bgImage})`}}>
                      <View className="card-top">
                        <Text className="card-title" style={{color: foregroundColor}}>
                          {main.cardInfo?.name}
                        </Text>
                        <Text className="card-num" style={{color: foregroundColor}}>
                          {this.renderCardDescription(main?.cardInfo?.parValue ?? 0, main?.cardInfo?.totalGoodsNum)}
                        </Text>
                      </View>
                      <Text className="card-time" style={{color: foregroundColor}}>
                        {this.renderCardTypeDescription(main.cardInfo?.giftCardType)}
                      </Text>
                      <Text className="card-time" style={{color: foregroundColor}}>
                        {main.cardInfo?.expirationValue}
                      </Text>
                    </View>
                  </View>
                }
              />
            )}
          </>
        ) : null}
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
    const {cardInfo} = this.props.main;
    const result = {
      0: `面值${parValue ?? 0}元`,
      1: null,
      2: null,
      3: `面值${parValue ?? 0}元`,
      4: `面值${parValue ?? 0}元`,
    };

    return result[cardInfo?.giftCardType ?? 0] || '';
  };

  renderCardTypeDescription = (giftCardType) => {
    const result = {
      0: `福点卡`,
      1: `提货卡`,
      2: `提货卡`,
      3: `储值卡`,
      4: `储值卡`,
    };
    return result[giftCardType] || '-';
  };
}
