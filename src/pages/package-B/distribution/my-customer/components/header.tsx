import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';

import * as T from '../types';
import './header.less';
import actions from '../actions/index';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {store2Props} from '../selectors';
const warrow = require('@/assets/image/common/white-arrow.png');

type IHeaderProps = T.IProps & T.IHeaderProps;

@connect<Partial<IHeaderProps>, T.IHeaderState>(store2Props, actions)
export default class Header extends Component<Partial<IHeaderProps>, T.IHeaderState> {
  static options = {
    addGlobalClass: true,
  };
  constructor(props: IHeaderProps) {
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
      <View className="packageBDistributionMyCustomerHeader">
        <View
          className="salesC-right"
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/package-B/sales/sales-rank/index`,
            });
          }}
        >
          排行榜
          <Image src={warrow} className="arrowImg" />
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
