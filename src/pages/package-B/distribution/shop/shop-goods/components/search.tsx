import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './search.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchIcon from '@/assets/image/goods/goods-list/serch.png';
import classifyIcon from '@/assets/image/goods/goods-list/classify.png';
import closeIcon from '@/assets/image/goods/goods-list/close.png';
import bigIcon from '@/assets/image/goods/goods-list/big-icon.png';
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
    const {request = {}} = this.props.main || {};
    return (
      <View className="shop-search">
        <View className="l-search" onClick={() => this.research()}>
          <Image src={searchIcon} className="search-icon" />
          {request.keywords != '' ? (
            <View className="search-item">
              <Text className="text">{request.keywords}</Text>
              <Image src={closeIcon} className="close-icon" />
            </View>
          ) : (
            <Text className="tips">搜索商品</Text>
          )}
        </View>
      </View>
    );
  }
  //搜索页面
  research = () => {
    const {request = {}} = this.props.main || {};
    Taro.redirectTo({
      url: `/pages/package-B/goods/search/index?key=distribute&keywords=${request.keywords}`,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
