import * as T from '../types';
import Taro from '@tarojs/taro';
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
const tabStatus = [
  {label: '全部订单', key: ''},
  {label: '待付款', key: 'payState-NOT_PAID'},
  // {label: '待审核', key: 'flowState-INIT'},
  {label: '待发货', key: 'flowState-AUDIT'},
  {label: '待收货', key: 'flowState-DELIVERED'},
  {label: '待评价', key: 'flowState-COMPLETED'},
  // {label: '已收货', key: 'flowState-CONFIRMED'},
  // {label: '已完成', key: 'flowState-COMPLETED'},
  // {label: '已作废', key: 'flowState-VOID'},
];
@connect<Partial<INavToolsProps>, T.INavToolsState>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
  }
  render() {
    let {
      main = {},
      actions: {goodsAction},
    } = this.props;
    let {key, showCateMask, keywords} = main;
    const isShop = WMkit.isShop();
    return (
      <View className="orderListTopHeight">
        <View className="orderListTop">
          <View className="searchBar">
            <View className="content">
              <Image src={searchImg} className="searchImg" onClick={(e) => this._changeKeywords(e.detail.value)} />
              <Input
                className="searchText"
                type="text"
                placeholder="输入商品名称搜索"
                // focus
                value={keywords}
                onInput={(e) => {
                  console.log(e);
                  this._changeKeywords(e.detail.value);
                }}
                onConfirm={(e) => this._changeKeywords(e.detail.value)}
              />
            </View>
          </View>

          <View className="box">
            <View className="container">
              <ScrollView scrollX>
                <View className="bar">
                  {tabStatus.map((tabItem, index) => {
                    if (isShop && tabItem.label === '待评价') return null;
                    return (
                      <View
                        key={index}
                        className="nav"
                        onClick={() => {
                          if (tabItem.key == 'flowState-COMPLETED') {
                            Taro.navigateTo({
                              url: `/pages/package-A/customer/evaluate-center/index`,
                            });
                          } else {
                            this._changeNav(tabItem.key);
                          }
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
              {WMkit.channelType() != '2' && (
                <View
                  className="tab-right"
                  onClick={() => {
                    goodsAction.commonChange('main.showCateMask', !showCateMask);
                  }}
                >
                  <Image className="down-img" src={showCateMask ? upImg : dowmImg} />
                </View>
              )}
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
    Taro.setStorageSync('order_list_tab', {status: v});
    //隐藏订单筛选
    goodsAction.commonChange('main.showCateMask', false);
  };

  _changeKeywords = (keywords) => {
    const {goodsAction} = this.props.actions;
    goodsAction.commonChange('main.keywords', keywords);
    goodsAction.query();
  };
}
