import 'taro-ui/dist/style/components/modal.scss';
import {Text, View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './credit-item.less';
import * as T from '../types';
import actions from '../actions';
import {store2Props} from '../selectors';
import RepaymentItem from './repayment-item';
import ReturnRepaymentItem from './return-repayment-item';
import WMListView from '@/pages/common/list-view';
import empty from '@/assets/image/customer/credit/creditEmpty.png';
//@ts-ignore
actions().actions.loadReducer();
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class CreditItem extends Component<Partial<T.IProps>, any> {
  componentWillMount() {}

  onShareTimeline() {
    // 默认分享内容
  }

  componentDidMount() {
    this.props.actions.init();
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
    const {key} = main;
    return (
      <View className="credit-item">
        {key == 0 ? (
          <View>
            <WMListView
              url={'/credit/account/history-recover-list'}
              style={{height: '90vh', paddingBottom: '50px'}}
              noneContent="暂无数据哦" //为空提示
              noneImg={empty}
              getData={(list, total) => {
                console.log('list', list);
                action.commonChange([
                  {
                    paths: 'main.historyRecoverList',
                    value: list,
                  },
                ]);
              }}
            >
              {main.historyRecoverList.map((item) => {
                return <ReturnRepaymentItem item={item} />;
              })}
            </WMListView>
          </View>
        ) : (
          <View>
            <WMListView
              url={'/credit/repay/has-repaid-list'}
              style={{height: '90vh', paddingBottom: '50px'}}
              noneContent="暂无数据哦" //为空提示
              noneImg={empty}
              getData={(list, total) => {
                console.log('list', list);
                action.commonChange([
                  {
                    paths: 'main.historyRecoverList',
                    value: list,
                  },
                ]);
              }}
            >
              {main.historyRecoverList.map((item) => {
                return <RepaymentItem item={item} />;
              })}
            </WMListView>
          </View>
        )}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
