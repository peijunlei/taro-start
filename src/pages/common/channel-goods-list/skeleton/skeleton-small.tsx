import {View, Button, Text, Image} from '@tarojs/components';
import React, {Component} from 'react';

import * as T from '../types';
import './skeleton-small.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import 'taro-ui/dist/style/components/modal.scss';
import WMLoading from '@/pages/common/loading';
type IBigSpuListProps = T.IProps & T.IBigSpuListProps;

@connect<Partial<IBigSpuListProps>, T.IBigSpuListState>(store2Props, actions)
export default class BuyStatus extends Component<Partial<IBigSpuListProps>, T.IBigSpuListState> {
  constructor(props: IBigSpuListProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  /**
    预约
*/
  render() {
    let skeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <View className="goods-list-skeContainer-small">
        {skeList.map((item) => {
          return (
            <View className="skeItem-small" key={item}>
              <View className="skeItemLeft-small"></View>
              <View className="skeItemRight-small">
                <View className="skeColor-small skeItemTitle-small"></View>
                <View className="skeColor-small skeItemTitle-small"></View>
                <View className="skeColor-small skeItemSpec-small"></View>
                <View className="skeItemLineBox-small mb14">
                  <View className="skeColor-small skeSqure1-small"></View>
                  <View className="skeColor-small skeSqure2-small"></View>
                  <View className="skeColor-small skeSqure1-small"></View>
                  <View className="skeColor-small skeSqure2-small"></View>
                </View>
                <View className="skeItemLineBox-small ">
                  <View className="skeColor-small skeSqure3-small"></View>
                  <View className="skeColor-small skeSqure3-small"></View>
                  <View className="skeColor-small skeSqure3-small"></View>
                </View>
                <View className="skeItemLineBox1-small">
                  <View className="skeColor-small skeSqure4-small"></View>
                  <View className="skeColor-small skeSqure5-small"></View>
                </View>
              </View>
            </View>
          );
        })}
        <WMLoading />
      </View>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
