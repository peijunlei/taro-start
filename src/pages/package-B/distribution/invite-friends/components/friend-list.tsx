import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './friend-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import WMListView from '@/pages/common/list-view';
import {_} from 'wmkit';
import emptyImage from '@/assets/image/groupon/empty.png';
import defaultImg from '@/assets/image/customer/user-center/default.png';

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
    let {
      actions: {
        action: {commonChange},
      },
      main,
    } = this.props;

    return (
      main && (
        <View className="packageBDistributionInviteFriendsList">
          <WMListView
            url={'/customer/page-invite-customer'}
            height="calc(100vh - 240px)"
            noneImg={emptyImage}
            noneContent={'您还没有邀请好友哦'} //为空提示
            getData={(list, total) => {
              commonChange([
                {
                  paths: 'main.friends',
                  value: list,
                },
                {
                  paths: 'main.totalNum',
                  value: total,
                },
              ]);
            }}
          >
            {main.friends.map((friend, index) => {
              let customerName = friend.invitedNewCustomerName
                ? friend.invitedNewCustomerName
                : friend.invitedNewCustomerAccount;
              let headImg = friend.invitedNewCustomerHeadImg ? friend.invitedNewCustomerHeadImg : defaultImg;
              let orderNum = friend.orderNum ? friend.orderNum : 0;
              let amount = friend.amount ? friend.amount : '0';
              return (
                <View className="friendList" key={index}>
                  <View className="item">
                    <Image src={headImg} className="img" />
                    <View className="right">
                      <View className="right-item">
                        {customerName && <Text className="fs28 c333 mb16 customerName">{customerName}</Text>}
                        <Text className="fs24 c999 mb16">
                          已购买 <Text className="yellow fs24">{orderNum + ''}</Text> 单
                        </Text>
                      </View>
                      <View className="right-item">
                        <Text className="fs24 c99 right-item-fw">
                          累计消费<Text className="yellow fs24">{amount + ''}</Text>
                        </Text>

                        <Text className="fs24 c999"> 注册时间：{_.formatDay(friend.registerTime)}</Text>
                      </View>
                    </View>

                    {/* <View className="left">
                    <Image src={headImg} className="img" />
                    <View>
                      {customerName && <Text className="fs28 c333 mb16">{customerName}</Text>}
                      <Text className="fs24 c999">累计消费<Text className="yellow fs24">{amount}</Text></Text>
                    </View>
                  </View>
                  <View className="right">
                    <Text className="fs24 c999 mb16">已购买<Text className="yellow fs24">{orderNum}</Text>单</Text>
                    <Text className="fs24 c999">注册时间：{_.formatDay(friend.registerTime)}</Text>
                  </View> */}
                  </View>
                </View>
              );
            })}
          </WMListView>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
