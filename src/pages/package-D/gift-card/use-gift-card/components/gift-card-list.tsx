import {Image, ScrollView, Text, View} from '@tarojs/components';
import React, {Component} from 'react';
import {Checkbox} from '@wanmi/ui-taro';
import * as T from '../types';
import {TabType} from '../types';
import Taro from '@tarojs/taro';
import './gift-card-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {BackgroundType, GiftCardInfo} from 'api/GiftCardController';
import textureImage from '@/assets/image/gift-card/card-texture.png';
import iconMore from '@/assets/image/gift-card/icon-more.png';
import {_} from 'wmkit';
import emptyImage from '@/assets/image/gift-card/card-empty.png';
import Blank from '../../../../common/blank';
import IconFont from '@/wmkit/common/iconfont';

const threshold = 150;

type IGiftCardListProps = T.IProps & T.IGiftCardListProps;

@connect<Partial<IGiftCardListProps>, T.IGiftCardListState>(store2Props, actions)
export default class GiftCardList extends Component<Partial<IGiftCardListProps>, T.IGiftCardListState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;

    let cardList: GiftCardInfo[] = [];
    if (main.tab === TabType.USABLE) cardList = main.validList;
    if (main.tab === TabType.UN_USABLE) cardList = main.invalidList;
    const invalid = main.tab === TabType.UN_USABLE;

    return (
      <>
        {main.isReady && cardList.length === 0 ? (
          <Blank content="暂无卡包哦" img={emptyImage} style={{ marginTop: '50px' }} />
        ) : (
          <ScrollView
            className="gift-card-list"
            scrollY
            scrollWithAnimation
            lowerThreshold={threshold}
            upperThreshold={threshold}
            style={main.tab === TabType.UN_USABLE ? {bottom: 0} : {}}
          >
            <View className={`card-list-wrap ${invalid && 'card-invalid'}`}>
              {invalid && <Text className="top-label">商品不可用({main.invalidNum})</Text>}
              {cardList.map((card) => {
                let bgGradient = '',
                  bgImage = null;
                if (card.backgroundType === BackgroundType.COLOR) {
                  const colors = card.backgroundDetail.split(',').map((i) => i.trim());
                  bgGradient = `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
                  bgImage = textureImage;
                } else {
                  bgImage = card.backgroundDetail;
                }
                const checked = main.checkedCardIds.includes(card.userGiftCardId);
                return (
                  <View className="gift-card-wrap-line" key={card.userGiftCardId}>
                    <View className="gift-card-wrap">
                      <View
                        style={{background: bgGradient}}
                        className="gift-card"
                        key={card.giftCardNo}
                        onClick={() => {
                          if (invalid) return;
                          if (!checked) action.checkCard(card.userGiftCardId);
                          else action.uncheckCard(card.userGiftCardId);
                        }}
                      >
                        <View className="card-texture" style={{backgroundImage: `url(${bgImage})`}}>
                          <View>
                            <View className="card-title" style={{color: card.foregroundColor}}>
                              {card.name}
                            </View>
                            <View className="card-value" style={{color: card.foregroundColor}}>
                              面值{card.parValue || 0}元
                            </View>
                            <View className="card-balance">
                              <Text className="balance-symbol" style={{color: card.foregroundColor}}>
                                ￥
                              </Text>
                              <Text className="balance-num" style={{color: card.foregroundColor}}>
                                {card.balance ? _.addZero(card.balance) : '0.00'}
                              </Text>
                              <Text className="balance-text" style={{color: card.foregroundColor}}>
                                余额
                              </Text>
                            </View>
                            <View className="card-goods" style={{color: card.foregroundColor}}>
                              {card.scopeType === 0
                                ? '全部商品可用'
                                : card.scopeType === 4
                                ? '指定商品可用'
                                : '部分商品可用'}
                            </View>
                          </View>
                          <View className="card-bottom">
                            <Text className="bottom-text" style={{color: card.foregroundColor}}>
                              {card.giftCardNo}
                            </Text>
                            <Text className="bottom-text" style={{color: card.foregroundColor}}>
                              {card.expirationValue}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {card.deduction > 0 && (
                        <View className="gift-card-tail">
                          <Text className="tail-text">预计本单最多可抵扣{card.deduction}元</Text>
                          <View className="view-goods" onClick={() => action.showGoods(card)}>
                            <Text className="tail-text">查看本单可用商品</Text>
                            <Image className="tail-icon" src={iconMore} />
                          </View>
                        </View>
                      )}
                    </View>
                    {!invalid && (
                      <View
                        className="gift-card-check-view"
                        onClick={() => {
                          if (invalid) return;
                          if (!checked) action.checkCard(card.userGiftCardId);
                          else action.uncheckCard(card.userGiftCardId);
                        }}
                      >
                        <IconFont
                          value={checked ? 'yixuanzhong' : 'weixuanze'}
                          size={17}
                          color={checked ? 'var(--themeColor)' : '#ccc'}
                        />
                      </View>
                      // <Checkbox
                      //   checked={checked}
                      //   onClick={(checked) => {
                      //     if (invalid) return;
                      //     if (checked) action.checkCard(card.userGiftCardId);
                      //     else action.uncheckCard(card.userGiftCardId);
                      //   }}
                      // />
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
