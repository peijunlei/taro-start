import {View, Button, Text, Image, Input} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {debounce,throttle} from 'lodash';
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

  shouldComponentUpdate(nextProps) {
    return nextProps?.main?.needSearchBarUpdate;
  }

  /**

*/
  render() {
    let {
      actions: {search},
      main: {keywords, key, preKeywords},
    } = this.props;
    let placeholder;

    if (key === 'goods' || key === 'distribute' || key === 'goodsSocial' || key == 'distributeGoods') {
      placeholder = preKeywords ? preKeywords : '搜索商品';
    } else if (key === 'groupon') {
      placeholder = '爱拼才会赢';
    } else {
      placeholder = '搜索商家';
    }
    // this._changeKeywords(preKeywords);
    keywords = keywords?.replace('%',encodeURI('%'))
    return (
      <View className="searchBar-s">
        <View className="content">
          <Image src={searchImg} className="searchImg" onClick={() => this._onSearch()} />
          {key === 'goods' ? (
            <Input
              className="searchText"
              type="text"
              placeholder={placeholder}
              autoFocus={true}
              value={decodeURI(keywords)}
              maxlength={100}
              // onInput={debounce((e) => {
              //   this._changeKeywords(e.detail.value);
              // }, 800)}
              onInput={(e) => {
                this._changeKeywords(e.detail.value, 100);
              }}
              onConfirm={(e) => {
                this._search(e.detail.value);
              }}
            />
          ) : (
            <Input
              className="searchText"
              type="text"
              placeholder={placeholder}
              autoFocus={true}
              value={decodeURI(keywords)}
              maxlength={100}
              onInput={(e) => {
                this._changeKeywords(e.detail.value, 100);
              }}
              onConfirm={(e) => {
                this._search(e.detail.value);
              }}
            />
          )}
        </View>
        <View
          className="cancelBox"
          onClick={() => {
            Taro.navigateBack();
          }}
        >
          <Text className="cancel">取消</Text>
        </View>
      </View>
    );
  }

  _changeKeywords = (keywords, time) => {
    let timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => this.props.actions.action.getSearchList(keywords), time);
    // this.props.actions.action.getSearchList(keywords);
  };

  //包装防抖
  _onSearch=debounce(()=>this.props.actions.search(),1200,{leading:true})

  _search = (keywords) => {
    this.props.actions.action.commonChange([
      {
        paths: 'main.keywords',
        value: keywords,
      },
      {
        paths: 'main.needSearchBarUpdate',
        value: true,
      },
    ]);
    this.props.actions.search();
  };
}

//create by moon https://github.com/creasy2010/moon
