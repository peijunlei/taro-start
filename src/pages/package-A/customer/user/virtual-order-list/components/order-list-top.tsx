import * as T from '../types';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';
import {store2Props} from '../selectors';
import {connect} from 'react-redux';
import actions from '../actions/index';
import {View, Text, ScrollView, Image, Input} from '@tarojs/components';
import '../css/style.less';
type INavToolsProps = T.IProps & T.INavToolsProps;
import dowmImg from '@/assets/image/coupon/down.png';
import upImg from '@/assets/image/coupon/up.png';
import searchImg from '@/assets/image/goods/search.png';
import {ifLogin} from '@/utils/common-functions';
import {WMkit, _} from 'wmkit';
/**
 * 订单tab datasource
 */

@connect<Partial<INavToolsProps>, T.INavToolsState>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
  }
  render() {
    let id = getCurrentInstance().router.params.id;
    let {
      main = {},
      actions: {goodsAction},
    } = this.props;
    let {key, showCateMask, keywords} = main;
    const isShop = WMkit.isShop();
    const tabStatus =
      id == '1'
        ? [
            {label: '全部订单', key: ''},
            {label: '待付款', key: 'payState-NOT_PAID'},
            {label: '待收货', key: 'flowState-DELIVERED'},
            {label: '已完成', key: 'flowState-COMPLETED'},
          ]
        : [
            {label: '全部订单', key: ''},
            {label: '待付款', key: 'payState-NOT_PAID'},
            {label: '已完成', key: 'flowState-COMPLETED'},
          ];
    return (
      <View className="orderListTopHeights">
        <View className="orderListTop">
          <View className="box">
            <View className="container">
              <ScrollView scrollX>
                <View className="bar">
                  {tabStatus.map((tabItem, index) => {
                    return (
                      <View
                        key={index}
                        className="nav"
                        onClick={() => {
                          this._changeNav(tabItem.key);
                        }}
                      >
                        <Text
                          className={key === tabItem.key ? 'order-list-top-item itemSelected' : 'order-list-top-item'}
                        >
                          {tabItem.label}
                        </Text>
                        <View className="active">
                          {key == tabItem.key ? <View className="activeLine" /> : <View className="noActiveLine" />}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _changeNav = async (v) => {
    const {goodsAction} = this.props.actions;
    goodsAction.changeTopActive(v);
    // 存储tab
    Taro.setStorageSync('vir_order_list_tab', {status: v});
    //隐藏订单筛选
  };

  _changeKeywords = (keywords) => {
    const {goodsAction} = this.props.actions;
    goodsAction.commonChange('main.keywords', keywords);
    goodsAction.query();
  };
}
