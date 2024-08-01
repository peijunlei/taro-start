import {ScrollView, View} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
//搜索
import Search from './components/search';
//sku列表
import SkuList from './components/sku-list';
//功能导航
import NavTools from './components/nav-tools';
//综合筛选框
import CompositePicker from './components/composite-picker';
//筛选弹框
import ScreenModal from './components/screen-modal';
//无数据
import Blank from '@/pages/common/blank';
import WMLoading from '@/pages/common/loading';
import noneImg from '@/assets/image/goods/goods-list/empty.png';
import {msg} from 'wmkit';
//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class ShopGoods extends Component<Partial<T.IProps>, any> {
  config = {
    navigationBarTitleText: '店铺选品',
  };
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
  componentDidShow() {
    this.props.actions.init(getCurrentInstance().router.params);
  }

  componentDidHide() {
    msg.emit('shop-goods');
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  // /**
  //  * 滚动到顶部/左边，会触发 scrolltoupper 事件
  //  */
  // async _onScrollToLower(e) {
  //   Taro.showToast({
  //     title: '加载中...',
  //     icon: 'loading',
  //     duration: 500,
  //   });
  //   await this.props.actions.goodsAction.nextPage();
  // }

  render() {
    let {goodsShowType, imageShowType, goods = [], total, navToolsObj = {}, loadStatus, isLoadingList, delayLoading} =
      this.props.main || {};
    return (
      <View className="loginGoodsList">
        {/* 搜索 */}
        <Search />
        {/* 功能导航 */}
        <NavTools />
        <ScrollView
          className="scroll-view"
          scrollY
          // onScrollToLower={this._onScrollToLower}
          onScrollToLower={this._onScrollToLower.bind(this)}
        >
          {/*goodsShowType=1: spu列表 goodsShowType=0: sku列表 imageShowType=0: 小图 imageShowType=1: 大图*/}
          {goodsShowType === 0 && imageShowType === 0 && <SkuList />}
          {!isLoadingList && goods.length == 0 && !isLoadingList && (
            <Blank content="没有搜到任何商品～" img={noneImg} />
          )}
          {!isLoadingList && goods.length != 0 && goods.length == total && delayLoading && (
            <View className="status">没有更多了</View>
          )}
          {!isLoadingList && goods.length != 0 && goods.length != total && delayLoading && (
            <View className="status">加载中</View>
          )}
        </ScrollView>
        {/* {loadStatus !== 'loaded' && <WMLoading />} */}
        {/* 综合筛选框 */}
        {navToolsObj.arrowFlag && <CompositePicker />}
        {/* 筛选弹框 */}
        {navToolsObj.screenIsShow && <ScreenModal />}

        {isLoadingList && <WMLoading />}
      </View>
    );
  }

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  _onScrollToLower() {
    this.props.actions.goodsAction.nextPage();
  }
}

//create by moon https://github.com/creasy2010/moon
