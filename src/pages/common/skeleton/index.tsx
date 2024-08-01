import {View} from '@tarojs/components';
import React, {Component} from 'react';
import './skeleton-small.less';
import 'taro-ui/dist/style/components/modal.scss';
import WMLoading from '@/pages/common/loading';

export default class WMButton extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    let skeList = [1, 2, 3, 4, 5];
    return (
      <View className="skeContainer">
        <View className="skeList">
          {skeList.map((item) => {
            return (
              <View className="skeItem" key={item}>
                <View className="skeItemLeft"></View>
                <View className="skeItemRight">
                  <View className="skeColor skeItemTitle"></View>
                  <View className="skeColor skeItemTitle"></View>
                  <View className="skeColor skeItemSpec"></View>
                  <View className="skeItemLineBox mb14">
                    <View className="skeColor skeSqure1"></View>
                    <View className="skeColor skeSqure2"></View>
                    <View className="skeColor skeSqure1"></View>
                    <View className="skeColor skeSqure2"></View>
                  </View>
                  <View className="skeItemLineBox">
                    <View className="skeColor skeSqure3"></View>
                    <View className="skeColor skeSqure3"></View>
                    <View className="skeColor skeSqure3"></View>
                  </View>
                  <View className="skeItemLineBox1">
                    <View className="skeColor skeSqure4"></View>
                    <View className="skeColor skeSqure5"></View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {/*<WMLoading />*/}
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
