import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './friend-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {_} from 'wmkit';
import defaultImg from '@/assets/image/customer/user-center/default.png';

type IFriendItemProps = T.IProps & T.IFriendItemProps;

@connect<Partial<IFriendItemProps>, T.IFriendItemState>(store2Props, actions)
export default class FriendItem extends Component<Partial<IFriendItemProps>, T.IFriendItemState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IFriendItemProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main: {tab},
      friend,
    } = this.props;
    let customerName;
    let headImg;
    if ('3' == tab) {
      customerName = friend.customerName ? friend.customerName : '';
      headImg = friend.headImg ? friend.headImg : defaultImg;
    } else {
      customerName = friend.invitedNewCustomerName ? friend.invitedNewCustomerName : friend.invitedNewCustomerAccount;
      headImg = friend.invitedNewCustomerHeadImg ? friend.invitedNewCustomerHeadImg : defaultImg;
    }

    let orderNum = friend.orderNum ? friend.orderNum : '0';
    let amount = friend.amount ? friend.amount : '0';

    return (
      <View className="packageBDistributionMyCustomerFriendItem">
        <Image src={headImg} className="img" />
        <View className="right">
          <View className="right-item">
            {customerName && <Text className="fs28 c333 mb16 customerName">{customerName}</Text>}
            <Text className="fs24 c999 mb16">
              已购买 <Text className="yellow fs24">{orderNum}</Text> 单
            </Text>
          </View>
          <View className="right-item">
            <Text className="fs24 c999">
              累计消费 <Text className="yellow fs24">{amount}</Text>
            </Text>

            <Text className="fs24 c999">
              {' '}
              {tab == '3' ? '首单时间：' : '注册时间：'}
              {tab == '3' ? _.formatDay(friend.firstOrderTime) : _.formatDay(friend.registerTime)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
