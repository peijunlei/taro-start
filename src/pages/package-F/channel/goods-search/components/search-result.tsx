import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './search-result.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ShopIcon from '@/assets/image/goods/shop-small-icon.png';

type ISearchResultProps = T.IProps & T.ISearchResultProps;

@connect<Partial<ISearchResultProps>, T.ISearchResultState>(store2Props, actions)
export default class SearchResult extends Component<Partial<ISearchResultProps>, T.ISearchResultState> {
  constructor(props: ISearchResultProps) {
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
      main: {history, keywords, associationalWordList},
    } = this.props;
    console.log('associationalWordList', associationalWordList);
    return (
      <View className="searchHistory">
        {associationalWordList.length > 0 &&
          associationalWordList.map((v, i) => {
            return (
              <View key={i}>
                <View className="search-goodlist">
                  <View
                    className="goods-name"
                    onClick={() => {
                      console.log(v.associationalWord);
                      commonChange('main.keywords', v.associationalWord);
                      search('');
                    }}
                  >
                    {v.associationalWord}
                  </View>
                  <View className="search-goodlist-brand">
                    {v.longTailWord &&
                      v.longTailWord.map((i, index) => {
                        return (
                          <View
                            key={index}
                            className="brand-state"
                            onClick={() => {
                              commonChange('main.keywords', i + v.associationalWord);
                              search('');
                            }}
                          >
                            {i}
                          </View>
                        );
                      })}
                  </View>
                </View>
                {associationalWordList.length > 4 && i == 4 && (
                  <View
                    className="search-store"
                    onClick={() => {
                      commonChange('main.key', 'supplier');
                      search('');
                    }}
                  >
                    <View>
                      <Image className="search-store-icon" src={ShopIcon} />
                    </View>
                    <View className="search-store-name">包含“{keywords}”的店铺</View>
                  </View>
                )}
              </View>
            );
          })}
        {associationalWordList.length > 0 && associationalWordList.length < 4 && (
          <View
            className="search-store"
            onClick={() => {
              commonChange('main.key', 'supplier');
              search('');
            }}
          >
            <View>
              <Image className="search-store-icon" src={ShopIcon} />
            </View>
            <View className="search-store-name">包含“{keywords}”的店铺</View>
          </View>
        )}
      </View>
    );
  }

  _clearHistory = () => {
    this.props.actions.clearHistory();
  };
}

//create by moon https://github.com/creasy2010/moon
