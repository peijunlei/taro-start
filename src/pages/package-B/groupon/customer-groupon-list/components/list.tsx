import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import StoreItem from './store-item';
import WMListView from '@/pages/common/list-view';
import {GrouponTradeVO} from 'api/TradeBaseController';

const emptyImage = require('@/assets/image/groupon/empty.png');

type IListProps = T.IProps & T.IListProps;

@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class List extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      main: {reload, list, serverTime},
    } = this.props;
    return (
      <View className="list">
        <WMListView
          reload={reload}
          url={'/trade/page/groupons'}
          getData={(list: GrouponTradeVO[], total) => {
            commonChange('main.list', list);
            commonChange('main.total', total);
          }}
          noneImg={emptyImage}
          noneContent={'暂无拼团哦～'}
        >
          {list.map((store, index) => {
            return <StoreItem key={store.groupId} storeInfo={store} serverTime={serverTime} />;
          })}
        </WMListView>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
