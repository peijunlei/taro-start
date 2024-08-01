import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './coupon-status-tab.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
type ICouponStatusTabProps = T.IProps & T.ICouponStatusTabProps;
const typeList = [
  {value: 0, text: '未使用'},
  {value: 1, text: '已使用'},
  {value: 2, text: '已过期'},
];
@connect<Partial<ICouponStatusTabProps>, T.ICouponStatusTabState>(store2Props, actions)
export default class CouponStatusTab extends Component<Partial<ICouponStatusTabProps>, T.ICouponStatusTabState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: ICouponStatusTabProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {
        action: {changeStatus},
      },
      main: {useStatus, overDueCount, unUseCount, usedCount},
    } = this.props;
    console.log('useStatus', useStatus);
    return (
      <View className="couponStatusTab">
        {typeList.map((item, index) => {
          return (
            <View
              key={index}
              className={item.value == useStatus ? 'tab-text curr' : 'tab-text'}
              onClick={() => {
                changeStatus(item.value);
              }}
            >
              {item.text}({item.value == 0 ? unUseCount : item.value == 1 ? usedCount : overDueCount})
            </View>
          );
        })}
        {/* <View className={useStatus == 0 ? "tab-text curr" : "tab-text"} onClick={() => { changeStatus(0) }}>
          未使用({unUseCount})
        </View>
        <View className={useStatus == 1 ? "tab-text curr" : "tab-text"} onClick={() => { changeStatus(1) }}>
          已使用({usedCount})
        </View>
        <View className={useStatus == 2 ? "tab-text curr" : "tab-text"} onClick={() => { changeStatus(2) }}>
          已过期({overDueCount})
        </View> */}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
