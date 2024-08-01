import { Image, ScrollView, Text, View } from '@tarojs/components';
import React, { Component } from 'react';
import * as T from '../types';
import { LoadingStatus } from '../types';
import Taro from '@tarojs/taro';
import './gift-card-list.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { BackgroundType, InvalidStatus, TabStatus } from 'api/GiftCardController';
import cancelImage from '@/assets/image/gift-card/gift-card-cancel.png';
import expImage from '@/assets/image/gift-card/gift-card-exp.png';
import useUpImage from '@/assets/image/gift-card/gift-card-useup.png';
import textureImage from '@/assets/image/gift-card/card-texture.png';
import emptyImage from '@/assets/image/gift-card/card-empty.png';
import Blank from '../../../../common/blank';
import { _ } from 'wmkit';
import { debounce } from 'lodash';
import api from 'api';
import config from '@/service/config';
import { cache } from 'config';
const path = 'pages/package-F/login-middle/index';
const userCenter = '/pages/user-center/index';
const envVersion = config.envVersion;

const imgMap = {
  [InvalidStatus.CANCEL]: cancelImage,
  [InvalidStatus.EXPIRATION]: expImage,
  [InvalidStatus.USE_UP]: useUpImage,
};

const numMap = {
  [TabStatus.USABLE]: 'useNum',
  [TabStatus.UN_USABLE]: 'invalidNum',
  [TabStatus.TO_ACTIVE]: 'notActive',
};

const threshold = 150;

type IGiftCardListProps = T.IProps & T.IGiftCardListProps;

