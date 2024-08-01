import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './account-item.less';
import modifyIcon from '@/assets/image/common/modify.png';

type IAccountItemProps = T.IProps & T.IAccountItemProps;

export default class AccountItem extends Component<Partial<IAccountItemProps>, T.IAccountItemState> {
  constructor(props: IAccountItemProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      account: {customerAccountId, customerBankName, customerAccountName, customerAccountNo},
    } = this.props;

    return (
      <View className="account-item">
        <View className="left-wrap">
          <View className="title">{customerBankName}</View>
          <View className="next-title">{customerAccountName}</View>
          <View className="card-num">{customerAccountNo}</View>
        </View>
        <View
          className="modify-btn"
          onClick={() => {
            Taro.redirectTo({
              url: `/pages/package-A/customer/modify-bank-account/index?customerAccountId=${customerAccountId}`,
            });
          }}
        >
          <Image src={modifyIcon} className="modify-icon" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
