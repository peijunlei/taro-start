import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './search-bar.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchImg from '@/assets/image/goods/search.png';

type ISearchBarProps = T.IProps & any;

@connect<Partial<ISearchBarProps>, any>(store2Props, actions)
export default class SearchBar extends Component<Partial<ISearchBarProps>, any> {
  constructor(props: ISearchBarProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: {storeId},
    } = this.props;

    return (
      <View className="searchBar">
        <View
          className="content"
          onClick={() => {
            Taro.redirectTo({
              url: `/pages/package-A/store/store-search/index?storeId=${storeId}`,
            });
          }}
        >
          <Image src={searchImg} className="searchImg" onClick={this._search} />
          <Input className="searchText" type="text" placeholder={'搜索店铺内商品'} disabled />
        </View>
      </View>
    );
  }

  _changeKeywords = (keywords) => {
    this.props.actions.action.commonChange('main.keywords', keywords);
  };

  _search = () => {
    this.props.actions.search();
  };
}

//create by moon https://github.com/creasy2010/moon
