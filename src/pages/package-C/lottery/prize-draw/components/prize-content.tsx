import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View, Image, Text} from '@tarojs/components';

import dayjs from 'dayjs';
import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import './prize-content.less';
import smileImg from '@/assets/image/prize-draw/smiling.png';
import goPrizeImg from '@/assets/image/prize-draw/go.png';
import goGrayPrizeImg from '@/assets/image/prize-draw/go-gray.png';
import pdContentImg from '@/assets/image/prize-draw/pd-body-bg.png';
import btn from '@/assets/image/draw/btn.png';
type IContentProps = T.IProps & T.IContentProps;
import {LuckyWheel} from '@lucky-canvas/taro/react';
import {debounce} from 'lodash';
import NineRound from '@/assets/image/draw/nine-round.png';
import NineStartPoint from '@/assets/image/draw/nine-start-point.png';
import NineDisable from '@/assets/image/draw/nine-disable.png';
import NineStartPointDisable from '@/assets/image/draw/nine-start-point-disable.png';
import PrizeModal from './prize-modal';
const isH5 = __TARO_ENV === 'h5';
const windowWidth = Taro.getSystemInfoSync().windowWidth;

// @ts-ignore
@connect<Partial<IContentProps>, T.IContentState>(store2Props, actions)
export default class PrizeContent extends Component<Partial<IContentProps>, T.IContentState> {
  private readonly myLucky: React.RefObject<unknown>;
  constructor(props: IContentProps) {
    super(props);
    this.myLucky = React.createRef();
    this.state = {
      buttons: [
        {radius: '50px'},
        {radius: '50px'},
        // {
        //   radius: '40px',
        //   background: '#869cfa',
        //   pointer: true,
        //   fonts: [{text: '开始\n抽奖', top: '-20px'}],
        // },
        {
          pointer: true,
          fonts: [{text: '立即抽奖', top: 10, fontSize: 12, fontColor: '#fff'}],
          imgs: [{src: btn, width: 100, height: 120, top: -70}],
        },
      ],
    };
  }

  render() {
    const {
      actions: {action},
      main: {
        prizeList,
        activityId,
        leftDrawCount,
        prizeId,
        checkId,
        startTime,
        endTime,
        pauseFlag,
        formType,
        wheelPrizes,
        wheelButtons,
        maxAwardTip,
        modalShow,
        drawType,
        consumePoints,
      },
    } = this.props;
    return (
      <View>
        {formType === 0 ? (
          <View className="pd-content">
            <Image mode="aspectFit" src={pdContentImg} className="pd-content-img" />
            <View className="pd-body">
              {prizeList.map((item, index) => (
                <View
                  className={index === checkId || prizeId === item.id ? 'pd-body-item pd-active-item' : 'pd-body-item'}
                  key={index}
                >
                  {/* 谢谢参与 */}
                  {item.id === null && item.activityId !== null ? (
                    <View className="pd-item_box">
                      <Image mode="aspectFit" className="pd-item_img" src={smileImg} />
                      <View className="pd-item_text">谢谢参与</View>
                    </View>
                  ) : null}
                  {/* 正常奖品 */}
                  {item.id !== null && item.activityId !== null ? (
                    <View className="pd-item_box">
                      <Image mode="aspectFit" className="pd-item_img item_img_goods" src={item.prizeUrl} />
                      <View className="pd-item_text">{item.prizeName}</View>
                    </View>
                  ) : null}
                </View>
              ))}
              {/*抽奖按钮*/}
              {dayjs().isAfter(startTime) && dayjs().isBefore(endTime) && pauseFlag != 1 ? (
                <View className="pd-body-item" key={9} onClick={debounce(async () => await action.startPrizeDraw(activityId),500)}>
                  {drawType === 1 && consumePoints ? (
                    <>
                      <Image
                        mode="aspectFit"
                        className={leftDrawCount > 0 ? 'pd-item_img' : 'pd-item_img go-gray'}
                        src={leftDrawCount > 0 ? NineStartPoint : NineStartPointDisable}
                      />
                      <Text className="nine-point-txt">消耗{consumePoints}积分</Text>
                    </>
                  ) : (
                    <Image
                      mode="aspectFit"
                      className={leftDrawCount > 0 ? 'pd-item_img' : 'pd-item_img go-gray'}
                      src={leftDrawCount > 0 ? goPrizeImg : goGrayPrizeImg}
                    />
                  )}
                </View>
              ) : null}
              {dayjs().isBefore(startTime) ? (
                <View className="pd-body-item fatal-status" key={9} style={{backgroundImage: `url(${NineDisable})`}}>
                  <View className="pd-item_box">
                    <View className="pd-item_text">活动</View>
                    <View className="pd-item_text">未开始</View>
                  </View>
                </View>
              ) : null}

              {dayjs().isAfter(endTime) || pauseFlag == 1 ? (
                <View className="pd-body-item fatal-status" key={9} style={{backgroundImage: `url(${NineDisable})`}}>
                  <View className="pd-item_box">
                    <View className="pd-item_text">活动</View>
                    <View className="pd-item_text">{dayjs().isAfter(endTime) ? '已结束' : '已暂停'}</View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View className="pd-content-round">
            <Image mode="aspectFit" src={NineRound} className="pd-round-img" />
            <View className="pd-body">
              {(!modalShow || isH5) && (
                <LuckyWheel
                  ref={this.myLucky}
                  width={Math.round((290 / 375) * windowWidth) + ''}
                  height={Math.round((290 / 375) * windowWidth) + ''}
                  blocks={[{padding: '4px', background: '#DD0B07'}]}
                  prizes={wheelPrizes}
                  buttons={wheelButtons}
                  defaultConfig={{gutter: 2}}
                  onStart={debounce(async () => {
                    await action.startLuckyWheel(this);
                  }, 500)}
                  onEnd={(prize) => {
                    action.commonChange('main.startWheelLoading', false);
                    action.commonChange([{paths: 'main.modalShow', value: true}]);
                    action.initData(activityId);
                  }}
                />
              )}
            </View>
          </View>
        )}

        {modalShow && <PrizeModal myLucky={this.myLucky} />}
      </View>
    );
  }
}
