import {View, Swiper} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './info.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import moment from 'dayjs';
type IInfoProps = T.IProps & T.IInfoProps;
// type 0:普通方式 1:订单相关
let serviceTypeName = {
  0: {desc: '签到', type: 0},
  1: {desc: '注册', type: 0},
  2: {desc: '分享商品', type: 0},
  3: {desc: '分享注册', type: 0},
  4: {desc: '分享购买', type: 0},
  5: {desc: '评论商品', type: 0},
  6: {desc: '晒单', type: 0},
  7: {desc: '完善基本信息', type: 0},
  8: {desc: '绑定微信', type: 0},
  9: {desc: '添加收货地址', type: 0},
  10: {desc: '关注店铺', type: 0},
  11: {desc: '订单完成', type: 1},
};

@connect<Partial<IInfoProps>, T.IInfoState>(store2Props, actions)
export default class Info extends Component<Partial<IInfoProps>, T.IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  render() {
    let {item} = this.props;
    return (
      <View className="detail">
        <View className="detail_box">
          <View className="left-spn">
            <View className="black-text">{serviceTypeName[item.serviceType].desc}</View>
            {serviceTypeName[item.serviceType].type == 1 ? <View className="time">订单编号:{item.tradeNo}</View> : null}
            <View className="time" style={{marginLeft: 0}}>
              {moment(item.opTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>
          <View className="right-spn">+{item.growthValue || 0}</View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
