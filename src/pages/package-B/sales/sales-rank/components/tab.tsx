import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import bg from '@/assets/image/distribution/sales/bg.png';
const tabList = [
  {name: '邀新人数', type: 'inviteCount'},
  {name: '有效邀新', type: 'inviteAvailableCount'},
  {name: '销售额', type: 'saleAmount'},
  {name: '预估收益', type: 'commission'},
];
type ITabProps = T.IProps & T.ITabProps;

@connect<Partial<ITabProps>, T.ITabState>(store2Props, actions)
export default class Tab extends Component<Partial<ITabProps>, T.ITabState> {
  constructor(props: ITabProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };
  /**

*/
  render() {
    let {
      actions: {
        action: {changeTitle},
      },
      main = {},
    } = this.props;
    const {tab, rang} = main;
    return (
      <View className="packageBSalesSalesRankTab">
        <View className="tip">
          <View className="tip-box">
            <Text className="text-name">近一周数据排行</Text>
            <Text className="text">日期范围：{rang}</Text>
          </View>
          <Image src={bg} className="img" />
        </View>
        <View className="wm-tabs mb24">
          {tabList.map((item) => {
            return (
              <View
                key={item.type}
                className="item "
                onClick={() => {
                  changeTitle(item.type);
                }}
              >
                <Text className={tab == item.type ? 'fs24 curr-text' : 'fs24'}>{item.name}</Text>
                <View className={tab == item.type ? 'line active' : 'line'} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
