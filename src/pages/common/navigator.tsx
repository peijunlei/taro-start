import {View, Button, Text, CoverView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import './navigator.less';

interface IWMNavigatorProps {}

interface IWMNavigatorState {
  statusBarHeight: number;
}

export default class WMNavigator extends Component<IWMNavigatorProps, IWMNavigatorState> {
  constructor(props: IWMNavigatorProps) {
    super(props);
    this.state = {
      statusBarHeight: 0,
    };
  }

  componentWillMount = () => {
    const {statusBarHeight} = Taro.getSystemInfoSync();
    this.setState({
      statusBarHeight,
    });
    console.log(statusBarHeight);
  };

  render() {
    return (
      <CoverView className="wm-navigator">
        {/* <View className="place-holder" style={{height: statusBarHeight}} /> */}
        <CoverView className="nav-bar">
          <CoverView className="tool-bar" style={{height: this.state.statusBarHeight + 'px'}}></CoverView>

          <CoverView className="title-bar">
            <CoverView className="left-cell">123</CoverView>
            <CoverView className="center-cell">qwe</CoverView>
            <CoverView className="right-cell">asd</CoverView>
          </CoverView>
        </CoverView>
      </CoverView>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
