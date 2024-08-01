import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type INavProps = T.IProps & T.INavProps;

@connect<Partial<INavProps>, T.INavState>(store2Props, actions)
export default class Nav extends Component<Partial<INavProps>, T.INavState> {
  constructor(props: INavProps) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  render() {
    let {actions, main} = this.props;

    const tabs = [
      {text: '待评价', isId: 0},
      {text: '服务评价', isId: 1},
      {text: '已评价', isId: 2},
    ];

    return (
      main && (
        <View className="wm-tabs-2">
          {tabs.map((v, k) => {
            return (
              <View
                className={main.isId === k ? 'item-pin item-pin-active' : 'item-pin'}
                onClick={() => {
                  if (main.isId === k) {
                    return;
                  }
                  actions.switchTab(k);
                }}
              >
                <Text className="num">
                  {k === 0 && main.navData.wait}
                  {k === 1 && main.navData.storeWaitNum}
                  {k === 2 && main.navData.evaluateNum}
                </Text>
                <Text className="text">{v.text}</Text>
                <View className="line" />
              </View>
            );
          })}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
