import {View, ScrollView, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './type-nav.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type ITypeNavProps = T.IProps & T.ITypeNavProps;

@connect<Partial<ITypeNavProps>, T.ITypeNavState>(store2Props, actions)
export default class TypeNav extends Component<Partial<ITypeNavProps>, T.ITypeNavState> {
  constructor(props: ITypeNavProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: {action},
      main: {cateList, cateId},
    } = this.props;
    if (cateList.length > 0 && cateList[0].cateId != null) {
      cateList.unshift({cateId: null, cateName: '全部'});
    }
    return (
      <ScrollView className="nav" scrollX>
        <View className="typeNav">
          {cateList.map((cate, index) => {
            return (
              <View
                key={index}
                className={cateId == cate.cateId ? 'item item-selected bold ' : 'item'}
                onClick={() => {
                  action.setCateId(cate.cateId);
                }}
              >
                <Text className="text">{cate.cateName}</Text>
                <View className="bottom"></View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
