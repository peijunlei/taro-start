import * as T from '../types';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {store2Props} from '../selectors';
import {connect} from 'react-redux';
import actions from '../actions/index';
import {View, Text, ScrollView} from '@tarojs/components';
import '../css/style.less';
type INavToolsProps = T.IProps & T.INavToolsProps;

/**
 * 订单tab datasource
 */
export const tabStatus = [
  {label: '全部', key: ''},
  {label: '待发货', key: 'flowState-AUDIT'},
  {label: '待收货', key: 'flowState-DELIVERED'},
  {label: '已完成', key: 'flowState-COMPLETED'},
];
@connect<Partial<INavToolsProps>, T.INavToolsState>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
  }
  render() {
    let {main, actions} = this.props;
    // let { key } = main;
    return (
      <View className="points-box">
        <View className="container">
          <ScrollView scrollX>
            <View className="bar">
              {tabStatus.map((tabItem) => {
                return (
                  <View
                    key={tabItem.key}
                    className="nav"
                    onClick={() => {
                      actions.goodsAction.nativeTo();
                      this._changeNav(tabItem.key);
                    }}
                  >
                    <Text
                      className={
                        main?.key === tabItem.key
                          ? 'points-order-list-top-item itemSelected'
                          : 'points-order-list-top-item'
                      }
                    >
                      {tabItem.label}
                    </Text>
                    <View className="active">
                      {main?.key == tabItem.key ? <View className="activeLine" /> : <View className="noActiveLine" />}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  _changeNav = (v) => {
    this.props.actions.goodsAction.changeTopActive(v);
  };
}
