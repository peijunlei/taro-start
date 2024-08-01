import Taro from '@tarojs/taro';
import React, {Component} from 'react';
import {View} from '@tarojs/components';
import './skeleton-screen.less';
import {msg} from 'wmkit';
import WMLoading from '@/pages/common/loading';

export default class SkeletonScreen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showSkeleton: true,
    };
    msg.on({
      webviewLoaded: this.hideSkeleton,
    });
  }

  componentWillUnmount() {
    msg.bus.off('webviewLoaded', this.hideSkeleton);
  }

  hideSkeleton = () => {
    this.setState({
      showSkeleton: false,
    });
  };

  render() {
    let functionList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let mainList = [1, 2, 3, 4, 5];
    return (
      this.state.showSkeleton && (
        <View className="ske-index-skeContainer">
          <View className="ske-index-skeSwiper">
            <View className="ske-index-dot" style={{opacity: 1}}></View>
            <View className="ske-index-dot"></View>
            <View className="ske-index-dot"></View>
            <View className="ske-index-dot"></View>
          </View>
          <View className="ske-index-skeFunctionList">
            {functionList.map((item, index) => {
              return (
                <View className="ske-index-functionItem" key={item}>
                  <View className="ske-index-functionTop skeColor"></View>
                  <View className="ske-index-functionBottom skeColor"></View>
                </View>
              );
            })}
          </View>
          <View className="ske-index-banner skeColor"></View>
          <View className="ske-index-title skeColor"></View>
          <View className="ske-index-content">
            <View className="ske-index-contentLeft skeColor"></View>
            <View className="ske-index-contentRight">
              <View className="ske-index-contentTop skeColor"></View>
              <View className="ske-index-contentTop skeColor"></View>
            </View>
          </View>
          {mainList.map((item, index) => {
            return (
              <View className="skeMainList" key={item + 'list'}>
                <View className="skeListLeft skeColor"></View>
                <View className="skeListRight">
                  <View className="skeListTop skeColor"></View>
                  <View className="skeListMiddle skeColor"></View>
                  <View className="skeListBottom">
                    <View className="skeListBottomLine skeColor"></View>
                    <View className="skeListBottomLine skeColor"></View>
                  </View>
                </View>
              </View>
            );
          })}
          <WMLoading />
        </View>
      )
    );
  }
}
