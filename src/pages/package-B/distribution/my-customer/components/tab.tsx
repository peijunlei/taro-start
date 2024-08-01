import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';

import * as T from '../types';
import './tab.less';
import actions from '../actions/index';
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITabProps = T.IProps & T.ITabProps;
@connect<Partial<ITabProps>, T.ITabState>(store2Props, actions)
export default class Tab extends Component<Partial<ITabProps>, T.ITabState> {
  constructor(props: ITabProps) {
    super(props);
  }
  static options = {
    addGlobalClass: true,
  };

  /**

*/
  render() {
    let {
      actions: {
        action: {changeTab},
      },
      main,
    } = this.props;
    const currTab = main && main.tabList.filter((item) => item.id == main.tab);

    return (
      main &&
      currTab.length > 0 && (
        <View>
          <View className="packageBDistributionMyCustomerTab">
            {main.tabList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={item.id == main.tab ? 'my-customer-tab-item curr' : 'my-customer-tab-item'}
                  onClick={() => {
                    changeTab(item.id);
                  }}
                >
                  {item.name}
                  <Text className="line" />
                </View>
              );
            })}
          </View>
          <View className="packageBDistributionMyCustomer-curr-content">
            {currTab[0].name}
            <Text className="curr-num">{main.totalNum + ''}</Text>
          </View>
        </View>
      )
    );
  }
}

//create by moon https://github.com/creasy2010/moon
