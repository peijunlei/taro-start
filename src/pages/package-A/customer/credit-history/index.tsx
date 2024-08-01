import 'taro-ui/dist/style/components/modal.scss';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import CreditHistoryNav from './components/credit-history-nav';
import CreditItem from './components/credit-item';

//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CreditHistory extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidMount() {
    let {startTime} = Taro.getCurrentInstance().router.params || {};
    this.props.actions.init(startTime);
    Taro.setBackgroundColor({
      backgroundColor: '#f4f4f4', // 窗口的背景色为白色
    });
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return (
     main && <View className="creditHistory">
        <CreditHistoryNav />
        <CreditItem />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
