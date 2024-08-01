import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component, Fragment} from 'react';

import * as T from '../types';
import './search.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchIcon from '@/assets/image/goods/goods-list/serch.png';
import classifyIcon from '@/assets/image/goods/goods-list/classify.png';
import closeIcon from '@/assets/image/goods/goods-list/close.png';
import bigIcon from '@/assets/image/goods/goods-list/big-icon.png';
import navigation from '@/assets/image/goods/goods-list/navigation.png';
import smallIcon from '@/assets/image/goods/goods-list/small-icon.png';

type ISearchProps = T.IProps & T.ISearchProps;

@connect<Partial<ISearchProps>, T.ISearchState>(store2Props, actions)
export default class Search extends Component<Partial<ISearchProps>, T.ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
  }

  /**
   搜索
   */
  render() {
    let {
      actions: {goodsAction},
      main,
      main: {
        preKeyword,
        ifStore,
        spreadFlag,
        request: {storeId},
      },
    } = this.props;
    const left = (main?.request?.keywords?.length || 0) * 12 + (main.menuList && main.menuList.length > 0 ? 14 : 0) + 8;
    return (
      <View className="good-search" style={spreadFlag ? {padding: '0px 12px'} : null}>
        <View className="l-search" onClick={() => this.research()} style={spreadFlag ? {margin: 0} : null}>
          <Image src={searchIcon} className="search-icon" />
          <ScrollView
            scrollX
            scrollLeft={left} // 必须使用表达式，直接写死数字无效
            style={{width: '80%'}}
          >
            <View style={{flexDirection: 'row'}}>
              {main.request.keywords ? (
                <View>
                  <View className="search-item">
                    <Text className="text">{main.request.keywords}</Text>
                    <Image src={closeIcon} onClick={(e) => this.researchDel(e)} className="close-icon" />
                  </View>
                  {/* 小程序占位，否则初始化位置时右侧会被削去一部分 */}
                  {main.menuList && main.menuList.length > 0 && <View style={{width: '24px'}}></View>}
                </View>
              ) : (
                <Text className="tips">{preKeyword ? preKeyword : '搜索商品'}</Text>
              )}
            </View>
          </ScrollView>
        </View>
        {!spreadFlag && (
          <View className="r-icon">
            <View
              className="icon-box mr-40"
              onClick={() =>
                this.props.loadingStatus(() => {
                  Taro.redirectTo({
                    url: ifStore
                      ? `/pages/package-B/goods/cate-list/index?storeId=${storeId}`
                      : '/pages/package-B/goods/all-list/index',
                  });
                })
              }
            >
              <Image src={classifyIcon} className="icon" />
              <Text className="name">分类</Text>
            </View>

            <View
              className="icon-box mr-40"
              onClick={() =>
                this.props.loadingStatus(() => {
                  let num = main.imageShowType;
                  if (num === 0) {
                    num = 1;
                  } else {
                    num = 0;
                  }
                  goodsAction.commonChange('main.imageShowType', num);
                })
              }
            >
              <Image src={main.imageShowType == 0 ? bigIcon : smallIcon} className="icon" />
              <Text className="name">{main.imageShowType === 0 ? '大图' : '小图'}</Text>
            </View>
            {main.menuList && main.menuList.length > 0 && (
              <View
                className="icon-box"
                onClick={() => {
                  goodsAction.commonChange('main.isMenuBoxFlag', !main.isMenuBoxFlag);
                }}
              >
                <Image src={navigation} className="icon" />
                <Text className="name">导航</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  //搜索
  research = () => {
    let {
      ifStore,
      request: {storeId, keywords},
      spreadFlag,
    } = this.props.main;
    // key: distributeGoods 表示是分销推广商品的搜索
    keywords = keywords?.replace('%',encodeURI('%'));
    Taro.redirectTo({
      url: ifStore
        ? // ? `/pages/package-B/goods/cate-list/index?storeId=${storeId}`
          `/pages/package-A/store/store-search/index?storeId=${storeId}`
        : spreadFlag
        ? `/pages/package-B/goods/search/index?key=distributeGoods`
        : `/pages/package-B/goods/search/index?keywords=${keywords || ''}`,
    });
  };
  researchDel = (e) => {
    e.stopPropagation();
    const {
      ifStore,
      request: {storeId},
      spreadFlag,
    } = this.props.main;
    const keywords = getCurrentInstance()?.router?.params?.keywords;
    // key: distributeGoods 表示是分销推广商品的搜索
    Taro.redirectTo({
      url: ifStore
        ? `/pages/package-B/goods/cate-list/index?storeId=${storeId}`
        : spreadFlag
        ? `/pages/package-B/goods/search/index?key=distributeGoods`
        : `/pages/package-B/goods/search/index?keywords=`,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
