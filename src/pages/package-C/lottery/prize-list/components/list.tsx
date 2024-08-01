import React, {Component} from 'react';
import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import dayjs from 'dayjs';
import './list.less';
const redeemPrizeStatus = {
  0: '领取',
  1: '查看',
};
type IListProps = T.IProps & T.IListProps;
import {debounce} from 'lodash';
//@ts-ignore
let isH5 = __TARO_ENV === 'h5';
@connect<Partial<IListProps>, T.IListState>(store2Props, actions)
export default class PrizeList extends Component<Partial<IListProps>, T.IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
      <View className="prize-list-warp">
        {main &&
          main.list.length > 0 &&
          main.list.map((item, index) => {
            return (
              <View className="prize-list" key={item.id + '/' + item.drawRecordCode + '/' + index}>
                <Image mode="aspectFit" className="prize-img" src={item.prizeUrl}></Image>
                <View className="prize-info">
                  <Text className="prize-title">{item.prizeName}</Text>
                  <Text className="prize-time">活动名称：{item.activityName}</Text>
                  <Text className="prize-time">中奖时间：{dayjs(item.drawTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
                <View className="prize-btn" onClick={debounce(() => this.prizeJump(item), 600)}>
                  {redeemPrizeStatus[item.prizeType == 2 || item.prizeType == 3 ? item.redeemPrizeStatus : 1]}
                </View>
              </View>
            );
          })}
      </View>
    );
  }
  /**
   * 0未兑换 1已兑换
   * @param redeemPrizeStatus
   */
  prizeJump = async (item) => {
    const redeemPrizeStatus = item.redeemPrizeStatus;
    const activeId = item.id;
    if (item.prizeType == 2 || item.prizeType == 3) {
      if (redeemPrizeStatus == 0) {
        await Taro.navigateTo({
          url: `/pages/package-C/lottery/prize-receive/index?id=${activeId}`,
        });
      } else {
        await Taro.navigateTo({
          url: `/pages/package-C/lottery/prize-detail/index?id=${activeId}`,
        });
      }
    } else if (item.prizeType == 1) {
      Taro.navigateTo({
        url: `/pages/package-A/customer/my-coupon/index`,
      });
    } else if (item.prizeType == 0) {
      Taro.navigateTo({
        url: `/pages/package-A/customer/user-integral/index`,
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
