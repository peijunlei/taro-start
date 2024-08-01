import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import * as T from '../types';
import './order-cate-mask.less';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IOrderCateMaskProps = T.IProps & T.IOrderCateMaskProps;

const tabStatus = [
  { label: '全部订单', key: '' },
  { label: '拼团订单', key: 'assemble-order' },
  // {label: '秒杀订单', key: 'seckill-order'},
  { label: '积分兑换订单', key: 'points-order' },
  {
    label: '虚拟订单',
    key: 'virtual-order',
  },
  {
    label: '卡券订单',
    key: 'coupon-order',
  },
  {
    label: '电影票订单',
    key: 'movie-order',
  },
  {
    label: '生活券订单',
    key: 'local-life-order',
  },
  {
    label: '演出订单',
    key: 'performance-order',
  },
  {
    label: '叮咚买菜订单',
    key: 'dingdong',
  },
  {
    label: '美团订单',
    key: 'meituan',
  },
  {
    label: '山姆优选订单',
    key: 'sam',
  },
];

@connect<Partial<IOrderCateMaskProps>, T.IOrderCateMaskState>(store2Props, actions)
export default class OrderCateMask extends Component<Partial<IOrderCateMaskProps>, T.IOrderCateMaskState> {
  constructor(props: IOrderCateMaskProps) {
    super(props);
    this.state = {
      key: '',
    };
  }

  /**

*/
  render() {
    let {
      actions: { goodsAction },
      main: { showCateMask },
    } = this.props;
    let { key } = this.state;
    return (
      <View className="orderCateMask">
        <View className="coupon-cate-box">
          <View className="coupon-content">
            <View className="coupon-list">
              {tabStatus.map((cateItme, index) => {
                return (
                  <View
                    key={cateItme.key}
                    className={key == cateItme.key ? 'actived couponC-item' : 'couponC-item'}
                    onClick={() => {
                      goodsAction.tabsChange(cateItme.key);
                      goodsAction.commonChange('main.showCateMask', !showCateMask);
                    }}
                  >
                    {cateItme.label}
                  </View>
                );
              })}
            </View>
          </View>
          <View
            className="coupon-bottom"
            onClick={() => {
              goodsAction.commonChange('main.showCateMask', false);
            }}
          />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
