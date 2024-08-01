import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './less/join-group.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CountDown from '@/pages/common/count-down';
import rArrow from '@/assets/image/goods/goods-detail/r-arrow.png';
import defaultImg from '@/assets/image/goods/goods-detail/head.png';
import moment from 'dayjs';
type IGroupProps = T.IProps & T.IGroupProps;

@connect<Partial<IGroupProps>, T.IGroupState>(store2Props, actions)
export default class JoinGroup extends Component<Partial<IGroupProps>, T.IGroupState> {
  constructor(props: IGroupProps) {
    super(props);
  }

  /**
    加入拼团
*/
  render() {
    let {
      actions: {publicAction, otherAction},
      main,
    } = this.props;
    return (
      <View className="joinGroup">
        <View className="up">
          <Text className="title">推荐参与团购</Text>
          <View className="right" onClick={() => this.findGroupModal()}>
            <Text className="text">查看更多拼团</Text>
            <Image src={rArrow} className="arrow" />
          </View>
        </View>
        {/* 待成团列表 */}
        <View className="group-list">
          {main.grouponInsts.map((item, index) => {
            //拼团结束时间
            const endTime = moment(item.endTime);
            return (
              <View className="item" id={index} key={index}>
                <View className="left">
                  <Image className="head" src={this._img(item)} />
                  <View className="info">
                    <Text className="info-name">{this._name(item)}</Text>
                    <View className="date">
                      <Text className="info-time">距结束</Text>
                      <CountDown
                        allowFontScaling={false}
                        numberOfLines={1}
                        visibleSecond={true}
                        timeStyle={{color: '#999', margin: 0}}
                        serverTime={main.serverTime}
                        endTime={endTime}
                        timeOffset={moment(endTime)
                          .diff(moment(main.serverTime), 's')
                          .toFixed(0)}
                      />
                    </View>
                  </View>
                </View>
                <View className="right">
                  <View className="l-btn">
                    <Text className="btn-text">还差</Text>
                    <Text className="num">{this._num(item)}</Text>
                    <Text className="btn-text">人成团</Text>
                  </View>
                  <View
                    className="r-btn"
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/package-B/groupon/group-buy-detail/index?grouponId=${item.grouponNo}`,
                      });
                    }}
                  >
                    立即参团
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  //查看更多拼团
  findGroupModal = () => {
    let {
      actions: {publicAction},
    } = this.props;
    publicAction.commonChange('main.isWaitGroup', true);
  };

  /**
   * 头像
   */
  _img = (item) => {
    let text = '';
    if (!item.headimgurl) {
      text = defaultImg;
    } else {
      text = item.headimgurl;
    }
    return `${text}`;
  };

  /**
   * 名称
   */
  _name = (item) => {
    let text = '';
    if (!item.customerName) {
      text = '用户';
    } else {
      text = item.customerName;
    }
    return `${text}`;
  };

  /**
   * 名称
   */
  _num = (item) => {
    return item.grouponNum - item.joinNum;
  };
}

//create by moon https://github.com/creasy2010/moon
