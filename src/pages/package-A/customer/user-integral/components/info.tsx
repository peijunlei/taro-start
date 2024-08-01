import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
type IInfoProps = T.IProps & T.IInfoProps;
// type 0:普通方式 1:订单相关 2:退单相关
let serviceTypeName = {
  0: {desc: '签到', types: 0},
  1: {desc: '注册', types: 0},
  2: {desc: '分享商城/商品', types: 0},
  3: {desc: '分享注册', types: 0},
  4: {desc: '分享购买', types: 0},
  5: {desc: '评论商品', types: 0},
  6: {desc: '晒单', types: 0},
  7: {desc: '完善基本信息', types: 0},
  8: {desc: '绑定微信', types: 0},
  9: {desc: '添加收货地址', types: 0},
  10: {desc: '关注店铺', types: 0},
  11: {desc: '订单完成', types: 1},
  12: {desc: '订单抵扣', types: 1},
  13: {desc: '优惠券兑换', types: 1},
  14: {desc: '积分兑换', types: 1},
  15: {desc: '退单返还', types: 2},
  16: {desc: '订单取消返还', types: 1},
  17: {desc: '过期扣除', types: 0},
  18: {desc: '客户导入', types: 0},
  19: {desc: '权益发放', types: 0},
  22: {desc: '抽奖消耗', type: 0},
  23: {desc: '抽奖奖励', type: 0},
};

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  render() {
    let {item} = this.props;
    let content = item.content ? JSON.parse(item.content) : null;
    return (
      <View className="detail_userIntegral">
        <View className="detail_box">
          <View className="left-spn">
            <View className="black-text">{serviceTypeName[item.serviceType]?.desc}</View>
            {content ? (
              serviceTypeName[item.serviceType]?.types == 1 ? (
                <View className="time" style={{marginBottom: 0}}>
                  订单编号:{content.orderNo}
                </View>
              ) : serviceTypeName[item.serviceType]?.types == 2 ? (
                <View className="time" style={{marginBottom: 0}}>
                  退单编号:{content.returnOrderNo}
                </View>
              ) : null
            ) : null}
            <View className="time" style={{marginLeft: 0}}>
              {moment(item.opTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>
          <View className={item.type ? 'right-spn' : 'right-spn right-reduce'}>
            {item.type ? ' + ' : ' - '}
            {item.points || 0}
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
