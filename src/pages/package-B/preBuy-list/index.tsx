import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import CollectionList from './components/collection-list';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class PackageACustomerUserCollection extends Component<Partial<T.IProps>, any> {
  componentWillMount() {
    if (__TARO_ENV !== 'h5') {
      Taro.showShareMenu({
        withShareTicket: true,
      });
    }
    this.props.actions.init();
  }

  componentDidShow() {
    this.props.actions.queryServerTime();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  config = {
    navigationBarTitleText: '我的预约',
  };

  render() {
    let {
      actions: {
        action: {commonChange},
      },
      // main: {ifModify, total},
    } = this.props;

    return (
      <View className="prebuy-list ">
        <CollectionList />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
