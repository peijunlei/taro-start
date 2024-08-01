/*
 * @Author:
 * @Date: 2022-12-29 10:43:29
 * @Description:
 */
import Taro from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Modal} from '@wanmi/ui-taro';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import GiftCardTab from './components/gift-card-tab';
import GiftCardList from './components/gift-card-list';
import GoodsModal from './components/goods-modal';

import './index.less';
import {TabType} from './types';

//@ts-ignore
__TARO_ENV === 'h5' && actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class UseGiftCard extends Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.props.actions.init();
    // 主题色
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    const {
      main,
      actions: {action},
    } = this.props;
    return (
      <View className="use-gift-card _page">
        {main ? (
          <>
            <GiftCardTab />
            <GiftCardList />
            {main.tab === TabType.USABLE && (
              <View className="card-exchange">
                <View className="exchange-button" onClick={action.onOk}>
                  <Text className="exchange-text">确定</Text>
                </View>
              </View>
            )}
            {main.modalFlag && <GoodsModal />}
            {main.tipModal && (
              <Modal
                type="tip"
                title="提醒"
                content="很抱歉，卡包抵扣金额发生变化，请重新选择"
                visible
                onOk={() => {
                  Taro.redirectTo({
                    url: '/pages/package-D/gift-card/use-gift-card/index',
                  });
                }}
              />
            )}
          </>
        ) : null}
      </View>
    );
  }
}
