import {View, Text, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './left-menu.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ILeftMenuProps = T.IProps & T.ILeftMenuProps;

@connect<Partial<ILeftMenuProps>, T.ILeftMenuState>(store2Props, actions)
export default class LeftMenu extends Component<Partial<ILeftMenuProps>, T.ILeftMenuState> {
  constructor(props: ILeftMenuProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
      cateId,
    } = this.props;
    return (
      <ScrollView scrollY className="leftMenu">
        {main?.cateList &&
          main.cateList.map((v, k) => {
            return (
              <View
                key={k}
                onClick={() => {
                  action?._initOtherHandle?.(cateId, main.cateList, v.cateId != -1 ? 'menu' : 'content', k);
                  if (v.cateId != -1) {
                    action.commonChange([
                      {
                        paths: 'main.pageIndex',
                        value: Math.random(),
                      },
                      {
                        paths: 'main.scrollTop',
                        value: Math.random(),
                      },
                    ]);
                  }
                }}
                className={k === main.index ? 'item active' : 'item'}
              >
                <Text className="text">{(v as any).cateName}</Text>
                <View className="borderRight" />
              </View>
            );
          })}
      </ScrollView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
