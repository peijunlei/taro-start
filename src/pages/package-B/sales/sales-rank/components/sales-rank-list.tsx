import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './sales-rank-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import userImg from '@/assets/image/customer/user-center/default.png';
import left1 from '@/assets/image/distribution/sales/left-1.png';
import left2 from '@/assets/image/distribution/sales/left-2.png';
import left3 from '@/assets/image/distribution/sales/left-3.png';
import tip1 from '@/assets/image/distribution/sales/tip-1.png';
import tip2 from '@/assets/image/distribution/sales/tip-2.png';
import tip3 from '@/assets/image/distribution/sales/tip-3.png';
import {_} from 'wmkit';
type ISalesRankListProps = T.IProps & T.ISalesRankListProps;

const rankImg = [
  {
    left: left1,
    tip: tip1,
  },
  {
    left: left2,
    tip: tip2,
  },
  {
    left: left3,
    tip: tip3,
  },
];
@connect<Partial<ISalesRankListProps>, T.ISalesRankListState>(store2Props, actions)
export default class SalesRankList extends Component<Partial<ISalesRankListProps>, T.ISalesRankListState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ISalesRankListProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main = {},
    } = this.props;
    const {rankList = [], tab} = main;
    return (
      <View className="packageBSalesSalesRank">
        <View className="salesRankList">
          <View className="ranks">
            {rankList.map((item) => {
              let headImg = item.img ? item.img : userImg;
              return (
                <View key={item.customerId} className="item">
                  <View className="left">
                    <View className="userBox">
                      <Image src={headImg} className="avatarImg" />
                      {item.ranking < 4 && (
                        <View className="rank-box">
                          <Text className="rank-text">NO.{item.ranking}</Text>
                          <Image src={rankImg[item.ranking - 1].tip} className="tipImg" />
                        </View>
                      )}
                    </View>
                    <View className="rankBox">
                      <Text className="fs28 c333 mb16 name">{item.name}</Text>
                      <Text className="fs24" style={{color: 'rgba(0,0,0,0.4)'}}>
                        {this._msgDetail(item, tab, 1)}
                        <Text className="rank-text-point">{this._msgDetail(item, tab, 2)}</Text>
                      </Text>
                    </View>
                  </View>
                  {item.ranking < 4 ? (
                    <Image src={rankImg[item.ranking - 1].left} className="leftImg" />
                  ) : (
                    <Text className="ranking-text">{item.ranking}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
  /**
   * 排名信息
   */
  _msgDetail = (rankItme, tab, type) => {
    let text = '';
    // 邀新人数
    if (tab == 'inviteCount') {
      text = type == 1 ? '邀新人数 ' : rankItme.inviteCount;
      // text += '邀新人数: ' + rankItme.inviteCount;
    }
    // 有效邀新
    if (tab == 'inviteAvailableCount') {
      text = type == 1 ? '有效邀新 ' : rankItme.inviteAvailableCount;
    }
    //销售额
    if (tab == 'saleAmount') {
      text = type == 1 ? '销售额 ' : _.addZero(rankItme.saleAmount);
    }
    // 预估收益
    if (tab == 'commission') {
      text = type == 1 ? '预估收益 ' : _.addZero(rankItme.commission);
    }
    return `${text}`;
  };
}

//create by moon https://github.com/creasy2010/moon
