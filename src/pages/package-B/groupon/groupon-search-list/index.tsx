import {Image, Text, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import WMListView from '@/pages/common/list-view';
import Price from '@/pages/common/goods/price';
import {WMkit} from 'wmkit';

const defaultImg = require('@/assets/image/common/default3-img.png');
const thanks = require('@/assets/image/goods/evaluate/thanks.png');
const search = require('@/assets/image/goods/search.png');
const emptyImage = require('@/assets/image/groupon/empty.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBGrouponGrouponSearchList extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    const {keywords} = getCurrentInstance().router.params;
    this.props.actions.init(keywords && decodeURI(keywords));
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
      actions: {action},
      main = {},
    } = this.props;
    const {keywords, groupCenterList = []} = main;
    return (
      <View className="groupon-search-list">
        <View className="group-top">
          <View
            className="group-top-search"
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/package-B/goods/search/index?key=groupon&keywords=${keywords}`,
              })
            }
          >
            <Image src={search} className="img" />
            <Text className="fs24 c999">{keywords}</Text>
          </View>
        </View>
        <WMListView
          url={WMkit.isLogin() ? '/groupon/center/list' : '/groupon/center/unlogin/list'}
          getData={(list, total) => action.commonChange('main.groupCenterList', list)}
          dataPath={['grouponCenterVOList']}
          noneImg={emptyImage}
          noneContent={'暂无拼团信息哦~'}
          params={{
            goodsName: keywords,
          }}
          style={{height: 'calc(100vh - 99rpx)'}}
        >
          {groupCenterList.map((item) => (
            <View className="groupon-item" key={item.grouponActivityId}>
              <Image src={item.goodsImg ? item.goodsImg : defaultImg} className="img" />
              <Text className="content">{item.goodsName}</Text>
              <View className="tail">
                <View className="left">
                  <Price price={item.grouponPrice} />
                  <Text className="fs20 c999 mt8">{`单买 ¥${item.marketPrice}`}</Text>
                </View>
                <View className="right">
                  <View className="nums">
                    <View className="inline">
                      <Text className="fs20 yellow">{item.grouponNum}</Text>
                      <Text className="fs20 c999">人团</Text>
                    </View>
                    <View className="inline mt8">
                      <Text className="fs20 yellow">{item.alreadyGrouponNum || '0'}</Text>
                      <Text className="fs20 c999">人已拼团</Text>
                    </View>
                  </View>
                  <View
                    className="wm-button-2"
                    onClick={() => {
                      if(item.showFlag == '0'){
                        Taro.showToast({
                          title: '商品不可售！',
                          icon: 'none',
                          duration: 2000,
                        });
                        return;
                      }
                      Taro.navigateTo({
                        url: `/pages/package-B/goods/group-details/index?skuId=${item.goodsInfoId}`,
                      })
                    }}
                  >
                    <Text className="text">立即参团</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </WMListView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