@connect<Partial<IGiftCardListProps>, T.IGiftCardListState>(store2Props, actions)
export default class GiftCardList extends Component<Partial<IGiftCardListProps>, T.IGiftCardListState> {
  render() {
    let {
      actions: { action },
      main,
    } = this.props;
    if (!main) return null;

    const hideTop =
      (main.status === TabStatus.USABLE || main.status === TabStatus.TO_ACTIVE) && main[numMap[main.status]] === 0;
    const isCommLogin = main.isCommLogin
    const USABLE = main.status === TabStatus.USABLE
    return (
      <ScrollView
        className={`gift-card-list ${hideTop && 'list-top-88'}`}
        scrollY
        scrollWithAnimation
        lowerThreshold={threshold}
        upperThreshold={threshold}
        // onScrollToUpper={action.refresh}
        onScrollToLower={action.nextPage}
      >
        <View className="card-list-wrap">
          {main.giftCardList.map((card) => {
            let bgGradient = '',
              bgImage = null;
            if (card.backgroundType === BackgroundType.COLOR) {
              const colors = card.backgroundDetail.split(',').map((i) => i.trim());
              bgGradient = `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
              bgImage = textureImage;
            } else {
              bgImage = card.backgroundDetail;
            }
            if (main.status === TabStatus.UN_USABLE) {
              bgGradient = 'linear-gradient(90deg, #A2ABBA 0%, #A2ABBA 100%)';
              bgImage = textureImage;
            }
            return (
              <View
                style={{ background: bgGradient }}
                className="gift-card"
                key={card.giftCardNo}
                onClick={() => this._navigateToDetail(card, isCommLogin)}
              >
                <View className="card-texture" style={{ backgroundImage: `url(${bgImage})` }}>
                  <View>
                    <View className="card-title" style={{ color: card.foregroundColor }}>
                      {card.name}
                    </View>
                    <View className="card-value" style={{ color: card.foregroundColor }}>
                      {this.renderCardDescription(card.parValue || 0, card?.totalGoodsNum, card?.giftCardType)}
                    </View>
                    {card.activationTime !== null && card?.giftCardType === 0 ? (
                      <View className="card-balance">
                        <Text className="balance-symbol" style={{ color: card.foregroundColor }}>
                          ￥
                        </Text>
                        <Text className="balance-num" style={{ color: card.foregroundColor }}>
                          {card.balance ? _.addZero(card.balance) : '0.00'}
                        </Text>
                        <Text className="balance-text" style={{ color: card.foregroundColor }}>
                          余额
                        </Text>
                      </View>
                    ) : (
                        ''
                      )}
                    {[0, 1, 2].includes(card.giftCardType) ? (
                      <View className="use_record_wrap">
                        <Text
                          className="use_record"
                          onClick={(e) => {
                            e.stopPropagation();
                            Taro.navigateTo({
                              url: `/pages/package-D/gift-card/gift-card-bill/index?id=${card.userGiftCardId}&balance=${card.balance}&giftCardType=${card.giftCardType}&giftCardId=${card.giftCardId}`,
                            });
                          }}
                        >
                          使用记录
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View className="card-bottom">
                    <View className='btn'>
                      {
                        [3, 4].includes(card.giftCardType) && (card.invalidStatus === InvalidStatus.USE_UP || USABLE) && (
                          <View className='bottom-btn' style={{ color: card.foregroundColor }} onClick={(e) => this.handleClick(e, card.enterpriseId)}> 去使用 </View>
                        )
                      }
                      <Text className="bottom-text" style={{ color: card.foregroundColor }}>
                        {card.giftCardNo}
                      </Text>
                    </View>

                    <View>
                      <Text className="bottom-name" style={{ color: card.foregroundColor }}>
                        {this.renderCardTypeDescription(card?.giftCardType)}
                      </Text>
                      <Text className="bottom-text" style={{ color: card.foregroundColor }}>
                        {card.expirationValue}
                      </Text>
                    </View>
                  </View>
                  {main.status === TabStatus.UN_USABLE && (
                    <Image src={imgMap[card.invalidStatus]} className="card-seal" />
                  )}
                </View>
              </View>
            );
          })}
          <View className="no-more">
            {main.loadingStatus === LoadingStatus.LOADING && '加载中...'}
            {main.loadingStatus === LoadingStatus.LOADED_NO_MORE && main.giftCardList.length !== 0 && '没有更多了'}
          </View>
          {main.loadingStatus === LoadingStatus.LOADED_NO_MORE && main.giftCardList.length === 0 && (
            <Blank content="暂无卡包哦" img={emptyImage} />
          )}
        </View>
      </ScrollView>
    );
  }
  handleClick = async (e, id: string) => {
    e.stopPropagation();
    const {isCommLogin} = this.props.main
    const { enterpriseInfoVOList } = await api.customerBaseController.getEnterpriseInfoByCustomerId();
    const isExist = (enterpriseInfoVOList || []).some(v => v.enterpriseId === id)
    if (!isExist) {
      Taro.showToast({
        title: '当前卡所在企业不存在',
        icon: 'none',
        duration: 2000,
      });
      return
    }
    try {
      await api.customerBaseController.changeLoginEnterpriseId(id);
    } catch (e) {
      Taro.showToast({
        title: e.message,
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let loginData = Taro.getStorageSync(cache.LOGIN_DATA);
    // 当前登录的账号所属的企业id
    loginData.lastLoginEnterpriseId = id;
    Taro.setStorageSync(cache.LOGIN_DATA, loginData);
    const token = encodeURIComponent(Taro.getStorageSync(cache.AUTH_TOKEN));
    console.log('isCommLogin', isCommLogin,token)
    // 通用url拉起小程序
    if (__TARO_ENV==='h5' && isCommLogin) {
      const res = await api.customerBaseController.getWeixinScheme({
        path,
        envVersion,
        query: `accessToken=${token}`
      })
      if (!res) {
        console.log('获取Url Scheme失败')
        return
      }
      console.log('Url Scheme', res)
      window.location.href = res as unknown as string;
    } else {
      Taro.switchTab({ url: userCenter });
    }
  }
  /**
   * 动态渲染 - 卡描述
   * @param parValue
   * @param num
   * @returns
   */
  renderCardDescription = (parValue, num, giftCardType) => {
    const result = {
      0: `面值${parValue ?? 0}元`,
      1: null,
      2: null,
      3: `面值${parValue ?? 0}元`,
      4: `面值${parValue ?? 0}元`,
    };
    return result[giftCardType] || '';
  };

  renderCardTypeDescription = (giftCardType) => {
    const result = {
      0: `福点`,
      1: `提货`,
      2: `提货`,
      3: `积分`,
      4: `积分`,
    };
    return result[giftCardType] || '-';
  };
  goNextPage = async (card, isCommLogin) => {
    const id = card.giftCardId;
    Taro.showLoading()
    const { giftCardBlessingConfigVO } = await api.giftCardController.getGiftCardBlessing(id);
    const enableFlag = giftCardBlessingConfigVO.enableFlag;
    Taro.hideLoading()
    let url = ''
    if (enableFlag === 1) {
      url = `/pages/package-D/gift-card/gift-card-bless/index?id=${id}&userGiftCardId=${card.userGiftCardId}`;
    } else {
      url = `/pages/package-D/gift-card/gift-card-detail/index?type=1&id=${card.userGiftCardId}&preview=false`;
    }
    if (isCommLogin) {
      url += `&isCommLogin=1`
    }
    Taro.navigateTo({
      url
    });
  }
  _navigateToDetail = debounce(
    this.goNextPage,
    360,
    { leading: true, trailing: false },
  );
}

//create by moon https://github.com/creasy2010/moon
