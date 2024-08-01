import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import * as T from '../types';
import './tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import action from '@/pages/package-C/order/ship-record/actions/action';

type ITabProps = T.IProps & T.ITabProps;

@connect<Partial<ITabProps>, T.ITabState>(store2Props, actions)
export default class Tab extends Component<Partial<ITabProps>, T.ITabState> {
  constructor(props: ITabProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="searchTab">
        <View
          onClick={() => {
            this._changeTab('goods');
          }}
          className={main.key === 'goods' ? 'tabItem active' : 'tabItem'}
        >
          <Text className="tabText">商品</Text>
          <View className="line"></View>
        </View>
        <View
          onClick={() => {
            this._changeTab('supplier');
          }}
          className={main.key === 'supplier' ? 'tabItem active' : 'tabItem'}
        >
          <Text className="tabText">店铺</Text>
          <View className="line"></View>
        </View>
      </View>
    );
  }

  _changeTab = (key) => {
    const {
      action: {commonChange, setPrewords},
      getHistory,
    } = this.props.actions;
    commonChange([{paths: 'main.key', value: key}]);
    commonChange([{paths: 'main.associationalWordList', value: []}]);
    // commonChange([{paths: 'main.keywords', value: ''}]);
    commonChange([{paths: 'main.preKeywords', value: ''}]);
    getHistory();
    if (key == 'goods') {
      setPrewords();
    }
  };
}

//create by moon https://github.com/creasy2010/moon
