import {Image, Input, View, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './search-bar.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import searchImg from '@/assets/image/goods/search.png';
import filterImg from '@/assets/image/store/filter.png';
import closeIcon from '@/assets/image/goods/goods-list/close.png';

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
      main = {},
    } = this.props;
    const {request = {}} = main;
    return (
      <View className="searchBar">
        <View className="content" onClick={(e) => this.researchDel(e)}>
          <Image src={searchImg} className="searchImg" />
          {request.keywords && (
            <View className="search-item">
              <Text className="text">{request.keywords}</Text>
              <Image src={closeIcon} className="close-icon" />
            </View>
          )}
        </View>
        <View
          className="img-box"
          onClick={() => {
            action.commonChange('main.filterModalVisible', true);
          }}
        >
          <Image src={filterImg} className="filter-img" />
        </View>
      </View>
    );
  }
  researchDel = (e) => {
    e.stopPropagation();
    // const keywords = getCurrentInstance().router.params.keywords;
    const keywords = this.props.main.request.keywords;
    Taro.redirectTo({
      // url: `/pages/package-B/goods/search/index?keywords=` + keywords,
      url: `/pages/package-B/goods/search/index?keywords=${keywords}&&key=supplier`,
    });
  };
}

//create by moon https://github.com/creasy2010/moon
