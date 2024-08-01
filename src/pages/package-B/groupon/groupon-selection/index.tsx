import {Image, ScrollView, Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import './index.less';
import WMListView from '@/pages/common/list-view';
import Price from '@/pages/common/goods/price';
import WMGrouponFooter from '@/pages/common/groupon-bar';
import {WMkit} from 'wmkit';

const defaultImg = require('@/assets/image/common/default3-img.png');
const search = require('@/assets/image/goods/search.png');
const emptyImage = require('@/assets/image/groupon/empty.png');
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageBGrouponGrouponSelection extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
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
      actions: {action},
      main = {},
    } = this.props;
    const {grouponCates = [], chooseCateId, keyWords, sticky, groupCenterList = []} = main;
    //全部列表不需要分类id等参数
    let params =
      chooseCateId == '-1'
        ? {}
        : {
            grouponCateId: chooseCateId,
            goodsName: keyWords,
            sticky: sticky,
          };

    return (
      <View className="groupon-selection">
        <View className="ranking-top">
          <View
            className="ranking-search"
            onClick={() =>
              Taro.navigateTo({
                url: '/pages/package-B/goods/search/index?key=groupon',
              })
            }
          >
            <Image src={search} className="img" />
            <Text className="fs24 c999">爱拼才会赢</Text>
          </View>
          {/* <Image src={bgImg} className="bgImg" /> */}

          <ScrollView scrollX>
            <View className="tabs">
              {grouponCates.map((item, index) => {
                const active = chooseCateId ? item.grouponCateId === chooseCateId : item.defaultCate == 1;
                return (
                  <View
                    // key={item.grouponCateId}
                    key={index}
                    className={active ? 'item item-active' : 'item'}
                    onClick={() => action.changeTopActive(item.grouponCateId, item.defaultCate)}
                  >
                    <Text className={active ? 'text bold' : 'text'}>{item.grouponCateName}</Text>
                    <View className="rect"></View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View className="dingWei">
          <WMListView
            url={WMkit.isLogin() ? '/groupon/center/list' : '/groupon/center/unlogin/list'}
            getData={(list, total) => action.commonChange('main.groupCenterList', list)}
            dataPath={['grouponCenterVOList']}
            noneContent={'暂无拼团信息哦~'}
            noneImg={emptyImage}
            params={params}
            style={{height: '100vh', paddingBottom: '50px'}}
          >
            {groupCenterList.map((item, index) => (
              <View className="groupon-item" key={index}>
                <Image src={item.goodsImg ? item.goodsImg : defaultImg} className="img" />
                <Text className="content">{item.goodsName}</Text>
                <View className="tail">
                  <View className="left">
                    <Price price={item.grouponPrice} />
                    <Text className="fs20 c999 mt8">{`单买 ￥${item.marketPrice}`}</Text>
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
        <WMGrouponFooter currTab="热拼排行" />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
