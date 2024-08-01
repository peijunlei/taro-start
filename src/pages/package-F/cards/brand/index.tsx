import { View, ScrollView, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import actions from './actions';
import { store2Props } from './selectors';
import Sections from './components/sections'
import List from './components/list'
import { isEmpty } from 'lodash';

@connect<Partial<any>, any>(store2Props, actions)
export default class Live extends Component<Partial<any>, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(): void {
    this.props.actions.init()
    this.props.actions.action.loadBrandList()
  }

  render() {
    const { main } = this.props
    return (
      <View className="brands _page">
        {
          isEmpty(main) ? null : (
            <>
              <Sections />
              <List />
            </>
          )
        }
      </View>
    )
  }
}
