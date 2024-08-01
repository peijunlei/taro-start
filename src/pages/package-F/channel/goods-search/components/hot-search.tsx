import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './hot-search.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IHotSearchProps = T.IProps & T.IHotSearchProps;

@connect<Partial<IHotSearchProps>, T.IHotSearchState>(store2Props, actions)
export default class HotSearch extends Component<Partial<IHotSearchProps>, T.IHotSearchState> {
  constructor(props: IHotSearchProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {commonChange},
        search,
      },
      main: {history, hotHistory},
    } = this.props;

    return (
      <View className="searchHistory">
        <View className="search__top">
          <Text className="searchTitle">热门搜索</Text>
        </View>
        <View className="historyList">
          {hotHistory && hotHistory.length > 0 ? (
            hotHistory.map((v) => {
              return (
                <View
                  className="items"
                  key={v.id}
                  onClick={() => {
                    commonChange('main.keywords', v.popularSearchKeyword);
                    search(v.relatedLandingPage);
                  }}
                >
                  <Text className="text">{v.popularSearchKeyword}</Text>
                </View>
              );
            })
          ) : (
            <View className="no-more">暂无搜索记录</View>
          )}
        </View>
      </View>
    );
  }

  _clearHistory = () => {
    this.props.actions.clearHistory();
  };
}

//create by moon https://github.com/creasy2010/moon
