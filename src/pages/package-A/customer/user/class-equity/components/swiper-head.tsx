import {View, Swiper, SwiperItem, Image, Text, RichText, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './swiper-head.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Blank from '@/pages/common/blank';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class SwiperHead extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  swiperChange = (e) => {
    let {
      actions: {action},
    } = this.props;
    action.commonChange('main.atPresentEquityNum', e.detail.current);
  };
  render() {
    let {
      main: {gradeList, atPresentEquityNum},
      actions: {action},
    } = this.props;
    return (
      <View className="class-equity-wrap">
        <View className="swiper_class">
          <ScrollView scrollX className="wm-hor-scrollView">
            <View className="scrollView-inner">
              {gradeList.map((item, index) => (
                <View
                  key={item.customerLevelId}
                  className="swiper-item"
                  onClick={() => {
                    action.commonChange('main.atPresentEquityNum', index);
                  }}
                >
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <View className="swiper_box">
                      <Image className="swiper-img" mode="widthFix" src={item.rankBadgeImg} />
                    </View>
                  </View>
                  <View className={atPresentEquityNum == index ? 'swiper-text active' : 'swiper-text'}>
                    {item.customerLevelName}
                  </View>
                  <View className={'swiper-text1 '}>
                    <Text className={atPresentEquityNum == index ? 'swiper-text2 active2' : 'swiper-text2'}></Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="body">
          {gradeList[atPresentEquityNum] && gradeList[atPresentEquityNum].customerLevelRightsVOS.length != 0 ? (
            gradeList[atPresentEquityNum].customerLevelRightsVOS.map((v, i) => {
              return (
                <View key={i} className="body_box">
                  <View className="up-div">
                    <Image className="left-icon" src={v.rightsLogo} />
                    <View className="right-title">{v.rightsName}</View>
                  </View>
                  <RichText className="text" nodes={v.rightsDescription} />
                </View>
              );
            })
          ) : (
            <Blank
              content="该等级还没有权益哟~"
              img={require('../img/empty.png')}
              imgStyle={{width: '208rpx', height: '208rpx'}}
            />
          )}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
