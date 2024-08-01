import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './goods-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Price from '@/pages/common/goods/price';
import {_, WMkit} from 'wmkit';
import WMListView from '@/pages/common/list-view';
import noDataIcon from '@/assets/image/goods/goods-list/no-data-s.png';
const noneImg = require('@/assets/image/goods/goods-list/empty.png');
@connect<Partial<T.IGoodsListProps>, T.IGoodsListState>(store2Props, actions)
export default class GoodsList extends Component<Partial<T.IGoodsListProps>, T.IGoodsListState> {
  constructor(props: T.IGoodsListProps) {
    super(props);
    this.state = {
      list: [],
      total: 0,
    };
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    const listViewProps = {
      url: WMkit.isLogin() ? '/groupon/center/list' : '/groupon/center/unlogin/list',
      params: {
        sticky: true,
        grouponCateId: main.grouponDetails.grouponActivity.grouponCateId,
      },
      style: {height: 'calc(100vh - 404px)'},
      dataPath: ['grouponCenterVOList'],
      getData: (list, total) => {
        this.setState({total, list});
      },
      noneImg: noneImg,
      noneContent: '暂无精选拼团',
      // extraData: { toRefresh: initialEnd }
    };
    return (
      <View className="group-buy-detail">
        <View className="tag">
          <Text className="title">——精选拼团——</Text>
        </View>
        <WMListView
          {...listViewProps}
          scrollY={this.props.scrollY}
          onScrollToUpper={() => this.props.onScrollToUpper()}
        >
          {this.state.list.map((vo, index) => {
            return (
              <View className="container" key={index}>
                <View className="image-container">
                  <Image src={vo.goodsImg ? vo.goodsImg : noDataIcon} className="image" />
                  <View className="top-tag">
                    <Text className="tag-text">{vo.grouponNum}人团</Text>
                  </View>
                </View>

                <View className="info">
                  <View className="top">
                    <Text className="text">{vo.goodsName}</Text>
                  </View>
                  <View className="middle">
                    <Text className="num">{main?.grouponDetails?.grouponActivity?.alreadyGrouponNum || '0'}</Text>
                    <Text className="alone">人已成团</Text>
                  </View>
                  <View className="down">
                    <View className="left">
                      <Price price={vo.grouponPrice} />
                      <Text className="alone">单买 {`￥${_.addZero(vo.grouponPrice)}`}</Text>
                    </View>
                    <View
                      className="right"
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/package-B/goods/group-details/index?skuId=${vo.goodsInfoId}`,
                        })
                      }
                    >
                      <Text className="btn">去开团</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </WMListView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
