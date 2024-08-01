import {Progress, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import 'taro-ui/dist/style/components/progress.scss';
import 'taro-ui/dist/style/components/icon.scss';
import SwiperHead from './components/swiper-head';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ClassEquity extends Component<Partial<T.IProps>, any> {
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

  componentDidShow(): void {
    let id = getCurrentInstance().router.params.id;
    this.props.actions.init(id);
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      main,
      // main: { levelInfo, isLastOne },
      // actions: {action},
    } = this.props;
    return (
      main && (
        <View className="packageACustomerClassEquity">
          <View className="body_in">
            <View className="body_body">
              <View>
                <Text className="body_1">当前等级</Text>
                <Text className="body_2">{main.levelInfo.atPresentLevelName}</Text>
              </View>
            </View>
            <View className="body_button">
              <View style={{width: '100%'}}>
                <Progress
                  percent={
                    !main.levelInfo.needGrowthValue
                      ? 100
                      : (((main.levelInfo.nowHaveGrowthValue / main.levelInfo.nextGrowthValue) * 100) as any)
                  }
                  strokeWidth={5}
                  backgroundColor="rgb(214,143,99)"
                  activeColor="#FFFFFF"
                  borderRadius="4"
                />
              </View>
              <View className="progress-text">
                <View style={{flexDirection: 'row'}}>
                  <Text className="left mo_text">
                    当前成长值
                    <Text className="mo_text">{main.levelInfo.nowHaveGrowthValue}</Text>
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {!main.isLastOne ? (
                    <Text className="right mo_text">
                      距离<Text className="left mo_text">{main.levelInfo.nextLevelName}</Text>
                      还差
                      <Text className="left mo_text">
                        {main.levelInfo.needGrowthValue < 0 ? 1 : main.levelInfo.needGrowthValue}
                      </Text>
                    </Text>
                  ) : (
                    <Text className="right mo_text">您已达到最高等级</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          <SwiperHead />
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
