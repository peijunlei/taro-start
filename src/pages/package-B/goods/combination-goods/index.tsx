import {View, Button, Text} from '@tarojs/components';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import CombinationList from './components/combination-list';
import CombinationItem from './components/combination-item';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PagesPackageBGoodsCombinationGoods extends Component<Partial<T.IProps>, any> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '优惠套装',
    };
  }
  async componentDidMount() {
    let {skuId, storeId} = getCurrentInstance().router.params;
    this.props.actions.init(skuId, storeId);
    // Taro.setNavigationBarTitle({ title: this.state.title });
  }
  componentWillUnmount() {
    this.props.actions.clean();
  }

  componentDidShow() {
    // Taro.setNavigationBarTitle({ title: this.state.title });
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    // if (main && main.combinationList) {
    //   this.setState({ title: `优惠套装(${main.combinationList.length})` });
    // }
    return main ? (
      <View className="pagesPackageBGoodsCombinationGoods">
        <CombinationList />
      </View>
    ) : (
      <View></View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
