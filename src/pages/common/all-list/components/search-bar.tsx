import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './search-bar.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchImg from '@/assets/image/goods/search.png';

type ISearchBarProps = T.IProps & T.ISearchBarProps;

@connect<Partial<ISearchBarProps>, T.ISearchBarState>(store2Props, actions)
export default class SearchBar extends Component<Partial<ISearchBarProps>, T.ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="searchBar">
        <View
          className="content"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/package-B/goods/search/index',
            });
          }}
        >
          <Image src={searchImg} className="searchImg" />
          <Text className="searchText">搜索商品</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
