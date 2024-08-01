import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './sales-rank-my-rank.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import userImg from '@/assets/image/customer/user-center/default.png';

type ISalesRankMyRankProps = T.IProps & T.ISalesRankMyRankProps;

@connect<Partial<ISalesRankMyRankProps>, T.ISalesRankMyRankState>(store2Props, actions)
export default class SalesRankMyRank extends Component<Partial<ISalesRankMyRankProps>, T.ISalesRankMyRankState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISalesRankMyRankProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {myRank = {}} = main;
    let headImg = myRank.img ? myRank.img : userImg;
    let name = myRank.name ? myRank.name : '用户';
    let rangking = myRank.ranking ? (myRank.ranking > 99 ? '99+' : myRank.ranking) : 0;
    return (
      <View className="salesRankMyRank">
        <View className="wm-title">
          <Text className="text" style={{fontWeight: 'bold'}}>
            我的排名
          </Text>
        </View>
        <View className="item">
          <View className="left">
            <Image src={headImg} className="userImg" />
            <Text className="fs28 c333">{name}</Text>
          </View>
          <Text className="fs28 red">{rangking}</Text>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
