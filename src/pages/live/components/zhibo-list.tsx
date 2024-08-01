import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './zhibo-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ZhiboListItem from './zhibo-list-item';

const emptyLiveList = require('@/assets/image/live/empty_live_list.png');

type IZhiboListProps = T.IProps & T.IZhiboListProps;

@connect<Partial<IZhiboListProps>, T.IZhiboListState>(store2Props, actions)
export default class ZhiboList extends Component<Partial<IZhiboListProps>, T.IZhiboListState> {
  constructor(props: IZhiboListProps) {
    super(props);
  }

  /**
    直播列表
*/
  render() {
    if (!this.props.main) return <View />;
    let {
      actions: {action},
      main,
    } = this.props;

    if (!main.roomInfo.length) {
      return (
        <View className="emptyBox">
          <View className="emptyBox-item">
            <Image src={emptyLiveList} className="emptyImg" />
            <Text className="emptyText">暂无直播哦</Text>
          </View>
        </View>
      );
    }

    return (
      <View className="zhiboListRoll">
        <View className="zhiboListBox" style={main && main.isScroll ? {} : {}}>
          {main &&
            main.roomInfo.map((item, index) => {
              return <ZhiboListItem key={index} id={'listItem' + index} data={item} />;
            })}
          <View className="bottom">没有更多了</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
