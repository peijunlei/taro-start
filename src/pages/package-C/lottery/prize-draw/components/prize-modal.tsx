import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './prize-modal.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import modalBg from '@/assets/image/prize-draw/modal-bg.png';
import modalSmiling from '@/assets/image/prize-draw/modal-smiling.png';
import drawBg from '@/assets/image/draw/draw-wheel-bg.png';
import drawBtn from '@/assets/image/draw/draw-btn.png';
import close from '@/assets/image/draw/close.png';
import thanks from '@/assets/image/draw/thanks.png';
import arrow from '@/assets/image/common/arrow-white.png';

type IPrizeModalProps = T.IProps & T.IPrizeModalProps;

const prizeTypeText = {
  0: '已发放到我的-积分，去查看',
  1: '已发放到我的-优惠券，去使用',
  2: '已抽中实物奖品，填写收货地址领取',
  3: '已抽中奖品，去领取使用',
};

@connect<Partial<IPrizeModalProps>, T.IPrizeModalState>(store2Props, actions)
export default class PrizeModal extends Component<Partial<IPrizeModalProps>, T.IPrizeModalState> {
  private readonly myLucky: React.RefObject<unknown>;
  constructor(props: IPrizeModalProps) {
    super(props);
    this.myLucky = this.props.myLucky;
  }

  /**

   */
  render() {
    let {
      actions: {
        action,
        action: {commonChange},
      },
      actions,
      main,
    } = this.props;
    const prizeTypeJump = {
      0: '/pages/package-A/customer/user-integral/index',
      1: '/pages/package-A/customer/my-coupon/index',
      2: `/pages/package-C/lottery/prize-list/index?id=${main.activityId}`,
      3: `/pages/package-C/lottery/prize-list/index?id=${main.activityId}`,
    };
    return (
      <View className="prizeModal">
        <View className="pm-body">
          <Image className="drawBg" src={drawBg} />
          {main.prizeInfo?.id ? (
            <View className="pd-body-title">
              <View className="body-title-text">恭喜您中奖啦</View>
            </View>
          ) : (
            <View className="pd-body-title">
              <View className="body-title-text">很遗憾您未中奖</View>
            </View>
          )}
          {/* 未中奖 */}
          {!main.prizeInfo?.id && (
            <View>
              <View className="pm-content">
                <Image mode="aspectFit" className="pm-body-coupon" src={thanks} />
              </View>
              <Text className="pm-info-text">{main.tipsNotWin}</Text>
            </View>
          )}
          {/* 中奖-积分、中奖-商品 */}
          {main.prizeInfo?.id && (
            <View>
              <View className="pm-content">
                <Image mode="aspectFit" className="pm-body-bg" src={modalBg} />
                <Image
                  mode="aspectFit"
                  style={{position: 'absolute'}}
                  className="pm-body-coupon"
                  src={main.prizeInfo.prizeUrl}
                />
              </View>
              <Text className="pm-info-text">{main.prizeInfo && main.prizeInfo.prizeName}</Text>
            </View>
          )}

          <Image
            mode="aspectFit"
            className="pm-bottom-btn"
            src={drawBtn}
            onClick={async () => {
              commonChange('main.modalShow', false);
              if (main.formType === 0) {
                setTimeout(async () => {
                  await action.startPrizeDraw(main.activityId);
                }, 400);
              } else {
                setTimeout(async () => {
                  await action.startLuckyWheel(this);
                }, 400);
              }
            }}
          />
          {main.prizeInfo?.id && (
            <View
              className="PrizeResultText"
              onClick={() => {
                commonChange('main.modalShow', false);
                Taro.navigateTo({
                  url: prizeTypeJump[main.prizeInfo?.prizeType],
                  complete: () => {
                    actions?.clean();
                  },
                });
              }}
            >
              {prizeTypeText[main.prizeInfo?.prizeType]}
              <Image src={arrow} className="prize-arrow-right" />
            </View>
          )}

          {/*<View className="pm-body-bottom">*/}
          {/*  /!*<View className='pm-body-bottom-in-top'></View>*!/*/}
          {/*  {!main.prizeInfo?.id && (*/}
          {/*    <View*/}
          {/*      className="PrizeResultText"*/}
          {/*      onClick={() => {*/}
          {/*        commonChange('main.modalShow', false);*/}
          {/*        Taro.navigateTo({*/}
          {/*          url: `/pages/package-A/lottery/prize-list/index`,*/}
          {/*        });*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {prizeTypeText[main.prizeInfo?.prizeType]}查看奖品*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*</View>*/}
        </View>
        <Image
          mode="aspectFit"
          className="close-img"
          src={close}
          onClick={() => {
            commonChange('main.modalShow', false);
          }}
        />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
