import {Progress, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import Blank from '@/pages/common/blank';
import Complete from './complete/index';
import 'taro-ui/dist/style/components/progress.scss';
import 'taro-ui/dist/style/components/icon.scss';
import WMLoading from '@/pages/common/loading';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GrowthValue extends Component<Partial<T.IProps>, any> {
  componentDidShow(): void {
    this.props.actions.init();
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
    let {
      main,
      // main: {funds, flag, levelInfo, isLastOne},
      actions: {action},
    } = this.props;
    return (
      main && (
        <View className="packageACustomerGrowthValue">
          <View className="body_in">
            <View className="body_body">
              <View>
                <Text className="body_1">当前成长值</Text>
                <Text className="body_2">{main.levelInfo.nowHaveGrowthValue}</Text>
              </View>
              <View className="body_bt" onClick={() => action.commonChange('main.flag', !main.flag)}>
                成长值规则
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
                  backgroundColor="rgb(246,105,39)"
                  activeColor="#FFFFFF"
                  borderRadius="4"
                />
              </View>
              <View className="progress-text">
                <View style={{flexDirection: 'row'}}>
                  <Text className="left mo_text">
                    当前等级
                    <Text className="mo_text">{main.levelInfo.atPresentLevelName}</Text>
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {!main.isLastOne ? (
                    <Text className="right mo_text">
                      距离<Text className="left mo_text">{main.levelInfo.nextLevelName}</Text>
                      等级还差
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
          {main.isLoadingFlag ? (
            <WMLoading />
          ) : (
            <ScrollView scrollY onScrollToLower={this._onScrollToLower}>
              {main.funds && main.funds.length > 0 ? (
                <View>
                  {main.funds.map((item, index) => {
                    return <Info key={index} item={item} />;
                  })}
                  <View className="status">没有更多了</View>
                </View>
              ) : (
                <View>
                  <Blank
                    content="您暂时还没有明细记录哟~"
                    img={require('./img/empty.png')}
                    imgStyle={{width: '208rpx', height: '208rpx'}}
                  />
                </View>
              )}
            </ScrollView>
          )}

          <Complete />
        </View>
      )
    );
  }
  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}

//create by moon https://github.com/creasy2010/moon
