import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './history.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Blank from '@/pages/common/blank';

const noneImg = require('@/assets/image/empty/search-empty.png');
import del from '@/assets/image/common/delete.png';

type IHistoryProps = T.IProps & T.IHistoryProps;

@connect<Partial<IHistoryProps>, T.IHistoryState>(store2Props, actions)
export default class History extends Component<Partial<IHistoryProps>, T.IHistoryState> {
  constructor(props: IHistoryProps) {
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
      main,
      main: {history, isLoadingFlag},
    } = this.props;
    return (
      main && (
        <View className="searchHistory">
          <View className="search__top">
            <Text className="searchTitle">搜索历史</Text>
            <Image src={del} className="delImg" onClick={this._clearHistory} />
          </View>
          <View className="historyList">
            {history && history.length > 0
              ? history.map((v, index) => {
                  return (
                    <View
                      className="items"
                      key={index}
                      onClick={() => {
                        commonChange('main.keywords', (v && decodeURI(v.replace('%',encodeURI('%')))) || '');
                        search();
                      }}
                    >
                      <Text className="text">{v}</Text>
                    </View>
                  );
                })
              : !isLoadingFlag && (
                  <View className="empty-box">
                    <Blank
                      img={noneImg}
                      content="暂无搜索记录"
                      style={{paddingTop: '80px'}}
                      imgStyle={{width: '104px', height: '104px'}}
                      textStyle={{fontSize: '12px', color: 'rgba(0,0,0,0.4)'}}
                    />
                  </View>
                )}
          </View>
        </View>
      )
    );
  }

  _clearHistory = () => {
    this.props.actions.clearHistory();
  };
}

//create by moon https://github.com/creasy2010/moon
