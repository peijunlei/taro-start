import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './combination-list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import CombinationItem from '../components/combination-item';
import WMListView from '@/pages/common/list-view';
import empty from '@/assets/image/empty/deposit-records.png';

type ICombinationListProps = T.IProps & T.ICombinationListProps;

@connect<Partial<ICombinationListProps>, T.ICombinationListState>(store2Props, actions)
export default class CombinationList extends Component<Partial<ICombinationListProps>, T.ICombinationListState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ICombinationListProps) {
    super(props);
  }
  state = {
    list: [],
  };
  /**

*/
  render() {
    let {
      actions: {action},
      main,
      main: {combinationList},
    } = this.props;
    return (
      main &&
      main.combinationList && (
        <View className="combinationList">
          {combinationList.map((item, index) => {
            return <CombinationItem key={index} orderItem={item} />;
          })}
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
