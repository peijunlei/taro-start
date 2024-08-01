import {View, Button, Text, Image, Input} from '@tarojs/components';
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
    const {
      actions: {
        search,
        action: {commonChange},
      },
    } = this.props;
    const keywords = this.props.main?.keywords;
    return (
      <View className="searchBar">
        <View className="search-content">
          <Image src={searchImg} className="searchImg" onClick={search} />
          <Input
            className="searchText"
            type="text"
            placeholder={'搜索本店商品'}
            placeholderStyle="fontsize: 12px"
            focus
            value={keywords}
            onInput={(e) => {
              commonChange('main.keywords', e.detail.value);
            }}
            onConfirm={search}
          />
        </View>
        <Text className="search-btn" onClick={search}>
          搜本店
        </Text>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
