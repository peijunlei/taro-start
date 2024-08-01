import {View, Button, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Blank from '@/pages/common/blank';
import CouponItem from './coupon-item';
import noneImg from '@/assets/image/coupon/empty.png';
import WMLoading from '@/pages/common/loading';

type ICouponListProps = T.IProps & T.ICouponListProps;

@connect<Partial<ICouponListProps>, T.ICouponListState>(store2Props, actions)
export default class CouponList extends Component<Partial<ICouponListProps>, T.ICouponListState> {
  static options = {
    addGlobalClass: true,
  };

  constructor(props: ICouponListProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: {action},
      main: {couponList, isLoadingList, request, total,delayLoading},
    } = this.props;
    const scrollTop = 0;
    const Threshold = 100;

    console.log('couponList',couponList,total)
    return (
      <View>
        <ScrollView
          className="scroll-view-mycoupon"
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this._onScrollToUpper}
          onScrollToLower={this._onScrollToLower.bind(this)}
        >
          {couponList.length != 0 ? (
            <View>
              <View className="my-coupon-couponList">
                <CouponItem/>
              </View>
              {couponList.length != 0 && request.pageNum + 1 != total && <View className="status">加载中</View>}
              {!isLoadingList && delayLoading && couponList.length !== 0 && request.pageNum + 1 === total && (
                <View className="status">没有更多了</View>
              )}
            </View>
          ) : (
            !isLoadingList && <Blank content="啊哦，什么券都没有" img={noneImg}/>
          )}
        </ScrollView>
        {isLoadingList && <WMLoading/>}
      </View>
    );
  }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToUpper = (e) => {
    this.props.actions?.action?.modifySearch({}, {isResetPage: true});
    // Taro.showToast({
    //   title: '加载中...',
    //   icon: 'loading',
    //   duration: 500,
    // });
  };

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  async _onScrollToLower(e) {
    await this.props.actions?.action?.nextPage();
  }
}

//create by moon https://github.com/creasy2010/moon
