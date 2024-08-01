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
  {label: '已作废', key: 'flowState-VOID'},
];
@connect<Partial<INavToolsProps>, T.INavToolsState>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
  }
  render() {
    let {main} = this.props;
    let {key} = main;
    return (
      <View className="box">
        <View className="container">
          <ScrollView scrollX>
            <View className="barPromote">
              {tabStatus.map((tabItem) => {
                return (
                  <View
                    key={tabItem.key}
                    className="nav"
                    onClick={() => {
                      this._changeNav(tabItem.key);
                    }}
                  >
                    <Text className={key === tabItem.key ? 'itemPromote itemSelected' : 'itemPromote'}>
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
    );
  }
  _changeNav = (v) => {
    this.props.actions.goodsAction.changeTopActive(v);
  };
}
