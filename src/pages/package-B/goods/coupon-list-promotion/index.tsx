import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//sku列表
import SkuList from './components/sku-list';
//功能导航
import NavTools from './components/nav-tools';
//综合筛选框
import CompositePicker from './components/composite-picker';
//分类筛选框
import ClassifyPicker from './components/classify-picker';
//品牌筛选框
import BrandPicker from './components/brand-picker';
//满减折组件
import Activity from './components/activity';
//去购物车
import Bottom from './components/bottom';
//无数据
import Blank from '@/pages/common/blank';
import noneImg from '@/assets/image/goods/goods-list/empty.png';
import SkeletonSmall from '@/pages/common/skeleton';
import WMLoading from '@/pages/common/loading';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class LoginGoodsList extends Component<Partial<T.IProps>, any> {
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
  // componentDidMount() {
  //   let {activity, couponId} = getCurrentInstance().router.params;
  //   this.props.actions.init(activity, couponId);
  // }

  componentDidShow() {
    const {request} = this.props.main || {};
    if (request?.activity && request?.couponId) {
      this.props.actions.init(request.activity, request.couponId);
    }
    // 页面刷新多次，实时存储各个参数
    let activity, couponId;
    // h5 componentDidShow中 getCurrentInstance()取不到参数
    if (__TARO_ENV == 'h5') {
      let activityInfo = window.location.search.split('=')?.[1];
      activity = activityInfo.replace('&couponId', '');
      couponId = window.location.search.split('=')?.[2];
    } else {
      activity = getCurrentInstance().router.params.activity;
      couponId = getCurrentInstance().router.params.couponId;
    }
    this.props.actions.init(activity, couponId);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  async _onScrollToLower(e) {
    await this.props.actions.goodsAction.nextPage();
  }

  render() {
    let {
      actions: {goodsAction, activityAction},
      main,
    } = this.props;
    if (!main) {
      return <View></View>;
    }
    const scrollTop = 0;
    const Threshold = 20;
    return (
      <View
        className="packageBGoodsCouponListPromotion"
        catchMove
        onTouchMove={(e) => {
          e.stopPropagation();
          //  e.preventDefault();
        }}
      >
        {/* 优惠券*/}
        <Activity />
        {/* 功能导航 */}
        <NavTools />
        <ScrollView
          className="scroll-view"
          scrollY
          scrollWithAnimation
          // scrollTop={main.goods.length == 0 ? 0.01 : scrollTop}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToLower={this._onScrollToLower.bind(this)}
        >
          {main?.loadSkeleton && main.isLoadingFlag && <SkeletonSmall />}
          <SkuList />
          {main.goods.length == 0 && !main.isLoadingFlag && <Blank content="商家还未上架商品哦" img={noneImg} />}
          {main.goods.length != 0 && main.goods.length == main.total && !main.isLoadingFlag && (
            <View className="status">没有更多了</View>
          )}
        </ScrollView>
        {main.isLoadingFlag && <WMLoading />}
        {/* 综合筛选框 */}
        {main.navToolsObj.arrowFlag && <CompositePicker />}
        {/* 分类筛选框 */}
        {main.navToolsObj.catesFlag && <ClassifyPicker />}
        {/* 品牌筛选框 */}
        {main.navToolsObj.brandFlag && <BrandPicker />}

        {/* 去购物车 */}
        <Bottom />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
