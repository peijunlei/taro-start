import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './reward.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';
import {_, WMkit, msg} from 'wmkit';
import Header from './components/header';
import SellWellGoods from '@/pages/common/goods/sellwell-goods/index';
import ListView from '@/pages/common/list-view';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class RewardCenter extends Component<Partial<T.IProps>, any> {
  constructor(props) {
    super(props);

    const {main} = props;

    msg.on({
      'refresh-reward': async () => {
        await this.props.actions.init();
      },
    });
    msg.on({
      'refresh-reward-shopCart': () => {
        this.props.actions.action.commonChange('main.refresh', !main.refresh);
      },
    });
  }

  //使得从个人中心页退出再登录以后进入页面能刷新
  async componentDidShow() {
    Taro.setNavigationBarTitle({
      title: '奖励中心',
    });
    await this.props.actions.init();
  }

  //从load-page页面登录进来强制页面刷新
  async componentDidMount() {
    Taro.setNavigationBarTitle({
      title: '奖励中心',
    });
    await this.props.actions.init();
  }

  _getHeight = () => {
    if (__TARO_ENV === 'h5') {
      return 'calc(100vh -50px)';
    } else {
      return '100vh';
    }
  };

  render() {
    const {main} = this.props;

    return (
      main && (
        <View className="packageBRewardCenter">
          <Header />
          {!main.isLoadingFlag && (
            <SellWellGoods hotGoodsList={main?.hotGoodsList} distributor={{forbiddenFlag: false}} />
          )}
        </View>
      )
    );
  }
}
