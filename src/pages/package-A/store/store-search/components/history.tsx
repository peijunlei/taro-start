import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './history.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
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
      // main: {history},
    } = this.props;
    const history = this.props.main?.history;
    return (
      <View className="searchHistory">
        <View className="searchTop">
          <Text className="searchTitle">搜索历史</Text>
          <Image src={del} className="delImg" onClick={this._clearHistory} />
        </View>
        <View className="historyList">
          {history && history.length > 0 ? (
            history.map((v) => {
              return (
                <View
                  className="item"
                  key={v}
                  onClick={() => {
                    commonChange('main.keywords', v);
                    search();
                  }}
                >
                  <Text className="text">{v}</Text>
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
