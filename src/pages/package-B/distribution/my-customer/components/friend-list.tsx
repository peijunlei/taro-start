import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';

import * as T from '../types';
import './friend-list.less';
import actions from '../actions/index';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import FriendItem from '../components/friend-item';
import WMListView from '@/pages/common/list-view';
import {List} from 'immutable';
const emptyImage = require('@/assets/image/groupon/empty.png');

type IFriendListProps = T.IProps & T.IFriendListProps;

@connect<Partial<IFriendListProps>, T.IFriendListState>(store2Props, actions)
export default class FriendList extends Component<Partial<IFriendListProps>, T.IFriendListState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IFriendListProps) {
    super(props);
  }
  /**

*/
  render() {
    if (!this.props.main) return;
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;

    let tipMsg = '您还没有邀请好友哦';
    let url = '';
    // 分页查询我邀请的客户url
    if (main && '1' == main.tab) {
      url = '/customer/page-invite-customer';
    } else if (main && '2' == main.tab) {
      // 分页查询我的有效邀请客户url
      url = '/customer/page-valid-invite-customer';
      tipMsg = '您还没有有效邀新哦';
    } else if (main && '3' == main.tab) {
      // 分页查询我的客户url
      url = '/customer/page-my-customer';
      tipMsg = '您还没有顾客哦';
    }
    return (
      main &&
      url && (
        <View className="packageBDistributionMyCustomerFriendList">
          <WMListView
            url={url}
            height="calc(100vh - 164px)"
            noneImg={emptyImage}
            noneContent={tipMsg} //为空提示
            getData={(list, total) => {
              commonChange([
                {
                  paths: 'main.friendsList',
                  value: list,
                },
                {
                  paths: 'main.totalNum',
                  value: total,
                },
              ]);
            }}
          >
            {main.friendsList.map((item, index) => {
              return <FriendItem key={index} friend={item} />;
            })}
          </WMListView>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
