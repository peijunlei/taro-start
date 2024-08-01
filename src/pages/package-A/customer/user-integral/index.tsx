import {Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Info from './components/info';
import Blank from '@/pages/common/blank';
import moment from 'dayjs';
import Complete from './complete/index';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LinkedAccount extends Component<Partial<T.IProps>, any> {
  componentDidShow() {
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
      main = {},
      actions: {action},
    } = this.props;
    const {funds = [], willExpirePointsData = {}, pointsValue, flag, isLoadingList, form, totalPages} = main;
    return (
      <View className="packageACustomerUserIntegral">
        {willExpirePointsData.pointsExpireStatus == 1 && willExpirePointsData.willExpirePoints > 0 && (
          <View className="warn_ing">
            <Image src={require('./img/ling.png')} className="img_ling" />
            <View className="warning_text">
              {moment(willExpirePointsData.pointsExpireDate).format('YYYY-MM-DD')}即将过期积分{' '}
              <Text className="warning_text textBold">{willExpirePointsData.willExpirePoints}</Text>
            </View>
          </View>
        )}
        <View className="body_in">
          <View className="body_body">
            <View>
              <Text className="body_1">当前积分</Text>
              <Text className="body_2">{pointsValue}</Text>
            </View>
            <View className="body_bt" onClick={() => action.commonChange('main.flag', !flag)}>
              积分规则
            </View>
          </View>
          <View
            className="body_button"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/package-A/customer/user/points-mall/index',
              });
            }}
          >
            <Image className="img_ling" src={require('./img/present.png')} />
            积分商城
          </View>
        </View>
        <ScrollView scrollY onScrollToLower={this._onScrollToLower} className="integral__scroll">
          {funds && funds.length > 0 ? (
            <View>
              {funds.map((item, index) => {
                return <Info key={index} item={item} />;
              })}

              {funds.length != 0 && form.pageNum + 1 != totalPages && <View className="status">加载中</View>}
              {!isLoadingList && funds.length != 0 && form.pageNum + 1 == totalPages && (
                <View className="status">没有更多了</View>
              )}
            </View>
          ) : (
            !isLoadingList && (
              <View>
                <Blank
                  content="您暂时还没有明细记录哟~"
                  img={require('./img/empty.png')}
                  imgStyle={{width: '208rpx', height: '208rpx'}}
                />
              </View>
            )
          )}
        </ScrollView>
        {isLoadingList && <WMLoading />}
        <Complete />
      </View>
    );
  }
  _onScrollToLower = () => {
    this.props.actions.action.nextPage();
  };
}

//create by moon https://github.com/creasy2010/moon
