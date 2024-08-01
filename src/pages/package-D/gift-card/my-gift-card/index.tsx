import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import GiftCardList from './components/gift-card-list';
import GiftCardTab from './components/gift-card-tab';
import {msg} from 'wmkit';
/** 卡类型Tab - 福点、提货 - 组件 */
import GiftCardTypeTab from './components/gift_card_type_tab';

import './index.less';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MyGiftCard extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);
    this.state = {
      isInit: true,
    };
  }

  componentDidMount() {
    this.props.actions.init();
    this.setState({isInit: false});
    msg.on({
      changeCardTab: this.props.actions.action.changeTab,
      myCardRefresh: this.props.actions.action.refresh,
    });
  }

  componentDidShow() {
    if (!this.state.isInit) {
      this.props.actions.action.refresh();
    }
  }

  componentWillUnmount() {
    msg.bus.off('changeCardTab', this.props.actions.action.changeTab);
    msg.bus.off('myCardRefresh', this.props.actions.action.refresh);
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;

    return (
      <View className="my-gift-card  _page">
        {!main ? (
          <View />
        ) : (
          <>
            <GiftCardTab />
            {/* 卡类型Tab - 福点、提货 - 组件 */}
            <GiftCardTypeTab
              giftCardType={main?.giftCardType}
              onGiftCardTypeTabChange={(type) => action?.onGiftCardTypeTabChange?.(type)}
            />
            <GiftCardList />
            <View className="card-exchange">
              <View
                className="exchange-button"
                onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/package-D/gift-card/exchange-card/index',
                  });
                }}
              >
                <Text className="exchange-text">绑定新卡</Text>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }
}
