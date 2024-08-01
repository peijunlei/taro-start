import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Blank from '@/pages/common/blank';
import CouponItem from '../components/coupon-item';
import noneImg from '@/assets/image/coupon/empty.png';
import WMLoading from '@/pages/common/loading';

type ICouponListProps = T.IProps & T.ICouponListProps;
@connect<Partial<ICouponListProps>, T.ICouponListState>(store2Props, actions)
export default class CouponList extends Component<Partial<ICouponListProps>, T.ICouponListState> {
  constructor(props: ICouponListProps) {
    super(props);
  }
  static options = {
    addGlobalClass: true,
  };

  /**

*/
  render() {
    let {main = {}} = this.props;
    const {couponList = [], isLoading, isLoadingList, request, total} = main;
    return (
      <View>
        {!isLoadingList && <WMLoading />}
        <ScrollView
          className="coupon__scrollView"
          scrollY
          scrollWithAnimation
          onScrollToLower={this._onScrollToLower.bind(this)}
          style={main?.showCateMask || main?.showDrapMenu ? {position: 'fixed'} : {position: 'absolute'}}
        >
          {couponList && couponList.length > 0 ? (
            <View className="coupon-center-couponList">
              {couponList.map((coupon, index) => {
                return <CouponItem key={index} coupon={coupon} index={index} showType={'main'} />;
              })}
              {couponList.length != 0 && request.pageNum + 1 != total && <View className="status">加载中</View>}
              {!isLoading && couponList.length !== 0 && request.pageNum + 1 === total && (
                <View className="status">没有更多了</View>
              )}
            </View>
          ) : (
            !isLoading && <Blank content="啊哦，什么券都没有" img={noneImg} />
          )}
        </ScrollView>
      </View>
    );
  }
  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToUpper(e) {
    this.props.actions.action.modifySearch({}, {isResetPage: true});
    Taro.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500,
    });
  }
  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  async _onScrollToLower(e) {
    await this.props.actions.action.nextPage();
  }
}

//create by moon https://github.com/creasy2010/moon
