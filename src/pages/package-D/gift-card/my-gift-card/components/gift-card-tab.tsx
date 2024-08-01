import {Text, View} from '@tarojs/components';
import React, {Component} from 'react';
import * as T from '../types';
import './gift-card-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TabStatus, InvalidStatus} from 'api/GiftCardController';
import {_} from 'wmkit';

type IGiftCardTabProps = T.IProps & T.IGiftCardTabProps;

const numMap = {
  [TabStatus.USABLE]: 'useNum',
  [TabStatus.UN_USABLE]: 'invalidNum',
  [TabStatus.TO_ACTIVE]: 'notActive',
};

const priceMap = {
  [TabStatus.USABLE]: 'cardBalance',
  [TabStatus.TO_ACTIVE]: 'cardBalance',
};

@connect<Partial<IGiftCardTabProps>, T.IGiftCardTabState>(store2Props, actions)
export default class GiftCardTab extends Component<Partial<IGiftCardTabProps>, T.IGiftCardTabState> {
  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    if (!main) return null;

    return (
      <View className="my-gift-card-tab">
        <View className="main-tab">
          <View
            className={`tab-item ${main.status === TabStatus.USABLE ? 'tab-item-active' : ''}`}
            onClick={() => action.changeTab(TabStatus.USABLE)}
          >
            <Text className="tab-text">可用({main.useNum})</Text>
            <View className="tab-line" />
          </View>
          <View
            className={`tab-item ${main.status === TabStatus.UN_USABLE ? 'tab-item-active' : ''}`}
            onClick={() => action.changeTab(TabStatus.UN_USABLE)}
          >
            <Text className="tab-text">不可用({main.invalidNum})</Text>
            <View className="tab-line" />
          </View>
          {/* <View
            className={`tab-item ${main.status === TabStatus.TO_ACTIVE ? 'tab-item-active' : ''}`}
            onClick={() => action.changeTab(TabStatus.TO_ACTIVE)}
          >
            <Text className="tab-text">待激活({main.notActive})</Text>
            <View className="tab-line" />
          </View> */}
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
