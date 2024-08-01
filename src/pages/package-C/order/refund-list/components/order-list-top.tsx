import * as T from '../types';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {store2Props} from '../selectors';
import {connect} from 'react-redux';
import actions from '../actions/index';
import {View, Text, ScrollView} from '@tarojs/components';
import '../css/order-list-top.less';
type INavToolsProps = T.IProps & T.INavToolsProps;

/**
 * 订单tab datasource
 */
const tabList = [
  {label: '全部', tabKey: 'all'},
  {label: '待审核', tabKey: 'INIT'},
  {label: '待填写物流', tabKey: 'AUDIT'},
  {label: '待商家收货', tabKey: 'DELIVERED'},
  {label: '待退款', tabKey: 'RECEIVED'},
  {label: '已完成', tabKey: 'COMPLETED'},
  {label: '拒绝退款', tabKey: 'REJECT_REFUND'},
  {label: '拒绝收货', tabKey: 'REJECT_RECEIVE'},
  {label: '已作废', tabKey: 'VOID'},
];
@connect<Partial<INavToolsProps>, T.INavToolsState>(store2Props, actions)
export default class NavTools extends Component<Partial<INavToolsProps>, T.INavToolsState> {
  constructor(props: INavToolsProps) {
    super(props);
  }
  render() {
    let {main} = this.props;
    return (
      <View className="orderListTopbox">
        <View className="container">
          <ScrollView scrollX>
            <View className="bar">
              {tabList.map((tabItem) => {
                return (
                  <View
                    key={tabItem.tabKey}
                    className="nav"
                    onClick={() => {
                      this._changeNav(tabItem.tabKey, main.form.rids);
                    }}
                  >
                    <Text
                      className={
                        main?.key === tabItem.tabKey ? 'refund-list-top-item itemSelected' : 'refund-list-top-item'
                      }
                    >
                      {tabItem.label}
                    </Text>
                    <View className="active">
                      {main?.key == tabItem.tabKey ? (
                        <View className="activeLine" />
                      ) : (
                        <View className="noActiveLine" />
                      )}
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
  _changeNav = (v, rids) => {
    this.props.actions.action.changeTopActive(v, rids);
  };
}
