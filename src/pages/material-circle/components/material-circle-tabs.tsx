import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './material-circle-tabs.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type IMaterialCircleTabsProps = T.IProps & T.IMaterialCircleTabsProps;

@connect<Partial<IMaterialCircleTabsProps>, T.IMaterialCircleTabsState>(store2Props, actions)
export default class MaterialCircleTabs extends Component<
  Partial<IMaterialCircleTabsProps>,
  T.IMaterialCircleTabsState
> {
  constructor(props: IMaterialCircleTabsProps) {
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
      <View className="materialCircleTabs">
        <View className="container">
          <View className="bar">
            <View
              key={0}
              className="nav"
              onClick={() => {
                action.commonChange('main.currentTab', 0);
                action.commonChange('main.isScroll', false);
              }}
            >
              <Text className={main.currentTab === 0 ? 'item itemSelected' : 'item'}>直播</Text>
              <View className="active">{main.currentTab === 0 ? <View className="activeLine" /> : <View />}</View>
            </View>
            <View
              key={1}
              className="nav"
              onClick={() => {
                action.commonChange('main.currentTab', 1);
              }}
            >
              <Text className={main.currentTab === 1 ? 'item itemSelected' : 'item'}>分销广场</Text>
              <View className="active">{main.currentTab === 1 ? <View className="activeLine" /> : <View />}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
