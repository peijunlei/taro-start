import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';

import * as T from '../types';
import './top.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITopProps = T.IProps & T.ITopProps;

@connect<Partial<ITopProps>, T.ITopState>(store2Props, actions)
export default class Top extends Component<Partial<ITopProps>, T.ITopState> {
  constructor(props: ITopProps) {
    super(props);
  }

  /**
    顶部tab
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <View className="material__box">
        <View className="container">
          <View className="bar">
            <View
              key={0}
              className="nav"
              onClick={() => {
                action.commonChange('main.matterType', 0);
              }}
            >
              <Text className={main.matterType === 0 ? 'tabitem itemSelected' : 'tabitem'}>商品推荐</Text>
              <View className="active">
                {main.matterType === 0 ? <View className="activeLine" /> : <View className="noActiveLine" />}
              </View>
            </View>
            <View
              key={1}
              className="nav"
              onClick={() => {
                action.commonChange('main.matterType', 1);
              }}
            >
              <Text className={main.matterType === 1 ? 'tabitem itemSelected' : 'tabitem'}>素材推广</Text>
              <View className="active">
                {main.matterType === 1 ? <View className="activeLine" /> : <View className="noActiveLine" />}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
